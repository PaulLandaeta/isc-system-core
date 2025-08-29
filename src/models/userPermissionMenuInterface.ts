export interface UserPermissionsAndMenu {
  permissions: Permission[];
  menu: MenuItem[];
}

interface Permission {
  permission: string;
  description: string;
}

interface MenuItem {
  permission: string;
  description: string;
  menu_order: number;
}
