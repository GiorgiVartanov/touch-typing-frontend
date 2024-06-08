import { TypingSettingItem } from "../../types/typer.types/typingSettings.types"

import SelectSetting from "./SelectSetting"
import SliderSetting from "./SliderSetting"

interface Props {
  sectionTitle: string
  settingsList: {
    name: string
    selectedValue: string | number | boolean
    valueOptions: Array<string | number | boolean>
    valueToShow: Array<string | number | boolean>
    selectValue: (newValue: string | number | boolean) => void
  }[]
  children?: React.ReactNode
}

// setting page section
const SettingsSection = ({ sectionTitle, settingsList, children }: Props) => {
  const renderSetting = (setting: {
    name: string
    selectedValue: string | number | boolean
    valueOptions: Array<string | number | boolean>
    valueToShow: Array<string | number | boolean>
    selectValue: (newValue: string | number | boolean) => void
  }) => {
    if (
      setting.valueOptions.length === 2 &&
      typeof setting.valueOptions[0] === "boolean" &&
      typeof setting.valueOptions[1] === "boolean"
    ) {
      if (typeof setting.selectedValue === "boolean") {
        return (
          <SliderSetting
            name={setting.name}
            selectValue={setting.selectValue}
            selectedValue={setting.selectedValue as boolean}
          />
        )
      } else {
        return (
          <SliderSetting
            name={setting.name}
            selectValue={setting.selectValue}
            selectedValue={setting.selectedValue === "show"}
          />
        )
      }
    } else {
      return <SelectSetting {...setting} />
    }
  }

  return (
    <section className="settings-section">
      <h3 className="section-title">{sectionTitle}</h3>
      <div className="settings-list">
        {settingsList.map((setting, index) => (
          <div key={index}>{renderSetting(setting)}</div>
        ))}
      </div>
      {children}
    </section>
  )
}
export default SettingsSection
