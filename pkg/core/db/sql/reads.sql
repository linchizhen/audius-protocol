-- name: GetTx :one
select * from core_tx_results where lower(tx_hash) = lower($1) limit 1;

-- name: TotalTxResults :one
select count(tx_hash) from core_tx_results;

-- name: GetLatestAppState :one
select block_height, app_hash
from core_app_state
order by block_height desc
limit 1;

-- name: GetAppStateAtHeight :one
select block_height, app_hash
from core_app_state
where block_height = $1
limit 1;

-- name: GetAllRegisteredNodes :many
select *
from core_validators;

-- name: GetNodeByEndpoint :one
select *
from core_validators
where endpoint = $1
limit 1;

-- name: GetRegisteredNodesByType :many
select *
from core_validators
where node_type = $1;

-- name: GetLatestSlaRollup :one
select * from sla_rollups order by time desc limit 1;

-- name: GetRecentRollupsForNode :many
with recent_rollups as (
    select *
    from sla_rollups
    order by time desc
    limit 30
)
select
    rr.id,
    sr.tx_hash,
    sr.block_start,
    sr.block_end,
    sr.time,
    nr.address,
    nr.blocks_proposed
from recent_rollups rr
left join sla_node_reports nr
on rr.id = nr.sla_rollup_id and nr.address = $1
left join sla_rollups sr
on rr.id = sr.id;

-- name: GetSlaRollupWithId :one
select * from sla_rollups where id = $1;

-- name: GetPreviousSlaRollupFromId :one
select * from sla_rollups
where time < (
    select time from sla_rollups sr where sr.id = $1
)
order by time desc
limit 1;

-- name: GetInProgressRollupReports :many
select * from sla_node_reports
where sla_rollup_id is null 
order by address;

-- name: GetRollupReportsForId :many
select * from sla_node_reports
where sla_rollup_id = $1
order by address;

-- name: GetRollupReportForNodeAndId :one
select * from sla_node_reports
where address = $1 and sla_rollup_id = $2;


-- name: GetRegisteredNodeByEthAddress :one
select * from core_validators where eth_address = $1;

-- name: GetRegisteredNodeByCometAddress :one
select * from core_validators where comet_address = $1;

-- name: GetRecentBlocks :many
select * from core_blocks order by created_at desc limit 10;

-- name: GetRecentTxs :many
select * from core_tx_results order by created_at desc limit 10;

-- name: TotalBlocks :one
select count(*) from core_blocks;

-- name: TotalTransactions :one
select count(*) from core_tx_results;

-- name: TotalTransactionsByType :one
select count(*) from core_tx_stats where tx_type = $1;

-- name: TotalValidators :one
select count(*) from core_validators;

-- name: TxsPerHour :many
select date_trunc('hour', created_at)::timestamp as hour, tx_type, count(*) as tx_count
from core_tx_stats 
where created_at >= now() - interval '1 day'
group by hour, tx_type 
order by hour asc;

-- name: GetBlockTransactions :many
select * from core_tx_results where block_id = $1 order by created_at desc;

-- name: GetBlock :one
select * from core_blocks where height = $1;
