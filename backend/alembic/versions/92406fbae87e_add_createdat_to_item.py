"""Add createdAt to Item

Revision ID: 92406fbae87e
Revises: 518cd8afc8f4
Create Date: 2024-05-21 19:30:04.784564

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import func

# revision identifiers, used by Alembic.
revision = '92406fbae87e'
down_revision = '518cd8afc8f4'
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.add_column('tasks', sa.Column('createdAt', sa.DateTime(), server_default=func.now(), nullable=True))

def downgrade() -> None:
    op.drop_column('tasks', 'createdAt')
