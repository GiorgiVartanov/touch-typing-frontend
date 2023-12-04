import ajax from "../../services/ajax"
import { useState } from "react"

import { Lesson, DifficultyLevel } from "../../types/typing.types"
import { useAuthStore } from "../../store/context/authContext"

import Modal from "../../components/Modal/Modal"
import Form from "../../components/Form/Form"
import Input from "../../components/Form/Input"
import Select from "../../components/Form/Select"
import Button from "../../components/Form/Button"

interface Props {
  isVisible: boolean
  closeModal: () => void
}

const AddNewLessonModal = ({ isVisible, closeModal }: Props) => {
  const { token } = useAuthStore()

  const [newLessonData, setNewLessonData] = useState<Lesson>({
    _id: "-",
    title: "",
    description: "",
    approximateDuration: 0,
    level: "Beginner",
    text: "",
    wordSeparator: "",
  })

  const handleLevelChange = (selectedLevel: DifficultyLevel) => {
    handleChange("level", selectedLevel)
  }

  const handleChange = (name: string, value: string | number) => {
    setNewLessonData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      newLessonData.title === "" ||
      newLessonData.description === "" ||
      newLessonData.text === ""
    ) {
      return
    }

    ajax.post(
      "lesson/create",
      {
        title: newLessonData.title,
        description: newLessonData.description,
        level: newLessonData.level,
        text: newLessonData.text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }

  return (
    <Modal
      isVisible={isVisible}
      closeModal={closeModal}
      className="add-new-lesson"
    >
      <h2>Add New Lesson</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          name="title"
          value={newLessonData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <Input
          name="description"
          value={newLessonData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <Input
          name="text"
          value={newLessonData.text}
          onChange={(e) => handleChange("text", e.target.value)}
        />
        <Input
          name="wordSeparator"
          value={newLessonData.wordSeparator || ""}
          onChange={(e) => handleChange("wordSeparator", e.target.value)}
        />
        <Select
          name="level"
          value={newLessonData.level}
          options={["Beginner", "Intermediate", "Expert", "Advanced"]}
          onChange={(selectedLevel) => handleLevelChange(selectedLevel as DifficultyLevel)}
        />
        <Button className="submit-button">Add Lesson</Button>
      </Form>
    </Modal>
  )
}
export default AddNewLessonModal
