import { useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import "./styles.scss"

import Button from "../../components/Form/Button"
import Header from "../../components/Header/Header"
import ArrowUp from "../../assets/icons/arrow-up.svg?react"

interface Props {
  children: React.ReactNode
  className?: string
}

// const imgUrl = new URL("/assets/backgroundImage.jpg", import.meta.url).href

const PageLayout = ({ children, className = "" }: Props) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { t } = useTranslation("translation", { keyPrefix: "header" })

  const handleeGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="page">
      <Header />
      <div className={`page-content ${className}`}>
        {pathname !== "/" ? (
          <Button
            onClick={handleeGoBack}
            className="go-back-button"
          >
            <ArrowUp className="icon go-back-icon" />
            <div className="go-back-text">{t("go back")}</div>
          </Button>
        ) : null}
        {children}
      </div>
      <div
        className="background-image"
        // style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
    </div>
  )
}
export default PageLayout
