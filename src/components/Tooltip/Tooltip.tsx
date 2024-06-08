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
  className?: string
}

const Tooltip = ({
  children,
  tooltipPosition = "bottom-right",
  tooltipContent,
  showAsterisk = false,
  className = "",
}: Props) => {
  return (
    <div
      data-tooltip={tooltipContent}
      className={`tooltip tooltip-${tooltipPosition} ${className}`}
    >
      {children}
      {showAsterisk ? "*" : ""}
    </div>
  )
}

export default Tooltip
