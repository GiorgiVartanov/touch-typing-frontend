import { useEffect, useState } from "react"
import PageLayout from "../../layout/Page.layout/Page.layout"
import Loading from "../../components/Loading/Loading"
import ajax from "../../services/ajax"
import "./styles.scss"
import { useAuthStore } from "../../store/context/authContext"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

interface UserRating {
  username: string
  rating: number
}

const RatingPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userRating, setUserRating] = useState<UserRating[]>([] as UserRating[])

  const { t } = useTranslation("translation", { keyPrefix: "play page" })

  const { user, token } = useAuthStore()

  useEffect(() => {
    setIsLoading(true)
    const fetchMatches = async () => {
      // Fetch matches based on user search input
      const response = await ajax.get(`/user/rating`)
      const tmpUserRating: UserRating[] = response.data.data
      setUserRating(tmpUserRating.sort((a, b) => b.rating - a.rating))
    }
    fetchMatches()

    setIsLoading(false)
  }, [])

  if (isLoading) return <Loading />

  return (
    <PageLayout>
      <div className="list">
        {userRating.map((ratedUser, index) => {
          return (
            <Link
              key={ratedUser.username}
              className={
                "card " +
                (user && user.username === ratedUser.username ? "highlight" : "") +
                (!ratedUser.rating ? " unranked" : "")
              }
              to={`../profile/${ratedUser.username}`}
            >
              <div>
                {index + 1}. {ratedUser.username}
              </div>
              <div>{!ratedUser.rating ? t("Unrated") : ratedUser.rating.toFixed(0)}</div>
            </Link>
          )
        })}
      </div>
    </PageLayout>
  )
}

export default RatingPage
