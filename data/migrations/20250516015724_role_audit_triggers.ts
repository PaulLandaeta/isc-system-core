import { Knex } from 'knex';

const rolesTable = 'roles';
const auditTable = 'role_audit';
const auditFunction = 'fn_audit_role_changes';
const insertTrigger = 'trg_roles_after_insert';
const updateTrigger = 'trg_roles_after_update';
const deleteTrigger = 'trg_roles_after_delete';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable(auditTable);
  if (!exists) {
    await knex.schema.createTable(auditTable, t => {
      t.increments('id').primary();
      t.integer('role_id').notNullable();
      t.string('name').notNullable();
      t.string('category').notNullable();
      t.boolean('disabled').notNullable();
      t.string('changed_by').notNullable();
      t.timestamp('changed_at').notNullable().defaultTo(knex.fn.now());
    });
  }

  await knex.raw(`
    CREATE OR REPLACE FUNCTION ${auditFunction}() RETURNS trigger AS $$
    DECLARE
      who text;
    BEGIN
      who := current_setting('audit.user', true);
      IF who IS NULL THEN
        who := current_user;
      END IF;

      IF TG_OP = 'INSERT' THEN
        INSERT INTO ${auditTable}(role_id, name, category, disabled, changed_by, changed_at)
        VALUES (NEW.id, NEW.name, NEW.category, NEW.disabled, who, now());
        RETURN NEW;
      ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO ${auditTable}(role_id, name, category, disabled, changed_by, changed_at)
        VALUES (NEW.id, NEW.name, NEW.category, NEW.disabled, who, now());
        RETURN NEW;
      ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO ${auditTable}(role_id, name, category, disabled, changed_by, changed_at)
        VALUES (OLD.id, OLD.name, OLD.category, OLD.disabled, who, now());
        RETURN OLD;
      END IF;
    END;
    $$ LANGUAGE plpgsql;
  `);

  await knex.raw(`
    CREATE TRIGGER ${insertTrigger}
    AFTER INSERT ON ${rolesTable}
    FOR EACH ROW EXECUTE FUNCTION ${auditFunction}();
  `);

  await knex.raw(`
    CREATE TRIGGER ${updateTrigger}
    AFTER UPDATE ON ${rolesTable}
    FOR EACH ROW EXECUTE FUNCTION ${auditFunction}();
  `);

  await knex.raw(`
    CREATE TRIGGER ${deleteTrigger}
    AFTER DELETE ON ${rolesTable}
    FOR EACH ROW EXECUTE FUNCTION ${auditFunction}();
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TRIGGER IF EXISTS ${insertTrigger} ON ${rolesTable}`);
  await knex.raw(`DROP TRIGGER IF EXISTS ${updateTrigger} ON ${rolesTable}`);
  await knex.raw(`DROP TRIGGER IF EXISTS ${deleteTrigger} ON ${rolesTable}`);
  await knex.raw(`DROP FUNCTION IF EXISTS ${auditFunction}()`);
}
