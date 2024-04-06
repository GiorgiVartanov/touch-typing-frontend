import { useTranslation } from "react-i18next"

import TypingArea from "../TypingArea/TypingArea"

const TypingSettingsTextExample = () => {
  const { t } = useTranslation("translation", { keyPrefix: "settings page" })

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
