import { useAppSettingsStore } from "../../store/context/appSettingsContext"

const geoFlagUrl = new URL("/assets/flags/ge.svg", import.meta.url).href
const usFlagUrl = new URL("/assets/flags/us.svg", import.meta.url).href

const ChangeLanguage = () => {
  const { setLanguage, language } = useAppSettingsStore()

  const systemDefaultLanguage = navigator.language.split("-")[0]
  let defaultLanguageToDisplay = "Eng"

  if (systemDefaultLanguage === "ka") defaultLanguageToDisplay = "Geo"
  else defaultLanguageToDisplay = "Eng"

  const handleChangeLanguage = () => {
    if (language === "Geo") setLanguage("Eng")
    else if (language === "Eng") setLanguage("Geo")
    else if (language === "System Default" && defaultLanguageToDisplay === "Eng") setLanguage("Geo")
    else if (language === "System Default" && defaultLanguageToDisplay === "Geo") setLanguage("Eng")
  }

  return (
    <button
      onClick={handleChangeLanguage}
      className="change-language-button"
    >
      {language === "Geo" ? (
        <div
          className="flag-icon"
          style={{ backgroundImage: `url(${usFlagUrl})` }}
        />
      ) : (
        <div
          className="flag-icon"
          style={{ backgroundImage: `url(${geoFlagUrl})` }}
        />
      )}
    </button>
  )
}
export default ChangeLanguage
