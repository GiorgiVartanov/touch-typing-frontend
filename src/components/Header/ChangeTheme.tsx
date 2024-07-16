import { useAppSettingsStore } from "../../store/context/appSettingsContext"

import SunIcon from "../../assets/icons/sun.svg?react"
import MoonIcon from "../../assets/icons/moon.svg?react"

// renders a button to change theme
const ChangeTheme = () => {
  const { theme, setTheme } = useAppSettingsStore()

  let themeToApply

  if (theme === "Dark") themeToApply = "dark"
  else if (theme === "Light") themeToApply = "light"
  else if (window.matchMedia("(prefers-color-scheme: dark)")) themeToApply = "dark"
  else themeToApply = "light"

  const handleOnClick = () => {
    if (theme === "Dark") {
      setTheme("Light")
    } else if (theme === "Light") {
      setTheme("Dark")
    } else if (theme === "System Default" && window.matchMedia("(prefers-color-scheme: dark)")) {
      setTheme("Light")
    } else {
      setTheme("Dark")
    }
  }

  return (
    <button
      name="change-theme"
      onClick={handleOnClick}
      className="change-theme-button"
      aria-label="change theme"
    >
      <div className={`theme-icon theme-${themeToApply}`}>
        {themeToApply === "dark" ? (
          <MoonIcon className="moon-icon" />
        ) : (
          <SunIcon className="sun-icon" />
        )}
      </div>
    </button>
  )
}
export default ChangeTheme
