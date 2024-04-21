import "./styles.scss"

interface Props {
  children: React.ReactNode
  tooltipPosition?: "top" | "right" | "bottom" | "left"
  tooltipContent: string
  className?: string
}

const Tooltip = ({
  children,
  tooltipPosition = "bottom",
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
