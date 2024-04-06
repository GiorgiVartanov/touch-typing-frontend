import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import "./styles.scss"
import { LoginCredentials, LoginCredentialsError } from "../../types/auth.types"
import { useAuthStore } from "../../store/context/authContext"

import PageLayout from "../../layout/Page.layout/Page.layout"
import Form from "../../components/Form/Form"
import Input from "../../components/Form/Input"
import Button from "../../components/Form/Button"

const LoginPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "auth page" })

  const { loginUser, loginErrorMessage, resetLoginPasswordError, resetLoginUsernameError } =
    useAuthStore()

  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  })

  const [credentialsError, setCredentialsError] = useState<LoginCredentialsError>({
    usernameError: [],
    passwordError: [],
  })

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentialsError((prevState) => ({
      usernameError: [],
      passwordError: prevState.passwordError,
    }))

    resetLoginUsernameError()

    setCredentials((prevState) => ({
      username: e.target.value,
      password: prevState.password,
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentialsError((prevState) => ({
      usernameError: prevState.usernameError,
      passwordError: [],
    }))

    resetLoginPasswordError()

    setCredentials((prevState) => ({
      username: prevState.username,
      password: e.target.value,
    }))
  }

  const handleLogIn = async (credentials: LoginCredentials) => {
    // FIX HERE !!!!!!!

    // I don't remember what I want to fix here

    await loginUser(credentials)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const usernameErrors: string[] = []
    const passwordErrors: string[] = []

    if (credentials.username.length === 0) {
      usernameErrors.push(t("this field should not be empty"))
    }

    if (credentials.password.length === 0) {
      passwordErrors.push(t("this field should not be empty"))
    }

    if (usernameErrors.length > 0 || passwordErrors.length > 0) {
      setCredentialsError({
        usernameError: usernameErrors,
        passwordError: passwordErrors,
      })
      return
    }

    handleLogIn(credentials)
  }

  return (
    <PageLayout className="register-page">
      <Form onSubmit={handleSubmit}>
        <Input
          name={t("username")}
          value={credentials.username}
          onChange={handleUsernameChange}
          errors={[
            ...loginErrorMessage.usernameError.map((error) => t(error)),
            ...credentialsError.usernameError,
          ]}
        />
        <Input
          name={t("password")}
          type="password"
          value={credentials.password}
          onChange={handlePasswordChange}
          errors={[
            ...loginErrorMessage.passwordError.map((error) => t(error)),
            ...credentialsError.passwordError,
          ]}
        />
        <Button className="cta-button">log in</Button>
      </Form>
      <Link
        to="../register"
        className="auth-message"
      >
        {t("don't have account yet? register")}
      </Link>
    </PageLayout>
  )
}

export default LoginPage
