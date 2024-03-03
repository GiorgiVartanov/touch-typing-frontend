import "./style.scss"

interface DateSelectProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors?: string[]
}

const DateSelect = ({ name, value, onChange }: DateSelectProps) => {
  return (
    <div className=" date-select-wrapper">
      <label htmlFor={name}>{name}</label>
      <input
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        className="border"
      />
    </div>
  )
}

export default DateSelect
