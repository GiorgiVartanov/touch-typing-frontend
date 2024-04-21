interface Props {
  value: string | string[]
  isPressed: boolean
  isActive: boolean
  inUppercase: boolean
  className?: string
  style?: React.CSSProperties
}

const Key = ({ value, isPressed, isActive, inUppercase, className = "", style = {} }: Props) => {
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
      className={`key ${isActive ? "" : "inactive"}  ${isPressed ? "pressed" : ""} ${inUppercase && typeof value !== "string" && value.length > 1 ? "uppercase" : ""} ${className}`}
      style={style}
    >
      {renderKeyValues()}
    </div>
  )
}
export default Key
