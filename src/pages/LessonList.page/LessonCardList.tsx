import LessonCard from "./LessonCard"
import CardSection from "../../components/Card/CardSection"

interface Props {
  lessonList?: {
    title: string
    _id: string
    description: string
    level: string
    approximateDuration: number
  }[]
  id: string
  sectionName: string
}

// renders multiple LessonCards in a list
// renders name (difficulty) of lessons
// gives id to it, it will be used to scroll to this element
const LessonCardList = ({ lessonList = [], id, sectionName }: Props) => {
  return (
    <CardSection
      id={id}
      sectionName={sectionName}
      className="lesson-card-list"
    >
      {lessonList.map((lesson, index) => (
        <LessonCard
          title={lesson.title}
          description={lesson.description}
          approximateDuration={lesson.approximateDuration}
          level={lesson.level}
          _id={lesson._id}
          style={{ animationDelay: `${index * 0.05}s` }}
          key={lesson._id}
        />
      ))}
    </CardSection>
  )
}

export default LessonCardList
