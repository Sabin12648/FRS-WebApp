"""Added face_encodings from webapp to database

Revision ID: e4074713cdec
Revises: 2631e5fd8ed9
Create Date: 2024-07-01 12:10:15.303374

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'e4074713cdec'
down_revision = '2631e5fd8ed9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('frs_db', schema=None) as batch_op:
        batch_op.alter_column('face_encoding',
               existing_type=postgresql.JSONB(astext_type=sa.Text()),
               type_=sa.Text(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('frs_db', schema=None) as batch_op:
        batch_op.alter_column('face_encoding',
               existing_type=sa.Text(),
               type_=postgresql.JSONB(astext_type=sa.Text()),
               nullable=True)

    # ### end Alembic commands ###
