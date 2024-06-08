import { useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { createPortal } from "react-dom"

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

  useEffect(() => {
    const closeModalOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }

    document.addEventListener("keydown", closeModalOnEscape)

    return () => {
      document.removeEventListener("keydown", closeModalOnEscape)
    }
  }, [])

  if (!isVisible) return

  const modalContent = (
    <>
      <div
        ref={modalRef}
        className={`modal ${className}`}
      >
        {modalTitle || showCloseButton ? (
          <div className="modal-top-bar">
            {modalTitle ? <h2 className="modal-title">{modalTitle}</h2> : null}
            {showCloseButton ? (
              <button
                onClick={closeModal}
                className="close-modal-button"
              >
                <CloseIcon className="close-icon" />
              </button>
            ) : null}
          </div>
        ) : null}
        <div className="modal-content">{children}</div>
        <span className="close-modal-message">{t("click anywhere to close")}</span>
      </div>
      <div className="modal-background"></div>
    </>
  )

  const appElement = document.querySelector(".App")
  return appElement ? createPortal(modalContent, appElement) : null
}
export default Modal
