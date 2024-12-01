import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useState, useRef } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"

import { useAuthStore } from "../../store/context/authContext"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import ProfileIcon from "../../assets/icons/user.svg?react"
import LogoutIcon from "../../assets/icons/arrow-right-from-bracket.svg?react"
import KeyboardIcon from "../../assets/icons/keyboard.svg?react"
import GlobeIcon from "../../assets/icons/globe.svg?react"
import LaptopIcon from "../../assets/icons/laptop.svg?react"
import HammerIcon from "../../assets/icons/hammer.svg?react"
import SearchIcon from "../../assets/icons/search.svg?react"
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

import "./styles.scss"

interface Props {
  isSticky?: boolean
}

const Header = ({ isSticky = false }: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "header" })

  const navRef = useRef<HTMLElement>(null)

  const navigate = useNavigate()
  const location = useLocation()

  const currentLocation = location.pathname

  const { isLoggedIn, logoutUser, user } = useAuthStore()

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

  useOnClickOutside(navRef, handleCloseNavigation)

  const renderAuthenticatedNavigation = () => {
    return (
      <NavItem
        icon={username || "profile"}
        hasActiveChild={currentLocation.includes("profile")}
      >
        <DropDownMenu>
          <DropDownItem
            icon={<ProfileIcon />}
            closeNavigation={handleCloseNavigation}
          >
            <NavLink to={`/profile/${username}/`}>{t("profile")}</NavLink>
          </DropDownItem>
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
        <NavItem
          icon={t("account")}
          hasActiveChild={currentLocation.includes("register") || currentLocation.includes("login")}
        >
          <DropDownMenu>
            <DropDownItem icon={<ProfileIcon />}>
              <NavLink
                to={`/register`}
                className="nav-item nav-item-link"
                onClick={handleCloseNavigation}
              >
                {t("register")}
              </NavLink>
            </DropDownItem>
            <DropDownItem icon={<LogoutIcon />}>
              <NavLink
                to={`/login`}
                className="nav-item nav-item-link"
                onClick={handleCloseNavigation}
              >
                {t("log in")}
              </NavLink>
            </DropDownItem>
          </DropDownMenu>
        </NavItem>
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
        text={t("are you sure you want to log out?")}
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
          <li className="header-buttons">
            <ul className="header-button-list">
              <li className="header-button-list-item">
                <ChangeTheme />
              </li>
              <li className="header-button-list-item">
                <ChangeLanguage />
              </li>
              <li className="header-button-list-item">
                <button
                  onClick={handleOpenSettingsMenu}
                  className="open-settings-button"
                >
                  <GearIcon className="icon" />
                </button>
              </li>
            </ul>
          </li>

          <NavItem
            icon={t("keyboard")}
            hasActiveChild={
              currentLocation.includes("layout") || currentLocation.includes("create")
            }
          >
            <DropDownMenu>
              <DropDownItem
                icon={<SearchIcon />}
                closeNavigation={handleCloseNavigation}
              >
                <NavLink to={`/layout`}>{t("search")}</NavLink>
              </DropDownItem>
              <DropDownItem
                icon={<HammerIcon />}
                closeNavigation={handleCloseNavigation}
              >
                <NavLink to={`/create`}>{t("create")}</NavLink>
              </DropDownItem>
            </DropDownMenu>
          </NavItem>
          <NavItem
            icon={t("type")}
            hasActiveChild={
              currentLocation.includes("lessons") ||
              currentLocation.includes("play") ||
              currentLocation.includes("practice")
            }
          >
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
      className={`header ${isSticky ? "sticky" : ""}`}
    >
      {renderGoToTopButton()}
      {renderConfirmLogoutModal()}

      <div className="header-content">
        <h1>
          <NavLink to="/">{t("website name")}</NavLink>
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
