/// <reference types="vite-plugin-svgr/client" />
// fixed issue with importing svg file as a component

import { useEffect } from "react"

import { useAuthStore } from "../../store/context/authContext"
import { useAppSettingsStore } from "../../store/context/appSettingsContext"
import { ThemeType } from "../../types/appSettings.types"

import SunIcon from "../../assets/icons/sun-solid.svg?react"
import MoonIcon from "../../assets/icons/moon-solid.svg?react"

// renders a button to change theme
const ChangeTheme = () => {
  const { preferredTheme, changeSetting } = useAppSettingsStore()
  const { isLoggedIn } = useAuthStore()

  // sets theme to dark
  const handleSetDarkTheme = () => {
    document.documentElement.classList.add("dark")
    changeSetting("preferredTheme", "Dark")
  }

  // sets theme to light
  const handleSetLightTheme = () => {
    document.documentElement.classList.remove("dark")
    changeSetting("preferredTheme", "Light")
  }

  // sets theme to the passed value (light or dark)
  const handleThemeChange = (theme: ThemeType) => {
    switch (theme) {
      case "Dark":
        handleSetDarkTheme()
        break
      case "Light":
        handleSetLightTheme()
        break
      case "System Default":
        if (window.matchMedia("(prefers-color-scheme: dark)")) {
          handleThemeChange("Dark")
        } else {
          handleThemeChange("Light")
        }
        break
      default:
        handleSetDarkTheme()
    }
  }

  const handleOnClick = () => {
    if (preferredTheme === "System Default" && window.matchMedia("(prefers-color-scheme: dark)")) {
      // if before theme change user had selected system default, and their default theme was dark

      handleThemeChange("Light")
    } else if (preferredTheme === "System Default") {
      // if before theme change user had selected system default, and their default theme was light

      handleThemeChange("Dark")
    } else if (preferredTheme === "Dark") {
      // if user had dark theme

      handleThemeChange("Light")
    } else {
      // if user had light theme

      handleThemeChange("Dark")
    }
  }

  useEffect(() => {
    switch (preferredTheme) {
      case "Dark":
        document.documentElement.classList.add("dark")
        break
      case "Light":
        document.documentElement.classList.remove("dark")
        break
      case "System Default":
        if (window.matchMedia("(prefers-color-scheme: dark)")) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
        break
      default:
        document.documentElement.classList.add("dark")
    }
  }, [isLoggedIn, preferredTheme])

  return (
    <button
      name="change-theme"
      onClick={handleOnClick}
      className="change-theme-button"
      aria-label="change theme"
    >
      <div className={`theme-icon theme-${preferredTheme}`}>
        {preferredTheme === "Dark" ? (
          <MoonIcon className="moon-icon" />
        ) : (
          <SunIcon className="sun-icon" />
        )}
      </div>
    </button>
  )
}
export default ChangeTheme
