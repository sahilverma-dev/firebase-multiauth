import React, { useState } from "react";

// icons
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import {
  AiFillGithub as GitHubIcon,
  AiFillFacebook as FaceBookIcon,
  AiFillEye as ShowEyeIcon,
  AiFillEyeInvisible as HideEyeIcon,
  AiOutlineLoading3Quarters as LoadingIcon,
} from "react-icons/ai";

// auth
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // using auth
  const {
    loginWithGoogle,
    loginWithGithub,
    loginWithFaceBook,
    loginWithEmailPassword,
  } = useAuth();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = formData;
    if (!email && !password) {
      toast.error("All felids are required");
      setLoading(false);
    } else {
      try {
        await loginWithEmailPassword(email, password);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/user-not-found).")
          toast.error("User not found with this email.");
        else if (error.message === "Firebase: Error (auth/wrong-password).")
          toast.error("Wrong Password");
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 pt-20 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 pt-8 pb-4 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
          <div className="py-3 w-full flex justify-center">
            <img
              src="https://sahil-verma.vercel.app/images/logo.png"
              alt=""
              className="rounded-full border shadow"
            />
          </div>
          <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <div className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                  <input
                    id="email"
                    type="email"
                    className="w-full outline-none disabled:cursor-wait disabled:opacity-50"
                    required
                    placeholder="Enter you email"
                    value={formData.email}
                    disabled={loading}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <div className="flex items-center w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="w-full outline-none disabled:cursor-wait disabled:opacity-50"
                    required
                    placeholder="Enter your password"
                    disabled={loading}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className="disabled:cursor-wait disabled:opacity-50"
                    disabled={loading}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ShowEyeIcon /> : <HideEyeIcon />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:cursor-wait disabled:opacity-50"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  href="/password-reset"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={
                  formData.email === "" ||
                  formData.password.length < 6 ||
                  loading
                }
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <LoadingIcon className="animate-spin" /> Loading . . .
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 flex items-center w-full justify-between gap-3">
              <button
                type="button"
                onClick={loginWithGoogle}
                className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-200 disabled:cursor-wait disabled:opacity-50"
              >
                <span className="sr-only">Sign in with Google</span>
                <GoogleIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={loginWithGithub}
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-200 disabled:cursor-wait disabled:opacity-50"
              >
                <span className="sr-only">Sign in with GitHub</span>
                <GitHubIcon className="text-black/90 h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={loginWithFaceBook}
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-200 disabled:cursor-wait disabled:opacity-50"
              >
                <span className="sr-only">Sign in with Facebook</span>
                <FaceBookIcon className="text-blue-800 h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="m-auto mt-6 w-fit md:mt-8">
            <span className="m-auto">
              Don't have an account?{" "}
              <Link className="font-semibold text-indigo-600" to="/register">
                Create one
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
