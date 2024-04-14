import { NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"

import { useAuthStore } from "../../store/context/authContext"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import ProfileIcon from "../../assets/icons/user.svg?react"
import SettingsIcon from "../../assets/icons/gear.svg?react"
import LogoutIcon from "../../assets/icons/arrow-right-from-bracket.svg?react"
import KeyboardIcon from "../../assets/icons/keyboard.svg?react"
import UserGroupIcon from "../../assets/icons/user-group.svg?react"
import GlobeIcon from "../../assets/icons/globe.svg?react"
import LaptopIcon from "../../assets/icons/laptop.svg?react"
import TrophyIcon from "../../assets/icons/trophy.svg?react"
import BellIcon from "../../assets/icons/bell.svg?react"
import GamepadIcon from "../../assets/icons/gamepad.svg?react"
import GearIcon from "../../assets/icons/gear.svg?react"

import SettingsModal from "../SettingsModal/SettingsModal"
import ChangeTheme from "./ChangeTheme"
import ChangeLanguage from "./ChangeLanguage"
import DropDownItem from "./DropDownItem"
import DropDownMenu from "./DropDownMenu"
import NavItem from "./NavItem"
import ScrollToTop from "./ScrollToTop"
import ConfirmModal from "../Modal/ConfirmModal"
import Button from "../Form/Button"
import NotificationsAmount from "./NotificationsAmount"

import "./styles.scss"

const Header = () => {
  const { t } = useTranslation("translation", { keyPrefix: "header" })

  const navRef = useRef<HTMLElement>(null)

  const navigate = useNavigate()

  const { isLoggedIn, logoutUser, user, token } = useAuthStore()

  // const [previousScrollPosition, setPreviousScrollPosition] = useState<number>(0)
  // const [isVisible, setIsVisible] = useState<boolean>(true)
  // const [isOnTop, setIsOnTop] = useState<boolean>(true)
  const [showScrollToTopButton, setScrollToTopButton] = useState<boolean>(false)
  const [isConfirmLogoutModalVisible, setIsConfirmLogoutModalVisible] = useState<boolean>(false)
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState<boolean>(false)
  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false)

  const username = user?.username

  const handleLogout = () => {
    setIsConfirmLogoutModalVisible(true)
  }

  const closeLogoutConfirmationModal = () => {
    setIsConfirmLogoutModalVisible(false)
  }

  const handleCloseNavigation = () => {
    setIsNavigationOpen(false)
  }

  const handleNavigationToggle = () => {
    setIsNavigationOpen((prevState) => !prevState)
  }

  const handleOpenSettingsMenu = () => {
    setIsSettingsMenuOpen(true)
  }

  const handleCloseSettingsMenu = () => {
    setIsSettingsMenuOpen(false)
  }

  // useEffect(() => {
  //   // fix latter

  //   const handleScroll = () => {
  //     const currentScrollPosition = window.scrollY

  //     setIsVisible(currentScrollPosition < previousScrollPosition)
  //     setIsOnTop(currentScrollPosition < 30)
  //     setScrollToTopButton(currentScrollPosition > 600)

  //     setPreviousScrollPosition(currentScrollPosition)
  //   }

  //   window.addEventListener("scroll", handleScroll)

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll)
  //   }
  // }, [previousScrollPosition])

  useOnClickOutside(navRef, handleCloseNavigation)

  const renderAuthenticatedNavigation = () => {
    return (
      <NavItem icon={username || "profile"}>
        <DropDownMenu>
          <DropDownItem
            icon={<ProfileIcon />}
            closeNavigation={handleCloseNavigation}
          >
            <NavLink to={`/profile/${username}/`}>{t("profile")}</NavLink>
          </DropDownItem>
          {/* <DropDownItem
            icon={<BellIcon />}
            closeNavigation={handleCloseNavigation}
          >
            <NavLink
              to={`/notifications`}
              className="notifications-link"
            >
              {token ? <NotificationsAmount token={token} /> : null}
              {t("notifications")}
            </NavLink>
          </DropDownItem> */}
          <DropDownItem
            icon={<LogoutIcon />}
            className="logout-button-item"
          >
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              {t("log out")}
            </button>
          </DropDownItem>
        </DropDownMenu>
      </NavItem>
    )
  }

  const renderGuestNavigation = () => {
    return (
      <>
        <NavLink
          to={`/register`}
          className="nav-item nav-item-link"
          onClick={handleCloseNavigation}
        >
          {t("register")}
        </NavLink>
        <NavLink
          to={`/login`}
          className="nav-item nav-item-link"
          onClick={handleCloseNavigation}
        >
          {t("log in")}
        </NavLink>
      </>
    )
  }

  const renderConfirmLogoutModal = () => {
    const appElement = document.querySelector(".App")

    if (!appElement) return

    return createPortal(
      <ConfirmModal
        closeModal={closeLogoutConfirmationModal}
        isVisible={isConfirmLogoutModalVisible}
        text="are you sure you want to log out?"
        buttons={
          <>
            <Button
              className="positive"
              onClick={closeLogoutConfirmationModal}
            >
              {t("stay")}
            </Button>
            <Button
              onClick={() => {
                logoutUser()
                closeLogoutConfirmationModal()
                navigate("/login")
              }}
              className="negative"
            >
              {t("log out")}
            </Button>
          </>
        }
      />,
      appElement
    )
  }

  const renderGoToTopButton = () => {
    const appElement = document.querySelector(".App")

    if (!appElement) return

    return createPortal(<ScrollToTop isVisible={showScrollToTopButton} />, appElement)
  }

  const renderSettingsMenu = () => {
    return (
      <SettingsModal
        isVisible={isSettingsMenuOpen}
        closeModal={handleCloseSettingsMenu}
      />
    )
  }

  const renderNavigation = () => {
    return (
      <nav className={isNavigationOpen ? "nav-shown" : "nav-hidden"}>
        <ul className="nav">
          <li className="nav-button-li">
            <ChangeTheme />
          </li>
          <li className="nav-button-li">
            <ChangeLanguage />
          </li>
          <button
            onClick={handleOpenSettingsMenu}
            className="open-settings-button"
          >
            <GearIcon className="icon" />
          </button>
          <NavItem icon={t("learn")}>
            <DropDownMenu>
              <DropDownItem
                icon={<LaptopIcon />}
                closeNavigation={handleCloseNavigation}
              >
                <NavLink to={`/lessons`}>{t("lessons")}</NavLink>
              </DropDownItem>
              <DropDownItem
                icon={<GlobeIcon />}
                closeNavigation={handleCloseNavigation}
              >
                <NavLink to={`/play`}>{t("competition")}</NavLink>
              </DropDownItem>
              <DropDownItem
                icon={<KeyboardIcon />}
                closeNavigation={handleCloseNavigation}
              >
                <NavLink to={`/practice`}>{t("practice")}</NavLink>
              </DropDownItem>
              <DropDownItem
                icon={<GamepadIcon />}
                closeNavigation={handleCloseNavigation}
              >
                <NavLink to={`/games`}>{t("games")}</NavLink>
              </DropDownItem>
            </DropDownMenu>
          </NavItem>
          {isLoggedIn ? renderAuthenticatedNavigation() : renderGuestNavigation()}
          {isSettingsMenuOpen ? renderSettingsMenu() : null}
        </ul>
      </nav>
    )
  }

  return (
    <header
      ref={navRef}
      className="header"
    >
      {renderGoToTopButton()}
      {renderConfirmLogoutModal()}

      <div className="header-content">
        <h1>
          <NavLink to="/">{t("touch typing")}</NavLink>
        </h1>
        <button
          className={`menu-button ${isNavigationOpen ? "navigation-open" : ""}`}
          onClick={handleNavigationToggle}
        >
          <div className="menu-button-line"></div>
          <div className="menu-button-line"></div>
          <div className="menu-button-line"></div>
        </button>
        {renderNavigation()}
      </div>
    </header>
  )
}
export default Header
