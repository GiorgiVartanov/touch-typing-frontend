import { Link } from "react-router-dom"

import { KeyInterface } from "../../types/keyboard.types"

import PreviewKey from "./PreviewKey"

interface Props {
  _id: string
  title: string
  language: string
  keys: KeyInterface[]
}

const LayoutCard = ({ _id, title, language, keys }: Props) => {
  return (
    <Link
      to={`../layout/${_id}`}
      className="layout-card"
    >
      <div className="preview-keys">
        <div className="preview-keys-first-row">
          {keys.slice(0, 4).map((key) => (
            <PreviewKey
              keyData={key}
              key={key.code}
            />
          ))}
        </div>
        <div className="preview-keys-second-row">
          {keys.slice(5, 9).map((key) => (
            <PreviewKey
              keyData={key}
              key={key.code}
            />
          ))}
        </div>
      </div>
      <div className="layout-card-text">
        <h3>{title}</h3>
        {/* <p>{language}</p> */}
      </div>
    </Link>
  )
}

export default LayoutCard
