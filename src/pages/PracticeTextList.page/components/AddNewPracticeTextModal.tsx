import ajax from "../../../services/ajax"
import { useState } from "react"

import { Text, DifficultyLevel } from "../../../types/practiceText.types"
import { useAuthStore } from "../../../store/context/authContext"

import Modal from "../../../components/Modal/Modal"
import Form from "../../../components/Form/Form"
import Input from "../../../components/Form/Input"
import Select from "../../../components/Form/Select"
import DateSelect from "../../../components/Form/DateSelect"
import TextArea from "../../../components/Form/TextArea"
import Button from "../../../components/Form/Button"

interface Props {
  isVisible: boolean
  closeModal: () => void
}

// modal to add new texts
const AddNewPracticeTextModal = ({ isVisible, closeModal }: Props) => {
  const { token } = useAuthStore()

  const [newTextData, setNewTextData] = useState<Text>({
    _id: "-",
    title: "",
    description: "",
    level: "Easy",
    text: "",
    author: "",
    publishedOn: "",
  })

  const handleLevelChange = (selectedLevel: DifficultyLevel) => {
    handleChange("level", selectedLevel)
  }

  const handleChange = (name: string, value: string | number) => {
    setNewTextData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (newTextData.title === "" || newTextData.description === "" || newTextData.text === "") {
      return
    }

    ajax.post(
      "lesson/create",
      {
        title: newTextData.title,
        description: newTextData.description,
        level: newTextData.level,
        text: newTextData.text,
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
      showCloseButton={true}
      className="add-new-text-modal"
      modalTitle="Add New Practice Text"
    >
      <Form
        onSubmit={handleSubmit}
        className="add-new-text-modal-form"
      >
        <Input
          name="title"
          value={newTextData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <TextArea
          name="text"
          value={newTextData.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className="textarea-text"
        />
        <TextArea
          name="description"
          value={newTextData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="textarea-description"
        />
        <Input
          name="author"
          value={newTextData.author || ""}
          onChange={(e) => handleChange("author", e.target.value)}
        />
        <DateSelect
          name="published on"
          value={newTextData.publishedOn}
          onChange={(e) => handleChange("publishedOn", e.target.value)}
        />
        <Select
          name="level"
          value={newTextData.level}
          options={["Easy", "Intermediate", "Normal", "Hard", "Expert", "Advanced"]}
          onChange={(selectedLevel) => handleLevelChange(selectedLevel as DifficultyLevel)}
        />
        <Button className="submit-button cta-button">Add Text</Button>
      </Form>
    </Modal>
  )
}
export default AddNewPracticeTextModal
