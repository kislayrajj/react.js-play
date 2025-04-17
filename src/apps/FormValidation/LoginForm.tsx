import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom'

const LoginForm: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme)
  type RootState = { theme: { theme: 'light' | 'dark' } };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentFocus, setCurrentFocus] = useState('');
  const navigate = useNavigate()

  const isFieldActive = (fieldName: string) => {
    return (
      currentFocus === fieldName ||
      (fieldName === "username" && username !== "") ||
      (fieldName === "password" && password !== "")
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "username") {
      setUsername(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }
  
      // Save the token in localStorage
      localStorage.setItem("authToken", data.token);
  
      // Optional: Save username if needed
      localStorage.setItem("username", username);
  
      console.log("Login Success", data);
      // Redirect to a protected page (e.g., dashboard or logged-in area)
      navigate("/form/logged-in");
  
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };
  
  
  return (
    <div className={`h-screen flex flex-col justify-center items-center`}>
      <div className={` ${theme === "dark" ? "bg-gradient-to-r from-blue-900/80 to-indigo-900/30 text-gray-300" : "bg-gradient-to-r from-indigo-400 to-cyan-400 "} p-2 md:p-12  rounded-md flex flex-col justify-center items-center gap-6 text-base md:text-xl `}>
        <div className='center flex-col gap-2'>
          <div><i className="fa-solid fa-user"></i></div>
          <div>Sign In</div>
        </div>
        <div>
          <form onSubmit={handleSubmit} method='POST' className='flex flex-col gap-8 justify-center items-center'>
            <div className='relative flex flex-col items-start gap-1'>
              <motion.label
                initial={{ opacity: .8, y: 0, x: 0 }}
                animate={
                  isFieldActive("username") ? { opacity: 1, y: "-120%", x: "-15%" } : { opacity: .8, y: 0, x: 0 }
                }
                transition={{ duration: 0.4 }}
                htmlFor="username"
                className='absolute top-[10%] left-[5%]'>Username</motion.label>
              <input onChange={handleInputChange}
                onFocus={() => setCurrentFocus("username")}
                onBlur={() => { setCurrentFocus("") }} type="text" id="username" name='username' className={` md:w-72  shadow-xl p-1  border-2  focus:outline-none ${theme === "dark" ? "bg-transparent text-white border-blue-900" : "bg-transparent border-sky-300"} ${currentFocus === "username" ? "rounded-xl border-blue-600" : "rounded"}`} />
            </div>
            <div className='relative flex flex-col items-start gap-1'>
              <motion.label
                initial={{ opacity: .8, y: 0, x: 0 }}
                animate={
                  isFieldActive("password") ? { opacity: 1, y: "-120%", x: "-15%" } : { opacity: .8, y: 0, x: 0 }
                }
                transition={{ duration: 0.4 }} htmlFor="password"

                className='absolute top-[10%] left-[5%]'>Password</motion.label>
              <input onChange={handleInputChange}
                onFocus={() => setCurrentFocus("password")}
                onBlur={() => setCurrentFocus('')} type="password" id="password" name='password' className={`rounded  shadow-xl md:w-72 p-1  border-2  focus:outline-none ${theme === "dark" ? "bg-transparent text-white border-blue-900" : "bg-transparent border-sky-300"} ${currentFocus === "password" ? "rounded-xl border-blue-600" : "rounded"}`} />
            </div>
            <div className='w-full'><button className={`border p-1 px-3 w-full rounded  transition-all ease-in-out duration-100 ${theme == "dark" ? "hover:bg-blue-900" : "hover:bg-sky-400"}`} type='submit'>Login</button></div>
            <div className='text-sm md:text-base center justify-between gap-3 w-full'>
              <div><input type="checkbox" /> Remember Me</div>
              <div className={`${theme == "dark" ? "text-blue-400" : "text-blue-900"}`}><Link to="/form/forgot">Forgot Password</Link></div>
            </div>
          </form>
          <div className='md:text-lg center flex-col mt-2 md:mt-6 gap-3'>
            <div className='h-[1px] w-full bg-blue-600'></div>
            <div className='center justify-between gap-2'>
              Not a member ? <span><Link to="/form/register" className={`${theme == "dark" ? "text-blue-300" : "text-blue-900"}`}>Create Account</Link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
