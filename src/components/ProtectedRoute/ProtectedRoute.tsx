import { Navigate } from "react-router-dom"

import { useAuthStore } from "../../store/context/authContext"

interface Props {
  level: "All" | "User" | "Guest" | "Admin"
  children: React.ReactNode
}

// component that wraps pages, and checks if the user's access level satisfies route's access level
const ProtectedRoute = ({ level, children }: Props) => {
  const { isLoggedIn, user } = useAuthStore()
  const accountType = user?.accountType

  // if the page is accessible only for guest users (like sign in and sign up pages)
  if (level === "Guest" && isLoggedIn) return <Navigate to="/" />

  // if the page is only accessible by signed up user
  if (level === "User" && !isLoggedIn) return <Navigate to="/" />

  // if the page is only accessible by admin
  if (level === "Admin" && accountType !== "Admin") return <Navigate to="/" />

  return <>{children}</>
}
export default ProtectedRoute
