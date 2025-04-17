import React from 'react';
import { useSelector } from 'react-redux';

const LoggedIn: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theme.theme)
    type RootState = { theme: { theme: 'light' | 'dark' } };
    return (
        <div className={`h-screen flex flex-col justify-center items-center`}>
            <div className={` relative p-2 md:p-12 rounded-md ${theme === "dark" ? "bg-gradient-to-r from-blue-900/80 to-indigo-900/30 text-gray-300" : "bg-gradient-to-r from-indigo-400 to-cyan-400 "}`}>
                <div className="text-center p-6  shadow rounded-lg">
                    <h1 className="text-3xl font-semibold ">Success!</h1>
                    <p className="text-lg mt-4">You have successfully logged in.</p>
                    <div className='center flex-col gap-2  '>

                        <button
                            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-black hover:text-white transition"
                            onClick={() => window.location.href = "/form"}
                        >
                            Go to Login
                        </button>
                        <button className='  p-1 rounded text-sm hover:text-blue-500 absolute bottom-1 right-2' onClick={() => window.location.href = "/form/change-password"}>Change Password</button>
                    </div>
                </div> </div>
        </div>
    );
};

export default LoggedIn;
