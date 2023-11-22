//sorry for commiting this on d-AssessLevel
const calculateWPM = (timeInSeconds: number, correctLetters: (0 | 1 | 2)[][]): number => {
  let wpm : number = 0.
  for(let i = 0; i < correctLetters.length; ++i){
      let ccs : number = 0 // current_correct_symbols_count
      const size : number = correctLetters[i].length
      for(let j = 0; j < size; ++j)
          if(correctLetters[i][j] === 2)
              ++ccs
      wpm += size * (ccs/size)
  }
  wpm /= ( timeInSeconds / 60 )
  wpm /= 7 //average word size in Georgian language
  return wpm
}

export default calculateWPM