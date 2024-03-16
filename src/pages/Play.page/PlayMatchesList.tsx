import { useState } from "react"
import Button from "../../components/Form/Button"
import { MatchStateList } from "../../types/match.types"
import PlayMatchCard from "./PlayMatchesCard"
import { useTranslation } from "react-i18next"

interface Props {
  matches: MatchStateList
  onClick: (key: string) => void
}

const PlayMatchesList = ({ matches, onClick }: Props) => {
  const [option, setOption] = useState<boolean>(false)
  const { t } = useTranslation("translation", { keyPrefix: "play page" })
  return (
    <div className="match-list">
      <div className="options">
        <Button
          key={1}
          className={option === false ? "active" : ""}
          onClick={() => setOption(false)}
        >
          {t("Active rooms")}
        </Button>
        <Button
          key={2}
          className={option === false ? "" : "active"}
          onClick={() => setOption(true)}
        >
          {t("Active matches")}
        </Button>
      </div>
      {Object.keys(matches)
        .filter((key) => matches[key].has_started === option)
        .map((key, ind) => (
          <PlayMatchCard
            key={ind}
            match={matches[key]}
            match_key={key}
            onClick={onClick}
            option={option}
          />
        ))}
    </div>
  )
}

export default PlayMatchesList
