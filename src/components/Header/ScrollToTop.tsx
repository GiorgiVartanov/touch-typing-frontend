import ArrowUp from "../../assets/icons/arrow-up.svg?react"

interface Props {
  isVisible?: boolean
}

const ScrollToTop = ({ isVisible = false }: Props) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (document.body.scrollHeight < 2000) return

  return (
    <button
      onClick={handleScrollToTop}
      className={`scroll-to-top-button shadow ${isVisible ? "button-visible" : "button-hidden"}`}
    >
      <ArrowUp />
    </button>
  )
}
export default ScrollToTop
