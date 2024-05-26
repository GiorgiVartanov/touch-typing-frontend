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
  className?: string
}

const Tooltip = ({
  children,
  tooltipPosition = "bottom-right",
  tooltipContent,
  className = "",
}: Props) => {
  return (
    <div
      data-tooltip={tooltipContent}
      className={`tooltip tooltip-${tooltipPosition} ${className}`}
    >
      {children}
    </div>
  )
}

export default Tooltip
