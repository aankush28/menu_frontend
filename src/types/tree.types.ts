export interface Node {
    id: string;
    name: string;
    children: Node[];
    expanded?: boolean; 
    depth:number;
  }

  export interface IParent {
    name: string;
  }

  export interface MenuItemExpand{
    id: string;
    expand: boolean;
  }