import "./styles.scss"

interface Props {
  children: React.ReactNode
  className?: string
}

const CardList = ({ children, className = "" }: Props) => {
  return <div className={`card-list ${className}`}>{children}</div>
}
export default CardList
