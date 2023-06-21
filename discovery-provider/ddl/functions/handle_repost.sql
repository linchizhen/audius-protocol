
create or replace function handle_repost() returns trigger as $$
declare
  new_val int;
  milestone_name text;
  milestone integer;
  owner_user_id int;
  track_remix_of json;
  is_remix_cosign boolean;
  delta int;
  entity_type text;
begin

  insert into aggregate_user (user_id) values (new.user_id) on conflict do nothing;
  if new.repost_type = 'track' then
    insert into aggregate_track (track_id) values (new.repost_item_id) on conflict do nothing;

    entity_type := 'track';
  else
    insert into aggregate_playlist (playlist_id, is_album) values (new.repost_item_id, new.repost_type = 'album') on conflict do nothing;

    entity_type := 'playlist';
  end if;

  -- increment or decrement?
  if new.is_delete then
    delta := -1;
  else
    delta := 1;
  end if;

  -- update agg user
  update aggregate_user 
  set repost_count = repost_count + delta
  where user_id = new.user_id;

  -- update agg track or playlist
  if new.repost_type = 'track' then
    milestone_name := 'TRACK_REPOST_COUNT';
    update aggregate_track 
    set repost_count = repost_count + delta
    where track_id = new.repost_item_id
    returning repost_count into new_val;
  	if new.is_delete IS FALSE then
		  select tracks.owner_id, tracks.remix_of into owner_user_id, track_remix_of from tracks where is_current and track_id = new.repost_item_id;
	  end if;
  else
    milestone_name := 'PLAYLIST_REPOST_COUNT';
    update aggregate_playlist
    set repost_count = repost_count + delta
    where playlist_id = new.repost_item_id
    returning repost_count into new_val;

  	if new.is_delete IS FALSE then
		  select playlist_owner_id into owner_user_id from playlists where is_current and playlist_id = new.repost_item_id;
	  end if;
  end if;

  -- create a milestone if applicable
  select new_val into milestone where new_val in (10,25,50,100,250,500,1000,2500,5000,10000,25000,50000,100000,250000,500000,1000000);
  if new.is_delete = false and milestone is not null and owner_user_id is not null then
    insert into milestones 
      (id, name, threshold, blocknumber, slot, timestamp)
    values
      (new.repost_item_id, milestone_name, milestone, new.blocknumber, new.slot, new.created_at)
    on conflict do nothing;
    insert into notification
      (user_ids, type, specifier, group_id, blocknumber, timestamp, data)
      values
      (
        ARRAY [owner_user_id],
        'milestone',
        owner_user_id,
        'milestone:' || milestone_name  || ':id:' || new.repost_item_id || ':threshold:' || milestone,
        new.blocknumber,
        new.created_at,
        json_build_object('type', milestone_name, entity_type || '_id', new.repost_item_id, 'threshold', milestone)
      )
      on conflict do nothing;
  end if;

  begin
    -- create a notification for the reposted content's owner
    if new.is_delete is false then
    insert into notification
      (blocknumber, user_ids, timestamp, type, specifier, group_id, data)
      values
      (
        new.blocknumber,
        ARRAY [owner_user_id],
        new.created_at,
        'repost',
        new.user_id,
        'repost:' || new.repost_item_id || ':type:'|| new.repost_type,
        json_build_object('repost_item_id', new.repost_item_id, 'user_id', new.user_id, 'type', new.repost_type)
      )
      on conflict do nothing;
    end if;

	-- notify followees of the reposter who have reposted the same content
	-- within the last month
	if new.is_delete is false
	and new.is_repost_of_repost is true then
	with
	    followee_repost_of_repost_ids as (
	        select user_id
	        from reposts r
	        where
	            r.repost_item_id = new.repost_item_id
	            and new.created_at - INTERVAL '1 month' < r.created_at
	            and new.created_at > r.created_at
              and r.is_delete is false
              and r.is_current is true
	            and r.user_id in (
	                select
	                    followee_user_id
	                from follows
	                where
	                    follower_user_id = new.user_id
                      and is_delete is false
                      and is_current is true
	            )
	    )
	insert into notification
		(blocknumber, user_ids, timestamp, type, specifier, group_id, data)
		SELECT blocknumber_val, user_ids_val, timestamp_val, type_val, specifier_val, group_id_val, data_val
		FROM (
			SELECT new.blocknumber AS blocknumber_val,
			ARRAY(
				SELECT user_id
				FROM
					followee_repost_of_repost_ids
			) AS user_ids_val,
			new.created_at AS timestamp_val,
			'repost_of_repost' AS type_val,
			new.user_id AS specifier_val,
			'repost_of_repost:' || new.repost_item_id || ':type:' || new.repost_type AS group_id_val,
			json_build_object(
				'repost_of_repost_item_id',
				new.repost_item_id,
				'user_id',
				new.user_id,
				'type',
				new.repost_type
			) AS data_val
		) sub
		WHERE user_ids_val IS NOT NULL AND array_length(user_ids_val, 1) > 0
		on conflict do nothing;
	end if;

    -- create a notification for remix cosign
    if new.is_delete is false and new.repost_type = 'track' and track_remix_of is not null then
      select
        case when tracks.owner_id = new.user_id then TRUE else FALSE end as boolean into is_remix_cosign
        from tracks
        where is_current and track_id = (track_remix_of->'tracks'->0->>'parent_track_id')::int;
      if is_remix_cosign then
        insert into notification
          (blocknumber, user_ids, timestamp, type, specifier, group_id, data)
          values
          (
            new.blocknumber,
            ARRAY [owner_user_id],
            new.created_at,
            'cosign',
            new.user_id,
            'cosign:parent_track' || (track_remix_of->'tracks'->0->>'parent_track_id')::int || ':original_track:'|| new.repost_item_id,
            json_build_object('parent_track_id', (track_remix_of->'tracks'->0->>'parent_track_id')::int, 'track_id', new.repost_item_id, 'track_owner_id', owner_user_id)
          )
        on conflict do nothing;
      end if;
    end if;

	exception
    when others then
      raise warning 'An error occurred in %: %', tg_name, sqlerrm;
  end;

  return null;

exception
    when others then
      raise warning 'An error occurred in %: %', tg_name, sqlerrm;
      return null;
end;
$$ language plpgsql;


do $$ begin
  create trigger on_repost
  after insert on reposts
  for each row execute procedure handle_repost();
exception
  when others then null;
end $$;