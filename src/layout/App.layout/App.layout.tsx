import { useEffect } from "react"
import { ToastContainer } from "react-toastify"

import "./styles.scss"

interface Props {
  themeToApply: string
  children: React.ReactNode
}

const Layout = ({ children, themeToApply }: Props) => {
  useEffect(() => {
    document.documentElement.classList.remove("dark", "light")
    document.documentElement.classList.add(themeToApply)
  }, [themeToApply])

  return (
    <div className={`App ${themeToApply}`}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={themeToApply}
        // limit={3}
      />
    </div>
  )
}

export default Layout
