import { useTranslation } from "react-i18next"

import { Text } from "../../../types/practiceText.types"

import PracticeTextCard from "./PracticeTextCard"
import CardList from "../../../components/Card/CardList"
import Button from "../../../components/Form/Button"

interface Props {
  textList?: Text[]
  showAddNewTextButton?: boolean
  addNewTextModal?: () => void
}

// renders multiple TextCards in a list
// renders difficulty of text
// gives id to it, it will be used to scroll to this element
const PracticeTextCardList = ({
  textList = [],
  showAddNewTextButton = false,
  addNewTextModal,
}: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "practice" })

  return (
    <CardList className="text-card-list">
      {showAddNewTextButton && addNewTextModal ? (
        <Button
          onClick={addNewTextModal}
          className="add-new-text-button"
        >
          {t("Add New Text")}
        </Button>
      ) : null}
      {textList?.map((text, index) => (
        <PracticeTextCard
          title={text.title}
          description={text.description}
          text={text.text}
          author={text.author}
          level={text.level}
          _id={text._id}
          key={text._id}
        />
      ))}
    </CardList>
  )
}

export default PracticeTextCardList
