import { useState } from "react"
import { Link } from "react-router-dom"

import "./styles.scss"
import { LoginCredentials, LoginCredentialsError } from "../../types/auth.types"
import { useAuthStore } from "../../store/context/authContext"

import Form from "../../components/Form/Form"
import Input from "../../components/Form/Input"
import Button from "../../components/Form/Button"

const LoginPage = () => {
  const { loginUser, loginErrorMessage } = useAuthStore()

  // const navigate = useNavigate()

  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  })

  const [credentialsError, setCredentialsError] = useState<LoginCredentialsError>({
    usernameError: [],
    passwordError: [],
  })

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => ({
      username: e.target.value,
      password: prevState.password,
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => ({
      username: prevState.username,
      password: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    loginUser(credentials)
  }

  // useEffect(() => {
  //   if (isLoggedIn) navigate("/")
  // }, [isLoggedIn, navigate])

  return (
    <div className="page register-page">
      <Form onSubmit={handleSubmit}>
        <Input
          name="username"
          value={credentials.username}
          onChange={handleUsernameChange}
        />
        <Input
          name="password"
          type="password"
          value={credentials.password}
          onChange={handlePasswordChange}
        />
        <Button>log in</Button>
        {loginErrorMessage ? <div className="error">{loginErrorMessage}</div> : ""}
      </Form>
      <Link
        to="../register"
        className="auth-message"
      >
        Don't have account yet? Register
      </Link>
    </div>
  )
}
export default LoginPage
