import Button from "../../components/Form/Button"
import { MatchState } from "../../types/match.types"
import { useTranslation } from "react-i18next"

interface Props {
  match: MatchState
  onClick: (key: string) => void
}

const MatchHistoricalCard = ({ match, onClick }: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "forms" })
  return (
    <div className="match-card">
      <div className="head">
        <p>
          {t("Time limit")}: {match.time_limit} {t("seconds")}
        </p>
        <p>
          {t("User limit")}: {match.user_limit}
        </p>
      </div>
      <p>{match.text.length > 100 ? match.text.slice(0, 100) + "..." : match.text}</p>
      <div className="match-card-bottom">
        <p>{new Date(match.date).toString().slice(4, 25)}</p>
        <Button onClick={() => onClick(match._id)}>{t("View")}</Button>
      </div>
    </div>
  )
}

export default MatchHistoricalCard
