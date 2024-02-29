from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    text,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship, validates

from src.model_validator import ModelValidator
from src.models.base import Base
from src.models.model_utils import RepresentableMixin, validate_field_helper
from src.models.playlists.playlist_route import PlaylistRoute
from src.models.users.user import User


class Playlist(Base, RepresentableMixin):
    __tablename__ = "playlists"

    blockhash = Column(Text, nullable=False)
    blocknumber = Column(
        Integer, ForeignKey("blocks.number"), index=True, nullable=False
    )
    playlist_id = Column(Integer, primary_key=True, nullable=False)
    playlist_owner_id = Column(Integer, nullable=False, index=True)
    is_album = Column(Boolean, nullable=False)
    is_private = Column(Boolean, nullable=False)
    playlist_name = Column(String)
    playlist_contents = Column(JSONB(), nullable=False)
    playlist_image_multihash = Column(String)
    is_current = Column(Boolean, primary_key=True, nullable=False)
    is_delete = Column(Boolean, nullable=False)
    is_stream_gated = Column(Boolean, nullable=False, server_default=text("false"))
    stream_conditions = Column(JSONB(True))
    description = Column(String)
    created_at = Column(DateTime, nullable=False, index=True)
    upc = Column(String)
    updated_at = Column(DateTime, nullable=False)
    playlist_image_sizes_multihash = Column(String)
    ddex_app = Column(String)
    is_image_autogenerated = Column(
        Boolean, nullable=False, server_default=text("false")
    )
    txhash = Column(
        String,
        primary_key=True,
        nullable=False,
        server_default=text("''::character varying"),
    )
    last_added_to = Column(DateTime)
    slot = Column(Integer)
    metadata_multihash = Column(String)

    block1 = relationship(  # type: ignore
        "Block", primaryjoin="Playlist.blocknumber == Block.number"
    )

    _routes = relationship(  # type: ignore
        PlaylistRoute,
        primaryjoin="and_(\
            remote(Playlist.playlist_id) == foreign(PlaylistRoute.playlist_id),\
            PlaylistRoute.is_current)",
        lazy="joined",
        viewonly=True,
    )

    user = relationship(  # type: ignore
        User,
        primaryjoin="and_(\
            remote(Playlist.playlist_owner_id) == foreign(User.user_id),\
            User.is_current)",
        lazy="joined",
        viewonly=True,
    )

    ModelValidator.init_model_schemas("Playlist")
    fields = ["playlist_name", "description"]

    @property
    def _slug(self):
        return self._routes[0].slug if self._routes else ""

    @property
    def permalink(self):
        if self.user and self.user[0].handle and self._slug:
            collection_type = "album" if self.is_album else "playlist"
            return f"/{self.user[0].handle}/{collection_type}/{self._slug}"
        return ""

    # unpacking args into @validates
    @validates(*fields)
    def validate_field(self, field, value):
        return validate_field_helper(
            field, value, "Playlist", getattr(Playlist, field).type
        )

    def get_attributes_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}
