import AssessLevel from "./AssessLevel"
import "./styles.scss"

const AssessLevelPage = () => {
    return (
            <div className="page assessment">
                <h1>
                    International Type Writing Testing System ( ITWTS )
                </h1>
                <AssessLevel
                    text= "უცნაურია მაგრამ ეს წინადადება ყველა ქართულ ასოს შეიცავს ზღარბი პარკუჭი ფიტული ჩაძახე ჰაჯიმე ჟანრი"
                />
            </div>
        )
}

export default AssessLevelPage