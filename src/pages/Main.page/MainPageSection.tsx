interface Props {
  title: string
  description: string
  className?: string
  children?: React.ReactNode
}

const MainPageSection = ({ title, description, className = "", children }: Props) => {
  return (
    <section className={`main-page-section ${className}`}>
      <div className="section-text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="section-content">{children}</div>
    </section>
  )
}

export default MainPageSection
