// packages
import { Routes, Route } from "react-router-dom"

// styles
import "./App.scss"

import { useAppSettingsStore } from "./store/context/appSettingsContext"

// pages
import MainPage from "./pages/Main.page/Main.page"
import LoginPage from "./pages/Login.page/Login.page"
import RegisterPage from "./pages/Register.page/Register.page"
import LessonListPage from "./pages/LessonList.page/LessonList.page"
import LessonPage from "./pages/Lesson.page/Lesson.page"
import PlayPage from "./pages/Play.page/Play.page"
import PracticePage from "./pages/Practice.page/Practice.page"
import PageNotFoundPage from "./pages/PageNotFound.page/PageNotFound.page"
import ProfilePage from "./pages/Profile.page/Profile.page"
import CommunitiesPage from "./pages/Communities.page/Communities.page"
import FakeWordsPage from "./pages/FakeWords.page/FakeWords"
import SettingsPage from "./pages/Settings.page/Settings.page"
import LeaderboardsPage from "./pages/Leaderboards.page/Leaderboards.page"
import NotificationsPage from "./pages/Notifications.page/Notifications.page"

// components
import Header from "./components/Header/Header"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import AssessLevelPage from "./pages/AssessLevel.page/AssessLevel.page"
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
          path="/learn"
          element={<LessonListPage />}
        />
        <Route
          path="/fake"
          element={<FakeWordsPage />}
        />
        <Route
          path="/lesson/:id"
          element={<LessonPage />}
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
          element={<MatchHistoricalList/>}
        />
        <Route
          path="/match/:id"
          element={<MatchHistorical/>}
        />        
        <Route
          path="/profile/:username"
          element={<ProfilePage />}
        />
        <Route
          path="/practice"
          element={<PracticePage />}
        />
        <Route
          path="/assessment"
          element={<AssessLevelPage/>}
        />
        <Route
          path="/communities"
          element={<CommunitiesPage />}
        />
        <Route
          path="/leaderboards"
          element={<LeaderboardsPage />}
        />
        <Route
          path="/notifications"
          element={<NotificationsPage />}
        />
        <Route
          path="/settings"
          element={<SettingsPage />}
        />
        <Route
          path="/*"
          element={<PageNotFoundPage />}
        />
      </Routes>
    </div>
  )
}

export default App
