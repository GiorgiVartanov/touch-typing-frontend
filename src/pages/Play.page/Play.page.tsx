import { useEffect, useState } from "react"
import Button from "../../components/Form/Button"
import { usePlayStore } from "../../store/context/playContext"
import PlayMatchesList from "./PlayMatchesList"
import "./styles.scss"
import { useNavigate } from "react-router-dom"
import DataForm from "../../components/Form/Data/DataForm"
import { useTranslation } from "react-i18next"
import PageLayout from "../../layout/Page.layout/Page.layout"
import { Link } from "react-router-dom"

const PlayPage = () => {
  const { username, users, match_id, matches, CreateMatch, JoinMatch } = usePlayStore()
  const [showModal, setShowModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const { t } = useTranslation("translation", { keyPrefix: "play page" })

  useEffect(() => {
    if (username === "-1") {
      alert("already connected from another tab...")
      navigate(`/`)
    }
  }, [username])

  // Handle click event to join a match
  const clickHandler = (match_id: string) => {
    JoinMatch(match_id)
  }

  const clickCreateMatchHandler = () => {
    setShowModal(true)
  }

  //here should work without [match_id], right? (since match_id comes from PlayStore) couldn't make it work...
  useEffect(() => {
    if (match_id) navigate(`../match/${match_id}`)
  }, [match_id])

  // Modal component for creating a match
  const CreateMatchModal = () => {
    return (
      <div className="play-modal">
        <div className="please-work">
          <DataForm {...{ CreateMatch, setShowModal }} />
        </div>
      </div>
    )
  }

  return (
    <PageLayout className="playPage">
      {showModal ? (
        CreateMatchModal()
      ) : (
        <div className="play">
          <h2 className="play-head">
            {t("Active users")}: {users.length}
          </h2>
          <div className="play-body">
            <div className="play-create">
              {/*აქ იქნება matchSetting Modal*/}
              <Button
                className="create-match-button"
                onClick={clickCreateMatchHandler}
              >
                {t("Create a match")}
              </Button>
              <Link
                className="play-page-link"
                to="../matches"
              >
                {t("Match history")}
              </Link>
            </div>
            <PlayMatchesList
              matches={matches}
              onClick={clickHandler}
            />
          </div>
        </div>
      )}
    </PageLayout>
  )
}

export default PlayPage
