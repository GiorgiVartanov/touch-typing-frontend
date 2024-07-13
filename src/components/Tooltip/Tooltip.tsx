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
  maxWidth = "100%",
  className = "",
}: Props) => {
  return (
    <div
      data-tooltip={tooltipContent}
      style={{ "--max-width": maxWidth }}
      className={`tooltip tooltip-${tooltipPosition} ${className}`}
    >
      {children}
      {showAsterisk ? "*" : ""}
    </div>
  )
}

export default Tooltip
