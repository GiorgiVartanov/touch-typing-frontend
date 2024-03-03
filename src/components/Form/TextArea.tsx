import { useState } from "react"
import "./style.scss"

interface TextAreaProps {
  name: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  errors?: string[]
}

const TextArea = ({
  name,
  placeholder,
  value,
  onChange,
  className = "",
  errors,
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <div className="textarea-wrapper">
      <label
        htmlFor={name}
        className={isFocused || value.length > 0 ? "active" : ""}
      >
        {name || placeholder}
      </label>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${className}`}
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

export default TextArea
