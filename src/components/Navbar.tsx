import { Link } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../redux/themeSlice";
import { motion } from "framer-motion"
const Navbar: React.FC = () => {
  const [isThemeMenu, setIsThemeMenu] = useState<boolean>(false)
  const [isAppMenu, setIsAppMenu] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement | null>(null);
  const theme = useSelector((state: RootState) => state.theme.theme)
  const dispatch = useDispatch()
  interface NavOptions {
    path: string;
    label: string
  }
  const navOptions: NavOptions[] = [
    { path: "", label: "Home" },
  ]

  const appOptions: NavOptions[] = [
    { path: "counter", label: "Counter" },
    { path: "calculator", label: "Calculator" },
  ]
  const themeOptions = [
    { name: "Dark", value: "dark" },
    { name: "Light", value: "light" },
  ]
  const handleTheme = (color: string) => {
    dispatch(setTheme(color))
  }

  const handleThemeSelection = (color: string) => {
    handleTheme(color)
    setIsThemeMenu(false)

  }

  const handleThemeMenu = () => {
    setIsThemeMenu(!isThemeMenu)
    setIsAppMenu(false)
  }

  const handleAppMenu = () => {
    setIsAppMenu(!isAppMenu)
    setIsThemeMenu(false)
  }

//close all menus

const handleClickOutside=(e:MouseEvent) =>{
  const target = e.target as Node;
if(menuRef.current && !menuRef.current.contains(target)){
  setIsAppMenu(false)
  setIsThemeMenu(false)
}
}

useEffect(()=>{
  const handleOutsideClick =(e : MouseEvent)=> handleClickOutside(e);
if(isAppMenu || isThemeMenu){
  document.addEventListener("click", handleOutsideClick)
}else{
  document.removeEventListener("click", handleOutsideClick)
}

return ()=> document.removeEventListener("click", handleOutsideClick);

},[isAppMenu,isThemeMenu])



  return (
    <div className={` ${theme === "dark" ? "bg-black " : " bg-blue-500"}  text-white py-2 px-2 m-2 rounded-lg `}>
      <nav ref={menuRef} className="flex justify-between ">
        <ul className="flex gap-3 relative">
          {navOptions?.map((option) => (
            <li key={option.path}>
              <Link to={option?.path}>{option?.label}</Link>
            </li>
          ))}
          <li onClick={handleAppMenu}>Apps</li>
          {isAppMenu &&
       
          <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isAppMenu ? 1 : 0, y: isAppMenu ? 0 : -50 }}
           className={` absolute top-10 left-8 rounded  px-2 py-3 ${theme === "dark" ? "bg-black/80 " : " bg-blue-500/80"} `}>
            <ul>
              {appOptions?.map((app) => (
                <li onClick={()=> setIsAppMenu(false)} key={app?.path}>
                  <Link to={app?.path}>{app?.label}</Link>

                </li>
              ))}
            </ul>
          </motion.div>
             }
        </ul>

        <div className="pr-2">
          <i onClick={handleThemeMenu}
            className="fa-solid fa-circle-half-stroke"></i>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: isThemeMenu ? 1 : 0, y: isThemeMenu ? 0 : -50 }}
            className="relative">
            {isThemeMenu &&
              <div className={` absolute top-3 right-0.5 rounded  px-2 py-3 ${theme === "dark" ? "bg-black/80 " : " bg-blue-500/80"} `}>
                {themeOptions?.map((option) => (
                  <div key={option.value}
                    onClick={() => handleThemeSelection(option.value)}
                  >{option?.name}</div>
                ))}
              </div>
            }

          </motion.div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
