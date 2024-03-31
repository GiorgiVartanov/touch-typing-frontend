import { useRef } from "react"

import { KeyType } from "../../types/keyboard.types"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import Key from "./Key"

interface Props {
  value: string | string[]
  code: string
  isEditing: boolean
  isPressed: boolean
  isEditable: boolean
  type: KeyType
  inUppercase: boolean
  onClick: () => void
  onClickOutside: () => void
  onChange: (keyCode: string, firstValue: string | null, secondValue: string | null) => void
  className?: string
  style?: React.CSSProperties
}

const EditableKey = ({
  value,
  code,
  isEditing,
  isPressed,
  isEditable,
  type,
  inUppercase,
  onClick,
  onClickOutside,
  onChange,
  className = "",
  style = {},
}: Props) => {
  const ref = useRef<HTMLInputElement>(null)

  const renderKeyValues = () => {
    if (typeof value === "string") return <div className="key-value">{value}</div>

    if (type === "Letter") return <div className="key-value">{value[inUppercase ? 1 : 0]}</div>

    return value.map((key) => (
      <div
        className="key-value"
        key={key}
      >
        {key}
      </div>
    ))
  }

  // const handleOnFirstValueChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  //   const newValue = event.target.value.at(-1) || event.target.value

  //   if (type === "Letter") {
  //     onChange(code, newValue, newValue.toUpperCase())
  //   } else {
  //     onChange(code, newValue, value[1])
  //   }
  // }

  // const handleOnSecondValueChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  //   const newValue = event.target.value.at(-1) || event.target.value

  //   if (type === "Letter") {
  //     onChange(code, newValue.toLocaleLowerCase(), newValue)
  //   } else {
  //     onChange(code, value[0], newValue)
  //   }
  // }

  const renderEditableValues = () => {
    return (
      <>
        <div className="key-value">{value[0]}</div>
        <div className="key-value">{value[1]}</div>
        <div className="key-editing-message">type new value of this key</div>
      </>
    )
  }

  useOnClickOutside(ref, () => {
    onClickOutside()
  })

  return (
    <>
      <div
        ref={ref}
        onClick={() => {
          if (!isEditable) return

          onClick()
        }}
        className={`key ${isEditable ? "editable" : "uneditable"} ${isEditing ? "editing" : ""} ${isPressed ? "pressed" : ""} ${inUppercase && typeof value !== "string" && value.length > 1 ? "uppercase" : ""} ${className}`}
        style={style}
      >
        {isEditing ? renderEditableValues() : renderKeyValues()}
      </div>
      {isEditing ? (
        <Key
          value={value}
          isPressed={isPressed}
          isActive={true}
          type={type}
          inUppercase={inUppercase}
          className={`${type}-key editing-key-placeholder ${code}-key`}
        />
      ) : null}
    </>
  )
}
export default EditableKey
