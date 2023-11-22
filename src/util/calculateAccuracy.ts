//Accuracy decreases quadratically per word as more mistakes are made
const calculateAccuracy = (correctLetters: (0 | 1 | 2)[][]): number => {
    let Accuracy : number = 0.
    for(let i = 0; i < correctLetters.length; ++i){
        //number of correct symbols per word
        let ccs : number = 0 
        const size : number = correctLetters[i].length
        for(let j = 0; j < size; ++j)
            if(correctLetters[i][j] === 2)
                ++ccs
        Accuracy += (ccs/size)**2
    }
    return Accuracy / correctLetters.length // average of the accuracy of all the words.
}

export default calculateAccuracy