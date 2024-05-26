import { useState } from "react"

interface Props {
  title: string
  description: string
  className?: string
  children?: React.ReactNode
}

const MainPageSection = ({ title, description, className = "", children }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`main-page-section ${className}`}
    >
      <div className="section-children">
        <div className="section-text">
          <h2>{title}</h2>
          <p className={`section-description ${isHovering ? "description-open" : ""}`}>
            {description}
          </p>
        </div>
        <div className="section-content">{children}</div>
      </div>
    </section>
  )
}

export default MainPageSection
