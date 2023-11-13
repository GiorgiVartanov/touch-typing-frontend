interface Props {
  name: string
  selectedValue: string | number | boolean
  valueOptions: Array<string | number | boolean>
  selectValue: (newValue: string | number | boolean) => void
}

const SelectSetting = ({ name, selectedValue, valueOptions, selectValue }: Props) => {
  return (
    <label
      htmlFor={name}
      className="setting-item select-setting-item"
    >
      {name}
      <select
        id={name}
        name={name}
        value={selectedValue.toString()}
        onChange={(e) => selectValue(e.target.value)}
        className="setting-select"
      >
        {valueOptions.map((option) => (
          <option
            key={option.toString()}
            value={option.toString()}
            className="setting-select-option"
          >
            {option.toString()}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectSetting
