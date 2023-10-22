import { LessonResponseType } from "../../types/lesson.types"

import LessonCard from "./LessonCard"

interface Props {
  lessonList: LessonResponseType | null
  isLoading: boolean
}

const LessonCardList = ({ lessonList, isLoading = false }: Props) => {
  if (isLoading) return <div>loading</div>

  return (
    <div className="lesson-card-list">
      <h3 id="Beginner">
        # <span>Beginner</span>
      </h3>
      {lessonList?.Beginner?.map((lesson) => (
        <LessonCard
          title={lesson.title}
          description={lesson.description}
          approximateDuration={lesson.approximateDuration}
          level={lesson.level}
          text={lesson.text}
          _id={lesson._id}
          key={lesson._id}
        />
      ))}
      <h3 id="Intermediate">
        # <span>Intermediate</span>
      </h3>
      {lessonList?.Intermediate?.map((lesson) => (
        <LessonCard
          title={lesson.title}
          description={lesson.description}
          approximateDuration={lesson.approximateDuration}
          level={lesson.level}
          text={lesson.text}
          _id={lesson._id}
          key={lesson._id}
        />
      ))}
      <h3 id="Advanced">
        # <span>Advanced</span>
      </h3>
      {lessonList?.Advanced?.map((lesson) => (
        <LessonCard
          title={lesson.title}
          description={lesson.description}
          approximateDuration={lesson.approximateDuration}
          level={lesson.level}
          text={lesson.text}
          _id={lesson._id}
          key={lesson._id}
        />
      ))}
      <h3 id="Expert">
        # <span>Expert</span>
      </h3>
      {lessonList?.Expert?.map((lesson) => (
        <LessonCard
          title={lesson.title}
          description={lesson.description}
          approximateDuration={lesson.approximateDuration}
          level={lesson.level}
          text={lesson.text}
          _id={lesson._id}
          key={lesson._id}
        />
      ))}
    </div>
  )
}
export default LessonCardList
