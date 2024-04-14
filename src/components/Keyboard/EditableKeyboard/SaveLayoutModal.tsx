import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"

import { KeyInterface } from "../../../types/keyboard.types"
import { KeyboardLanguageType } from "../../../types/typer.types/typingSettings.types"
import { useTypingSettingsStore } from "../../../store/context/typingSettingsContext"
import { useAuthStore } from "../../../store/context/authContext"
import { saveKeyboardOnServer } from "../../../services/keyboardServices"

import Modal from "../../Modal/Modal"
import Form from "../../Form/Form"
import Input from "../../Form/Input"
import Select from "../../Form/Select"
import Button from "../../Form/Button"

interface Props {
  modalTitle?: string
  keyboard: KeyInterface[]
  isVisible: boolean
  currentLanguage: "Geo" | "En"
  currentTitle: string // default title
  closeModal: () => void
  className?: string
}

const keyboardLanguageOptions = ["En", "Geo"]

// modal to save keyboard layout
const SaveLayoutModal = ({
  modalTitle,
  isVisible,
  keyboard,
  closeModal,
  currentLanguage,
  currentTitle,
  className = "",
}: Props) => {
  const { token } = useAuthStore()

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    currentLanguage || keyboardLanguageOptions[0]
  )
  const [title, setTitle] = useState<string>(currentTitle || "")

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSelectLanguage = (value: string) => {
    setSelectedLanguage(value as KeyboardLanguageType)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    mutation.mutate({ keyboard, title, language: selectedLanguage })
  }

  const mutation = useMutation({
    mutationFn: (layout: { title: string; keyboard: KeyInterface[]; language: string }) => {
      if (!token) {
        toast.error("log in to save created layout")
        throw new Error("no token")
      }

      return saveKeyboardOnServer(layout, token)
    },
    mutationKey: ["post new text", title],
    onMutate: () => {},
    onSuccess: () => {
      toast.success("Layout successfully saved ")
    },
    onError: () => {
      toast.error("Something went wrong while saving layout")
    },
  })

  return (
    <Modal
      modalTitle={modalTitle}
      showCloseButton={true}
      isVisible={isVisible}
      closeModal={closeModal}
      className="save-layout-modal"
    >
      <Form onSubmit={handleSubmit}>
        <Select
          name="layout language"
          value={selectedLanguage}
          options={keyboardLanguageOptions}
          onChange={handleSelectLanguage}
        />
        <Input
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <Button
          className="save-keyboard-submit-button"
          type="submit"
        >
          Save
        </Button>
      </Form>
    </Modal>
  )
}

export default SaveLayoutModal
