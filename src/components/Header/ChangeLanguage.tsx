import { useAppSettingsStore } from "../../store/context/appSettingsContext"

import GeorgianFlagIcon from "../../assets/icons/ge.svg?react"
import UKFlagIcon from "../../assets/icons/gb.svg?react"

const ChangeLanguage = () => {
  const { setLanguage, language } = useAppSettingsStore()

  const systemDefaultLanguage = navigator.language.split("-")[0]
  let defaultLanguageToDisplay = "En"

  if (systemDefaultLanguage === "ka") defaultLanguageToDisplay = "Geo"
  else defaultLanguageToDisplay = "En"

  const handleChangeLanguage = () => {
    if (language === "Geo") setLanguage("En")
    else if (language === "En") setLanguage("Geo")
    else if (language === "System Default" && defaultLanguageToDisplay === "En") setLanguage("Geo")
    else if (language === "System Default" && defaultLanguageToDisplay === "Geo") setLanguage("En")
  }

  return (
    <button
      onClick={handleChangeLanguage}
      className="change-language-button"
    >
      {language === "Geo" ? <GeorgianFlagIcon className="icon" /> : <UKFlagIcon className="icon" />}
    </button>
  )
}
export default ChangeLanguage
