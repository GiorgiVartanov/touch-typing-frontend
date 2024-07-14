import { useParams, NavLink, Link, Outlet } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

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

  const { t } = useTranslation("translation", { keyPrefix: "profile page" })
  const { t: t_play } = useTranslation("translation", { keyPrefix: "play page" })

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
    staleTime: 500,
  })

  // if user does not exist
  if (!pageOwnerUsername) {
    return <div className="fetch-error-message">{t("user with this username does not exist")}</div>
  }

  // renders user data
  const renderUserData = () => {
    if (isLoading) return <Loading />

    if (error) {
      console.log(error)
      return <div className="fetch-error-message">{error?.message}</div>
    }

    if (!data?.data) return <div className="fetch-error-message">{t("something went wrong")}</div>

    const { username, createdLayouts } = data.data

    return (
      <div className="profile-user-data">
        {currentUserUsername !== pageOwnerUsername ? (
          <>
            <div className="user-panel">
              <p className="username">{username}</p>
              <span className="username-text">{t("'s profile page")}</span>
            </div>
            <span className="user-rating">
              {t_play("Rating")}:{" "}
              {data.data.rating ? data.data.rating.toFixed(0) : t_play("Unrated")}
            </span>
          </>
        ) : (
          ""
        )}
        <section className="profile-page-keyboard">
          <h2>{t("currently selected layout")}</h2>
          <Keyboard
            mode="uneditable"
            showLanguageSelector={true}
            showKeyboardTypeSelector={true}
            showEditButton={true}
            showSelectButton={false}
            showUtilityButtons={true}
            forceVisible={true}
            showHideKeyboardButton={false}
          />
        </section>
        <section className="profile-page-layout-select">
          {createdLayouts?.length > 0 ? (
            <h2>
              {isUserOnTheirOwnPage ? t("your") : pageOwnerUsername + t("'s")} {t("layouts")}
            </h2>
          ) : null}
          <LayoutCardList layouts={createdLayouts} />
        </section>
      </div>
    )
  }

  return <PageLayout className="profile-page">{renderUserData()}</PageLayout>
}

export default ProfilePage
