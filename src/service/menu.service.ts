import { TREE_URL } from '@/constant/constant';
import apiService from './api.service'; // Import the generic API service
import { NewMenuItem } from '@/types/menu.types';

const MENU_ENDPOINT = '/menu'; // Base endpoint for menu items

const menuService = {
  // Fetch all menu items
  fetchAllMenuItems: async () => {
    return await apiService.fetchAll(MENU_ENDPOINT+TREE_URL);
  },

  // Fetch a single menu item by ID
  fetchMenuItemById: async (id: string) => {
    return await apiService.fetchById(MENU_ENDPOINT, id);
  },

  // Create a new menu item
  createMenuItem: async (newMenuItem: NewMenuItem) => {
    return await apiService.create(MENU_ENDPOINT, newMenuItem);
  },

  // Update an existing menu item
  updateMenuItem: async (id: string, name: string) => {
    return await apiService.update(MENU_ENDPOINT, id, {name});
  },

  // Delete a menu item by ID
  deleteMenuItem: async (id: string) => {
    return await apiService.delete(MENU_ENDPOINT, id);
  },
};

export default menuService;
