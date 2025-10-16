import { MenuItem } from '../types/menuTypes';

interface RolePermissionsResponse {
  [name: string]: {
    id: number;
    disabled: boolean;
    permissions: {
      page: MenuItem[];
      actions: string[];
    };
  };
}

export default RolePermissionsResponse;