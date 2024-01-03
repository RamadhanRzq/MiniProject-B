import {
  IconFileInfo,
  IconFriends,
  IconHeart,
  IconHeartFilled,
  IconHelp,
  IconMenu2,
  IconSearch,
  IconShoppingBag,
  IconStarFilled,
  IconTruckDelivery,
  IconUser,
  IconWallet,
  IconX,
  IconChevronRight,
  IconHome,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [header, setHeader] = useState(false);

  return (
    <header
      className={`max-w-[1640px] mx-auto flex py-4 px-10 border-b-[1px] border-gray-300`}
    >
      <div>
        <div className="mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <div
              onClick={() => setHeader(!header)}
              className="cursor-pointer hover:text-primary"
            >
              <IconMenu2 size={30} />
            </div>
            <a href="#">
              <img src="/images/logo.png" className="w-32" />
            </a>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 font-bold flex">
              Beauty <span className="font-bold text-primary">Fashion</span>
            </h1>
            <div className="hidden ml-4 lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]">
              <Link to="/home" className="p-2 font-semibold hover:text-primary">
                Home
              </Link>
              <p className="p-2 font-semibold hover:text-primary">Brand</p>
              <p className="p-2 font-semibold hover:text-primary">Shop</p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
            <IconSearch size={25} />
            <input
              className="bg-transparent p-2 w-full focus:outline-none"
              type="text"
              placeholder="Search here"
            />
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                <IconHeart size={25} className="mr-2" />
              </div>
              <div className="text-xs leading-3">Fav</div>
              <span className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                99
              </span>
            </a>
            <Link
              to="/cart"
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                <IconShoppingBag size={25} className="mr-2" />
              </div>
              <div className="text-xs leading-3">Cart</div>
              <span className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                99
              </span>
            </Link>
            <a
              href="#"
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                <IconUser size={25} className="mr-2" />
              </div>
              <div className="text-xs leading-3">User</div>
            </a>
          </div>
          {header ? (
            <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
          ) : (
            ""
          )}
          <div
            className={
              header
                ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
                : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
            }
          >
            <IconX
              onClick={() => setHeader(!header)}
              size={30}
              className="absolute right-4 top-4 cursor-pointer"
            />
            <h2 className="text-2xl p-4 font-bold">
              Beauty <span className="font-bold text-primary">Fashion</span>
            </h2>
            <nav>
              <ul className="flex flex-col p-4 text-gray-800">
                <li className="text-xl py-4 flex hover:text-primary">
                  <IconTruckDelivery size={25} className="mr-4" /> Orders
                </li>
                <li className="text-xl py-4 flex hover:text-primary">
                  <IconHeartFilled size={25} className="mr-4" /> Favorites
                </li>
                <li className="text-xl py-4 flex hover:text-primary">
                  <IconWallet size={25} className="mr-4" /> Wallet
                </li>
                <li className="text-xl py-4 flex hover:text-primary">
                  <IconHelp size={25} className="mr-4" /> Help
                </li>
                <li>
                  <Link
                    to="/transaction"
                    className="text-xl py-4 flex hover:text-primary"
                  >
                    <IconFileInfo size={25} className="mr-4" /> Transaction
                    History
                  </Link>
                </li>
                <li className="text-xl py-4 flex hover:text-primary">
                  <IconStarFilled size={25} className="mr-4" /> Best Ones
                </li>
                <li>
                  <Link
                    to="/editprofile"
                    className="text-xl py-4 flex hover:text-primary"
                  >
                    <IconUser size={25} className="mr-4" /> Edit Profile
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="container -mt-6 py-4 flex items-center gap-3">
          <Link
            to="/dashboard"
            className="text-gray-600 text-base hover:text-primary"
          >
            <IconHome size={30} />
          </Link>
          <span className="text-sm text-gray-400">
            <IconChevronRight size={30} />
          </span>
          <Link to="/" className="font-medium hover:text-primary">
            Product View
          </Link>
          <span className="text-sm text-gray-400">
            <IconChevronRight size={30} />
          </span>
          <Link to="/list" className="font-medium hover:text-primary">
            Product List
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
