import { KeyInterface } from "../../types/keyboard.types"

interface Props {
  keyData: KeyInterface | null | undefined
}

const PreviewKey = ({ keyData }: Props) => {
  if (!keyData) return

  return (
    <div className={`preview-key key-${keyData.code}`}>
      <div className="preview-key-value"> {keyData?.value[0] || null}</div>
      <div className="preview-key-value"> {keyData?.value[1] || null}</div>
    </div>
  )
}

export default PreviewKey
