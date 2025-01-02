export interface Node {
    id: string;
    name: string;
    children: Node[];
    expanded?: boolean; 
    depth:number;
    parentName?: string
  }