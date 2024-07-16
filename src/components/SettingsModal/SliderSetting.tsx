interface Props {
  name: string
  selectedValue: boolean
  selectValue: (newValue: boolean) => void
}

const SliderSetting = ({ name, selectedValue, selectValue }: Props) => {
  const changeValue = () => {
    selectValue(!selectedValue)
  }

  return (
    <label
      htmlFor={name}
      className="setting-item slider-setting-item"
    >
      {name}
      <input
        type="checkbox"
        onChange={changeValue}
        checked={selectedValue}
        className="checkbox-slider"
        id={name}
      />
      <span className={`slider ${selectedValue ? "on" : "off"}`} />
    </label>
  )
}

export default SliderSetting
