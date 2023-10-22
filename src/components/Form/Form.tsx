import "./style.scss"

interface Props {
  onSubmit: (e: React.FormEvent) => void
  children: React.ReactNode
}

const Form = ({ onSubmit, children, ...rest }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      {...rest}
    >
      {children}
    </form>
  )
}
export default Form
