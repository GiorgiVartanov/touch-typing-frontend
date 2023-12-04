import { HistoryItem } from "../../types/typing.types"

interface Props {
  historyItemList: HistoryItem[]
}

const HistoryList = ({ historyItemList }: Props) => {
  return (
    <div>
      {historyItemList.map((item) => (
        <HistoryListItem key={item._id} />
      ))}
    </div>
  )
}

export default HistoryList

const HistoryListItem = ({ item, date, duration, WPM, accuracy }: HistoryItem) => {
  const { title } = item

  return (
    <div>
      <div>{title}</div>
      <div>{date}</div>
    </div>
  )
}
