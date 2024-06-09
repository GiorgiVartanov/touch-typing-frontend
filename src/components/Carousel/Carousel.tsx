import { useState } from "react"
import "./styles.scss"

interface Props {
  children: React.ReactNode[]
  showTitleOfNextPage?: boolean
}

const Carousel = ({ children, showTitleOfNextPage = true }: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [previousDirection, setPreviousDirection] = useState<"left" | "right" | "none">("none")

  const calculateNextSlide = (slide: number) => {
    if (slide >= children.length - 1) return 0
    return slide + 1
  }

  const calculatePreviousSlide = (slide: number) => {
    if (slide <= 0) return children.length - 1
    return slide - 1
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => calculateNextSlide(prev))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => calculatePreviousSlide(prev))
  }

  return (
    <div className="carousel">
      <div className="carousel-wrapper">
        <div
          className={`slide changed-from-${previousDirection}`}
          key={currentSlide}
        >
          {children[currentSlide]}
        </div>
        <button
          className={"prev"}
          onClick={prevSlide}
        >
          &#10094;
          {showTitleOfNextPage ? (
            <div className="prev-slide-title">
              {children[calculatePreviousSlide(currentSlide)]?.props.id}
            </div>
          ) : null}
        </button>
        <button
          className={"next"}
          onClick={nextSlide}
        >
          &#10095;
          {showTitleOfNextPage ? (
            <div className="next-slide-title">
              {children[calculateNextSlide(currentSlide)]?.props.id}
            </div>
          ) : null}
        </button>
      </div>
      <div className="carousel-buttons">
        {children.map((child, index) => (
          <button
            key={index}
            onClick={() => {
              if (index < currentSlide) {
                setPreviousDirection("right")
              } else if (index > currentSlide) {
                setPreviousDirection("left")
              } else {
                setPreviousDirection("none")
              }

              setCurrentSlide(index)
            }}
            className={`carousel-button ${currentSlide === index ? "current-button" : ""}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default Carousel
