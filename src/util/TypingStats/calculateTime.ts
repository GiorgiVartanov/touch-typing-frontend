const calculateTime = (milliseconds: number) => {
  if (isNaN(milliseconds)) {
    return "Invalid input. Please provide a valid number of milliseconds."
  }
  const totalSeconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const remainingSeconds = totalSeconds % 3600
  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds

  if (hours > 0) {
    return `${hours}:${paddedMinutes}:${paddedSeconds}`
  } else if (minutes > 0) {
    return `${minutes}:${paddedSeconds}`
  } else {
    return `${seconds}s`
  }
}

export default calculateTime
