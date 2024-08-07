"""empty message

Revision ID: b64335768fa7
Revises: 9799b73aa0d7
Create Date: 2024-07-30 04:05:47.687358

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b64335768fa7'
down_revision = '9799b73aa0d7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('frs_db', schema=None) as batch_op:
        batch_op.alter_column('applicant_id',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=100),
               nullable=False)
        batch_op.create_unique_constraint(None, ['applicant_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('frs_db', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('applicant_id',
               existing_type=sa.String(length=100),
               type_=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
