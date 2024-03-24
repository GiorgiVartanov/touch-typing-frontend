import Header from "../../components/Header/Header"

import "./styles.scss"

interface Props {
  children: React.ReactNode
  className?: string
}

const PageLayout = ({ children, className = "" }: Props) => {
  return (
    <div className="page">
      <Header />
      <div className={`page-content ${className}`}>{children}</div>
      <div className="background-image"></div>
    </div>
  )
}
export default PageLayout
