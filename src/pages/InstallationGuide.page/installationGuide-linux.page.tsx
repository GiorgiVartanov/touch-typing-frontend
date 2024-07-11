import { useTranslation } from "react-i18next"

import "./styles.scss"

import PageLayout from "../../layout/Page.layout/Page.layout"

const InstallationGuideLinuxPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "guide page" })

  return (
    <PageLayout className="installation-guide-page">
      <h2>{t("how to install keyboard layout on linux")}</h2>
      <p>
        {t("follow guide at")} <a href="https://www.jwz.org/xkeycaps/">this site</a>
      </p>
    </PageLayout>
  )
}

export default InstallationGuideLinuxPage
