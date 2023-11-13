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

// components
import Header from "./components/Header/Header"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import IncrementalLearningPage from "./pages/IncrementalLearning.page/IncrementalLearning.page"

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
          path="/incremental"
          element={<IncrementalLearningPage />}
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
          path="/profile/:username"
          element={<ProfilePage />}
        />
        <Route
          path="/practice"
          element={<PracticePage />}
        />
        <Route
          path="/communities"
          element={<CommunitiesPage />}
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
