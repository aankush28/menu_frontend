
import {  RootState } from "@/redux/store";
import React from "react";
import { SlArrowDown } from "react-icons/sl";
import {  useSelector } from "react-redux";

const MenuDropDown = () => {

    const { parentMenuItems } = useSelector(
        (state: RootState) => state.menu
    );

    return parentMenuItems.length ? <> <div className="text-sm md:text-base mx-2 mt-4 md:mt-6 text-gray-400">
        Menu
    </div>
        <div className="inline-block relative w-full md:w-[349px] mt-4">
            <select className="block w-full appearance-none bg-[#F9FAFB] px-4 py-3 md:px-5 md:py-4 pr-10 rounded-[16px] text-[#475467] leading-tight focus:outline-none shadow-sm border-none">
                {parentMenuItems
                    .filter((value: { depth: number }) => value.depth === 0)
                    .map((item: { id: string | number; name: string }) => (
                        <option key={item.id} value={item.name}>
                            {item.name}
                        </option>
                    ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 md:px-4">
                <SlArrowDown className="text-[#475467]" />
            </div>
        </div> </> : null

}
export default MenuDropDown;
