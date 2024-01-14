import { IconHome, IconMenu2, IconX } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";
import { MdListAlt } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { Link } from "react-router-dom";

function Header() {
  const [header, setHeader] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setHeader(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <header className="w-full flex border-b-[1px] border-gray-300 bg-hijau">
      <div>
        <div className="mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <div
              onClick={() => setHeader(!header)}
              className="text-white cursor-pointer hover:text-black"
            >
              <IconMenu2 size={30} />
            </div>
          </div>
          {header ? (
            <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
          ) : (
            ""
          )}
          <div
            ref={sidebarRef}
            className={
              header
                ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
                : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
            }
          >
            {/* <IconX
              onClick={() => setHeader(!header)}
              size={30}
              className="absolute right-4 top-4 cursor-pointer"
            /> */}
            <h2 className="text-2xl py-4 pl-5 font-bold text-hijau">
              Dashboard
            </h2>
            <nav>
              <ul className="flex flex-col p-4 text-gray-800">
                <Link
                  to="/home"
                  className="text-xl flex hover:text-hijau"
                  onClick={() => setHeader(!header)}
                >
                  <IconHome size={25} className="mr-4" /> Home
                </Link>
                <Link
                  to="/list"
                  className="text-xl py-4 flex hover:text-hijau"
                  onClick={() => setHeader(!header)}
                >
                  <MdListAlt size={25} className="mr-4" /> Product List
                </Link>
                <Link
                  to="/categories"
                  className="text-xl flex hover:text-hijau"
                  onClick={() => setHeader(!header)}
                >
                  <TbCategoryPlus size={25} className="mr-4" /> Categories
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
