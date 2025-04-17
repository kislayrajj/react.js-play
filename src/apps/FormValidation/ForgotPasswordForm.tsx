import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const ForgotPasswordForm = () => {
  const theme = useSelector((state: { theme: { theme: 'light' | 'dark' } }) => state.theme.theme);
  const [email, setEmail] = useState('');
  const [focus, setFocus] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className={`${theme === "dark"
        ? "bg-gradient-to-r from-blue-900/80 to-indigo-900/30 text-gray-300"
        : "bg-gradient-to-r from-indigo-400 to-cyan-400"} 
        p-4 md:p-10 rounded-md flex flex-col items-center gap-6 w-full max-w-md text-base md:text-xl`}>
        
        <div className="center flex-col gap-2">
          <div><i className="fa-solid fa-lock"></i></div>
          <div>Forgot Password</div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full center">
          <div className="relative flex flex-col items-start gap-1">
            <motion.label
              initial={{ opacity: .8, y: 0, x: 0 }}
              animate={focus || email
                ? { opacity: 1, y: "-120%", x: "-15%" }
                : { opacity: .8, y: 0, x: 0 }}
              transition={{ duration: 0.4 }}
              htmlFor="email"
              className="absolute top-[10%] left-[5%]">
              Email
            </motion.label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className={`md:w-72 shadow-xl p-1 border-2 focus:outline-none
                ${theme === "dark" ? "bg-transparent text-white border-blue-900" : "bg-transparent border-sky-300"}
                ${focus ? "rounded-xl border-blue-600" : "rounded"}`}
              required
            />
          </div>

          <button type="submit"
            className={`border p-1 px-3 w-fit rounded transition-all duration-100
              ${theme === "dark" ? "hover:bg-blue-900" : "hover:bg-sky-400"}`}>
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
