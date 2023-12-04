import { useState } from "react"

import "./style.scss"

interface Props {
  name: string
  placeholder?: string
  type?: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors?: string[]
}

const Input = ({ name, placeholder, type = "text", value, onChange, errors, ...rest }: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <div className="input-wrapper">
      <label
        htmlFor={name}
        className={isFocused || value.toString().length > 0 ? "active" : ""}
      >
        {name || placeholder}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
    </div>
  )
}
export default Input
