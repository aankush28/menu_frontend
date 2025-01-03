
export interface NewMenuItem {
    name: string;
    depth: number;
    parentId?: string;
  }

export interface UpdateMenuItem{
  id : string;
  name : string
}

export interface SelectedNode {
    id: string;
    name: string;
    depth: number;
    parentId: string;
    parentName?: string;
  }

export interface MenuFormProps {
    selectedNode: FormData | never;
    refreshTreeData: () => void;
  }