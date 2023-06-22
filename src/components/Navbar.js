import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { RiMenu2Line } from 'react-icons/ri';
import LogoutButton from './LogoutButton';

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('id') !== null;

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              The Mini Blog
            </Link>
          </div>
          <div className="hidden sm:flex sm:space-x-4">
            <ul className="flex space-x-4 items-center">
              {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className={`${
                        location.pathname === '/profile'
                          ? 'text-white bg-gray-900'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/create-blog"
                      className={`${
                        location.pathname === '/create-blog'
                          ? 'text-white bg-gray-900'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      Create Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-blog"
                      className={`${
                        location.pathname === '/my-blog'
                          ? 'text-white bg-gray-900'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      My Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/favorite-blog"
                      className={`${
                        location.pathname === '/favorite-blog'
                          ? 'text-white bg-gray-900'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      Favorite Blog
                    </Link>
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className={`${
                        location.pathname === '/login'
                          ? 'text-white bg-gray-900'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className={`${
                        location.pathname === '/register'
                          ? 'text-white bg-gray-900'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="flex sm:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
              aria-label="Toggle navigation"
              onClick={handleToggleMenu} // Add onClick event handler
            >
              <RiMenu2Line className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Add the mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <ul className="flex flex-col space-y-4 items-center bg-gray-900">
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className={`${
                      location.pathname === '/profile' ? 'text-white' : 'text-gray-300 hover:text-white'
                    } block px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-blog"
                    className={`${
                      location.pathname === '/create-blog' ? 'text-white' : 'text-gray-300 hover:text-white'
                    } block px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Create Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-blog"
                    className={`${
                      location.pathname === '/my-blog' ? 'text-white' : 'text-gray-300 hover:text-white'
                    } block px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    My Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorite-blog"
                    className={`${
                      location.pathname === '/favorite-blog' ? 'text-white' : 'text-gray-300 hover:text-white'
                    } block px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Favorite Blog
                  </Link>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={`${
                      location.pathname === '/login' ? 'text-white' : 'text-gray-300 hover:text-white'
                    } block px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`${
                      location.pathname === '/register' ? 'text-white' : 'text-gray-300 hover:text-white'
                    } block px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}