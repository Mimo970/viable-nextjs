import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import ProfileDropdown from "./ProfileDropdown";
import { CartContext } from "../contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { cart } = useContext(CartContext);
  const [visible, setVisible] = useState(true);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart?.reduce((total, item) => total + item.amount, 0));
  }, [cart]);
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <>
      <nav
        className={`${
          visible ? "" : " -translate-y-44"
        } bg-[#fafafa] drop-shadow-md transition-all duration-500 ease-in-out z-50 fixed w-full top-0 py-4 `}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href={"/"} style={{ textDecoration: "none" }}>
              <span className="hover:shadow-md font-bold text-lg text-black w-full cursor-pointer p-1 rounded-lg">
                Viable
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="mr-6">{/* <Search /> */}</div>

            <Link href={"/cart"} style={{ textDecoration: "none" }}>
              <div className="relative">
                <div className="bg-[#171717] hover:bg-[#22303c] cursor-pointer text-white p-1 rounded-full">
                  <AiOutlineShoppingCart size={25} />
                </div>
                {cartItemsCount > 0 && (
                  <div className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </div>
                )}
              </div>
            </Link>

            <div className="md:hidden"></div>
            <div className="ml-4 cursor-pointer">
              <ProfileDropdown></ProfileDropdown>
            </div>
          </div>
        </div>

        <div className=" hidden md:block container mx-auto flex justify-center"></div>
      </nav>
    </>
  );
};

export default Navbar;
