interface Props {
  children: React.ReactNode
  closeNavigation?: () => void
  icon?: React.ReactNode
  className?: string
}

const DropDownItem = ({ children, icon, closeNavigation, className }: Props) => {
  return (
    <div
      onClick={closeNavigation}
      className={`dropdown-item ${className}`}
    >
      {children}
      {icon ? <div className="icon">{icon}</div> : ""}
    </div>
  )
}
export default DropDownItem
