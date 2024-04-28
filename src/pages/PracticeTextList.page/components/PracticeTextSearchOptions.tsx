import { useState } from "react"
import { useTranslation } from "react-i18next"

import { SearchOptions } from "../../../types/other.types"
import { DifficultyLevel } from "../../../types/practiceText.types"

import Modal from "../../../components/Modal/Modal"
import Form from "../../../components/Form/Form"
import Select from "../../../components/Form/Select"
import Button from "../../../components/Form/Button"

interface Props {
  isVisible: boolean
  closeSearchOptions: () => void
  saveSearchOptions: (updatedSearchOptions: SearchOptions) => void
  selectedSearchOptions: SearchOptions
}

// search option for texts
const PracticeTextSearchOptions = ({
  isVisible,
  closeSearchOptions,
  saveSearchOptions,
  selectedSearchOptions,
}: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "practice" })

  const [searchOptions, setSearchOptions] = useState<SearchOptions>(selectedSearchOptions)

  const handleValueChange = (field: string, newValue: string) => {
    setSearchOptions((prevSearchOptions) => {
      return {
        ...prevSearchOptions,
        [field]: field.includes("Date") ? new Date(newValue) : newValue,
      }
    })
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    saveSearchOptions(searchOptions)
    closeSearchOptions()
  }

  return (
    <Modal
      isVisible={isVisible}
      modalTitle={t("Search Options")}
      showCloseButton={true}
      closeModal={closeSearchOptions}
    >
      <Form
        onSubmit={onSubmit}
        className="search-options-modal-form"
      >
        <Select
          name={t("level")}
          value={searchOptions.level || "Any"}
          options={["Any", "Easy", "Intermediate", "Normal", "Hard", "Expert", "Advanced"]}
          onChange={(selectedLevel) => handleValueChange("level", selectedLevel as DifficultyLevel)}
          className="search-options-select"
        />
        <Button className="submit-button cta-button">{t("Start Search")}</Button>
      </Form>
    </Modal>
  )
}
export default PracticeTextSearchOptions
