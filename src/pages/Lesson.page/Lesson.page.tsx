import PageLayout from "../../layout/Page.layout/Page.layout"
import "./styles.scss"
import { useAuthStore } from "../../store/context/authContext"
import ExerciseGroup from "./ExerciseGroup"

const Lesson = () => {
  const { user } = useAuthStore()

  const completedAssessments = user?.completedAssessments

  const group_1 = ["ა", "ი", "ს", "რ", "მ", "ლ"]
  const group_2 = ["ე", "ნ", "დ", "ბ", "ვ", "თ"]
  const group_3 = ["ო", "გ", "ტ", "შ", "ხ", "კ"]
  const group_4 = ["უ", "ც", "ქ", "ზ", "წ"]
  const group_5 = ["ფ", "პ", "ყ", "ღ", "ძ"]
  const group_6 = ["ჩ", "ჯ", "ჭ", "ჰ", "ჟ"]

  return (
    <PageLayout>
      <div className="list">
        <ExerciseGroup
          letters={group_1}
          assessmentLevel={1}
          isAvailable={true}
        />
        <ExerciseGroup
          letters={group_2}
          assessmentLevel={2}
          isAvailable={completedAssessments?.includes(1)}
        />
        <ExerciseGroup
          letters={group_3}
          assessmentLevel={3}
          isAvailable={
            Array.isArray(completedAssessments) &&
            [1, 2].every((value) => completedAssessments.includes(value))
          }
        />
        <ExerciseGroup
          letters={group_4}
          assessmentLevel={4}
          isAvailable={
            Array.isArray(completedAssessments) &&
            [1, 2, 3].every((value) => completedAssessments.includes(value))
          }
        />
        <ExerciseGroup
          letters={group_5}
          assessmentLevel={5}
          isAvailable={
            Array.isArray(completedAssessments) &&
            [1, 2, 3, 4].every((value) => completedAssessments.includes(value))
          }
        />
        <ExerciseGroup
          letters={group_6}
          assessmentLevel={6}
          isAvailable={
            Array.isArray(completedAssessments) &&
            [1, 2, 3, 4, 5].every((value) => completedAssessments.includes(value))
          }
        />
      </div>
    </PageLayout>
  )
}

export default Lesson
