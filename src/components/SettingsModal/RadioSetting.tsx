interface Props {
  name: string
  selectedValue: string | number | boolean
  valueOptions: Array<string | number | boolean>
  selectValue: (newValue: string | number | boolean) => void
}

const RadioSetting = ({ name, selectedValue, valueOptions, selectValue }: Props) => {
  return (
    <div className="setting-item radio-setting-item">
      <label>{name}</label>
      {valueOptions.map((option, index) => (
        <label
          key={index}
          className="radio-setting"
          htmlFor={`${name}_${index}`}
        >
          <input
            type="radio"
            id={`${name}_${index}`}
            name={name}
            value={option.toString()}
            checked={selectedValue === option}
            onChange={() => selectValue(option)}
          />
          {option.toString()}
        </label>
      ))}
    </div>
  )
}
export default RadioSetting
