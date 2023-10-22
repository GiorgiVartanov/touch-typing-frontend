import { useParams } from "react-router-dom"

import "./styles.scss"

import { useAuthStore } from "../../store/context/authContext"

const ProfilePage = () => {
  const { username } = useParams()
  const { isLoggedIn } = useAuthStore()

  return <div className="page profile-page">{username}</div>
}
export default ProfilePage
