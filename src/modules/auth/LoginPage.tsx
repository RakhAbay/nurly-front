import { useState } from 'react'
import { axiosInstance } from '../../common/config/axiosInstance'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const response = await axiosInstance.post('/Authentication/login', {
      email,
      password
    })
    if (response.status === 200) {
      navigate('/category')
    } 
  }

  return (
    <>
    <h1>Login</h1>
    <input placeholder='email' value={email} onChange={e => setEmail(e.target.value)} /> <br />
    <input placeholder='password' value={password} onChange={e => setPassword(e.target.value)} /> <br />
    <button onClick={handleLogin}>login</button>
    </>
  )
}
