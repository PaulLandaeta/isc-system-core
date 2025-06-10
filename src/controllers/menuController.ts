import { Request, Response } from 'express';

import { getMenuByRole } from '../services/menuService';

export const getMenu = async (req: Request, res: Response) => {
  //const userId =  parseInt(req.params.id);
  try {
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const menuData = await getMenuByRole(userId);
    res.json(menuData);
  } catch (error) {
    console.error('Error in getMenu:', error);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
};
