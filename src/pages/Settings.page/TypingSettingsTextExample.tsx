import { useTranslation } from "react-i18next"

import Typer from "../../components/Typer/Typer"

const TypingSettingsTextExample = () => {
  const { t } = useTranslation("translation", { keyPrefix: "settings page" })

  return (
    <div className="text-example ">
      <p>{t("text example")}</p>
      <Typer text={t("text example text")} />
    </div>
  )
}
export default TypingSettingsTextExample
