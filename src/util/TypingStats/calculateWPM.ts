import { wordsLetterStatusesType, LetterStatus } from "../../types/typer.types/letterStatuses.types"
export const averageWordSize = 7

// wpm = ( (count characters in correct words) / (time in minutes) / (avg word size) )
const calculateWPM = (
  timeInSeconds: number,
  wordsLetterStatuses: wordsLetterStatusesType
): number => {
  let wpm: number = 0
  wordsLetterStatuses.forEach((wordLetterStatuses) => {
    if (wordLetterStatuses.every((letterStatus) => letterStatus === LetterStatus.Correct)) {
      wpm += wordLetterStatuses.length
    }
  })

  wpm /= timeInSeconds / 60
  wpm /= averageWordSize
  return Math.round(wpm)
}

export default calculateWPM
