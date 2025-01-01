import React from "react";
import TreePage from "./tree/TreePage";
function Mainbody() {
  return (
    <div className="flex flex-col md:flex-row jsutify-space-between p-10">
       <TreePage/>
    </div>
  );
}

export default Mainbody;
