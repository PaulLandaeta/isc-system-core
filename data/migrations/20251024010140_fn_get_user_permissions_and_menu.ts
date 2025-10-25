import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE OR REPLACE FUNCTION get_user_permissions_and_menu(p_user_id integer)
    RETURNS jsonb
    LANGUAGE plpgsql
    AS $$
    DECLARE
      result jsonb;
    BEGIN
      WITH user_perms AS (
        SELECT DISTINCT
          p.id                AS permission_id,
          p.description       AS description,
          p.type              AS action_name,         -- 'action', 'page', etc.
          p.name              AS permission_name,     -- clave del permiso
          pc.name             AS category_name,
          rp.menu_order       AS menu_order
        FROM user_roles ur
        JOIN role_permissions rp  ON rp.role_id = ur.role_id
        JOIN permissions p        ON p.id = rp.permission_id
        LEFT JOIN permission_categories pc ON pc.id = p.category_id
        WHERE ur.user_id = p_user_id
      ),
      perms AS (
        SELECT jsonb_agg(
          jsonb_build_object(
            'description', description,
            'permission',  action_name || ':' || permission_name
          )
          ORDER BY permission_name, description
        ) AS permissions
        FROM user_perms
        WHERE action_name NOT IN ('menu', 'page', 'profile')
      ),
      menu_grouped AS (
        SELECT
          COALESCE(category_name, '') AS category_name,
          jsonb_agg(
            jsonb_build_object(
              'description', description,
              'permission',  action_name || ':' || permission_name,
              'menu_order',  menu_order
            )
            ORDER BY menu_order NULLS LAST, permission_name, description
          ) AS items
        FROM user_perms
        WHERE action_name IN ('menu', 'page')
        GROUP BY COALESCE(category_name, '')
      ),
      menu AS (
        SELECT jsonb_agg(
          jsonb_build_object(
            'category', category_name,
            'items',    items
          )
          ORDER BY category_name
        ) AS menu
        FROM menu_grouped
      )
      SELECT jsonb_build_object(
        'permissions', COALESCE(perms.permissions, '[]'::jsonb),
        'menu',        COALESCE(menu.menu,        '[]'::jsonb)
      )
      INTO result
      FROM perms, menu;

      RETURN result;
    END;
    $$;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP FUNCTION IF EXISTS get_user_permissions_and_menu(integer);');
}
