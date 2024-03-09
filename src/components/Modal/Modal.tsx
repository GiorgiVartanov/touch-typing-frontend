import { useRef } from "react"

import "./styles.scss"

import CloseIcon from "../../assets/icons/x.svg?react"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"

interface Props {
  children: React.ReactNode
  modalTitle?: string
  showCloseButton?: boolean
  isVisible: boolean
  closeModal: () => void
  className?: string
}

const Modal = ({
  children,
  modalTitle,
  showCloseButton = false,
  isVisible,
  closeModal,
  className = "",
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(modalRef, closeModal)

  return (
    <>
      <div
        ref={modalRef}
        className={`modal ${isVisible ? "modal-shown" : "modal-hidden"} ${className}`}
      >
        {modalTitle && showCloseButton ? (
          <div className="modal-top-bar">
            {modalTitle ? <h2 className="modal-title">{modalTitle}</h2> : null}
            <button
              onClick={closeModal}
              className="close-modal-button"
            >
              {showCloseButton ? <CloseIcon className="close-icon" /> : null}
            </button>
          </div>
        ) : null}

        {children}
        <span className="close-modal-message">click anywhere to close</span>
      </div>
      <div
        className={`modal-background ${
          isVisible ? "modal-background-shown" : "modal-background-hidden"
        } `}
      ></div>
    </>
  )
}
export default Modal
