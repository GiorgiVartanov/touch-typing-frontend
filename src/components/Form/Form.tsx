import "./style.scss"

interface Props {
  onSubmit: (e: React.FormEvent) => void
  className?: string
  children: React.ReactNode
}

const Form = ({ onSubmit, children, className = "", ...rest }: Props) => {
  return (
    <form
      className={className}
      onSubmit={onSubmit}
      {...rest}
    >
      {children}
    </form>
  )
}
export default Form
