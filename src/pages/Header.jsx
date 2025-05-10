import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="bg-[#309898] p-5 flex items-center justify-between px-[5%] text-white">
        <div className="text-2xl font-bold">Practice</div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>

        <div className="hidden md:flex gap-6 text-lg">
          <Link to="/" className="hover:text-gray-200 transition-colors">
            Admission
          </Link>
          <Link to="/student-list" className="hover:text-gray-200 transition-colors">
            Student List
          </Link>
          <Link to="/xhr-products-list" className="hover:text-gray-200 transition-colors">
            XMLHttpRequest
          </Link>
          <Link to="/graphql" className="hover:text-gray-200 transition-colors">
            GraphQL
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#2a8787] text-white flex flex-col items-center gap-4 py-4 text-lg transition-all duration-300">
          <Link to="/" onClick={toggleMenu} className="hover:text-gray-200">
            Admission
          </Link>
          <Link to="/student-list" onClick={toggleMenu} className="hover:text-gray-200">
            Student List
          </Link>
          <Link to="/xhr-products-list" onClick={toggleMenu} className="hover:text-gray-200">
            XMLHttpRequest
          </Link>
          <Link to="/graphql" onClick={toggleMenu} className="hover:text-gray-200">
            GraphQL
          </Link>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default Header;