import { useState } from "react"
import { Link } from "react-router-dom"

import "./styles.scss"
import { RegisterCredentials, RegisterCredentialsError } from "../../types/auth.types"
import { useAuthStore } from "../../store/context/authContext"

import Form from "../../components/Form/Form"
import Input from "../../components/Form/Input"
import Button from "../../components/Form/Button"

const minPasswordLength = 8
const maxPasswordLength = 24
const minUsernameLength = 3
const maxUsernameLength = 20

const RegisterPage = () => {
  const { registerUser, registerErrorMessage } = useAuthStore()

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

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > maxUsernameLength) {
      // setCredentialsError((prevState) => ({
      //   usernameError: [`username should be shorter than ${maxUsernameLength}`],
      //   passwordError: prevState.passwordError,
      //   confirmPasswordError: prevState.confirmPasswordError,
      // }))

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
    if (e.target.value.length > maxPasswordLength) {
      // setCredentialsError((prevState) => ({
      //   usernameError: prevState.usernameError,
      //   passwordError: [`password should be shorter than ${maxPasswordLength}`],
      //   confirmPasswordError: prevState.confirmPasswordError,
      // }))

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
      usernameErrors.push("this field should not be empty")
    }

    if (credentials.username.length < minUsernameLength && credentials.username.length !== 0) {
      usernameErrors.push(`username should be longer than ${minUsernameLength} characters`)
    }

    if (credentials.username.length > maxUsernameLength) {
      usernameErrors.push(`username should be shorter than ${maxUsernameLength} characters`)
    }

    if (credentials.password.length === 0) {
      passwordErrors.push("this field should not be empty")
    }

    if (credentials.password.length < minPasswordLength && credentials.password.length !== 0) {
      passwordErrors.push(`password should be longer than ${minUsernameLength} characters`)
    }

    if (credentials.password.length > maxPasswordLength) {
      passwordErrors.push(`password should be shorter than ${minUsernameLength} characters`)
    }

    if (credentials.password !== credentials.confirmPassword) {
      confirmPasswordErrors.push("passwords do not match")
    }

    if (credentials.confirmPassword.length === 0) {
      confirmPasswordErrors.push("this field should not be empty")
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
    <div className="page register-page">
      <Form onSubmit={handleSubmit}>
        <Input
          name="username"
          value={credentials.username}
          onChange={handleUsernameChange}
          errors={[...registerErrorMessage.usernameError, ...credentialsError.usernameError]}
        />
        <Input
          name="password"
          type="password"
          isVisibilityChangeable={false}
          value={credentials.password}
          onChange={handlePasswordChange}
          errors={[...registerErrorMessage.passwordError, ...credentialsError.passwordError]}
        />
        <Input
          name="confirm password"
          type="password"
          isVisibilityChangeable={false}
          value={credentials.confirmPassword}
          onChange={handleConfirmPasswordChange}
          errors={[
            ...registerErrorMessage.confirmPasswordError,
            ...credentialsError.confirmPasswordError,
          ]}
        />
        <Button className="cta-button">register</Button>
      </Form>
      <Link
        to="../login"
        className="auth-message"
      >
        Already have account? Log In
      </Link>
    </div>
  )
}
export default RegisterPage
