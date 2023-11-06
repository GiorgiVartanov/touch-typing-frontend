import { LessonType } from "../../types/lesson.types"

import LessonCard from "./LessonCard"

interface Props {
  lessonList: LessonType[]
  id: string
  name: string
}

// renders multiple LessonCards in a list
// renders name (difficulty) of lessons
// gives id to it, it will be used to scroll to this element
const LessonCardList = ({ lessonList, id, name }: Props) => {
  if (lessonList.length === 0) return <div></div> // change it latter

  return (
    <div
      id={id}
      className="lesson-card-list"
    >
      <h3>
        # <span>{name}</span>
      </h3>
      {lessonList.map((lesson, index) => (
        <LessonCard
          title={lesson.title}
          description={lesson.description}
          approximateDuration={lesson.approximateDuration}
          level={lesson.level}
          text={lesson.text}
          _id={lesson._id}
          style={{ animationDelay: `${index * 0.05}s` }}
          key={lesson._id}
        />
      ))}
    </div>
  )
}
export default LessonCardList
