import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenFromCookies: any = Cookies.get("token");
    if (!tokenFromCookies) {
      navigate("/signin");
    }
    setToken(tokenFromCookies);
  }, []);

  const logout = () => {
    Cookies.remove("token");
    window.location.href = "/signin";
  };

  return (
    <nav className="bg-white border-gray-200 border-b shadow-sm shadow-slate-400">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://miro.medium.com/v2/resize:fit:8978/1*s986xIGqhfsN8U--09_AdA.png"
            className="h-8 sm:h-9"
            alt="Flowbite Logo"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to={"/"}
                className="block py-2 px-3 text-gray-900 rounded md:text-gray-700  hover:bg-gray-100  hover:text-violet-700"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {!token && (
              <li>
                <Link
                  to={"/signin"}
                  className="block py-2 px-3 text-blue-900 rounded hover:bg-gray-100  hover:text-violet-700 "
                >
                  Login
                </Link>
              </li>
            )}
            {token && (
              <>
                <li>
                  <Link
                    to={"/profile"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100  hover:text-violet-700"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/blog"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100  hover:text-violet-700"
                  >
                    All Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/newBlog"}
                    className="block py-2 px-3 rounded-md hover:bg-gray-100 hover:text-gray-700 bg-purple-500 text-white font-bold"
                  >
                    Create Blog
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block py-2 px-3 text-rose-700 rounded hover:bg-gray-100 hover:text-rose-900 "
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;