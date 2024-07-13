import { useTranslation } from "react-i18next"

import "./styles.scss"

import PageLayout from "../../layout/Page.layout/Page.layout"

const InstallationGuidePage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "guide page" })

  return (
    <PageLayout className="installation-guide-page">
      <h2>{t("how to install keyboard layout on windows")}</h2>
      <ul>
        <li>{t("Export the keyboard layout by pressing on export button on the keyboard page")}</li>
        <li>
          {t("Install")}{" "}
          <a
            href="https://www.microsoft.com/en-us/download/details.aspx?id=102134"
            target="_blank"
          >
            {t("Microsoft Keyboard Layout Creator Tool 1.4 (MSKLC)")}
          </a>{" "}
        </li>
        <li>{t("Open MSKLC")}</li>
        <li>
          {t(
            "Click on File >> Load Source File and select exported layout (it will be a .klc file)"
          )}
        </li>
        <li>{t("Click on Project >> Test Keyboard Layout and check if it works")}</li>
        <li>
          {t(
            "Click on Project >> Build DLL and Setup Package and select exported layout (it will be a .klc file)"
          )}
        </li>
        <li>{t("Open newly created directory and open setup.exe")}</li>
        <li>{t("After installing layout, go to Language Preferences >> Preferred languages")}</li>
      </ul>
    </PageLayout>
  )
}

export default InstallationGuidePage
