interface Props {
  name: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

const Select = ({ name, value, options, onChange }: Props) => {
  return (
    <div className="select-wrapper">
      <label htmlFor="">{name}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border"
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
