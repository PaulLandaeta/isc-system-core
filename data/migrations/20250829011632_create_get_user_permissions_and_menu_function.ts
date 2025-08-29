import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE OR REPLACE FUNCTION get_user_permissions_and_menu(p_user_id integer)
    RETURNS jsonb AS $$
    DECLARE
      result jsonb;
    BEGIN
      WITH user_perms AS (
        SELECT DISTINCT
          p.description,
          a.name AS action_name,
          pc.display_name AS category_name,
          rp.menu_order
        FROM user_roles ur
        JOIN role_permissions rp ON ur.role_id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        JOIN action a ON p.action_id = a.id
        JOIN permission_categories pc ON p.pc_id = pc.id
        WHERE ur.user_id = p_user_id
      ),
      perms AS (
        SELECT jsonb_agg(
          jsonb_build_object(
            'description', description,
            'permission', action_name || ':' || category_name
          )
        ) AS permissions
        FROM user_perms
        WHERE action_name NOT IN ('menu', 'profile')
      ),
      menu AS (
        SELECT jsonb_agg(
          jsonb_build_object(
            'description', description,
            'permission', action_name || ':' || category_name,
            'menu_order', menu_order
          )
        ) AS menu
        FROM user_perms
        WHERE action_name IN ('menu', 'profile')
      )
      SELECT jsonb_build_object(
        'permissions', COALESCE(perms.permissions, '[]'::jsonb),
        'menu', COALESCE(menu.menu, '[]'::jsonb)
      )
      INTO result
      FROM perms, menu;

      RETURN result;
    END;
    $$ LANGUAGE plpgsql;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP FUNCTION IF EXISTS get_user_permissions_and_menu(integer);`);
}
