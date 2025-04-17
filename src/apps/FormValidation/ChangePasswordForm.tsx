import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const ChangePasswordForm = () => {
  const theme = useSelector((state: { theme: { theme: 'light' | 'dark' } }) => state.theme.theme);
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
  const [focus, setFocus] = useState('');

  const isFieldActive = (field: string) =>
    focus === field || form[field as keyof typeof form] !== '';
  const token = localStorage.getItem("authToken");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { currentPassword, newPassword } = form;

    const res = await fetch('http://localhost:8000/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: "userUsername", // Add the logged-in username here
        oldPassword: currentPassword,
        newPassword: newPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Password changed successfully!");
      setForm({ currentPassword: '', newPassword: '' });
    } else {
      alert(data.message || "Failed to change password.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className={`${theme === "dark"
        ? "bg-gradient-to-r from-blue-900/80 to-indigo-900/30 text-gray-300"
        : "bg-gradient-to-r from-indigo-400 to-cyan-400"} 
        p-4 md:p-10 rounded-md flex flex-col items-center gap-10 w-full max-w-md text-base md:text-xl`}>

        <div className="center flex-col gap-2">
          <div><i className="fa-solid fa-key"></i></div>
          <div>Change Password</div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full center">
          <div className="relative flex flex-col items-start gap-1">
            <motion.label
              initial={{ opacity: .8, y: 0, x: 0 }}
              animate={isFieldActive("currentPassword")
                ? { opacity: 1, y: "-120%", x: "-15%" }
                : { opacity: .8, y: 0, x: 0 }}
              transition={{ duration: 0.4 }}
              htmlFor="currentPassword"
              className="absolute top-[10%] left-[5%]">
              Current Password
            </motion.label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={form.currentPassword}
              onChange={e => setForm({ ...form, currentPassword: e.target.value })}
              onFocus={() => setFocus("currentPassword")}
              onBlur={() => setFocus("")}
              className={`md:w-72 shadow-xl p-1 border-2 focus:outline-none
                ${theme === "dark" ? "bg-transparent text-white border-blue-900" : "bg-transparent border-sky-300"}
                ${focus === "currentPassword" ? "rounded-xl border-blue-600" : "rounded"}`}
            />
          </div>

          <div className="relative flex flex-col items-start gap-1">
            <motion.label
              initial={{ opacity: .8, y: 0, x: 0 }}
              animate={isFieldActive("newPassword")
                ? { opacity: 1, y: "-120%", x: "-15%" }
                : { opacity: .8, y: 0, x: 0 }}
              transition={{ duration: 0.4 }}
              htmlFor="newPassword"
              className="absolute top-[10%] left-[5%]">
              New Password
            </motion.label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={e => setForm({ ...form, newPassword: e.target.value })}
              onFocus={() => setFocus("newPassword")}
              onBlur={() => setFocus("")}
              className={`md:w-72 shadow-xl p-1 border-2 focus:outline-none
                ${theme === "dark" ? "bg-transparent text-white border-blue-900" : "bg-transparent border-sky-300"}
                ${focus === "newPassword" ? "rounded-xl border-blue-600" : "rounded"}`}
            />
          </div>

          <button type="submit"
            className={`border p-1 px-3 w-full rounded transition-all duration-100
              ${theme === "dark" ? "hover:bg-blue-900" : "hover:bg-sky-400"}`}>
            Change Password
          </button>
        </form>
        <button className="text-sm" onClick={() => window.location.href = "/form"}>Go to login</button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
