import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import "./styles.scss"
import { RegisterCredentials, RegisterCredentialsError } from "../../types/auth.types"
import { useAuthStore } from "../../store/context/authContext"

import PageLayout from "../../layout/Page.layout/Page.layout"
import Form from "../../components/Form/Form"
import Input from "../../components/Form/Input"
import Button from "../../components/Form/Button"

const minPasswordLength = 8
const maxPasswordLength = 24
const minUsernameLength = 3
const maxUsernameLength = 20

const allowedUsernameChars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "_",
]

const allowedPasswordChars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  "[",
  "]",
  "{",
  "}",
  "|",
  ";",
  ":",
  ",",
  ".",
  "<",
  ">",
  "?",
  "/",
]

const RegisterPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "auth page" })

  const {
    registerUser,
    registerErrorMessage,
    resetRegisterPasswordError,
    resetRegisterUsernameError,
  } = useAuthStore()

  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: "",
    password: "",
    confirmPassword: "",
  })

  const [credentialsError, setCredentialsError] = useState<RegisterCredentialsError>({
    usernameError: [],
    passwordError: [],
    confirmPasswordError: [],
  })

  useEffect(() => {
    resetRegisterUsernameError()
    resetRegisterPasswordError()
    setCredentialsError({
      usernameError: [],
      passwordError: [],
      confirmPasswordError: [],
    })
  }, [])

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (
      value.length > maxUsernameLength ||
      !value.split("").every((char) => allowedUsernameChars.includes(char))
    ) {
      return
    }

    setCredentialsError((prevState) => ({
      usernameError: [],
      passwordError: prevState.passwordError,
      confirmPasswordError: prevState.confirmPasswordError,
    }))

    setCredentials((prevState) => ({
      username: e.target.value,
      password: prevState.password,
      confirmPassword: prevState.confirmPassword,
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (
      value.length > maxPasswordLength ||
      !value.split("").every((char) => allowedPasswordChars.includes(char))
    ) {
      return
    }

    setCredentialsError((prevState) => ({
      usernameError: prevState.usernameError,
      passwordError: [],
      confirmPasswordError: prevState.confirmPasswordError,
    }))

    setCredentials((prevState) => ({
      username: prevState.username,
      password: e.target.value,
      confirmPassword: prevState.confirmPassword,
    }))
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (!value.split("").every((char) => allowedPasswordChars.includes(char))) {
      return
    }

    setCredentialsError((prevState) => ({
      usernameError: prevState.usernameError,
      passwordError: prevState.passwordError,
      confirmPasswordError: [],
    }))

    setCredentials((prevState) => ({
      username: prevState.username,
      password: prevState.password,
      confirmPassword: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setCredentialsError({ usernameError: [], passwordError: [], confirmPasswordError: [] })

    const usernameErrors: string[] = []
    const passwordErrors: string[] = []
    const confirmPasswordErrors: string[] = []

    if (credentials.username.length === 0) {
      usernameErrors.push(t("this field should not be empty"))
    }

    if (credentials.username.length < minUsernameLength && credentials.username.length !== 0) {
      usernameErrors.push(t(`username too short`, { minUsernameLength }))
    }

    if (credentials.username.length > maxUsernameLength) {
      usernameErrors.push(t(`username too long`, { minUsernameLength }))
    }

    if (credentials.password.length === 0) {
      passwordErrors.push(t("this field should not be empty"))
    }

    if (credentials.password.length < minPasswordLength && credentials.password.length !== 0) {
      passwordErrors.push(t(`password too short`, { minPasswordLength }))
    }

    if (credentials.password.length > maxPasswordLength) {
      passwordErrors.push(t(`password too long`, { maxPasswordLength }))
    }

    if (credentials.password !== credentials.confirmPassword) {
      confirmPasswordErrors.push(t("passwords do not match"))
    }

    if (credentials.confirmPassword.length === 0) {
      confirmPasswordErrors.push(t("this field should not be empty"))
    }

    if (
      usernameErrors.length > 0 ||
      passwordErrors.length > 0 ||
      confirmPasswordErrors.length > 0
    ) {
      setCredentialsError({
        usernameError: usernameErrors,
        passwordError: passwordErrors,
        confirmPasswordError: confirmPasswordErrors,
      })

      return
    }

    registerUser(credentials)
  }

  return (
    <PageLayout className="register-page">
      <div className="registration-benefits">
        <h2>{t("after registration, you will be able to")}</h2>
        <ul>
          <li>{t("save and share your layouts")}</li>
          <li>{t("save your preferences")}</li>
          <li>{t("save lesson progress")}</li>
          <li>{t("being able to rank by score")}</li>
        </ul>
      </div>
      <Form onSubmit={handleSubmit}>
        <Input
          name={t("username")}
          value={credentials.username}
          onChange={handleUsernameChange}
          errors={[
            ...registerErrorMessage.usernameError.map((error) => t(error)),
            ...credentialsError.usernameError,
          ]}
        />
        <Input
          name={t("password")}
          type="password"
          isVisibilityChangeable={false}
          value={credentials.password}
          onChange={handlePasswordChange}
          errors={[
            ...registerErrorMessage.passwordError.map((error) => t(error)),
            ...credentialsError.passwordError,
          ]}
        />
        <Input
          name={t("confirm password")}
          type="password"
          isVisibilityChangeable={false}
          value={credentials.confirmPassword}
          onChange={handleConfirmPasswordChange}
          errors={[
            ...registerErrorMessage.confirmPasswordError.map((error) => t(error)),
            ...credentialsError.confirmPasswordError,
          ]}
        />
        <Button className="cta-button">{t("register")}</Button>
      </Form>
      <Link
        to="../login"
        className="auth-message"
      >
        {t("already have account? log in")}
      </Link>
    </PageLayout>
  )
}
export default RegisterPage
