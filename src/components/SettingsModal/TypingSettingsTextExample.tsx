import { useTranslation } from "react-i18next"

import { KeyboardLanguageType } from "../../types/typer.types/typingSettings.types"

import TypingArea from "../TypingArea/TypingArea"

interface Props {
  language: KeyboardLanguageType
}

const TypingSettingsTextExample = ({ language }: Props) => {
  const { t: tText } = useTranslation("translation", {
    keyPrefix: "settings page",
    lng: language.toLowerCase(),
  })
  const { t } = useTranslation("translation", { keyPrefix: "settings page" })

  return (
    <div className="text-example ">
      <p>{t("text example")}</p>
      <TypingArea
        text={tText("text example text")}
        textLanguage={language}
        showKeyboard={false}
      />
    </div>
  )
}
export default TypingSettingsTextExample
