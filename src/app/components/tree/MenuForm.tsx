import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

// Define the type for form data
interface FormData {
  id: string;
  depth: number;
  name: string;
  parentName?: string;
}

interface MenuFormProps {
  selectedNode: FormData | never;
  refreshTreeData: () => void;
}

const MenuForm: React.FC<MenuFormProps> = ({
  selectedNode,
  refreshTreeData,
}) => {
  const [formData, setFormData] = useState<FormData>({
    id: selectedNode.id,
    depth: selectedNode.depth,
    parentName: selectedNode.parentName,
    name: selectedNode.name,
  });

  useEffect(() => {
    setFormData({
      id: selectedNode.id,
      depth: selectedNode.depth,
      parentName: selectedNode.parentName,
      name: selectedNode.name,
    });
  }, [selectedNode]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    try {
      // Send PATCH request to update menu item data
      const response = await axios.patch(`api/menu/${formData.id}`, {
        name: formData.name,
        parentName: formData.parentName,
      });
      alert("Update Successful");
      refreshTreeData();
      console.log("Update Successful:", response.data);
    } catch (error) {
      console.error("Error updating menu item:", error);
      alert("Update Failed"+error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto pt-6 bg-white">
      {/* Menu ID */}
      <div className="mb-4">
        <label className="block text-[#475467] mb-2">Menu ID</label>
        <input
          type="text"
          name="menuId"
          value={formData.id}
          readOnly
          className="w-full md:w-[532px] p-3 border-none outline-none rounded-[16px] bg-gray-100"
        />
      </div>

      {/* Depth */}
      <div className="mb-4">
        <label className="block text-[#475467] mb-2">Depth</label>
        <input
          type="text"
          name="depth"
          value={formData.depth}
          readOnly
          className="w-full p-3 border-none outline-none rounded-[16px] bg-gray-100"
        />
      </div>

      {/* Parent Data */}
      <div className="mb-4">
        <label className="block text-[#475467] mb-2">Parent Data</label>
        <input
          type="text"
          name="parentData"
          value={formData.parentName}
          readOnly
          className="w-full p-3 border-none outline-[#475467] bg-[#F9FAFB] rounded-[16px]"
        />
      </div>

      {/* Name */}
      <div className="mb-6">
        <label className="block text-[#475467] mb-2 ">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border-none outline-[#475467] bg-[#F9FAFB] rounded-[16px] "
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="p-3 bg-[#253BFF] text-white hover:bg-blue-700 rounded-[26px] h-[51px] w-[263px] font-bold"
      >
        Save
      </button>
    </form>
  );
};
export default MenuForm;
