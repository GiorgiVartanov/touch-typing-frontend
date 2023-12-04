interface Props {
  children: React.ReactNode
  after: React.ReactNode
}

const CardOptions = ({ children, after }: Props) => {
  return (
    <div className="card-options-wrapper">
      <div className="card-options">
        <div className="card-options-panel">{children}</div>
        <div className="card-options-buttons">{after}</div>
      </div>
    </div>
  )
}

export default CardOptions
