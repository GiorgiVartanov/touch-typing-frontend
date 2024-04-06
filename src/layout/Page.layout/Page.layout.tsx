import Header from "../../components/Header/Header"

import "./styles.scss"

interface Props {
  children: React.ReactNode
  className?: string
}

const imgUrl = new URL("/assets/backgroundImage.jpg", import.meta.url).href

console.log(imgUrl)

const PageLayout = ({ children, className = "" }: Props) => {
  return (
    <div className="page">
      <Header />
      <div className={`page-content ${className}`}>{children}</div>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
    </div>
  )
}
export default PageLayout
