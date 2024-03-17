import { useMetrics } from "../../../store/context/MetricsContext"
import calculateWPM from "../../../util/TypingStats/calculateWPM"
import calculateTime from "../../../util/TypingStats/calculateTime"
import calculateAccuracy from "../../../util/TypingStats/calculateAccuracy"

import RestartIcon from "../../../assets/icons/arrow-rotate-right.svg?react"

import "./styles.scss"

const Results: React.FC<{ handleRestart: () => void }> = ({ handleRestart }) => {
  const { metrics } = useMetrics()

  const time = metrics.keyPressTimestamps[metrics.keyPressCount - 1] - metrics.keyPressTimestamps[0]
  return (
    <div className="results">
      <div className="wpm metric">
        <div className="value">{calculateWPM(time / 1000, metrics.letterStatuses)}</div>
        <div className="name">WPM</div>
      </div>
      <div className="accuracy metric">
        <div className="value">
          {calculateAccuracy(metrics.correctPressCount, metrics.incorrectPressCount)}%
        </div>
        <div className="name">ACCURACY</div>
      </div>
      <div className="metric">
        <div className="value">{calculateTime(time)}</div>
        <div className="name">TIME</div>
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
