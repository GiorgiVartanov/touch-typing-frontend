import { useEffect, useState } from "react"
import PageLayout from "../../layout/Page.layout/Page.layout"
import Loading from "../../components/Loading/Loading"
import ajax from "../../services/ajax"
import "./styles.scss"

interface UserRating {
  username: string
  rating: number
}

const RatingPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userRating, setUserRating] = useState<UserRating[]>([] as UserRating[])

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

  console.log("here: ", userRating)

  return (
    <PageLayout>
      <div className="list">
        {userRating.map((user) => {
          return (
            <div
              key={user.username}
              className="card"
            >
              <div>{user.username}</div>
              <div> {!user.rating ? "Unrated" : user.rating}</div>
            </div>
          )
        })}
      </div>
    </PageLayout>
  )
}

export default RatingPage
