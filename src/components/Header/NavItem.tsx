import { useState, useRef } from "react"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"

interface Props {
  icon: string
  children?: React.ReactNode
}

const NavItem = ({ icon, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const ref = useRef<HTMLLIElement>(null)

  const handleClickOnMenu = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
  }

  useOnClickOutside(ref, handleCloseMenu)

  return (
    <li
      ref={ref}
      className={`nav-item ${isOpen ? "active" : ""}`}
    >
      <button
        onClick={handleClickOnMenu}
        className="nav-item-button"
      >
        {icon}
      </button>
      {isOpen ? children : ""}
    </li>
  )
}
export default NavItem
