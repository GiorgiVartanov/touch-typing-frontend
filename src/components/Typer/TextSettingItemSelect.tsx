interface Props {
  message: string
  selectedValue: string | number
  values: string[] | number[]
  changeSetting: (value: number | string) => void
}

const TextSettingItemSelect = ({ message, selectedValue, values, changeSetting }: Props) => {
  return (
    <label className="text-setting-select">
      <p>{message}</p>
      <select
        value={selectedValue}
        onChange={(e) => changeSetting(e.target.value)}
      >
        {values?.map((value) => (
          <option
            key={value}
            value={value}
          >
            {value}
          </option>
        ))}
      </select>
    </label>
  )
}
export default TextSettingItemSelect
