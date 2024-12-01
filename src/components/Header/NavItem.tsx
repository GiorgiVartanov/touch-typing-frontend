import { useState, useRef } from "react"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"

interface Props {
  icon: React.ReactNode
  closeNavigation?: () => void
  hasActiveChild?: boolean
  children?: React.ReactNode
}

const NavItem = ({ icon, closeNavigation, hasActiveChild = false, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const ref = useRef<HTMLLIElement>(null)

  const handleClickOnMenu = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleCloseMenu = () => {
    if (window.innerWidth < 600) return

    setIsOpen(false)
  }

  useOnClickOutside(ref, handleCloseMenu)

  return (
    <li
      ref={ref}
      onClick={closeNavigation}
      className={`nav-item ${isOpen ? "active" : ""} ${hasActiveChild ? "has-active-child" : ""}`}
    >
      <button
        onClick={handleClickOnMenu}
        className="nav-item-button"
      >
        <div className="nav-item-icon">{icon}</div>
        {children ? <DropdownArrow isOpen={isOpen} /> : null}
      </button>
      {isOpen ? <div className="nav-item-children">{children}</div> : null}
    </li>
  )
}
export default NavItem

interface DropdownArrowProps {
  isOpen: boolean
}

const DropdownArrow = ({ isOpen }: DropdownArrowProps) => {
  return (
    <div className={`dropdown-arrow ${isOpen ? "open" : "closed"}`}>
      <span className="arrow-left" />
      <span className="arrow-right" />
    </div>
  )
}
