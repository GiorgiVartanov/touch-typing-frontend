import { KeyInterface } from "../../types/keyboard.types"

import PreviewKey from "./PreviewKey"

interface Props {
  keyboard: KeyInterface[]
}

const KeyboardLayoutPreview = ({ keyboard }: Props) => {
  return (
    <div>
      {keyboard.slice(0, 10).map((key) => (
        <PreviewKey
          keyData={key}
          key={key.code}
        />
      ))}
    </div>
  )
}

export default KeyboardLayoutPreview
