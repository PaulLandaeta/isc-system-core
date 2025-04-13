export interface MenuItem {
    name: string;
    path: string;
    menu_order: number;
  }
  
  export interface MenuResponse {
    role: string;
    menu: MenuItem[]; // TODO
  }