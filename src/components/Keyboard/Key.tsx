interface Props {
  value: string | string[]
  id: string
  isPressed: boolean
  isActive: boolean
  showBoth: boolean
  inUppercase: boolean
  showInReverse: boolean
  className?: string
  style?: React.CSSProperties
}

const Key = ({
  value,
  id,
  isPressed,
  isActive,
  showBoth,
  inUppercase,
  showInReverse,
  className = "",
  style = {},
}: Props) => {
  const renderKeyValues = () => {
    if (typeof value === "string") return <div className="key-value">{value}</div>

    if (!showBoth) return <div className="key-value">{value[inUppercase ? 1 : 0]}</div>

    return value.map((key) => (
      <div
        className="key-value"
        key={key}
      >
        {key}
      </div>
    ))
  }

  return (
    <div
      className={`key ${typeof value !== "string" && value.length > 1 ? `keys-${value.length}` : ""} ${isActive ? "" : "inactive"} ${isPressed ? "pressed" : ""} ${inUppercase && typeof value !== "string" && value.length > 1 && showBoth ? "uppercase" : ""} ${showInReverse ? "in-reverse" : ""} ${className}`}
      style={style}
    >
      {renderKeyValues()}
    </div>
  )
}
export default Key
