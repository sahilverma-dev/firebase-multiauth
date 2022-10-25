import React, { useState } from "react";

// icons
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";
import { BiArrowBack as BackIcon } from "react-icons/bi";

// auth
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // using auth
  const { forgotPassword } = useAuth();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email } = formData;
    if (!email) {
      toast.error("All felids are required");
      setLoading(false);
    } else {
      try {
        await forgotPassword(email);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 pt-20 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="relative bg-white px-4 pt-8 pb-4 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute top-2 left-2 h-10 bg-black hover:bg-black/50 text-white aspect-square flex items-center justify-center rounded-full text-xl p-2"
          >
            <BackIcon />
          </button>
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
              <button
                type="submit"
                disabled={formData.email === "" || loading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <LoadingIcon className="animate-spin" /> Loading . . .
                  </span>
                ) : (
                  "Send Recovery email."
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
