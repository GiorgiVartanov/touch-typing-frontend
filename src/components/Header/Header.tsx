import { NavLink } from "react-router-dom"

import { useAuthStore } from "../../store/context/authContext"

import ProfileIcon from "../../assets/icons/user-solid.svg?react"
import SettingsIcon from "../../assets/icons/gear.svg?react"
import LogoutIcon from "../../assets/icons/right-from-bracket-solid.svg?react"
import LoginIcon from "../../assets/icons/right-to-bracket-solid.svg?react"
import KeyboardIcon from "../../assets/icons/keyboard-regular.svg?react"
import UserGroupIcon from "../../assets/icons/user-group-solid.svg?react"
import GlobeIcon from "../../assets/icons/globe-solid.svg?react"
import LaptopIcon from "../../assets/icons/laptop-solid.svg?react"
import TrophyIcon from "../../assets/icons/trophy-solid.svg?react"
import BellIcon from "../../assets/icons/bell-solid.svg?react"

import ChangeTheme from "./ChangeTheme"
import DropDownItem from "./DropDownItem"
import DropDownMenu from "./DropDownMenu"
import NavItem from "./NavItem"

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
        <ul className="nav">
          <ChangeTheme />
          <NavItem icon="learn">
            <DropDownMenu>
              <DropDownItem icon={<LaptopIcon />}>
                <NavLink to={`/learn`}>lessons</NavLink>
              </DropDownItem>
              <DropDownItem icon={<GlobeIcon />}>
                <NavLink to={`/play`}>play online</NavLink>
              </DropDownItem>
              <DropDownItem icon={<KeyboardIcon />}>
                <NavLink to={`/practice`}>practice</NavLink>
              </DropDownItem>
            </DropDownMenu>
          </NavItem>
          {isLoggedIn ? (
            <>
              <NavItem icon={username || "profile"}>
                <DropDownMenu>
                  <DropDownItem icon={<ProfileIcon />}>
                    <NavLink to={`/profile/${username}`}>profile</NavLink>
                  </DropDownItem>
                  <DropDownItem icon={<BellIcon />}>
                    <NavLink to={`/notifications`}>notifications</NavLink>
                  </DropDownItem>
                  <DropDownItem icon={<UserGroupIcon />}>
                    <NavLink to={`/communities`}>communities</NavLink>
                  </DropDownItem>
                  <DropDownItem icon={<TrophyIcon />}>
                    <NavLink to={`/leaderboards`}>leaderboards</NavLink>
                  </DropDownItem>
                  <DropDownItem icon={<SettingsIcon />}>
                    <NavLink to={`/settings`}>settings</NavLink>
                  </DropDownItem>
                  <DropDownItem
                    icon={<LogoutIcon />}
                    className="logout-button"
                  >
                    <button onClick={logoutUser}>log out</button>
                  </DropDownItem>
                </DropDownMenu>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem icon={"log in"}>
                <DropDownMenu>
                  <DropDownItem icon={<ProfileIcon />}>
                    <NavLink to={`/register`}>register</NavLink>
                  </DropDownItem>
                  <DropDownItem icon={<LoginIcon />}>
                    <NavLink to={`/login`}>log in</NavLink>
                  </DropDownItem>
                </DropDownMenu>
              </NavItem>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
export default Header
