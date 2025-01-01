"use client"
import React, { useEffect, useState, useRef } from "react";
import { FaPlus, FaChevronDown, FaChevronRight, FaCheck } from "react-icons/fa";
interface Node {
  id: string;
  name: string;
  children: Node[];
  expanded?: boolean; // Track individual node expansion state
  depth:number;
}

const TreeNode: React.FC<{
  node: Node;
  updateNodeExpansion: (id: string, expanded: boolean) => void;
  addChild: (parentId: string, newNode: Node, depth:number) => void;
  onNodeClick: (node: Node) => void;
}> = ({ node, updateNodeExpansion, addChild, onNodeClick }) => {
  const [newChildName, setNewChildName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    updateNodeExpansion(node.id, !node.expanded);
  };

  const handleAddChild = () => {
    if (newChildName.trim() === "") return;
    const newNode: Node = {
      id: Date.now().toString(),
      name: newChildName,
      children: [],
      depth: 0
    };
    addChild(node.id, newNode, node.depth);
    setNewChildName("");
    setShowInput(false);
  };

  // Handle clicks outside the input field
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Element)
      ) {
        if (newChildName.trim() === "") {
          setShowInput(false); // Close input if no value
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newChildName]);

  return (
    <div className="pl-4 border-l border-gray-300">
      <div
        className="flex items-center py-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {node?.children?.length > 0 && (
          <button onClick={toggleExpand}>
            {node.expanded ? (
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
            value={newChildName}
            onChange={(e) => setNewChildName(e.target.value)}
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
      {node.expanded && (
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
