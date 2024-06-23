import PageLayout from "../../layout/Page.layout/Page.layout"
import Assessment from "./Assessment"
import Exercise from "./Exercise"

const Lesson = () => {
  const group_1 = ["ა", "ი", "ს", "რ", "მ", "ლ"]
  const group_2 = ["ე", "ნ", "დ", "ბ", "ვ", "თ"]
  const group_3 = ["ო", "გ", "ტ", "შ", "ხ", "კ"]
  const group_4 = ["უ", "ც", "ქ", "ზ", "წ"]
  const group_5 = ["ფ", "პ", "ყ", "ღ", "ძ"]
  const group_6 = ["ჩ", "ჯ", "ჭ", "ჰ", "ჟ"]
  const assessment = [1, 2, 3, 4, 5, 6]
  return (
    <PageLayout>
      {/* <Exercise letter="ა" /> */}
      <Assessment assessment_level={1} />
    </PageLayout>
  )
}

export default Lesson
