import { MenuResponse } from '../types/menuTypes'; 
import { getMenuByRole } from '../services/menuService'; 

export async function getMenuForUser(userId: number): Promise<MenuResponse> {
  try {
    const menuResponse = await getMenuByRole(userId);

    if (!menuResponse ) {
      throw new Error(`No menu found for user with ID ${userId}`);
    }

    return menuResponse;
  } catch (error) {
    
    console.error(`Error in getMenuForUser for userId ${userId}`);
    throw new Error(`Failed to get menu for user`);
  }
}