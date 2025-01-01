import React from "react";
import Breadcrumb from "../common/Breadcrumb";
import Image from "next/image";
import subimage from "../../../../public/submenu.png";
import { FaFolder } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
export const Heading = () => {
  return (
    <div className="p-4 md:p-10">
      {/* Breadcrumb Section */}
      <Breadcrumb icon={<FaFolder />} name="Menus" link="/" />
      
      {/* Heading Section */}
      <div className="flex flex-col md:flex-row items-center pt-6 md:pt-10">
        <div className="border-[8px] md:border-[10px] border-[#253BFF] bg-[#253BFF] rounded-full h-[42px] w-[42px] md:h-[52px] md:w-[52px] flex items-center justify-center">
          <Image src={subimage} alt="Sidebar Logo" />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mt-2 md:mt-0 md:ml-3 text-center md:text-left">Menus</h1>
      </div>

      {/* Description Text */}
      <div className="text-sm md:text-base mx-2 mt-4 md:mt-6 text-gray-400">
        Menu
      </div>

      {/* Dropdown Section */}
      <div className="inline-block relative w-full md:w-[349px] mt-4">
        <select className="block w-full appearance-none bg-[#F9FAFB] px-4 py-3 md:px-5 md:py-4 pr-10 rounded-[16px] text-[#475467] leading-tight focus:outline-none shadow-sm border-none">
          <option>System Management</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 md:px-4">
          <SlArrowDown className="text-[#475467]" />
        </div>
      </div>
    </div>
  );
};

