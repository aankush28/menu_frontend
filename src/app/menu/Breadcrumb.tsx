import Link from "next/link";
import React from "react";

const Breadcrumb = ({ icon, name, link }: { icon: React.ReactNode; name: string; link: string }) => {
  return (
    <div>
      {" "}
      <div className="text-gray-600 flex items-center gap-2">
        <ol className="list-reset flex items-center">
          <li>
            <Link href={link} className="text-gray-400 py-2">
              {icon}
            </Link>
          </li>
          <li>
            <span className="mx-2 py-2 my-2 text-gray-400">/</span>
          </li>
          <li>
            <span className="">{name}</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
export default Breadcrumb;
