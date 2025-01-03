import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import menuService from '@/service/menu.service'; // Import the menu service
import { MenuItemExpand } from '@/types/tree.types';
import { MenuItem } from '@/lib/data';
import { NewMenuItem, SelectedNode, UpdateMenuItem } from '@/types/menu.types';


interface MenuState {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  isEditing: boolean; // Flag to indicate if an item is being edited
  selectedMenuItem: SelectedNode | null; // Data for the selected menu item
  parentMenuItems : MenuItem[];
}

const initialState: MenuState = {
  menuItems: [],
  loading: false,
  error: null,
  isEditing: false,
  selectedMenuItem: null,
  parentMenuItems: [],
};

// Async thunk to fetch all menu items
export const fetchMenuItems = createAsyncThunk('menu/fetchMenuItems', async (_, thunkAPI) => {
  try {
    const response = await menuService.fetchAllMenuItems();
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch menu items');
    }
    return thunkAPI.rejectWithValue('Failed to fetch menu items');
  }
});
// Async thunk to create a new menu item
export const createMenuItem = createAsyncThunk(
  "menu/createMenuItem",
  async (newMenuItem: NewMenuItem, thunkAPI) => {
    try {
      const response = await menuService.createMenuItem(newMenuItem);
      return response.data; // Return the created menu item
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message || "Failed to create menu item");
      }
      return thunkAPI.rejectWithValue("Failed to create menu item");
    }
  });

// Async thunk to update a menu item name
export const updateMenuItem = createAsyncThunk(
  "menu/updateMenuItem",
  async ({id,name}: UpdateMenuItem, thunkAPI) => {
    try {
      const response = await menuService.updateMenuItem(id,name);
      return response.data; // Return the updated menu item
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message || "Failed to update menu item");
      }
      return thunkAPI.rejectWithValue("Failed to update menu item");
    }
  });

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Action to set the clicked menu item and enable edit mode
    setEditingMenuItem: (state, action: PayloadAction<SelectedNode | null>) => {
      state.isEditing = action.payload !== null;
      state.selectedMenuItem = action.payload
    },
    // Action to clear editing state
    clearEditingState: (state) => {
      state.isEditing = false;
      state.selectedMenuItem = null;
    },
    // Action to update a menu item list
    expandMenuItem(state, action: PayloadAction<MenuItemExpand>) {
      const updateRecursive = (items: MenuItem[]): MenuItem[] => {
        return items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, ...action.payload };
          }
          if (item.children && item.children.length > 0) {
            return { ...item, children: updateRecursive(item.children) };
          }
          return item;
        });
      };

      state.menuItems = updateRecursive(state.menuItems);
    },

    toggleExpansion: (state, action: PayloadAction<boolean>) => {
      const updateAllNodes = (nodes: MenuItem[]): MenuItem[] =>  
        nodes?.map((node) => ({
          ...node,
          expand : action.payload,
          children: updateAllNodes(node.children),
        }));
      
      state.menuItems = updateAllNodes(state.menuItems);
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = action.payload;
        state.parentMenuItems = action.payload.filter((item: MenuItem) => item.depth === 0);
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.loading = false;

        const addNode = (nodes: MenuItem[]): MenuItem[] =>
        nodes?.map((node) => {
          if (node.id === action.payload.parentId) {
            return { ...node, children: [...node.children || [], action.payload] };
          }
          return { ...node, children: addNode(node.children || []) };
        });
        state.menuItems = addNode(state.menuItems);
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        state.loading = false;

        const updateNode = (nodes: MenuItem[]): MenuItem[] =>
        nodes?.map((node) => {
          if (node.id === action.payload.id) {
            return { ...node, name: action.payload.name };
          }
          if (node.children && node.children.length > 0) {
            // Recursively search and update children
            return { ...node, children: updateNode(node.children) };
          }
          return node;
        });
        state.menuItems = updateNode(state.menuItems);
      });
  },
});

export const { setEditingMenuItem, clearEditingState, expandMenuItem , toggleExpansion} = menuSlice.actions;
export default menuSlice.reducer;