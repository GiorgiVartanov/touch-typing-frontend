import { useState } from "react";
import "./styles.scss"
import Typer from "../../components/Typer/Typer";
import calculateWPM from "../../util/calculateWPM";
import calculateAccuracy from "../../util/calculateAccuracy";
import { Link } from "react-router-dom";
import Button from "../../components/Form/Button";

interface Props {
    text: string
}

const AssessLevel = ({text} : Props) => {
    const [hasFinished, setHasFinished] = useState(false)
    const [timeTaken, setTimeTaken] = useState(1000) //made up default value... no thought preceded what so ever. 
    const [lettersStatuses, setLettersStatuses] = useState<(0 | 1 | 2)[][]>([])
    //const [assessmentLevel, setAssessmentLevel] = useState<("Basic" | "Thorough")>("Basic")

    const finishHandler = (wordLettersStatuses : (0 | 1 | 2)[][], startTime : Date | null) => {
        setHasFinished(true)
        setLettersStatuses(wordLettersStatuses)
        const finishTime = new Date()
        if(startTime){
            setTimeTaken(finishTime.getTime() - startTime.getTime())
        }
    }
    //ასოები რომ გამოვიტანოთ უჯრებად, ქვედა კუთხეში შეცდომათა ოდენობა და ბექგრაუნდი იქნება სიხშირეების მიხედვით, ალბათ... მეტშეცდომიანს, მეტი წითელი ფერი.
    //Typer-ს კიდევ შევცვლი, რომ letterStatuses გადაეცეს თან და TypingAbility = false რამე ცვლადს გავაყოლებ, რომ ვხედავდეთ შედეგს, მარა ვერ ვცვლიდეთ ტექსტს.
    const assess = () => {
        //const georgianLetters = "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ".split("")
        const letterTypos : Map<string, number> = new Map<string, number>()
        const letterArr = text.split(" ")
        lettersStatuses.forEach((word,i)=>{
            word.forEach((lett,j)=>
                {
                    if(lett != 2){
                        const status : number | undefined = letterTypos.get(letterArr[i][j])
                        letterTypos.set(letterArr[i][j], 1 + (status ? status : 0))
                    }
                }
            )
        })
        const lettersWrong : {letter: string; count: number}[] = []
        letterTypos.forEach((status,lett)=>lettersWrong.push({letter:lett,count:status}))
        const maximalWrongness : number = lettersWrong.length ? lettersWrong.reduce((prev,cur)=>prev.count<cur.count?cur:prev).count : 0
        return (            
            <div className="result">
                { lettersWrong.length ?
                <>
                    <div className="wrong-letters">
                            {
                                lettersWrong.map((wrongLetter,index)=>{
                                    return (
                                        <div key={index} className="letter" style={{background:"RGB("+((wrongLetter.count/maximalWrongness)*200+55)+",0,0)"}}                                        
                                        ><span>{wrongLetter.letter}</span><span>{wrongLetter.count}</span></div>
                                    )
                                })
                            }
                    </div>
                    <Link className="linker"
                        to={`../learn`}
                        key={34}
                    >We recommend you to work on the abovementioned letters. Follow the link...</Link>
                </>
                :
                <></>
                }
            </div>
        )
    }

    const reset = () => {
        setHasFinished(false)
        setLettersStatuses([])
        setTimeTaken(1000) //made up value
    }

    return(
        <>
            {hasFinished ? <>
                    <div className="assess-message">
                        <div className="stats">
                            <h1 key={1}>
                                time taken: {(timeTaken/1000).toFixed(2)}s
                            </h1>
                            <h1 key={2}>
                                WPM: {calculateWPM(timeTaken/1000, lettersStatuses).toFixed(2)}
                            </h1>
                            <h1 key={3}>
                                Accuracy: {(calculateAccuracy(lettersStatuses)*100).toFixed(2)}%
                            </h1>
                        </div>
                        {
                            assess()
                        }
                        <Button onClick={ () => reset() } >
                            Reassess your level
                        </Button>
                    </div>
                </>            
                : <Typer
                    text = {text}
                    wordSeparator = ""
                    finishHandler = {finishHandler}
                />
            }
        </>
    )
}

export default AssessLevel;