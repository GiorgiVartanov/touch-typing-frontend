// packages
import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"

// styles
import "./App.scss"

import { useAppSettingsStore } from "./store/context/appSettingsContext"

// pages
import Layout from "./layout/App.layout/App.layout"
import MainPage from "./pages/Main.page/Main.page"
import LoginPage from "./pages/Login.page/Login.page"
import RegisterPage from "./pages/Register.page/Register.page"
import PracticeListPage from "./pages/PracticeTextList.page/PracticeTextList.page"
import PracticePage from "./pages/PracticeText.page/PracticeText.page"
import PlayPage from "./pages/Play.page/Play.page"
import PageNotFoundPage from "./pages/PageNotFound.page/PageNotFound.page"
import ProfilePage from "./pages/Profile.page/Profile.page"
import InstallationGuideLinuxPage from "./pages/InstallationGuide.page/installationGuide-linux.page"
import InstallationGuideMacPage from "./pages/InstallationGuide.page/installationGuide-mac.page"
import Lesson from "./pages/Lesson.page/Lesson.page"
import CreateLayoutPage from "./pages/CreateLayout.page/CreateLayout.page"
import LayoutSelectPage from "./pages/LayoutSelect.page/LayoutSelectPage"
import LayoutPreviewPage from "./pages/LayoutPreview.page/LayoutPreview.page"
import InstallationGuidePage from "./pages/InstallationGuide.page/InstallationGuide.page"
import Exercise from "./pages/Lesson.page/Exercise"
import Assessment from "./pages/Lesson.page/Assessment"

// components
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Match from "./pages/Match.page/Match"
import MatchHistorical from "./pages/MatchList.page/MatchHistorical"
import MatchHistoricalList from "./pages/MatchList.page/MatchHistoricalList"
import RatingPage from "./pages/Rating.page/Rating.page"

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
    <Layout themeToApply={themeToApply}>
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
          path="/create"
          element={<CreateLayoutPage />}
        />
        <Route
          path="/practice"
          element={<PracticeListPage />}
        />
        <Route
          path="/practice/:id"
          element={<PracticePage />}
        />
        {/* <Route
          path="/lessons"
          element={<LessonList />}
        /> */}
        <Route
          path="/lessons"
          element={<Lesson />}
        />
        <Route
          path="/lessons/exercise/:letter"
          element={<Exercise />}
        />
        <Route
          path="/lessons/assessment/:assessmentLevel"
          element={<Assessment />}
        />
        <Route
          path="/play"
          element={<PlayPage />}
        />
        <Route
          path="/rating"
          element={<RatingPage />}
        />
        <Route
          path="/match/:id"
          element={<Match />}
        />
        <Route
          path="/matches"
          element={<MatchHistoricalList />}
        />
        <Route
          path="/matches/:id"
          element={<MatchHistorical />}
        />
        <Route
          path="/profile/:username"
          element={<ProfilePage />}
        />
        <Route
          path="/layout"
          element={<LayoutSelectPage />}
        />
        <Route
          path="/layout/:id"
          element={<LayoutPreviewPage />}
        />
        <Route
          path="/guides/how_to_install_layout_on_windows"
          element={<InstallationGuidePage />}
        />
        <Route
          path="/guides/how_to_install_layout_on_mac"
          element={<InstallationGuideMacPage />}
        />
        <Route
          path="/guides/how_to_install_layout_on_linux"
          element={<InstallationGuideLinuxPage />}
        />
        <Route
          path="/*"
          element={<PageNotFoundPage />}
        />
      </Routes>
    </Layout>
  )
}

export default App
