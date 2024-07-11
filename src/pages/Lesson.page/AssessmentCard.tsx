import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

interface Props {
  level: number
  isAvailable: boolean
  isCompleted: boolean
}

const AssessmentCard = ({ level, isAvailable, isCompleted }: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "lesson page" })

  return (
    <Link
      to={`assessment/${level}`}
      className={`assessment-link ${isAvailable ? "assessment-available" : "assessment-unavailable"} assessment-card ${isCompleted ? "assessment-completed" : ""}`}
    >
      <div className="assessment-button">
        {t("Assessment")} {"№"}
        {level}
      </div>
    </Link>
  )
}

export default AssessmentCard
