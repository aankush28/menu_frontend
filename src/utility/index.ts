import { MenuItem } from "@/lib/data";

export const FindParentNode = (parentId: string, menuItems: MenuItem[]): MenuItem | null => {
    for (const item of menuItems) {
      if (item.id === parentId) {
        return item;
      }
      if (item.children) {
        const parentNode = FindParentNode(parentId, item.children);
        if (parentNode) {
          return parentNode;
        }
      }
    }
    return null;
  };