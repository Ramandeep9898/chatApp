import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";

export const LoginContainer = () => {
  const navigate = useNavigate();
  const [loginValues, setLoginValue] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { username, password } = loginValues;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const validateForm = () => {
    const { username, password } = loginValues;
    if (username === "" || password === "") {
      toast.error("All the fields are required.", toastOptions);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-600"></div>
      </div>

      <div className="absolute top-0 left-0 -translate-x-[60%] -translate-y-[75%] z-10">
        <div className="border-[8px] border-white rounded-full w-80 h-80 opacity-20"></div>
      </div>

      <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
        <div className="relative self-stretch px-4 py-16 overflow-hidden bg-blue-600 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24">
          <div className="absolute bottom-0 right-0 translate-x-[25%] translate-y-[75%]">
            <div className="border-[8px] border-white rounded-full w-96 h-96 opacity-20 lg:opacity-100"></div>
          </div>

          <div className="relative flex flex-col justify-between h-full max-w-lg mx-auto lg:mr-auto lg:max-w-md">
            <div className="flex-1">
              <h2 className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl xl:text-6xl">
                Welcome to our community
              </h2>
              <p className="mt-4 text-base font-normal leading-7 text-blue-300 lg:text-lg lg:mt-6 lg:leading-8">
                Clarity gives you the blocks & components you need to create a
                truly professional website.
              </p>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-6 h-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-6 h-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-6 h-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-6 h-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <blockquote className="mt-8">
                <p className="text-xl font-normal text-white">
                  "We love Landingfolio! Our designers were using it for their
                  projects, so we already knew what kind of design they want."
                </p>
              </blockquote>
              <div className="flex items-center mt-6">
                <img
                  className="object-cover rounded-full w-11 h-11 shrink-0"
                  src="https://landingfoliocom.imgix.net/store/collection/saasui/images/sign-in/3/avatar-male.png"
                  alt=""
                />
                <div className="ml-4">
                  <p className="text-base font-semibold text-white">
                    Devon Lane
                  </p>
                  <p className="text-sm font-normal text-gray-300">
                    Co-Founder, Design.co
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-16 bg-white sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
          <div className="max-w-lg mx-auto xl:max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Welcome back!
            </h2>
            <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:leading-8">
              Clarity gives you the blocks and components you need to create a
              truly professional website.
            </p>

            <form
              action="#"
              method="POST"
              className="mt-12 space-y-12 sm:mt-16 lg:mt-20"
            >
              <div className="space-y-5">
                <div>
                  <label
                    for="text"
                    className="text-base font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="text"
                      id="text"
                      value={loginValues.username}
                      onChange={(e) =>
                        setLoginValue({
                          ...loginValues,
                          username: e.target.value,
                        })
                      }
                      className="block w-full px-4 py-4 text-base text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="password"
                    className="text-base font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={loginValues.password}
                      onChange={(e) =>
                        setLoginValue({
                          ...loginValues,
                          password: e.target.value,
                        })
                      }
                      className="block w-full px-4 py-4 text-base text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onClick={signInHandler}
                className="inline-flex items-center justify-center px-12 py-4 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-sm font-normal text-gray-500">
              Don't have an account?
              <Link
                to="/register"
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                Create free account
              </Link>
            </p>
            <ToastContainer />
          </div>
        </div>
      </div>
    </section>
  );
};
