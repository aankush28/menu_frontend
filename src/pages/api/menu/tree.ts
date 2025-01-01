import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { MENU_ITEM_API } from '@/constant/constant';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${MENU_ITEM_API}/tree`);
      res.status(200).json(response.data);
    } catch (error: any) {
      console.error('Error fetching tree:', error.message);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
