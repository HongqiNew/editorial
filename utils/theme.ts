import { useContext } from "react"
import { ColorModeContext } from "../pages/_app"

const useMode = () => useContext(ColorModeContext)

export default useMode
