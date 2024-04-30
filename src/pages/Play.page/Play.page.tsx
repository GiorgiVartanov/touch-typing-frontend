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
import Modal from "../../components/Modal/Modal"

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

  const handleCloseModal = () => {
    setShowModal(false)
  }

  //here should work without [match_id], right? (since match_id comes from PlayStore) couldn't make it work...
  useEffect(() => {
    if (match_id) navigate(`../match/${match_id}`)
  }, [match_id])

  // Modal component for creating a match
  const renderModal = () => {
    return (
      <Modal
        modalTitle="create match"
        showCloseButton={true}
        isVisible={showModal}
        closeModal={handleCloseModal}
        className="play-modal"
      >
        <div className="please-work">
          <DataForm {...{ CreateMatch, setShowModal }} />
        </div>
      </Modal>
    )
  }

  return (
    <PageLayout className="playPage">
      <div className="play">
        <div className="active-users">
          {t("Active users")}: {users.length}
        </div>
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
      {renderModal()}
    </PageLayout>
  )
}

export default PlayPage
