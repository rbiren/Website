import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Building2,
  TrendingUp,
  DollarSign,
  Eye,
  Users,
  LogOut,
  MessageSquare,
  Calendar,
  BarChart3
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const SellerDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Sample data for listing performance
  const performanceData = [
    { month: 'Jan', inquiries: 15, views: 120 },
    { month: 'Feb', inquiries: 22, views: 185 },
    { month: 'Mar', inquiries: 18, views: 165 },
    { month: 'Apr', inquiries: 28, views: 230 },
    { month: 'May', inquiries: 35, views: 290 },
    { month: 'Jun', inquiries: 42, views: 340 }
  ]

  // Sample active listings
  const activeListings = [
    {
      id: 1,
      name: 'Premium Restaurant',
      price: '$1.8M',
      views: 245,
      inquiries: 18,
      offers: 3,
      daysListed: 45
    },
    {
      id: 2,
      name: 'Software Company',
      price: '$3.2M',
      views: 412,
      inquiries: 32,
      offers: 7,
      daysListed: 30
    },
    {
      id: 3,
      name: 'Retail Store Chain',
      price: '$2.5M',
      views: 328,
      inquiries: 25,
      offers: 5,
      daysListed: 60
    }
  ]

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-accent-500 to-primary-500 p-2 rounded-xl">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Seller Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back, {user?.username}!</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Listings */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-accent-500/10 p-3 rounded-lg">
                <Building2 className="w-6 h-6 text-accent-400" />
              </div>
              <span className="text-2xl font-bold text-white">{activeListings.length}</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Active Listings</h3>
            <p className="text-xs text-gray-500 mt-1">Currently on market</p>
          </div>

          {/* Total Views */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">985</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Total Views</h3>
            <p className="text-xs text-gray-500 mt-1">+15% from last month</p>
          </div>

          {/* Active Inquiries */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary-500/10 p-3 rounded-lg">
                <MessageSquare className="w-6 h-6 text-primary-400" />
              </div>
              <span className="text-2xl font-bold text-white">75</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Total Inquiries</h3>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </div>

          {/* Active Offers */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/10 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-2xl font-bold text-white">15</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Active Offers</h3>
            <p className="text-xs text-gray-500 mt-1">Under review</p>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Views Chart */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Monthly Views</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Inquiries Chart */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Monthly Inquiries</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="inquiries" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Listings Table */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Your Active Listings</h2>
            <button className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-sm font-medium transition-all">
              Create New Listing
            </button>
          </div>
          <div className="space-y-4">
            {activeListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-5 hover:border-gray-600 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{listing.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 font-semibold text-xl">{listing.price}</span>
                      <span className="text-gray-500 text-sm">•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{listing.daysListed} days</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-all">
                    Manage
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-xs">Views</span>
                    </div>
                    <span className="text-white font-semibold">{listing.views}</span>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-400 text-xs">Inquiries</span>
                    </div>
                    <span className="text-white font-semibold">{listing.inquiries}</span>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-gray-400 text-xs">Offers</span>
                    </div>
                    <span className="text-white font-semibold">{listing.offers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 mt-8">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-500/10 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">New offer received for <span className="font-semibold">Software Company</span></p>
                <p className="text-gray-500 text-xs">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-primary-500/10 p-2 rounded-lg">
                <MessageSquare className="w-5 h-5 text-primary-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">New inquiry for <span className="font-semibold">Premium Restaurant</span></p>
                <p className="text-gray-500 text-xs">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <Eye className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm"><span className="font-semibold">Retail Store Chain</span> viewed 12 times today</p>
                <p className="text-gray-500 text-xs">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-accent-500/10 p-2 rounded-lg">
                <BarChart3 className="w-5 h-5 text-accent-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">Performance report generated</p>
                <p className="text-gray-500 text-xs">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SellerDashboard
