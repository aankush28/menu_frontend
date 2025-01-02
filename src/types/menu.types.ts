export interface FormData {
    id: string;
    depth: number;
    name: string;
    parentName?: string;
  }
export interface MenuFormProps {
    selectedNode: FormData | never;
    refreshTreeData: () => void;
  }