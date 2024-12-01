import { useTranslation } from "react-i18next"
import PageLayout from "../../layout/Page.layout/Page.layout"

const PageNotFoundPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "main page" })
  return <PageLayout>404 {t("page not found")}</PageLayout>
}
export default PageNotFoundPage
