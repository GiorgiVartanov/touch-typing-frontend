import { useRef } from "react"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import "./styles.scss"

interface Props {
  children: React.ReactNode
  isVisible: boolean
  closeModal: () => void
  className?: string
}

const Modal = ({ children, isVisible, closeModal, className = "" }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(modalRef, closeModal)

  if (!isVisible) return

  return (
    <>
      <div
        ref={modalRef}
        className={`modal ${className}`}
      >
        {children}
        <span className="close-modal-message">click anywhere to close</span>
      </div>
      <div className="modal-background"></div>
    </>
  )
}
export default Modal
