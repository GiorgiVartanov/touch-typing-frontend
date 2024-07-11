import { useTranslation } from "react-i18next"

interface Props {
  level: number
}

const AssessmentCard = ({ level }: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "lesson page" })

  return (
    <div>
      {t("Assessment")} {level}
    </div>
  )
}

export default AssessmentCard
