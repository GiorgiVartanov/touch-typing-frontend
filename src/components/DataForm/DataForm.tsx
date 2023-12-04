import { useEffect, useState } from "react";
import FakeWordsForm from "./FakeWordsForm"
import Loading from "../Loading/Loading";
import CorpusForm from "./CorpusForm";
import ByHand from "./ByHand";

import "./styles.scss"

type TextGenMode = "F" | "C" | "H" //FakeWords, Corpus, Hand (by hand)
const TextGenModes = ["F", "C", "H"]

export interface Props {
    setFetchedData: (data: string) => void,
    setLoading?: (val: boolean) => void,
    setError?: (err: boolean) => void,
}

interface FormProps {
    textChangeHandler: (data: string) => void
}

const DataForm = ({textChangeHandler} : FormProps) => {
    const [textGenerationMode, setTextGenerationMode] = useState<TextGenMode>("F");
    const [fetchedData, setFetchedData] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    
    if(loading) return <Loading/>
    if(error) return <div>Something went wrong, check browser console for more detailed information</div>

    useEffect(()=>{
        textChangeHandler(fetchedData)
    }, [fetchedData])

    return (
        <div className="textGen">
            <label>
                Generation Options:
                <select
                    value={textGenerationMode}
                    onChange={(e) => setTextGenerationMode(e.target.value as TextGenMode)}
                >
                    {
                    TextGenModes.map(mode=>(
                        <option 
                            key={mode}
                            value={mode}
                            >
                            {mode}
                        </option>
                        )
                    )
                    }
                </select>
            </label>
            {
                textGenerationMode === "F" ? <FakeWordsForm {...{setFetchedData, setLoading, setError}}/>
                : textGenerationMode === "C" ? <CorpusForm {...{setFetchedData, setLoading, setError}}/>
                : <ByHand {...{setFetchedData}}/>
            }
            <p>{fetchedData}</p>
        </div>
    )
}

export default DataForm