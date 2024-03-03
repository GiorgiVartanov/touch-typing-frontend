interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const Button = ({ children, className = "", onClick, ...rest }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`shadow border button ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
export default Button
