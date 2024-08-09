import React, { ChangeEvent, useState,KeyboardEvent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { evaluate } from 'mathjs'

const Calculator:React.FC= () => {
  const theme = useSelector((state : RootState) => state.theme.theme)
  const [num, setNum] = useState<string>("")
  const [result, setResult] = useState<string>()
  const [error, setError] = useState<string>()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  setNum(e.target.value)
  
  }

  const handleButtonClick = (value:string) => {
    if(
      (value==="+" ||value==="-" || value==="*" || value==="/" ||value==="." || value==="%")
       &&
  (num.endsWith("+") || num.endsWith("*") || num.endsWith("-") || num.endsWith("/") || num.endsWith(".") || num.endsWith("%"))
  )
  {
      return;
  }
  setNum( num + value)
  }
  const handleAllClear =()=>{
    setNum("")
    setError("")
    setResult("")
  }

  const handleCancel =()=>{
    if(num){
      setNum(num.slice(0,-1))
    }
  }

  const handleCalculate = ()=>{
    try{
      setResult(evaluate(num).toString())
      setError("")
    }catch(error){
      setError("Invalid Expression")
    }
  }

  const handleEnterKeyPress =(e: KeyboardEvent<HTMLInputElement>)=>{
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Enter','Delete', '+', '-', '*', '/', '.', '%','^','(',')','[',']',];
    const key = e.key;
  
    if (!/^\d$/.test(key) && !allowedKeys.includes(key)) {
      e.preventDefault();
    }
if(e.key === "Enter"){
  handleCalculate()
}
  }
  return (
    <div className='h-screen center justify-center'>
      {/* hi this is calculator */}
      <div className={`rounded-md px-4 py-5 custom_animate  ${theme==="dark" ? "bg-gradient-to-r from-slate-900 to-slate-700" : "bg-gradient-to-r from-cyan-100 to-red-50"}`}>
        <div className={`screen h-20 md:h-24 lg:h-28 rounded-md m-1 mb-3 custom_animate ${theme==="dark" ? "bg-gradient-to-r from-slate-300 to-slate-200":"bg-gradient-to-r from-slate-50 to-zinc-100"} relative overflow-hidden center`}>
          <input onChange={handleInputChange} type="text" value={num} placeholder='0'  onKeyDown={handleEnterKeyPress} className='outline-none bg-transparent size-[40%] w-full text-xl text-end' />
          <div className="err absolute top-0 left-1 text-red-500">{error}</div>
          <div className="result absolute bottom-1 right-1 w-full flex justify-between px-2 font-medium">
            <div> = </div>
            {result}</div>
        </div>
        <div className="buttons flex flex-col gap-1">
          <div className='flex gap-3 justify-evenly'>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium rounded-md custom_animate  center justify-center ${theme === "dark" ? "bg-gradient-to-r from-blue-800 to-indigo-900 text-white" : "bg-gradient-to-r from-blue-200 to-cyan-200"}`} onClick={handleAllClear}>AC</div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate custom_animate custom_animate rounded-md bg-blue-500 center justify-center ${theme === "dark" ? "bg-gradient-to-r from-blue-800 to-indigo-900 text-white" : "bg-gradient-to-r from-blue-200 to-cyan-200"}`} onClick={handleCancel}><i className="fa-solid fa-delete-left"></i></div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate custom_animate custom_animate rounded-md  bg-blue-500 center justify-center ${theme === "dark" ? "bg-gradient-to-r from-blue-800 to-indigo-900 text-white" : "bg-gradient-to-r from-blue-200 to-cyan-200"}`} onClick={()=>handleButtonClick("%")}><i className="fa-solid fa-percent"></i></div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate custom_animate custom_animate rounded-md  bg-blue-500 center justify-center ${theme === "dark" ? "bg-gradient-to-r from-blue-800 to-indigo-900 text-white" : "bg-gradient-to-r from-blue-200 to-cyan-200"}`} onClick={()=>handleButtonClick("/")}><i className="fa-solid fa-divide"></i></div>
          </div>
          <div className='flex gap-3 justify-evenly mt-2'>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate custom_animate custom_animate rounded-md  bg-blue-500 center justify-center text-white ${theme === "dark" ? "bg-gradient-to-r from-slate-500 to-slate-800 " : "bg-gradient-to-r from-slate-300 to-slate-500"}`} onClick={()=>handleButtonClick("7")}>7</div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate custom_animate rounded-md  bg-blue-500 center justify-center text-white ${theme === "dark" ? "bg-gradient-to-r from-slate-500 to-slate-800" : "bg-gradient-to-r from-slate-300 to-slate-500"}`} onClick={()=>handleButtonClick("8")}>8</div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate custom_animate rounded-md  bg-blue-500 center justify-center text-white ${theme === "dark" ? "bg-gradient-to-r from-slate-500 to-slate-800" : "bg-gradient-to-r from-slate-300 to-slate-500"}`} onClick={()=>handleButtonClick("9")}>9</div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate custom_animate rounded-md  bg-blue-500 center justify-center ${theme === "dark" ? "bg-gradient-to-r from-blue-800 to-indigo-900 text-white" : "bg-gradient-to-r from-blue-200 to-cyan-200"}`} onClick={()=>handleButtonClick("*")}><i className="fa-solid fa-xmark"></i></div>
        </div>
          <div className='flex gap-3 justify-evenly mt-2'>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate custom_animate rounded-md  bg-blue-500 center justify-center text-white ${theme === "dark" ? "bg-gradient-to-r from-slate-500 to-slate-800" : "bg-gradient-to-r from-slate-300 to-slate-500"}`} onClick={()=>handleButtonClick("4")}>4</div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate custom_animate rounded-md  bg-blue-500 center justify-center text-white ${theme === "dark" ? "bg-gradient-to-r from-slate-500 to-slate-800" : "bg-gradient-to-r from-slate-300 to-slate-500"}`} onClick={()=>handleButtonClick("5")}>5</div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate custom_animate rounded-md  bg-blue-500 center justify-center text-white ${theme === "dark" ? "bg-gradient-to-r from-slate-500 to-slate-800" : "bg-gradient-to-r from-slate-300 to-slate-500"}`} onClick={()=>handleButtonClick("6")}>6</div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium  custom_animate rounded-md  bg-blue-500 center justify-center ${theme === "dark" ? "bg-gradient-to-r from-blue-800 to-indigo-900 text-white" : "bg-gradient-to-r from-blue-200 to-cyan-200"}`} onClick={()=>handleButtonClick("+")}><i className="fa-solid fa-plus"></i></div>
        </div>
          <div className='flex gap-3 justify-evenly mt-2'>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate rounded-md  bg-blue-500 center justify-center text-white ${theme === "dark" ? "bg-gradient-to-r from-slate-500 to-slate-800" : "bg-gradient-to-r from-slate-300 to-slate-500"}`} onClick={()=>handleButtonClick("1")}>1</div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate rounded-md  bg-blue-500 center justify-center text-white ${theme === "dark" ? "bg-gradient-to-r from-slate-500 to-slate-800" : "bg-gradient-to-r from-slate-300 to-slate-500"}`} onClick={()=>handleButtonClick("2")}>2</div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate rounded-md  bg-blue-500 center justify-center text-white ${theme === "dark" ? "bg-gradient-to-r from-slate-500 to-slate-800 " : "bg-gradient-to-r from-slate-300 to-slate-500"}`} onClick={()=>handleButtonClick("3")}>3</div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium  custom_animate rounded-md  bg-blue-500 center justify-center ${theme === "dark" ? "bg-gradient-to-r from-blue-800 to-indigo-900 text-white" : "bg-gradient-to-r from-blue-200 to-cyan-200"}`} onClick={()=>handleButtonClick("-")}> <i className="fa-solid fa-minus"></i> </div>
        </div>
          <div className='flex gap-3 justify-evenly mt-2'>
            <div className={` cursor-pointer size-12 md:size-14 lg:size-16 font-medium custom_animate rounded-md  bg-blue-500 center justify-center text-white ${theme === "dark" ? "bg-gradient-to-r from-slate-500 to-slate-800 text-white" : "bg-gradient-to-r from-slate-300 to-slate-500"}`} onClick={()=>handleButtonClick("0")}>0</div>
            <div className={`cursor-pointer size-12 md:size-14 lg:size-16 font-medium  custom_animate rounded-md  bg-blue-500 center justify-center text-white ${theme === "dark" ? "bg-gradient-to-r from-slate-500 to-slate-800" : "bg-gradient-to-r from-slate-300 to-slate-500"}`} onClick={()=>handleButtonClick(".")}>•</div>
            <div className={`cursor-pointer h-12 w-28 md:h-14 lg:h-auto lg:w-auto lg:flex-1 rounded-md font-medium  bg-blue-500 center justify-center ${theme === "dark" ? "bg-gradient-to-r from-emerald-500 to-emerald-900 text-white" : "bg-gradient-to-r from-teal-400 to-yellow-200"}`} onClick={handleCalculate}> <i className="fa-solid fa-equals"></i> </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
