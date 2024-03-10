// packages
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { useEffect } from "react"

// styles
import "./App.scss"

import { useAppSettingsStore } from "./store/context/appSettingsContext"

// pages
import MainPage from "./pages/Main.page/Main.page"
import LoginPage from "./pages/Login.page/Login.page"
import RegisterPage from "./pages/Register.page/Register.page"
import PracticeListPage from "./pages/PracticeTextList.page/PracticeTextList.page"
import PracticePage from "./pages/PracticeText.page/PracticeText.page"
import PlayPage from "./pages/Play.page/Play.page"
import PageNotFoundPage from "./pages/PageNotFound.page/PageNotFound.page"
import ProfilePage from "./pages/Profile.page/Profile.page"
import FakeWordsPage from "./pages/FakeWords.page/FakeWords"
import SettingsPage from "./pages/Settings.page/Settings.page"
import LeaderboardsPage from "./pages/Leaderboards.page/Leaderboards.page"
import NotificationsPage from "./pages/Notifications.page/Notifications.page"
import LessonList from "./pages/LessonList.page/LessonList.page"
import Lesson from "./pages/Lesson.page/Lesson.page"
import GamesPage from "./pages/Games.page/Games.page"
import SocialPage from "./pages/Social.page/Social.page"

// sub pages
import Friends from "./pages/Profile.page/Friends"
import History from "./pages/Profile.page/History"

// components
import Header from "./components/Header/Header"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Match from "./pages/Play.page/Match"
import MatchHistorical from "./pages/Play.page/MatchList/MatchHistorical"
import MatchHistoricalList from "./pages/Play.page/MatchList/MatchHistoricalList"

const App = () => {
  const { theme } = useAppSettingsStore()

  let themeToApply = ""

  if (theme === "Dark") themeToApply = "dark"
  else if (theme === "Light") themeToApply = "light"
  else if (window.matchMedia("(prefers-color-scheme: dark)")) themeToApply = "dark"
  else themeToApply = "light"

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light")
    document.documentElement.classList.add(themeToApply)
  }, [themeToApply])

  return (
    <div className={`App ${themeToApply}`}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute level="Guest">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute level="Guest">
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice"
          element={<PracticeListPage />}
        />
        <Route
          path="/practice/:id"
          element={<PracticePage />}
        />
        <Route
          path="/lessons"
          element={<LessonList />}
        />
        <Route
          path="/lesson/:id"
          element={<Lesson />}
        />
        <Route
          path="/fake"
          element={<FakeWordsPage />}
        />
        <Route
          path="/play"
          element={<PlayPage />}
        />
        <Route
          path="/play/:id"
          element={<Match />}
        />
        <Route
          path="/match"
          element={<MatchHistoricalList />}
        />
        <Route
          path="/match/:id"
          element={<MatchHistorical />}
        />
        <Route
          path="/profile/:username"
          element={<ProfilePage />}
        >
          <Route
            path=""
            element={<History />}
          />
          {/* <Route
            path="history"
            element={<History />}
          /> */}
          <Route
            path="friends"
            element={<Friends />}
          />
        </Route>
        <Route
          path="/leaderboards"
          element={<LeaderboardsPage />}
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute level="User">
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={<SettingsPage />}
        />
        <Route
          path="/social"
          element={<SocialPage />}
        />
        <Route
          path="/games"
          element={<GamesPage />}
        />
        <Route
          path="/*"
          element={<PageNotFoundPage />}
        />
      </Routes>
      {/* <Footer /> */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={themeToApply}
      />
    </div>
  )
}

export default App
