import type { Knex } from 'knex';

const usersTable = 'user_profile';
const emailLowerIndex = 'idx_user_profile_email_lower';
const sessionFunction = 'fn_get_user_session_by_email';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create index if not exists ${emailLowerIndex}
    on ${usersTable}(lower(email));
  `);

  await knex.raw(`
    create or replace function ${sessionFunction}(p_email text)
    returns table (
      user_id        int,
      user_email     text,
      user_username  text,
      user_name      text,
      user_lastname  text,
      password_hash  text,
      permissions    jsonb,
      menu           jsonb
    )
    language sql
    stable
    as $$
      with u as (
        select
          id        as user_id,
          email     as user_email,
          username  as user_username,
          name      as user_name,
          lastname  as user_lastname,
          password  as password_hash
        from ${usersTable}
        where lower(email) = lower(p_email)
        limit 1
      )
      select
        u.user_id,
        u.user_email,
        u.user_username,
        u.user_name,
        u.user_lastname,
        u.password_hash,
        '[]'::jsonb as permissions,
        '[]'::jsonb as menu
      from u;
    $$;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`drop function if exists ${sessionFunction}(text)`);
  await knex.raw(`drop index if exists ${emailLowerIndex}`);
}
