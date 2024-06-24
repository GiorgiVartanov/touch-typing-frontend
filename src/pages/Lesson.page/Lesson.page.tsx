import { useState } from "react"
import PageLayout from "../../layout/Page.layout/Page.layout"
import Assessment from "./Assessment"
import AssessmentCard from "./AssessmentCard"
import Exercise from "./Exercise"
import ExerciseCard from "./ExerciseCard"
import "./style.css"
import Button from "../../components/Form/Button"

const Lesson = () => {
  const group_1 = ["ა", "ი", "ს", "რ", "მ", "ლ"]
  const group_2 = ["ე", "ნ", "დ", "ბ", "ვ", "თ"]
  const group_3 = ["ო", "გ", "ტ", "შ", "ხ", "კ"]
  const group_4 = ["უ", "ც", "ქ", "ზ", "წ"]
  const group_5 = ["ფ", "პ", "ყ", "ღ", "ძ"]
  const group_6 = ["ჩ", "ჯ", "ჭ", "ჰ", "ჟ"]
  const assessment = ["1", "2", "3", "4", "5", "6"]
  const [what, setWhat] = useState<undefined | string>(undefined)
  return (
    <PageLayout>
      {what === undefined ? (
        <div className="list">
          <div className="row">
            {group_1.map((lett) => (
              <Button
                onClick={() => {
                  setWhat(lett)
                }}
              >
                <ExerciseCard letter={lett} />
              </Button>
            ))}
            <Button
              onClick={() => {
                setWhat("1")
              }}
            >
              <AssessmentCard level={"1"} />{" "}
            </Button>
          </div>
          <div className="row">
            {group_2.map((lett) => (
              <Button
                onClick={() => {
                  setWhat(lett)
                }}
              >
                <ExerciseCard letter={lett} />
              </Button>
            ))}
            <Button
              onClick={() => {
                setWhat("2")
              }}
            >
              <AssessmentCard level={"2"} />
            </Button>
          </div>
          <div className="row">
            {group_3.map((lett) => (
              <Button
                onClick={() => {
                  setWhat(lett)
                }}
              >
                <ExerciseCard letter={lett} />
              </Button>
            ))}
            <Button
              onClick={() => {
                setWhat("1")
              }}
            >
              <AssessmentCard level={"3"} />
            </Button>
          </div>
          <div className="row">
            {group_4.map((lett) => (
              <Button
                onClick={() => {
                  setWhat(lett)
                }}
              >
                <ExerciseCard letter={lett} />
              </Button>
            ))}
            <Button
              onClick={() => {
                setWhat("4")
              }}
            >
              <AssessmentCard level={"4"} />
            </Button>
          </div>
          <div className="row">
            {group_5.map((lett) => (
              <Button
                onClick={() => {
                  setWhat(lett)
                }}
              >
                <ExerciseCard letter={lett} />
              </Button>
            ))}
            <Button
              onClick={() => {
                setWhat("1")
              }}
            >
              <AssessmentCard level={"5"} />
            </Button>
          </div>
          <div className="row">
            {group_6.map((lett) => (
              <Button
                onClick={() => {
                  setWhat(lett)
                }}
              >
                <ExerciseCard letter={lett} />
              </Button>
            ))}
            <Button
              onClick={() => {
                setWhat("1")
              }}
            >
              <AssessmentCard level={"6"} />
            </Button>
          </div>
        </div>
      ) : assessment.includes(what) ? (
        <Assessment assessment_level={Number(what)} />
      ) : (
        <Exercise letter={what} />
      )}
    </PageLayout>
  )
}

export default Lesson
