import React, { useState } from "react";
import Button from "./Button";

function Navbar() {
  const links = [
    { name: "Home", link: "/" },
    { name: "Login", link: "/login" },
    { name: "Registre", link: "/registre" }
  ];

  let [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-2 m-2 px-1">
        <div className="font-bold cursor-pointer flex items-center font-[poppins] text-gray-800">
          <span className="text-3xl text-indigo-600 py-4 md:px-10 px-7">
            <ion-icon name="logo-ionic"></ion-icon>
            Online Learning Platform
          </span>
        </div>
        <div onClick={() => setOpen(!open)} className="md:hidden">
          <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto pl-9 transition-all mb-2 duration-500 ease-in ${open ? 'top-20' : 'top-[-490px]'
            }`}
        >
          {links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a href={link.link} className="text-gray-800 hover:text-gray-400 duration-500">
                {link.name}
              </a>
            </li>
          ))}
          <Button>Get Started</Button>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
