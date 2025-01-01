import { getTreeData } from "@/lib/data";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  
}

export const GET = async (req: Request,res: Response) => {
  const treeData = await getTreeData();
  return NextResponse.json(treeData);
}

export const PUT = async (req: Request) => {
}

export const DELETE = async (req: Request) => {
}