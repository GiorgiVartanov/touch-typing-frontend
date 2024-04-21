import { KeyboardLayoutInterface } from "../../types/keyboard.types"

import LayoutCard from "./LayoutCard"
import CardList from "../../components/Card/CardList"

interface Props {
  layouts: KeyboardLayoutInterface[]
}

const LayoutCardList = ({ layouts }: Props) => {
  return (
    <CardList className="layout-card-list">
      {layouts?.map((layout, index) => (
        <LayoutCard
          _id={layout._id}
          title={layout.title}
          keys={[...layout.keyboard.slice(15, 19), ...layout.keyboard.slice(28, 33)]}
          language={layout.language}
          // keyboard={layout.keyboard}
          // _id={layout._id}
          // style={{ animationDelay: `${index * 0.05}s` }}
          key={layout._id}
        />
      ))}
    </CardList>
  )
}

export default LayoutCardList
