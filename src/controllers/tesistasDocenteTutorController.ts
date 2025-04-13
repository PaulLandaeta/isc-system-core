import { Request, Response } from 'express';
import { getThesisStudentsService } from '../services/professorService';

export const getThesisStudentsController = async (req: Request, res: Response) => {
  try {
    const { supervisorId } = req.params;
    const { type, sortBy = 'date', order = 'desc' } = req.query;

    const validSortBy = ['date', 'status'];
    const validOrder = ['asc', 'desc'];

    if (sortBy && !validSortBy.includes(sortBy as string)) {
      return res.status(400).json({ error: 'Parámetro "sortBy" inválido' });
    }

    if (order && !validOrder.includes(order as string)) {
      return res.status(400).json({ error: 'Parámetro "order" inválido' });
    }

    const filters = {
      type: type as string | undefined,
      sortBy: sortBy as 'date' | 'status',
      order: order as 'asc' | 'desc',
    };

    const result = await getThesisStudentsService(supervisorId, filters);

    return res.json(result);
  } catch (error) {
    console.error('Error en getThesisStudentsController:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
