interface Props {
  name: string
  value: string
  options: string[]
  optionsToShow: string[]
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

const Select = ({
  name,
  value,
  options,
  optionsToShow,
  onChange,
  disabled = false,
  className = "",
}: Props) => {
  const handleSelectOption = (optionToSelect: string) => {
    onChange(options[optionsToShow.indexOf(optionToSelect)])
  }

  return (
    <div className={`select-wrapper ${className}`}>
      <label htmlFor={name}>{name}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => handleSelectOption(e.target.value)}
        className="border"
        disabled={disabled}
      >
        {optionsToShow.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
