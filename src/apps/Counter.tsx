import { RootState } from "../redux/store"
import { useState } from "react"
import { useSelector } from "react-redux"

const Counter: React.FC = () => {
    const [count, setCount] = useState<number>(0)
  const theme = useSelector((state: RootState) => state.theme.theme)
    const handleCountIncrement = () => {
        setCount((count) => count + 1)
    }

    const handleCountDecrement = () => {
        setCount((count) => count - 1)
    }
    const handleCountReset = () => {
        setCount((count) => count = 0)
    }
    return (
        <div className="h-screen flex justify-center items-center">
            <div className={`flex flex-col gap-12 items-center  px-2 py-7 h-60 rounded-lg ${theme === "dark" ? "bg-black/80" : "bg-gray-300"}`}>
                <div className="px-2 py-3 w-24 bg-gray-100 rounded-md text-center">{count}</div>
                <div className="flex gap-3">
                    <button onClick={handleCountDecrement} className="px-4 py-2 bg-red-500 text-white rounded w-24">Decrease</button>
                    <button onClick={handleCountReset} className="px-4 py-2 bg-black text-white rounded w-24">Reset</button>
                    <button onClick={handleCountIncrement} className="px-4 py-2 bg-green-500 text-white rounded w-24">Increase</button>
                </div>
            </div>
        </div>

    )
}

export default Counter
