import { MENU_ITEM_API, TREE_URL } from "@/constant/constant";

export interface MenuItem {
  id: string;
  name: string;
  parentId: string | null;
  children: MenuItem[];
  expanded: boolean;
}

export const getTreeData = async () => {
  const response = await fetch(MENU_ITEM_API+TREE_URL);
  const data = await response.json();
  return data;
};