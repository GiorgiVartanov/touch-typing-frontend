import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import "./styles.scss"

import MainPageSection from "./MainPageSection"
import Header from "../../components/Header/Header"
import Carousel from "../../components/Carousel/Carousel"

const MainPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "main page" })

  return (
    <div className="main-page">
      <Header isSticky={true} />
      <div className="background-image"></div>
      <div className="main-content">
        <Carousel>
          <MainPageSection
            title={t("follow carefully crafted lessons")}
            id={t("lessons")}
            description={t(
              "Embark on a journey of learning with our meticulously designed lessons, carefully structured to enhance your typing proficiency and efficiency."
            )}
          >
            <Link
              to="lessons"
              className="main-page-section-link button"
            >
              {t("see lessons")}
            </Link>
            <Link
              to="practice"
              className="main-page-section-link button"
            >
              {t("texts")}
            </Link>
          </MainPageSection>
          <MainPageSection
            title={t("create custom keyboard layout")}
            id={t("keyboard")}
            description={t(
              "On our website, you have the freedom to craft a custom keyboard layout tailored precisely to your preferences, or explore layouts meticulously curated by our vibrant community."
            )}
          >
            <Link
              to="layout"
              className="main-page-section-link button"
            >
              {t("select layout")}
            </Link>
            <Link
              to="create"
              className="main-page-section-link button"
            >
              {t("create layout")}
            </Link>
          </MainPageSection>
          <MainPageSection
            title={t("compete against other users")}
            id={t("compete")}
            description={t(
              "Challenge fellow users to real-time matches and put your typing skills to the test in thrilling competitions."
            )}
          >
            <Link
              to="play"
              className="main-page-section-link button"
            >
              {t("compete")}
            </Link>
          </MainPageSection>
        </Carousel>
      </div>
    </div>
  )
}
export default MainPage
