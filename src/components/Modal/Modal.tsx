import { useRef } from "react"
import { useTranslation } from "react-i18next"

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
  const { t } = useTranslation("translation", { keyPrefix: "modal" })

  const modalRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(modalRef, closeModal)

  if (!isVisible) return

  return (
    <>
      <div
        ref={modalRef}
        className={`modal ${className}`}
      >
        {modalTitle || showCloseButton ? (
          <div className="modal-top-bar">
            {modalTitle ? <h2 className="modal-title">{t("modalTitle")}</h2> : null}
            <button
              onClick={closeModal}
              className="close-modal-button"
            >
              {showCloseButton ? <CloseIcon className="close-icon" /> : null}
            </button>
          </div>
        ) : null}
        <div className="modal-content">{children}</div>
        <span className="close-modal-message">{t("click anywhere to close")}</span>
      </div>
      <div className="modal-background"></div>
    </>
  )
}
export default Modal
