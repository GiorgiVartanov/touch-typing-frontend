interface Props {
  name: string
  selectedValue: string | number | boolean
  valueOptions: Array<string | number | boolean>
  valueToShow: Array<string | number | boolean>
  selectValue: (newValue: string | number | boolean) => void
}

// select element where user can select setting
const SelectSetting = ({ name, selectedValue, valueOptions, valueToShow, selectValue }: Props) => {
  const handleSelectValue = (newValue: string) => {
    selectValue(valueOptions[valueToShow.indexOf(newValue)])
  }

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
        onChange={(e) => handleSelectValue(e.target.value)}
        className="setting-select"
      >
        {valueToShow.map((option) => (
          <option
            key={option.toString()}
            value={option.toString()}
            className="setting-select-option"
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectSetting
