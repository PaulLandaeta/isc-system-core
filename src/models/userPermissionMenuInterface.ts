interface UserPermissionsAndMenu {
  permissions: Permission[];
  menu: MenuItem[];
}

interface Permission {
  permission_id: number;
  description: string;
  action_name: string;
  category_name: string;
}

interface MenuItem {
  permission_id: number;
  description: string;
  action_name: string;
  category_name: string;
  menu_order: number;
}
