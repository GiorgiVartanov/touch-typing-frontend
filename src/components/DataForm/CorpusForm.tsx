import { useEffect, useState } from "react"
import ajax from "../../services/ajax"
import { Props } from "./DataForm"
import Input from "../Form/Input"

const CorpusForm = ({setFetchedData, setLoading, setError}: Props) => {
    const [amount, setAmount] = useState<Number>(10)

    useEffect(() => {
        console.log("Here");
        if(setLoading)
            setLoading(true)
        if(setError)
            setError(false)
    
        setFetchedData("")
    
        try {
          const fetchLesson = async () => {
            const response = await ajax.get(
              `/lesson/words?amount=${amount}`
            )           
            
            setFetchedData(response.data.map((el:{_id:string, word:string, count:number})=>el.word).join(" "))
          }
    
          fetchLesson()
        } catch (error) {
          console.error("Error fetching data:", error)
          if(setError)
            setError(true)
        }
        
        if(setLoading)
            setLoading(false)
    }, [amount])

    return <div className="corpus">
            <p>amount:</p>
            <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    if(Number(e.target.value) > 0 && Number(e.target.value) < 1000)
                      setAmount(Number(e.target.value))
                    else if(Number(e.target.value) >= 1000) setAmount(999)
                    else setAmount(1)
                }}
                type="number"
                name="amount"
                value={String(amount)}
            />
        </div>
}

export default CorpusForm