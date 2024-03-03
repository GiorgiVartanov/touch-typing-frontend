import Modal from "./Modal"

interface Props {
  buttons: React.ReactNode
  text: string
  isVisible: boolean
  closeModal: () => void
}

const ConfirmModal = ({ closeModal, text, isVisible, buttons }: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      closeModal={closeModal}
      className="confirm-modal"
    >
      <p>{text}</p>
      <div className="button-list">{buttons}</div>
    </Modal>
  )
}
export default ConfirmModal
