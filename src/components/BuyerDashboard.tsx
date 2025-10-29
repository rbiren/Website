import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useListings } from '../contexts/ListingsContext'
import {
  Building2,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  FileText,
  Heart,
  LogOut,
  Search,
  Star,
  Clock,
  Sparkles
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import BusinessOpportunityScanner from './BusinessOpportunityScanner'

const BuyerDashboard = () => {
  const { user, logout } = useAuth()
  const { getActiveListings } = useListings()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'listings' | 'scanner'>('listings')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Sample data for viewing trends
  const viewingData = [
    { month: 'Jan', views: 12 },
    { month: 'Feb', views: 19 },
    { month: 'Mar', views: 15 },
    { month: 'Apr', views: 25 },
    { month: 'May', views: 22 },
    { month: 'Jun', views: 30 }
  ]

  // Get active listings from context
  const availableListings = getActiveListings()

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-2 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Buyer Dashboard</h1>
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
          {/* Active Searches */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary-500/10 p-3 rounded-lg">
                <Search className="w-6 h-6 text-primary-400" />
              </div>
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Active Searches</h3>
            <p className="text-xs text-gray-500 mt-1">+2 from last week</p>
          </div>

          {/* Available Listings */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-accent-500/10 p-3 rounded-lg">
                <Building2 className="w-6 h-6 text-accent-400" />
              </div>
              <span className="text-2xl font-bold text-white">{availableListings.length}</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Available Listings</h3>
            <p className="text-xs text-gray-500 mt-1">On the market</p>
          </div>

          {/* Total Views */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">143</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Listings Viewed</h3>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </div>

          {/* Pending Offers */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/10 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Pending Offers</h3>
            <p className="text-xs text-gray-500 mt-1">Awaiting response</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'listings'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
            }`}
          >
            <Building2 className="w-5 h-5" />
            All Listings
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'scanner'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            AI Opportunity Scanner
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'listings' ? (
          <>
            {/* Viewing Activity Chart */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-6">Viewing Activity</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={viewingData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorViews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Available Businesses */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Available Businesses</h2>
                <span className="text-gray-400 text-sm">{availableListings.length} listings</span>
              </div>
              <div className="space-y-4">
                {availableListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-5 hover:border-gray-600 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Building2 className="w-5 h-5 text-primary-400" />
                          <h3 className="text-white font-semibold text-lg">{listing.name}</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-1">{listing.industry} • {listing.location}</p>
                        <p className="text-gray-500 text-sm mb-4">{listing.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-gray-500 text-xs">Asking Price</p>
                            <p className="text-green-400 font-semibold">{listing.price}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Annual Revenue</p>
                            <p className="text-white font-semibold">{listing.revenue}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Cash Flow</p>
                            <p className="text-blue-400 font-semibold">{listing.cashFlow}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Employees</p>
                            <p className="text-white font-semibold">{listing.employees}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                          <div>
                            <span className="text-gray-500">Established:</span> {listing.yearEstablished}
                          </div>
                          <div>
                            <span className="text-gray-500">Assets:</span> {listing.assets}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-accent-400 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">Save</span>
                      </button>
                      <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-all">
                        Request Information
                      </button>
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
                  <div className="bg-primary-500/10 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Viewed <span className="font-semibold">Tech Solutions Inc.</span></p>
                    <p className="text-gray-500 text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-500/10 p-2 rounded-lg">
                    <Heart className="w-5 h-5 text-accent-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Saved <span className="font-semibold">Green Coffee Shop</span></p>
                    <p className="text-gray-500 text-xs">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Submitted offer for <span className="font-semibold">Fitness Pro Gym</span></p>
                    <p className="text-gray-500 text-xs">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <BusinessOpportunityScanner />
        )}
      </main>
    </div>
  )
}

export default BuyerDashboard
