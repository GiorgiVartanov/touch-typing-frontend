import "./style.scss"

interface Props {
  name: string
  placeholder?: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors?: string[]
}

const Input = ({ name, placeholder, type = "text", value, onChange, errors, ...rest }: Props) => {
  return (
    <>
      <input
        name={name}
        placeholder={name || placeholder}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {errors && errors.length > 0 ? (
        <ul className="error-list">
          {errors.map((errorName: string) => (
            <li
              key={errorName}
              className="error"
            >
              {errorName}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </>
  )
}
export default Input
