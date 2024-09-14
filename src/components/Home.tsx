import { RootState } from "../redux/store"
import React from 'react'
import { useSelector } from 'react-redux'
const Home:React.FC = () => {
  const theme = useSelector((state:RootState)=> state.theme.theme)
  return (
    <div className={`h-screen center justify-center ${theme === "dark" ? "text-white" :""}`}>
      Got to Apps
    </div>
  )
}

export default Home
