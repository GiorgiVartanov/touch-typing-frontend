import { useState } from "react"

import "./style.scss"

import EyeIcon from "../../assets/icons/eye.svg?react"
import EytSlashIcon from "../../assets/icons/eye-slash.svg?react"

interface Props {
  name: string
  placeholder?: string
  type?: "text" | "password" | "number"
  value: string | number
  isVisibilityChangeable?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors?: string[]
}

const Input = ({
  name,
  placeholder,
  type = "text",
  value,
  isVisibilityChangeable = type === "password",
  onChange,
  errors,
  ...rest
}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isValueVisible, setIsValueVisible] = useState<boolean>(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const renderShowValueButton = () => {
    if (!isVisibilityChangeable) return

    const handleOnShowValue = () => {
      setIsValueVisible(true)
    }

    const handleOnHideValue = () => {
      setIsValueVisible(false)
    }

    if (isValueVisible)
      return (
        <button
          type="button" // without it it will be considered a submit button (if Input is rendered in a Form component)
          onClick={handleOnHideValue}
          className="show-password-button"
        >
          <EyeIcon className="eye-icon" />
        </button>
      )
    else {
      return (
        <button
          type="button" // without it it will be considered a submit button (if Input is rendered in a Form component)
          onClick={handleOnShowValue}
          className="show-password-button"
        >
          <EytSlashIcon className="eye-icon" />
        </button>
      )
    }
  }

  return (
    <div className="input">
      <div className="input-wrapper">
        <label
          htmlFor={name}
          className={isFocused || value.toString().length > 0 ? "active" : ""}
        >
          {name || placeholder}
        </label>
        <input
          id={name}
          name={name}
          type={!isVisibilityChangeable ? type : isValueVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {renderShowValueButton()}
      </div>
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
