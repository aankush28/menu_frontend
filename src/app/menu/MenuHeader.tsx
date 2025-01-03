import React from "react";
import Breadcrumb from "./Breadcrumb";
import Image from "next/image";
import { FaFolder } from "react-icons/fa";

const MenuHeader = () => {


  return (
    <div>
      {/* Breadcrumb Section */}
      <Breadcrumb icon={<FaFolder />} name="Menus" link="/" />

      {/* Heading Section */}
      <div className="flex flex-col md:flex-row items-center pt-6 md:pt-10">
        <div className="border-[8px] md:border-[10px] border-[#253BFF] bg-[#253BFF] rounded-full h-[42px] w-[42px] md:h-[52px] md:w-[52px] flex items-center justify-center">
          <Image
            src="/image/submenu.png"
            alt="Sidebar Logo"
            width={50}
            height={50}
          />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mt-2 md:mt-0 md:ml-3 text-center md:text-left">
          Menus
        </h1>
      </div>
    </div>
  );
};

export default MenuHeader;