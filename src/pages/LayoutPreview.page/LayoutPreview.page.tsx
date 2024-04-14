import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { KeyboardLayoutInterface } from "../../types/keyboard.types"
import { getLayout } from "../../services/keyboardServices"
import "./styles.scss"

import Loading from "../../components/Loading/Loading"
import Keyboard from "../../components/Keyboard/Keyboard"
import PageLayout from "../../layout/Page.layout/Page.layout"

const LayoutPreviewPage = () => {
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

  if (isLoading) return <Loading />

  if (error || !data) return <div>something went wrong</div>

  const keyboardLayout = data.data

  console.log(keyboardLayout)

  return (
    <PageLayout className="layout-preview-page">
      <Keyboard
        forcedKeyboardLayout={keyboardLayout}
        showEditButton={true}
        mode="editable"
      />
    </PageLayout>
  )
}

export default LayoutPreviewPage
