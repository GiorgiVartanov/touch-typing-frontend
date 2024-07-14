import "./styles.scss"

interface Props {
  children: React.ReactNode
  tooltipPosition?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "right"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"
    | "left"
  tooltipContent: string
  showAsterisk?: boolean
  maxWidth?: string
  className?: string
}

const Tooltip = ({
  children,
  tooltipPosition = "bottom-right",
  tooltipContent,
  showAsterisk = false,
  maxWidth = "auto",
  className = "",
}: Props) => {
  return (
    <div
      data-tooltip={tooltipContent}
      style={{ "--max-width": maxWidth }}
      className={`tooltip ${maxWidth ? "tooltip-fixed-width" : ""} tooltip-${tooltipPosition} ${className}`}
    >
      {children}
      {showAsterisk ? "*" : ""}
    </div>
  )
}

export default Tooltip
