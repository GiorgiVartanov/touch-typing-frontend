import { useState } from "react"

import "./styles.scss"
import {
  registerCredentialsInterface,
  registerCredentialsErrorInterface,
} from "../../types/auth.types"
import { useAuthStore } from "../../store/context/authContext"

import Form from "../../components/Form/Form"
import Input from "../../components/Form/Input"
import Button from "../../components/Form/Button"

const RegisterPage = () => {
  const { registerUser, registerErrorMessage } = useAuthStore()

  // const navigate = useNavigate()

  const [credentials, setCredentials] = useState<registerCredentialsInterface>({
    username: "",
    password: "",
    confirmPassword: "",
  })

  const [credentialsError, setCredentialsError] = useState<registerCredentialsErrorInterface>({
    usernameError: [],
    passwordError: [],
    confirmPasswordError: [],
  })

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentialsError({ usernameError: [], passwordError: [], confirmPasswordError: [] })

    setCredentials((prevState) => ({
      username: e.target.value,
      password: prevState.password,
      confirmPassword: prevState.confirmPassword,
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentialsError({ usernameError: [], passwordError: [], confirmPasswordError: [] })

    setCredentials((prevState) => ({
      username: prevState.username,
      password: e.target.value,
      confirmPassword: prevState.confirmPassword,
    }))
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentialsError({ usernameError: [], passwordError: [], confirmPasswordError: [] })

    setCredentials((prevState) => ({
      username: prevState.username,
      password: prevState.password,
      confirmPassword: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setCredentialsError({ usernameError: [], passwordError: [], confirmPasswordError: [] })

    if (credentials.username.length < 8)
      setCredentialsError((prevState) => ({
        usernameError: [...prevState.usernameError, "username too short"],
        passwordError: prevState.passwordError,
        confirmPasswordError: prevState.confirmPasswordError,
      }))

    if (credentials.username.length > 24)
      setCredentialsError((prevState) => ({
        usernameError: [...prevState.usernameError, "username too long"],
        passwordError: prevState.passwordError,
        confirmPasswordError: prevState.confirmPasswordError,
      }))

    if (credentials.username.length < 6)
      setCredentialsError((prevState) => ({
        usernameError: prevState.usernameError,
        passwordError: [...prevState.passwordError, "password too short"],
        confirmPasswordError: prevState.confirmPasswordError,
      }))

    if (credentials.username.length > 40)
      setCredentialsError((prevState) => ({
        usernameError: prevState.usernameError,
        passwordError: [...prevState.passwordError, "password too long"],
        confirmPasswordError: prevState.confirmPasswordError,
      }))

    if (credentials.password !== credentials.confirmPassword)
      setCredentialsError((prevState) => ({
        usernameError: prevState.usernameError,
        passwordError: [...prevState.passwordError, "passwords do not match"],
        confirmPasswordError: [...prevState.confirmPasswordError, "passwords do not match"],
      }))

    if (
      credentialsError.usernameError.length > 0 ||
      credentialsError.passwordError.length > 0 ||
      credentialsError.confirmPasswordError.length > 0 ||
      credentials.username.length === 0 ||
      credentials.password.length === 0 ||
      credentials.confirmPassword.length == 0
    ) {
      return
    }

    registerUser(credentials)
  }

  // useEffect(() => {
  //   if (isLoggedIn) navigate("/")
  // }, [isLoggedIn, navigate])

  // console.log(registerErrorMessage)

  return (
    <div className="page register-page">
      <Form onSubmit={handleSubmit}>
        <Input
          name="username"
          value={credentials.username}
          onChange={handleUsernameChange}
          errors={credentialsError.usernameError}
        />
        <Input
          name="password"
          type="password"
          value={credentials.password}
          onChange={handlePasswordChange}
          errors={credentialsError.passwordError}
        />
        <Input
          name="confirm password"
          type="password"
          value={credentials.confirmPassword}
          onChange={handleConfirmPasswordChange}
          errors={credentialsError.confirmPasswordError}
        />
        <Button>register</Button>
        {registerErrorMessage ? <div className="error">{registerErrorMessage}</div> : ""}
      </Form>
    </div>
  )
}
export default RegisterPage
