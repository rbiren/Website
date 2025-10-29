import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, UserType } from '../contexts/AuthContext'
import { Building2, LogIn, User, ShoppingCart, ArrowLeft, Briefcase } from 'lucide-react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState<UserType>('buyer')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const success = login(username, password, userType)
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Invalid credentials. Use username: "user" and password: "password"')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-blue-950/20 to-purple-950/20 -z-10" />

      {/* Animated floating orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="w-full max-w-md px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <LogIn className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                I am a
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('buyer')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    userType === 'buyer'
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                  }`}
                >
                  <ShoppingCart className={`w-5 h-5 mx-auto mb-1 ${userType === 'buyer' ? 'text-primary-500' : 'text-gray-400'}`} />
                  <span className={`text-xs font-medium ${userType === 'buyer' ? 'text-primary-400' : 'text-gray-400'}`}>
                    Buyer
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('seller')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    userType === 'seller'
                      ? 'border-accent-500 bg-accent-500/10'
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                  }`}
                >
                  <Building2 className={`w-5 h-5 mx-auto mb-1 ${userType === 'seller' ? 'text-accent-500' : 'text-gray-400'}`} />
                  <span className={`text-xs font-medium ${userType === 'seller' ? 'text-accent-400' : 'text-gray-400'}`}>
                    Seller
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('broker')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    userType === 'broker'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                  }`}
                >
                  <Briefcase className={`w-5 h-5 mx-auto mb-1 ${userType === 'broker' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className={`text-xs font-medium ${userType === 'broker' ? 'text-blue-400' : 'text-gray-400'}`}>
                    Broker
                  </span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-primary-400 hover:text-primary-300 font-medium"
              >
                Create Account
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center">
              Demo credentials: username: <span className="text-primary-400">user</span> / password: <span className="text-primary-400">password</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
