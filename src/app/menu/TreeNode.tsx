"use client";
import { MenuItem } from "@/lib/data";
import { NewMenuItem } from "@/types/menu.types";
import React, { useEffect, useState, useRef } from "react";
import { FaPlus, FaChevronDown, FaChevronRight, FaCheck } from "react-icons/fa";

const TreeNode: React.FC<{
  node: MenuItem;
  updateNodeExpansion: (id: string, expanded: boolean) => void;
  addChild: (newMenuItem : NewMenuItem) => void;
  onNodeClick: (node: MenuItem) => void;
}> = ({ node, updateNodeExpansion, addChild, onNodeClick }) => {
  const [newNode, setNewNode] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    updateNodeExpansion(node.id, !node.expand);
  };

  const handleAddChild = () => {
    if (newNode.trim() === "") return;
    addChild({
      name: newNode,
      depth : node.depth + 1,
      parentId: node.id,
    });
    setNewNode("");
    setShowInput(false);
  };

  // Handle clicks outside the input field
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Element)
      ) {
        if (newNode.trim() === "") {
          setShowInput(false); // Close input if no value
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newNode]);

  return (
    <div className="pl-4 border-l border-gray-300">
      <div
        className="flex items-center py-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {node?.children?.length > 0 && (
          <button onClick={toggleExpand}>
            {node.expand ? (
              <FaChevronDown size={12} />
            ) : (
              <FaChevronRight size={12} />
            )}
          </button>
        )}
        <span
          className="ml-2 text-sm cursor-pointer text-[14px]"
          onClick={() => onNodeClick(node)}
        >
          {node.name}
        </span>
        {isHovered && !showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="ml-2 text-blue-500 hover:text-blue-700"
          >
            <FaPlus size={12} />
          </button>
        )}
      </div>
      {showInput && (
        <div ref={inputRef} className="pl-6 flex items-center">
          <input
            type="text"
            value={newNode}
            onChange={(e) => setNewNode(e.target.value)}
            placeholder="Add new heading..."
            className="text-sm bg-transparent outline-none text-[14px]"
            autoFocus
          />
          <button
            onClick={handleAddChild}
            className="ml-2 text-green-500 hover:text-green-700"
          >
            <FaCheck size={12} />
          </button>
        </div>
      )}
      {node.expand && (
        <div className="pl-4">
          {node?.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              updateNodeExpansion={updateNodeExpansion}
              addChild={addChild}
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default TreeNode;
