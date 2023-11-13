interface Props {
  children: React.ReactNode
}

const DropDownMenu = ({ children }: Props) => {
  return <div className="dropdown-menu">{children}</div>
}
export default DropDownMenu
