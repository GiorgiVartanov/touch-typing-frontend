import { useEffect, useState } from "react"
import { Props } from "./DataForm"

const ByHand = ({setFetchedData}: Props) => {
    const [textForm, setTextForm] = useState<string>("")
    useEffect(()=>{
        setFetchedData(textForm)
    }, [textForm])

    return <div className="by-hand">
        <textarea onChange={(e) => setTextForm(e.target.value)}/>
    </div>
}

export default ByHand