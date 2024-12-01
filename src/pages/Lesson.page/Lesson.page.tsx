import PageLayout from "../../layout/Page.layout/Page.layout"
import "./styles.scss"
import { useAuthStore } from "../../store/context/authContext"
import ExerciseGroup from "./ExerciseGroup"

const Lesson = () => {
  const { user } = useAuthStore()

  const completedAssessments = user?.completedAssessments

  const assessmentLessonRequirements = [
    ["ა", "ი", "ს", "რ", "მ", "ლ"],
    ["ე", "ნ", "დ", "ბ", "ვ", "თ"],
    ["ო", "გ", "ტ", "შ", "ხ", "კ"],
    ["უ", "ც", "ქ", "ზ", "წ"],
    ["ფ", "პ", "ყ", "ღ", "ძ"],
    ["ჩ", "ჯ", "ჭ", "ჰ", "ჟ"],
  ]

  return (
    <PageLayout>
      <div className="list">
        <ExerciseGroup
          letters={assessmentLessonRequirements[0]}
          assessmentLevel={1}
          isAvailable={true}
          completedLessons={user?.completedLessons}
          completedAssessments={user?.completedAssessments}
        />
        <ExerciseGroup
          letters={assessmentLessonRequirements[1]}
          assessmentLevel={2}
          isAvailable={completedAssessments?.includes(1)}
          completedLessons={user?.completedLessons}
          completedAssessments={user?.completedAssessments}
        />
        <ExerciseGroup
          letters={assessmentLessonRequirements[2]}
          assessmentLevel={3}
          isAvailable={
            Array.isArray(completedAssessments) &&
            [1, 2].every((value) => completedAssessments.includes(value))
          }
          completedLessons={user?.completedLessons}
          completedAssessments={user?.completedAssessments}
        />
        <ExerciseGroup
          letters={assessmentLessonRequirements[3]}
          assessmentLevel={4}
          isAvailable={
            Array.isArray(completedAssessments) &&
            [1, 2, 3].every((value) => completedAssessments.includes(value))
          }
          completedLessons={user?.completedLessons}
          completedAssessments={user?.completedAssessments}
        />
        <ExerciseGroup
          letters={assessmentLessonRequirements[4]}
          assessmentLevel={5}
          isAvailable={
            Array.isArray(completedAssessments) &&
            [1, 2, 3, 4].every((value) => completedAssessments.includes(value))
          }
          completedLessons={user?.completedLessons}
          completedAssessments={user?.completedAssessments}
        />
        <ExerciseGroup
          letters={assessmentLessonRequirements[5]}
          assessmentLevel={6}
          isAvailable={
            Array.isArray(completedAssessments) &&
            [1, 2, 3, 4, 5].every((value) => completedAssessments.includes(value))
          }
          completedLessons={user?.completedLessons}
          completedAssessments={user?.completedAssessments}
        />
      </div>
    </PageLayout>
  )
}

export default Lesson
