import { useRef, useEffect } from "react"

import { KeyInterface } from "../../../types/keyboard.types"
import "./styles.scss"

interface Props {
  editingKey: KeyInterface | null
  onFirstValueChange: React.ChangeEventHandler<HTMLInputElement>
  onSecondValueChange: React.ChangeEventHandler<HTMLInputElement>
  wasSelectedAtLeaseOnce: boolean // change to was
}

// currently selected key
const SelectedEditableKey = ({
  editingKey,
  onFirstValueChange,
  onSecondValueChange,
  wasSelectedAtLeaseOnce,
}: Props) => {
  const firstValueRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (firstValueRef.current) {
      firstValueRef.current.focus()
    }
  }, [editingKey])

  const renderValues = () => {
    if (!editingKey) return

    const { value } = editingKey

    return (
      <>
        <input
          ref={firstValueRef}
          className="editable-key-value first-value"
          value={value[0]}
          onChange={onFirstValueChange}
        />
        <input
          className="editable-key-value second-value"
          value={value[1] || ""}
          onChange={onSecondValueChange}
        />
      </>
    )
  }

  return (
    <div
      className={`editing-key selected-key-${!wasSelectedAtLeaseOnce ? "neither" : editingKey ? "open" : "closed"} ${editingKey?.type}-key`}
    >
      {renderValues()}
      {/* {renderOptions()} */}
    </div>
  )
}

export default SelectedEditableKey
