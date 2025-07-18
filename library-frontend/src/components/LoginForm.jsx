import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../services/queries'
import './LoginForm.css'  // Archivo CSS para estilos

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('jorge')
  const [password, setPassword] = useState('secret')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div className="login-container">
      <h2>login</h2>
      <form onSubmit={submit} className="login-form">
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
            autoComplete="username"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
            autoComplete="current-password"
          />
        </label>

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
