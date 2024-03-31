import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export function Index() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenFromCookies: any = Cookies.get("token");
    if (!tokenFromCookies) {
      navigate("/signup");
    }
    setToken(tokenFromCookies);
  }, []);

  
  return (
    <div>
      <section className="bg-white h-screen">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-slate-700 ">
            A hub for writing, reading, and networking.
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
            Harness your narrative prowess, unleash the depths of your creativity on the esteemed platform of Medium, where every tale finds its rightful stage.
            </p>
            {!token ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={"/signin"}
                  className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-700 border border-gray-300 rounded-2xl  bg-primary-700 hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-primary-300 "
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-700 border border-gray-300 rounded-2xl  hover:bg-purple-500 hover:text-white focus:ring-4 focus:ring-gray-100 "
                >
                  Create an account
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  to={"/blog"}
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-700 border border-gray-300 rounded-2xl  hover:bg-purple-500 hover:text-white focus:ring-4 focus:ring-gray-100 "
                >
                  Read Blogs
                </Link>
              </div>
            )}
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex  ">
            <img
              src="https://miro.medium.com/v2/resize:fit:8978/1*s986xIGqhfsN8U--09_AdA.png"
              alt="mockup"
              className="w-full h-40"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
export default Index;
