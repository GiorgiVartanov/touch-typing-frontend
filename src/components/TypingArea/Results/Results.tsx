import { useMetrics } from "../../../store/context/MetricsContext"
import { useTranslation } from "react-i18next"
import calculateWPM from "../../../util/TypingStats/calculateWPM"
import calculateTime from "../../../util/TypingStats/calculateTime"
import calculateAccuracy from "../../../util/TypingStats/calculateAccuracy"
import { Link } from "react-router-dom"
import ArrowUp from "../../../assets/icons/arrow-up.svg?react"
import Button from "../../Form/Button"
import { useAuthStore } from "../../../store/context/authContext"

import RestartIcon from "../../../assets/icons/arrow-rotate-right.svg?react"

import Tooltip from "../../Tooltip/Tooltip"

// import RestartIcon from "./assets/arrow-rotate-right.svg?react"

import "./styles.scss"

const Results: React.FC<{
  handleRestart: () => void
  showGoToNextLevel?: boolean
  nextLevelURL?: string
  isLastAssessment?: boolean
  accuracyToComplete?: number
}> = ({
  handleRestart,
  showGoToNextLevel = false,
  nextLevelURL = "/",
  isLastAssessment = false,
  accuracyToComplete = 0,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "typer" })

  const { metrics } = useMetrics()
  const { user, isLoggedIn } = useAuthStore()

  const time = metrics.keyPressTimestamps[metrics.keyPressCount - 1] - metrics.keyPressTimestamps[0]
  // console.log(
  //   metrics,
  //   metrics.letterStatuses.reduce((accumulator, item) => {
  //     accumulator += item.length
  //     return accumulator
  //   }, metrics.letterStatuses.length - 1)
  // )
  const printCertificate = () => {
    if (!user) return

    const certificateContent = `
      <div>
        <h1>${t("Certificate of Completion")}</h1>
        <p>Student Name: ${user.username}</p>
        <p>Course Name: ${t("Touch Typing")}</p>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>${t("congratulations, you successfully completed touch typing course")}</p>
      </div>
    `

    const printWindow = window.open("", "_blank")

    if (!printWindow) return

    printWindow.document.open()

    printWindow.document.write(`
      <html>
        <head>
          <title>${t("Certificate")}</title>
          <style>
            body {font-family: "Poppins", "Noto Sans Georgian", sans-serif;
            h1 { color: #333; }
          </style>
        </head>
        <body>${certificateContent}</body>
      </html>
    `)
    printWindow.document.close()

    // Print the contents
    printWindow.print()
    printWindow.close()
  }

  const currentAccuracy = calculateAccuracy(
    metrics.letterStatuses.reduce((accumulator: number, item) => {
      accumulator += item.reduce((acc, item2) => {
        if (item2 === 2) return acc + 1
        else return acc
      }, 0)
      return accumulator
    }, metrics.letterStatuses.length as number),
    metrics.letterStatuses.reduce((accumulator: number, item) => {
      accumulator += item.reduce((acc, item2) => {
        if (item2 === 1) return acc + 1
        else return acc
      }, 0)
      return accumulator
    }, metrics.letterStatuses.length as number)
  )

  return (
    <div className="results">
      <div className="wpm metric">
        <div className="value">{calculateWPM(time / 1000, metrics.letterStatuses)}</div>
        <Tooltip
          className="name"
          tooltipPosition="bottom-right"
          showAsterisk={true}
          tooltipContent={t("WPM definition")}
        >
          {t("WPM")}
        </Tooltip>
      </div>
      <div className="accuracy metric">
        <div className="value">{currentAccuracy}%</div>
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
      {showGoToNextLevel &&
      !isLastAssessment &&
      isLoggedIn &&
      currentAccuracy >= accuracyToComplete &&
      time / 1000 <
        metrics.letterStatuses.reduce((accumulator, item) => {
          accumulator += item.length
          return accumulator
        }, metrics.letterStatuses.length - 1) ? (
        <Link
          to={nextLevelURL}
          className="go-to-next-lesson-button"
          replace
        >
          <p>{t("Go to Next Level")}</p>
          <ArrowUp className="icon" />
        </Link>
      ) : (
        ""
      )}
      {/* add ! before isLastAssessment to test printing */}
      {isLastAssessment ? (
        <Button
          className="print-certificate-button"
          onClick={printCertificate}
        >
          {t("Print Certificate")}
        </Button>
      ) : (
        ""
      )}
    </div>
  )
}

export default Results
