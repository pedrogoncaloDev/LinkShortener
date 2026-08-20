"""create links table

Revision ID: 1f8275621d44
Revises: 
Create Date: 2026-08-20 17:22:08.826175

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1f8275621d44'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "links",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("url_original", sa.Text, nullable=False),
        sa.Column("codigo_encurtado", sa.String(20), nullable=False, unique=True),
        sa.Column("data_criacao", sa.TIMESTAMP),
        sa.Column("data_expiracao", sa.TIMESTAMP),
        sa.Column("total_acessos", sa.Integer, server_default="0"),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table("links")
