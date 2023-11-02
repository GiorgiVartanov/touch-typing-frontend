interface Props {
  message: string
  field: string
  selectedValue: string | number
  values: string[] | number[]
  changeSetting: (field: string, value: number | string) => void
}

const TextSettingItemSelect = ({ message, field, selectedValue, values, changeSetting }: Props) => {
  return (
    <label className="text-setting-select">
      <p>{message}</p>
      <select
        value={selectedValue}
        onChange={(e) => changeSetting(field, e.target.value)}
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
