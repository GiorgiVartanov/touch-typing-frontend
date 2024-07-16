import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { KeyboardLayoutInterface } from "../../types/keyboard.types"
import { getLayout } from "../../services/keyboardServices"
import "./styles.scss"
import { useTranslation } from "react-i18next"

import Loading from "../../components/Loading/Loading"
import Keyboard from "../../components/Keyboard/Keyboard"
import PageLayout from "../../layout/Page.layout/Page.layout"

const LayoutPreviewPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  const { id } = useParams()

  const fetchLayout = async (): Promise<{ data: KeyboardLayoutInterface } | null> => {
    if (!id) return null

    return await getLayout(id)
  }

  const { isLoading, data, error } = useQuery({
    queryFn: fetchLayout,
    queryKey: ["layout", id],
    staleTime: 100000,
  })

  const renderKeyboard = () => {
    if (isLoading) return <Loading />

    if (error || !data) return <div>something went wrong</div>

    const keyboardLayout = data.data

    return (
      <div className="preview-page-keyboard-wrapper">
        <h2 className="layout-title">
          <span className="layout-title-name"> {keyboardLayout?.title}</span>
          {keyboardLayout?.creator ? (
            <>
              <span className="creation-message">{t("by")}</span>
              <span className="layout-creator">{keyboardLayout?.creator as string}</span>
            </>
          ) : null}
        </h2>
        <Keyboard
          forcedKeyboardLayout={keyboardLayout}
          forceVisible={true}
          showHideKeyboardButton={false}
          showKeyboardTypeSelector={true}
          showSelectButton={true}
          showLanguageSelector={false}
          showEditButton={false}
          showUtilityButtons={true}
          mode="editable"
        />
      </div>
    )
  }

  return <PageLayout className="layout-preview-page">{renderKeyboard()}</PageLayout>
}

export default LayoutPreviewPage
