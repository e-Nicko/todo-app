"""Add createdAt to Item

Revision ID: b7619a635cb8
Revises: None
Create Date: 2023-05-21 12:34:56.789012

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import func

# revision identifiers, used by Alembic.
revision = 'b7619a635cb8'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.add_column('items', sa.Column('createdAt', sa.DateTime(), server_default=func.now(), nullable=True))

def downgrade():
    op.drop_column('items', 'createdAt')