import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateMenuItem } from "@/redux/menuSlice";
import { UpdateMenuItem } from "@/types/menu.types";


// Define the type for form data

const EditMenuItemForm = () => {
  
  const dispatch = useDispatch<AppDispatch>();

  
  const { selectedMenuItem } = useSelector(
    (state: RootState) => state.menu
  );

  const [menuItemName, setMenuItemName] = useState<string>('')
  const [isDirty, setIsDirty] = useState(false); // Track if form has changes


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuItemName(e.target.value)
    setIsDirty(e.target.value !== selectedMenuItem?.name)
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedMenuItem : UpdateMenuItem = {
      id: selectedMenuItem?.id || '',
      name : menuItemName
    }
    dispatch(updateMenuItem(updatedMenuItem))
  };

  useEffect(() => {
    setMenuItemName(selectedMenuItem?.name || "");
    setIsDirty(false); // Reset dirty flag when new data is fetched
  }, [selectedMenuItem]);

  return selectedMenuItem ? <form onSubmit={handleSubmit} className="max-w-sm mx-auto pt-6 bg-white">
    {/* Menu ID */}
    <div className="mb-4">
      <label className="block text-[#475467] mb-2">Menu ID</label>
      <input
        type="text"
        name="menuId"
        value={selectedMenuItem.id}
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
        value={selectedMenuItem.depth}
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
        value={selectedMenuItem.parentName || "No Parent"}
        readOnly
        className="w-full p-3 border-none outline-none bg-[#F9FAFB] rounded-[16px]"
      />
    </div>

    {/* Name */}
    <div className="mb-6">
      <label className="block text-[#475467] mb-2 ">Name</label>
      <input
        type="text"
        name="name"
        value={menuItemName}
        onChange={handleChange}
        className="w-full p-3 border-none outline-[#475467] bg-[#F9FAFB] rounded-[16px] "
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="p-3 bg-[#253BFF] text-white hover:bg-blue-700 rounded-[26px] h-[51px] w-[263px] font-bold"
      disabled = {!isDirty}
    >
      Save
    </button>
  </form> : null;
};
export default EditMenuItemForm;
