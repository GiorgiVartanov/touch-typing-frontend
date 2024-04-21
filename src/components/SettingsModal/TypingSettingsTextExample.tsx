import { useTranslation } from "react-i18next"

import { KeyboardLanguageType } from "../../types/typer.types/typingSettings.types"

import TypingArea from "../TypingArea/TypingArea"

interface Props {
  language?: KeyboardLanguageType
}

const TypingSettingsTextExample = ({ language }: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "settings page", lng: language })

  return (
    <div className="text-example ">
      <p>{t("text example")}</p>
      <TypingArea
        text={t("text example text")}
        showKeyboard={false}
      />
    </div>
  )
}
export default TypingSettingsTextExample
