interface Props {
  name: string
  value: string
  options: string[]
  onChange: (value: string) => void
  disabled?: boolean
}

const Select = ({ name, value, options, onChange, disabled = false }: Props) => {
  return (
    <div className="select-wrapper">
      <label htmlFor={name}>{name}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border"
        disabled={disabled}
      >
        {options.map((option) => (
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
