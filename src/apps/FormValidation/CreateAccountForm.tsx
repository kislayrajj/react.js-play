import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const CreateAccountForm = () => {
  const theme = useSelector((state: { theme: { theme: 'light' | 'dark' } }) => state.theme.theme);
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', username: '', password: '', confirmPassword: ''
  });
  const [focus, setFocus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFieldActive = (field: string) =>
    focus === field || form[field as keyof typeof form] !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Account created successfully!");
      navigate("/form/new-account-created")


    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };



  return (
    <div className="h-screen flex items-center justify-center">
      <div className={`${theme === "dark"
        ? "bg-gradient-to-r from-blue-900/80 to-indigo-900/30 text-gray-300"
        : "bg-gradient-to-r from-indigo-400 to-cyan-400"} 
        p-4 md:p-10  rounded-md flex flex-col items-center gap-6 w-full max-w-md text-base md:text-xl`}>

        <div className="center flex-col gap-2">
          <div><i className="fa-solid fa-user-plus"></i></div>
          <div>Create Account</div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full center">
          {['name', 'email', 'username', 'password', 'confirmPassword'].map((field, idx) => (
            <div key={idx} className="relative flex flex-col items-start gap-1">
              <motion.label
                initial={{ opacity: .8, y: 0, x: 0 }}
                animate={isFieldActive(field)
                  ? { opacity: 1, y: "-120%", x: "-15%" }
                  : { opacity: .8, y: 0, x: 0 }}
                transition={{ duration: 0.4 }}
                htmlFor={field}
                className="absolute top-[10%] left-[5%] capitalize">
                {field === 'confirmPassword' ? 'Confirm Password' : field}
              </motion.label>
              <input
                id={field}
                name={field}
                type={
                  field === "password" || field === "confirmPassword"
                    ? "password"
                    : field === "email"
                      ? "email"
                      : "text"
                }
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                onFocus={() => setFocus(field)}
                onBlur={() => setFocus('')}
                className={`md:w-72 shadow-xl p-1 border-2 focus:outline-none
                  ${theme === "dark" ? "bg-transparent text-white border-blue-900" : "bg-transparent border-sky-300"}
                  ${focus === field ? "rounded-xl border-blue-600" : "rounded"}`}
                required
              />
            </div>
          ))}

          <button type="submit"
            className={`border p-1 px-3 w-fit rounded transition-all duration-100
              ${theme === "dark" ? "hover:bg-blue-900" : "hover:bg-sky-400"}`}>
            Create Account
          </button>
        </form>
        <div className='text-sm cursor-pointer text-blue-400'><Link to="/form">
          Back to Login</Link></div>
      </div>
    </div>
  );
};

export default CreateAccountForm;
