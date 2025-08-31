import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()

    // Replace with your actual login API endpoint
    const loginApiUrl = 'https://apis.ccbp.in/login' 
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(loginApiUrl, options)
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('jwt_token', data.jwt_token)
        navigate('/') 
      } else {
        setError(data.error_msg)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.',err);
    }
  }

  const token = localStorage.getItem('jwt_token')
  if (token) {
    return <Navigate to="/" />
  }

  return (
  
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 bg-cover bg-center bg-[url('https://res.cloudinary.com/dzpcirnqq/image/upload/v1756641885/Screenshot_2025-08-31_173423_d8wtjp.png')] md:bg-[url('https://res.cloudinary.com/dzpcirnqq/image/upload/v1756641090/Screenshot_2025-08-31_171952_xx9maz.png')] md:bg-cover">
 
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-6 rounded-xl bg-white p-8 shadow-lg"
      >
        <img
          className="mx-auto h-auto w-28"
          src="https://i.postimg.cc/5NJgcQ2k/Logo-2.png"
          alt="App Logo"
        />
        
        {/* Username Input */}
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        
        {/* Show Password Checkbox */}
        <div className="flex items-center">
          <input
            id="show-password"
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(prev => !prev)}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label htmlFor="show-password" className="ml-2 block text-sm text-gray-700">
            Show Password
          </label>
        </div>
        
        {/* Error Message Display */}
        {error && <p className="text-center text-sm font-medium text-red-600">{error}</p>}
        
        {/* Login Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-green-600 px-4 py-2 font-bold text-white shadow-md transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login