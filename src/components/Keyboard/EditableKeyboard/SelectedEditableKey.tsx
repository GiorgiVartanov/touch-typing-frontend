import { useRef, useEffect, useState } from "react"

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
  const secondValueRef = useRef<HTMLInputElement>(null)

  const [currentlyEditing, setCurrentlyEditing] = useState<0 | 1 | 2>(1)

  const startEditingFirstValue = () => {
    setCurrentlyEditing(1)
  }

  const startEditingSecondValue = () => {
    setCurrentlyEditing(2)
  }

  useEffect(() => {
    if (firstValueRef.current && currentlyEditing === 1) {
      firstValueRef.current.focus()
    } else if (secondValueRef.current && currentlyEditing === 2) {
      secondValueRef.current.focus()
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
          onClick={startEditingFirstValue}
        />
        <input
          ref={secondValueRef}
          className="editable-key-value second-value"
          value={value[1] || ""}
          onChange={onSecondValueChange}
          onClick={startEditingSecondValue}
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
