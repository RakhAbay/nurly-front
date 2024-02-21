import { useState } from 'react'
import { axiosInstance } from '../../common/config/axiosInstance'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async () => {
    const response = await axiosInstance.post('/Authentication/register', {
      email,
      username,
      fullName,
      password,
      confirmPassword
    })
    if (response.status === 200) {
      navigate('/login')
    } 
  }

  return (
    <>
    <h1>Register</h1>
    <input placeholder='email' value={email} onChange={e => setEmail(e.target.value)} /> <br />
    <input placeholder='username' value={username} onChange={e => setUsername(e.target.value)} /> <br />
    <input placeholder='fullName' value={fullName} onChange={e => setFullname(e.target.value)} /> <br />
    <input placeholder='password' value={password} onChange={e => setPassword(e.target.value)} /> <br />
    <input placeholder='confirmPassword' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /> <br />
    <button onClick={handleRegister}>Register</button>
    </>
  )
}
