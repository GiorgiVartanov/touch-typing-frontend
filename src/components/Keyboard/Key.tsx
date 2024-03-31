import { KeyType } from "../../types/keyboard.types"

interface Props {
  value: string | string[]
  isPressed: boolean
  isActive: boolean
  type: KeyType
  inUppercase: boolean
  className?: string
  style?: React.CSSProperties
}

const Key = ({
  value,
  isPressed,
  isActive,
  type,
  inUppercase,
  className = "",
  style = {},
}: Props) => {
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

  return (
    <div
      className={`key ${isActive ? "" : "inactive"} ${isPressed ? "pressed" : ""} ${inUppercase && typeof value !== "string" && value.length > 1 ? "uppercase" : ""} ${className}`}
      style={style}
    >
      {renderKeyValues()}
    </div>
  )
}
export default Key
