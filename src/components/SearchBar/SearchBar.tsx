import { useState, useEffect } from "react"

import "./style.scss"

interface Props {
  value?: string
  handleTextChange: (newText: string) => void
  debounce?: boolean
  debounceDelay?: number // in milliseconds
}

// renders search bar
// changes passed value using passed handleTextChange function
// can debounce value's change (for example, user types something, but value will get changed only after debounceDelay time)
const SearchBar = ({
  value = "",
  handleTextChange,
  debounce = true,
  debounceDelay = 1000,
}: Props) => {
  const [searchValue, setSearchValue] = useState<string>(value)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  // causes search to start
  const startSearch = () => {
    handleTextChange(searchValue)
  }

  // starts search after user clocks on Enter key
  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return

    startSearch()
  }

  // starts search debounceDelay milliseconds after user ends typing
  useEffect(() => {
    if (!debounce) {
      startSearch()
      return
    }

    const timer = setTimeout(() => {
      startSearch()
    }, debounceDelay)

    return () => clearTimeout(timer)
  }, [searchValue, debounce])

  return (
    <div className="search-wrapper">
      <div className="search-bar-holder">
        <input
          className="search-bar"
          placeholder="search..."
          value={searchValue}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
        />
      </div>
    </div>
  )
}
export default SearchBar
