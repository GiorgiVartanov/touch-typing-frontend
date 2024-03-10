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
  // if (textList.length === 0) return

  return (
    <CardList className="text-card-list">
      {showAddNewTextButton && addNewTextModal ? (
        <Button
          onClick={addNewTextModal}
          className="add-new-text-button"
        >
          Add New Text
        </Button>
      ) : null}
      {textList?.map((text, index) => (
        <PracticeTextCard
          title={text.title}
          description={text.description}
          author={text.author}
          level={text.level}
          _id={text._id}
          style={{ animationDelay: `${index * 0.05}s` }}
          key={text._id}
        />
      ))}
    </CardList>
  )
}

export default PracticeTextCardList
