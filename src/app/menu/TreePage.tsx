import React, { useEffect } from "react";
import TreeNode from "./TreeNode";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchMenuItems,
  expandMenuItem,
  toggleExpansion,
  setEditingMenuItem,
  createMenuItem,
} from "@/redux/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { NewMenuItem, SelectedNode } from "@/types/menu.types";
import { FindParentNode } from "@/utility";

const TreePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { menuItems } = useSelector((state: RootState) => state.menu);

  const [activeNode, setActiveNode] = React.useState(true);

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  // Function to update node expansion state
  const updateNodeExpansion = (id: string, expand: boolean) => {
    dispatch(expandMenuItem({ id, expand }));
  };

  // Function to toggle expansion for all nodes
  const toggleAllNodes = (expand: boolean) => {
    dispatch(toggleExpansion(expand));
    setActiveNode(expand);
  };

  // Function to add child node
  const addChild = async (newMenuItem : NewMenuItem) => {
    dispatch(createMenuItem(newMenuItem));
  };

  // Function to handle node click
  const handleNodeClick = (node: SelectedNode) => {
    const parentNode = FindParentNode(node.parentId, menuItems);
    dispatch(
      setEditingMenuItem({
        ...node,
        parentName: parentNode?.name,
      })
    );
  };


  return (
    <>
      {menuItems.length ? (
        <div className="pt-6">
          <div className="flex items-center mb-4 justify-center md:justify-start">
            <button
              onClick={() => toggleAllNodes(true)}
              className={`font-bold py-2 px-4 rounded-full w-[141px] h-[38px] mr-2 md:py-1 md:px-2 text-[14px] ${
                activeNode
                  ? "bg-[#1D2939] text-white"
                  : "bg-white text-[#1D2939] border border-[#D0D5DD]"
              }`}
            >
              Expand All
            </button>
            <button
              onClick={() => toggleAllNodes(false)}
              className={`font-bold py-2 px-4 rounded-full w-[141px] h-[38px] md:py-0 md:px-0 text-[14px] ${
                !activeNode
                  ? "bg-[#1D2939] text-white"
                  : "bg-white text-[#1D2939] border border-[#D0D5DD]"
              }`}
            >
              Collapse All
            </button>
          </div>

          <div className="mt-8">
            {menuItems?.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                updateNodeExpansion={updateNodeExpansion}
                addChild={addChild}
                onNodeClick={handleNodeClick}
              />
            ))}
          </div>
         
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default TreePage;
