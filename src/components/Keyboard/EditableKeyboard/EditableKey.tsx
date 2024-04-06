interface Props {
  value: string | string[]
  code: string
  isEditing: boolean
  isPressed: boolean
  isEditable: boolean
  inUppercase: boolean
  isDuplicate: boolean
  isEmpty: boolean
  onClick: () => void
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void // right click
  className?: string
  style?: React.CSSProperties
}

// key that can be edited
const EditableKey = ({
  value,
  isEditing,
  isPressed,
  isEditable,
  inUppercase,
  onClick,
  onContextMenu,
  isDuplicate,
  isEmpty,
  className = "",
  style = {},
}: Props) => {
  const renderKeyValues = () => {
    if (typeof value === "string") return <div className="key-value">{value}</div>

    return (
      <>
        <div
          className={`key-value ${value[0]?.toLocaleLowerCase() === value[1]?.toLowerCase() ? "same-key" : "different-key"}`}
        >
          {value[0]?.toLocaleLowerCase() === value[1]?.toLowerCase()
            ? value[inUppercase ? 1 : 0]
            : value[0]}
        </div>
        <div
          className={`key-value ${value[0]?.toLocaleLowerCase() === value[1]?.toLowerCase() ? "same-key" : "different-key"}`}
        >
          {value[0]?.toLocaleLowerCase() === value[1]?.toLowerCase() ? "" : value[1] || ""}
        </div>
      </>
    )
  }

  return (
    <div
      onClick={() => {
        if (!isEditable) return
        onClick()
      }}
      onContextMenu={onContextMenu}
      className={`key ${isEditable ? "editable" : "uneditable"} ${isEmpty ? "empty-key" : ""} ${isDuplicate ? "duplicate" : ""} ${isEditing ? "editing" : ""} ${isPressed ? "pressed" : ""} ${inUppercase && typeof value !== "string" && value.length > 1 ? "uppercase" : ""} ${className}`}
      style={style}
    >
      {renderKeyValues()}
    </div>
  )
}
export default EditableKey
