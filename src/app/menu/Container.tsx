import React from "react";
import TreePage from "./TreePage";
import MenuHeader from "./MenuHeader";
import MenuDropDown from "./components/MenuDropDown";
import EditMenuItemForm from "./EditMenuItemForm";

const Container = () => {
  return (
    <>
      <div>
        <MenuHeader />
        <MenuDropDown />
      </div>
      <div className="flex flex-col md:flex-row jsutify-space-between">
        <TreePage />
        <EditMenuItemForm />
      </div>
    </>

  );
}

export default Container;
