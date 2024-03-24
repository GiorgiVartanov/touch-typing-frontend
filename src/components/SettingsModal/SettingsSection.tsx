import SelectSetting from "./SelectSetting"

interface Props {
  sectionTitle: string
  settingsList: {
    name: string
    selectedValue: any
    valueOptions: any[]
    valueToShow: any[]
    selectValue: (newValue: any) => void
  }[]
  children?: React.ReactNode
}

// setting page section
const SettingsSection = ({ sectionTitle, settingsList, children }: Props) => {
  return (
    <section className="settings-section">
      <h3 className="section-title">{sectionTitle}</h3>
      <div className="settings-list">
        {settingsList.map((setting, index) => (
          <div key={index}>
            <SelectSetting {...setting} />
          </div>
        ))}
      </div>
      {children}
    </section>
  )
}
export default SettingsSection
