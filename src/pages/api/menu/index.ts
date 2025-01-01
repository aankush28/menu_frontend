import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { MENU_ITEM_API } from '@/constant/constant';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch all menu items
      const response = await axios.get(`${MENU_ITEM_API}`);
      res.status(200).json(response.data);
    } else if (req.method === 'POST') {
      // Create a new menu item
      const { name, depth, parentId } = req.body;
      const response = await axios.post(`${MENU_ITEM_API}`, { name, depth, parentId });
      res.status(201).json(response.data);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
