from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '611b3cd70d60'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    with op.batch_alter_table('frs_db') as batch_op:
        # Use USING clause to convert the column type from bytea to jsonb
        batch_op.alter_column(
            'face_encoding',
            existing_type=sa.BYTEA(),
            type_=sa.JSONB(),
            postgresql_using='face_encoding::jsonb'
        )

def downgrade():
    with op.batch_alter_table('frs_db') as batch_op:
        # Revert the column type back to bytea (if needed)
        batch_op.alter_column(
            'face_encoding',
            existing_type=sa.JSONB(),
            type_=sa.BYTEA(),
            postgresql_using='face_encoding::bytea'
        )
