interface Props {
  children: React.ReactNode
  after: React.ReactNode
}

const CardOptions = ({ children, after }: Props) => {
  return <></>

  return (
    <div className="card-options-wrapper">
      <div className="card-options">
        <div className="border-radius card-options-panel">{children}</div>
        <div className="card-options-buttons">{after}</div>
      </div>
    </div>
  )
}

export default CardOptions
