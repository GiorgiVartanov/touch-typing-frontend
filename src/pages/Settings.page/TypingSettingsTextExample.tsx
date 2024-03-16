import { useTranslation } from "react-i18next"

import TypingArea from "../../components/TypingArea/TypingArea"

const TypingSettingsTextExample = () => {
  const { t } = useTranslation("translation", { keyPrefix: "settings page" })

  return (
    <div className="text-example ">
      <p>{t("text example")}</p>
      <TypingArea text={t("text example")} />
    </div>
  )
}
export default TypingSettingsTextExample
