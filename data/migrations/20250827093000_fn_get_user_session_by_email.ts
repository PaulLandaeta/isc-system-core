import type { Knex } from 'knex';

const usersTable = 'user_profile';
const emailLowerIndex = 'idx_user_profile_email_lower';
const sessionFunction = 'fn_get_user_session_by_email';

export async function up(knex: Knex): Promise<void> {
  // Índice para búsqueda case-insensitive por email
  await knex.raw(`
    create index if not exists ${emailLowerIndex}
    on ${usersTable}(lower(email));
  `);

  // Función para obtener datos de sesión por email
  await knex.raw(`
    create or replace function ${sessionFunction}(p_email text)
    returns table (
      "user" jsonb,
      password_hash text,
      permissions jsonb,
      menu jsonb
    )
    language sql
    stable
    as $$
      with u as (
        select
          id,
          email,
          role_id,
          password
        from ${usersTable}
        where lower(email) = lower(p_email)
        limit 1
      )
      select
        -- Exponemos un objeto user sin la contraseña
        (to_jsonb(u) - 'password') as "user",
        -- Mapeamos password -> password_hash para el backend (bcrypt)
        u.password as password_hash,
        -- Por ahora, permisos y menú vacíos hasta integrar la FN real
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
