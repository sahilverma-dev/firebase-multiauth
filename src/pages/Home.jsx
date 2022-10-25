import React from "react";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center  bg-gray-50 py-12 pt-20 sm:px-6 lg:px-8">
      <div className="w-[500px] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-black/80 dark:border-gray-700 py-4">
        <div className="flex flex-col items-center">
          <img
            className="mb-3 w-24 h-24 rounded-full shadow-lg"
            src={
              user?.photoURL ||
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            alt={user?.displayName}
            loading="lazy"
          />
          <h5 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">
            {user?.displayName}
          </h5>
          <p className="mb-3 text-gray-900 dark:text-white">
            Email: {user.email}
          </p>
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Login with {user.providerData[0].providerId}
          </span>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
