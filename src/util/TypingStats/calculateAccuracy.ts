const calculateAccuracy = (correctCount: number, incorrectCount: number) => {
  return Math.round((correctCount / (correctCount + incorrectCount)) * 100)
}

export default calculateAccuracy
