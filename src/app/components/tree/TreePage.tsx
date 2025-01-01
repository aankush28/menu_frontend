import React, { useEffect, useState } from "react";

import MenuForm from "./MenuForm";
import TreeNode from "./TreeNode";
import axios from "axios";

interface Node {
  id: string;
  name: string;
  children: Node[];
  expanded?: boolean; // Track individual node expansion state
  depth:number;
  parentName?: string
}

const TreePage = () => {
  const [data, setData] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Function to update node expansion state
  const updateNodeExpansion = (id: string, expanded: boolean) => {
    const updateExpansion = (nodes: Node[]): Node[] =>
      nodes?.map((node) => {
        if (node.id === id) {
          return { ...node, expanded };
        }
        return {
          ...node,
          children: updateExpansion(node.children),
        };
      });

    setData((prevData) => updateExpansion(prevData));
  };

  // Function to toggle expansion for all nodes
  const toggleAllNodes = (expanded: boolean) => {
    const updateAllNodes = (nodes: Node[]): Node[] =>
      nodes?.map((node) => ({
        ...node,
        expanded,
        children: updateAllNodes(node.children),
      }));

    setData((prevData) => updateAllNodes(prevData));
  };

  // Function to add child node
  const addChild = async (parentId: string, newNode: Node, depth: number) => {
    try {
      // Send request to add a new subheading
      const response = await axios.post("api/menu", {
        parentId,
        name: newNode.name,
        depth,
      });

      // Add the newly created node to the tree
      const addedNode = response.data;
      const addNode = (nodes: Node[]): Node[] =>
        nodes?.map((node) => {
          if (node.id === parentId) {
            return { ...node, children: [...node.children, addedNode] };
          }
          return { ...node, children: addNode(node.children) };
        });

      setData((prevData) => addNode(prevData));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error adding child node:", err.message);
      } else {
        console.error("An unknown error occurred while adding child node");
      }
    }
  };
  // Function to handle node click
  const handleNodeClick = (node: Node) => {
    setSelectedNode({
      ...node,
      parentName: node.parentName || "", // Provide default value for parentName
    });
  };

  // Fetch tree data from the API
  const fetchTreeData = async () => {
    try {
      const response = await axios.get("api/menu/tree"); // Local API route
      console.log(response.data); // Debugging
      setData(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching tree data:", err.message);
      } else {
        console.error("An unknown error occurred while fetching tree data");
      }
    } finally {
      console.log("Fetching tree data completed.");
    }
  };
  // Fetch the tree data on initial render
  useEffect(() => {
    fetchTreeData();
  }, []);

  // Callback to refresh tree data after a successful update
  const refreshTreeData = () => {
    fetchTreeData();
  };

  return (
    <>
      {data ? (
        <div className="pt-6">
          <div className="flex items-center mb-4 justify-center md:justify-start">
            <button
              onClick={() => toggleAllNodes(true)}
              className="bg-[#1D2939] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full w-[141px] h-[38px] mr-2 md:py-1 md:px-2 text-[14px]"
            >
              Expand All
            </button>
            <button
              onClick={() => toggleAllNodes(false)}
              className="bg-white hover:bg-gray-100 text-[#475467] border border-[#D0D5DD] font-bold py-2 px-4 rounded-full w-[141px] h-[38px] md:py-0 md:px-0 text-[14px]"
            >
              Collapse All
            </button>
          </div>

          <div className="mt-8">
            {data?.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                updateNodeExpansion={updateNodeExpansion}
                addChild={addChild}
                onNodeClick={handleNodeClick} // Pass the click handler to child nodes
              />
            ))}
          </div>
          {/* Render the form if a node is selected */}
        </div>
      ) : (
       <div>Loading...</div>
      )}
      {selectedNode && (
        <MenuForm
          selectedNode={selectedNode}
          refreshTreeData={refreshTreeData}
        />
      )}
    </>
  );
};

export default TreePage;
