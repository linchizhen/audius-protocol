"""22823_track_cids

Revision ID: abf8419b2dd5
Revises: 198d03c95cac
Create Date: 2023-03-01 01:14:10.697777

"""
import os
from pathlib import Path

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.types import String

# revision identifiers, used by Alembic.
revision = "abf8419b2dd5"
down_revision = "198d03c95cac"
branch_labels = None
depends_on = None


def build_sql():
    path = Path(__file__).parent.joinpath("../csvs/missing_track_cid_22823.csv")

    with open(path, "r") as f:
        track_ids = []
        track_cids = []
        for entry in f:
            track_id, track_cid = entry.split(",")

            track_ids.append(track_id)
            track_cids.append(track_cid)

    params = {
        "track_ids": track_ids,
        "track_cids": track_cids,
    }

    inner_sql = """UPDATE tracks
    SET track_cid = data_table.track_cid
    FROM (SELECT unnest(:track_ids) AS track_id, unnest(:track_cids) AS track_cid) AS data_table
    WHERE tracks.is_current = True AND tracks.track_id = data_table.track_id::int;"""

    sql = sa.text("begin; \n\n " + inner_sql + " \n\n commit;")
    sql = sql.bindparams(sa.bindparam("track_ids", ARRAY(String)))
    sql = sql.bindparams(sa.bindparam("track_cids", ARRAY(String)))

    return (sql, params)


def upgrade():
    env = os.getenv("audius_discprov_env")
    if env == "prod":
        connection = op.get_bind()
        sql, params = build_sql()
        connection.execute(sql, params)


def downgrade():
    pass
