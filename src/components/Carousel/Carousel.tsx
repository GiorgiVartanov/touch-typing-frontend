import { useState } from "react"
import "./styles.scss"

interface Props {
  children: React.ReactNode[]
}

const Carousel = ({ children }: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const nextSlide = () => {
    // if (currentSlide >= lastSlide) return

    setCurrentSlide((prev) => (prev === children.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    // if (currentSlide <= 0) return

    setCurrentSlide((prev) => (prev === 0 ? children.length - 1 : prev - 1))
  }

  return (
    <div className="carousel">
      <div className="carousel-wrapper">
        {children[currentSlide]}
        <button
          className={"prev"}
          onClick={prevSlide}
        >
          &#10094;
        </button>
        <button
          className={"next"}
          onClick={nextSlide}
        >
          &#10095;
        </button>
      </div>
      <div className="carousel-buttons">
        {children.map((child, index) => (
          <button
            key={index}
            onClick={() => {
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
