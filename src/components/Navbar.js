import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isLoggedIn = false; // Replace with your actual login state

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              The Mini Blog
            </Link>
          </div>
          <div className="flex">
            <ul className="flex space-x-4">
              {isLoggedIn ? (
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
        </div>
      </div>
    </nav>
  );
}