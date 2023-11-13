interface Props {
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

const DropDownItem = ({ children, icon, className }: Props) => {
  return (
    <div className={`dropdown-item ${className}`}>
      {children}
      {icon ? <div className="icon">{icon}</div> : ""}
    </div>
  )
}
export default DropDownItem
