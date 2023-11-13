import RadioSetting from "./RadioSetting"
import SelectSetting from "./SelectSetting"

interface Props {
  sectionTitle: string
  settingsList: {
    name: string
    selectedValue: any
    valueOptions: any[]
    selectValue: (newValue: any) => void
    settingType: string
  }[]
}

const SettingsSection = ({ sectionTitle, settingsList }: Props) => {
  return (
    <section className="settings-section">
      <h3 className="section-title">{sectionTitle}</h3>
      <div className="settings-list">
        {settingsList.map((setting, index) => (
          <div key={index}>
            {setting.settingType === "radio" ? (
              <RadioSetting {...setting} />
            ) : (
              <SelectSetting {...setting} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
export default SettingsSection
