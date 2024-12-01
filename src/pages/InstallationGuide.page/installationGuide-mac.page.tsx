import { useTranslation } from "react-i18next"

import "./styles.scss"

import PageLayout from "../../layout/Page.layout/Page.layout"

const InstallationGuideMacPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "guide page" })

  return (
    <PageLayout className="installation-guide-page">
      <h2>{t("how to install keyboard layout on mac")}</h2>
      <p>
        {t("follow guide at")}{" "}
        <a
          className="guide-page-link"
          href="https://beebom.com/how-modify-or-create-custom-keyboard-layouts-mac/#:~:text=You%20can%20do%20this%20by%20following%20the%20steps,mapped%20to%20it%2C%20instead%20of%20the%20default%20functions."
        >
          {t("this site")}
        </a>
      </p>
    </PageLayout>
  )
}

export default InstallationGuideMacPage
