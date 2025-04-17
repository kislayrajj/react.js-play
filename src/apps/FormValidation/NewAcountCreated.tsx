import React from 'react';
import { useSelector } from 'react-redux';

const NewAccountCreated: React.FC = () => {
  const theme = useSelector((state: { theme: { theme: 'light' | 'dark' } }) => state.theme.theme);
  return (
    <div className="h-screen flex items-center justify-center ">
     <div className={`${theme === "dark"
        ? "bg-gradient-to-r from-blue-900/80 to-indigo-900/30 text-gray-300"
        : "bg-gradient-to-r from-indigo-400 to-cyan-400"} 
        p-4 md:p-10  rounded-md flex flex-col items-center gap-6 w-full max-w-md text-base md:text-xl`}>
      <div className="text-center p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold ">Account Created Successfully!</h1>
        <p className="text-lg mt-4">Your account has been successfully created. You can now log in and start using the application.</p>
        <button 
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => window.location.href = "/form"} // Redirect to login page
        >
          Go to Login
        </button>
      </div>
    </div></div>
  );
};

export default NewAccountCreated;
