import { useState, useEffect } from "react"

import "./style.scss"

interface Props {
  value?: string
  handleTextChange: (newText: string) => void
  debounce?: boolean
  debounceDelay?: number // in milliseconds
}

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

  // starts search 1 seconds after user ends typing
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
      <input
        className="search-bar"
        placeholder="search..."
        value={searchValue}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
    </div>
  )
}
export default SearchBar
