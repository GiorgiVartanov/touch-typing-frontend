import { useMetrics } from "../../../store/context/MetricsContext"
import { useTranslation } from "react-i18next"
import calculateWPM from "../../../util/TypingStats/calculateWPM"
import calculateTime from "../../../util/TypingStats/calculateTime"
import calculateAccuracy from "../../../util/TypingStats/calculateAccuracy"

import RestartIcon from "../../../assets/icons/arrow-rotate-right.svg?react"

import Tooltip from "../../Tooltip/Tooltip"

// import RestartIcon from "./assets/arrow-rotate-right.svg?react"

import "./styles.scss"

const Results: React.FC<{ handleRestart: () => void }> = ({ handleRestart }) => {
  const { t } = useTranslation("translation", { keyPrefix: "typer" })

  const { metrics } = useMetrics()

  const time = metrics.keyPressTimestamps[metrics.keyPressCount - 1] - metrics.keyPressTimestamps[0]
  return (
    <div className="results">
      <div className="wpm metric">
        <div className="value">{calculateWPM(time / 1000, metrics.letterStatuses)}</div>
        <Tooltip
          className="name"
          tooltipPosition="bottom"
          tooltipContent={t("WPM definition")}
        >
          {t("WPM")}
        </Tooltip>
      </div>
      <div className="accuracy metric">
        <div className="value">
          {calculateAccuracy(metrics.correctPressCount, metrics.incorrectPressCount)}%
        </div>
        <div className="name">{t("accuracy")}</div>
      </div>
      <div className="metric">
        <div className="value">{calculateTime(time)}</div>
        <div className="name">{t("time")}</div>
      </div>
      <button
        onClick={handleRestart}
        className="restart"
      >
        <RestartIcon />
      </button>
    </div>
  )
}

export default Results
