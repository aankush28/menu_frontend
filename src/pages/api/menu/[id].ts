import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { MENU_ITEM_API } from '@/constant/constant';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      // Get a single menu item by ID
      const response = await axios.get(`${MENU_ITEM_API}/${id}`);
      res.status(200).json(response.data);
    } else if (req.method === 'PUT') {
      // Update a menu item by ID
      const response = await axios.put(`${MENU_ITEM_API}/${id}`, req.body);
      res.status(200).json(response.data);
    } else if (req.method === 'DELETE') {
      // Delete a menu item by ID
      const response = await axios.delete(`${MENU_ITEM_API}/${id}`);
      res.status(200).json(response.data);
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}