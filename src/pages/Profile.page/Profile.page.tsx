import { useParams, NavLink, Link, Outlet } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import PageLayout from "../../layout/Page.layout/Page.layout"

import "./styles.scss"

import { useAuthStore } from "../../store/context/authContext"
import { getUser } from "../../services/authServices"

import Loading from "../../components/Loading/Loading"
import LayoutCardList from "../LayoutSelect.page/LayoutCardList"
import Keyboard from "../../components/Keyboard/Keyboard"

// profile page
const ProfilePage = () => {
  const { username: pageOwnerUsername } = useParams()
  const { user } = useAuthStore()

  const currentUserUsername = user?.username

  const isUserOnTheirOwnPage = currentUserUsername === pageOwnerUsername

  // function to fetch user for a current page
  const fetchUser = async () => {
    if (!pageOwnerUsername) return

    const response = await getUser(pageOwnerUsername)

    return response.data
  }

  // fetched user
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", pageOwnerUsername],
    queryFn: fetchUser,
    staleTime: 1000000,
  })

  // if user does not exist
  if (!pageOwnerUsername) {
    return <div className="fetch-error-message">user with this username does not exist</div>
  }

  // renders user data
  const renderUserData = () => {
    if (isLoading) return <Loading />

    if (error) {
      console.log(error)
      return <div className="fetch-error-message">{error?.message}</div>
    }

    if (!data?.data) return <div className="fetch-error-message">something went wrong</div>

    const { username, layouts } = data.data

    return (
      <div className="profile-user-data">
        <div className="user-panel">
          <p className="username">{username}</p>
          <span className="username-text">'s profile page</span>
        </div>
        <section className="profile-page-keyboard">
          <h2>your currently selected keyboard layout</h2>
          <Keyboard
            mode="uneditable"
            showLanguageSelector={true}
            showKeyboardTypeSelector={true}
            showEditButton={true}
            showSelectButton={false}
            showUtilityButtons={true}
          />
        </section>
        <section className="profile-page-layout-select">
          {layouts ? (
            <h2>{isUserOnTheirOwnPage ? "your" : pageOwnerUsername + "'s"} layouts</h2>
          ) : null}
          <LayoutCardList layouts={layouts} />
        </section>
      </div>
    )
  }

  return <PageLayout className="profile-page">{renderUserData()}</PageLayout>
}

export default ProfilePage
