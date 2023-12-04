import "./styles.scss"

interface Props {
  id: string
  sectionName: string
  children: React.ReactNode
  className?: string
}

const CardSection = ({ children, id, sectionName, className = "" }: Props) => {
  return (
    <section
      id={id}
      className={`card-section ${className}`}
    >
      <h2>
        # <span>{sectionName}</span>
      </h2>
      <div className="card-item-list">{children}</div>
    </section>
  )
}
export default CardSection
