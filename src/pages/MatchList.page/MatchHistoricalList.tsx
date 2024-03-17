import ajax from "../../services/ajax"
import Loading from "../../components/Loading/Loading"
import { useEffect, useState } from "react"
import { MatchState } from "../../types/match.types"
import MatchHistoricalCard from "./MatchHistoricalCard" // Update import
import { useNavigate } from "react-router-dom"
import Button from "../../components/Form/Button"
import SearchBar from "../../components/SearchBar/SearchBar"
import { useTranslation } from "react-i18next"

const MatchHistoricalList = () => {
  // State to hold the list of matches and loading state
  const [matches, setMatches] = useState<MatchState[] | null>(null) // Update state name
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userSearch, setUserSearch] = useState<string>("") //has to be saved when navigating...
  const navigate = useNavigate()
  const t_form = useTranslation("translation", { keyPrefix: "forms" })["t"]
  const t_play = useTranslation("translation", { keyPrefix: "play page" })["t"]

  useEffect(() => {
    setIsLoading(true)
    const fetchMatches = async () => {
      // Fetch matches based on user search input
      const response = await ajax.get(`/match?username=${userSearch}`)
      setMatches(response.data)
    }
    fetchMatches()

    setIsLoading(false)
  }, [userSearch])

  // If data is still loading or match data is not available, display loading component
  if (isLoading || !matches) return <Loading />

  // Function to handle navigation to a specific match
  const onClick = (match_id: string) => {
    navigate("./" + match_id)
  }

  // Function to handle text change in the search bar
  const handleTextChange = (newText: string) => {
    setUserSearch(newText)
  }

  return (
    <div className="page match-body">
      <SearchBar
        value={userSearch}
        handleTextChange={handleTextChange}
        placeholder={t_play("Search by username") + "..."}
      />
      <div className="match-body-main">
        <div className="match-body-main-list">
          {matches
            .slice(0)
            .reverse()
            .map((match, ind) => {
              return (
                <MatchHistoricalCard
                  match={match}
                  onClick={onClick}
                  key={ind}
                />
              )
            })}
        </div>
        <div className="back">
          <Button onClick={() => navigate("../play")}>{t_form("Back")}</Button>
        </div>
      </div>
    </div>
  )
}

export default MatchHistoricalList
