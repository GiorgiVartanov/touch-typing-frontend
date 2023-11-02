import { NavLink } from "react-router-dom"

import { useAuthStore } from "../../store/context/authContext"

import ChangeTheme from "./ChangeTheme"

import "./styles.scss"

const Header = () => {
  const { isLoggedIn, logoutUser, user } = useAuthStore()

  const username = user?.username

  return (
    <header className="header">
      <h1>
        <NavLink to="/">keyboard</NavLink>
      </h1>
      <nav>
        <ul>
          <li>
            <ChangeTheme />
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to={`/profile/${username}`}>profile</NavLink>
              </li>
              <li>
                <button onClick={logoutUser}>logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/register">register</NavLink>
              </li>
              <li>
                <NavLink to="/login">login</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
export default Header
