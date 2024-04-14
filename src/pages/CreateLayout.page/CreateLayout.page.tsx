import { useState } from "react"

import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import "./styles.scss"

import { KeyInterface } from "../../types/keyboard.types"

import PageLayout from "../../layout/Page.layout/Page.layout"
import Keyboard from "../../components/Keyboard/Keyboard"

const CreateLayoutPage = () => {
  const { keyboardLayout, keyboardLanguage } = useTypingSettingsStore()

  const currentKeyboard = keyboardLayout[keyboardLanguage].keyboard

  return (
    <PageLayout className="create-layout-page">
      <Keyboard
        startingKeyboard={currentKeyboard}
        mode="editing"
      />
    </PageLayout>
  )
}
export default CreateLayoutPage
