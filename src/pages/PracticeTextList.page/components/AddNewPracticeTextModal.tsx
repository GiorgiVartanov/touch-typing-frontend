import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import { Text, DifficultyLevel } from "../../../types/practiceText.types"
import { useAuthStore } from "../../../store/context/authContext"
import { postPracticeText } from "../../../services/practiceText"

import Modal from "../../../components/Modal/Modal"
import Form from "../../../components/Form/Form"
import Input from "../../../components/Form/Input"
import Select from "../../../components/Form/Select"
import TextArea from "../../../components/Form/TextArea"
import Button from "../../../components/Form/Button"

const defaultTextDate: Text = {
  _id: "-",
  title: "",
  description: "",
  level: "Easy",
  text: "",
  author: "",
  publishedOn: "",
  language: "Geo",
}

interface Props {
  isVisible: boolean
  closeModal: () => void
}

// modal to add new texts
const AddNewPracticeTextModal = ({ isVisible, closeModal }: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "practice" })

  const queryClient = useQueryClient()

  const { token } = useAuthStore()

  const [newTextData, setNewTextData] = useState<Text>(defaultTextDate)

  const handleLevelChange = (selectedLevel: DifficultyLevel) => {
    handleChange("level", selectedLevel)
  }

  const handleChange = (name: string, value: string | number) => {
    setNewTextData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    mutation.mutate(newTextData)

    setNewTextData(defaultTextDate)
  }

  const mutation = useMutation({
    mutationFn: (textData: {
      title: string
      description: string
      level: DifficultyLevel
      text: string
    }) => {
      if (!token) throw new Error("no token")

      return postPracticeText(textData.title, textData.description, "Easy", textData.text, token)
    },
    mutationKey: ["post new text", newTextData],
    onMutate: () => {},
    onSuccess: () => {
      toast.success("Successfully added new text")
    },
    onError: () => {
      toast.error("Something went wrong while adding new text")
    },
  })

  return (
    <Modal
      isVisible={isVisible}
      closeModal={closeModal}
      showCloseButton={true}
      className="add-new-text-modal"
      modalTitle={t("Add New Practice Text")}
    >
      <Form
        onSubmit={handleSubmit}
        className="add-new-text-modal-form"
      >
        <Input
          name={t("title")}
          value={newTextData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <TextArea
          name={t("text")}
          value={newTextData.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className="textarea-text"
        />
        <TextArea
          name={t("description")}
          value={newTextData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="textarea-description"
        />
        {/* <Select
          name={t("level")}
          value={newTextData.level}
          options={["Easy", "Medium", "Hard"]}
          optionsToShow={[t("Easy"), t("Medium"), t("Hard")]}
          onChange={(selectedLevel) => handleLevelChange(selectedLevel as DifficultyLevel)}
        /> */}
        <Button className="submit-button cta-button add-new-text-button">{t("Add Text")}</Button>
      </Form>
    </Modal>
  )
}
export default AddNewPracticeTextModal
