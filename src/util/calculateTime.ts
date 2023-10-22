const calculateTime = (milliseconds: number) => {
  if (isNaN(milliseconds)) {
    return "Invalid input. Please provide a valid number of milliseconds."
  }

  const totalSeconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  if (minutes > 0 && seconds > 0) {
    return `${minutes} minutes ${seconds} seconds`
  } else if (minutes > 0) {
    return `${minutes} minutes`
  } else {
    return `${seconds} seconds`
  }
}

export default calculateTime
