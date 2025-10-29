import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useListings, Listing } from '../contexts/ListingsContext'
import {
  Building2,
  Briefcase,
  TrendingUp,
  DollarSign,
  Eye,
  LogOut,
  Plus,
  Edit,
  Trash2,
  X,
  Sparkles
} from 'lucide-react'
import BusinessOpportunityScanner from './BusinessOpportunityScanner'

// Helper function to format currency input
const formatCurrency = (value: string): string => {
  if (!value) return ''

  // Remove all non-numeric characters except decimal point
  const numericValue = value.replace(/[^\d.]/g, '')

  if (!numericValue) return ''

  const number = parseFloat(numericValue)
  if (isNaN(number)) return ''

  return `$${number.toLocaleString('en-US')}`
}

// Helper function to get numeric value from formatted currency
const getNumericValue = (value: string): string => {
  return value.replace(/[^\d.]/g, '')
}

// Helper function to calculate total portfolio value
const calculateTotalValue = (listings: Listing[]): string => {
  const total = listings.reduce((sum, listing) => {
    const priceValue = parseFloat(listing.price.replace(/[^\d.]/g, ''))
    return sum + (isNaN(priceValue) ? 0 : priceValue)
  }, 0)

  return `$${(total / 1000000).toFixed(1)}M`
}

const BrokerDashboard = () => {
  const { user, logout } = useAuth()
  const { listings, addListing, updateListing, deleteListing, getActiveListings } = useListings()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'listings' | 'scanner'>('listings')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingListing, setEditingListing] = useState<Listing | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    price: '',
    revenue: '',
    description: '',
    location: '',
    employees: 0,
    yearEstablished: new Date().getFullYear(),
    assets: '',
    liabilities: '',
    cashFlow: '',
    isActive: true,
  })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const brokerListings = listings.filter(listing => listing.createdBy === user?.username || listing.createdBy === 'broker')
  const activeListings = getActiveListings()

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault()
    addListing({
      ...formData,
      createdBy: user?.username || 'broker',
      isActive: true,
    })
    setShowCreateModal(false)
    setFormData({
      name: '',
      industry: '',
      price: '',
      revenue: '',
      description: '',
      location: '',
      employees: 0,
      yearEstablished: new Date().getFullYear(),
      assets: '',
      liabilities: '',
      cashFlow: '',
      isActive: true,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // For currency fields, just store the value as-is while typing
    if (['price', 'revenue', 'assets', 'liabilities', 'cashFlow'].includes(name)) {
      // Remove non-numeric characters but don't format yet (format on blur)
      const numericValue = value.replace(/[^\d.]/g, '')
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'employees' || name === 'yearEstablished' ? parseInt(value) || 0 : value
      }))
    }
  }

  const handleCurrencyBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (['price', 'revenue', 'assets', 'liabilities', 'cashFlow'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: formatCurrency(value)
      }))
    }
  }

  const handleCurrencyFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (['price', 'revenue', 'assets', 'liabilities', 'cashFlow'].includes(name)) {
      // Show raw numeric value when focused for easier editing
      setFormData(prev => ({
        ...prev,
        [name]: getNumericValue(value)
      }))
    }
  }

  const handleEditListing = (listing: Listing) => {
    setEditingListing(listing)
    setFormData({
      name: listing.name,
      industry: listing.industry,
      price: listing.price,
      revenue: listing.revenue,
      description: listing.description,
      location: listing.location,
      employees: listing.employees,
      yearEstablished: listing.yearEstablished,
      assets: listing.assets,
      liabilities: listing.liabilities,
      cashFlow: listing.cashFlow,
      isActive: listing.isActive,
    })
    setShowEditModal(true)
  }

  const handleUpdateListing = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingListing) {
      updateListing(editingListing.id, formData)
      setShowEditModal(false)
      setEditingListing(null)
      setFormData({
        name: '',
        industry: '',
        price: '',
        revenue: '',
        description: '',
        location: '',
        employees: 0,
        yearEstablished: new Date().getFullYear(),
        assets: '',
        liabilities: '',
        cashFlow: '',
        isActive: true,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-primary-500 p-2 rounded-xl">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Broker Dashboard</h1>
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
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">{brokerListings.length}</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Total Listings</h3>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-2xl font-bold text-white">{brokerListings.filter(l => l.isActive).length}</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Active Listings</h3>
            <p className="text-xs text-gray-500 mt-1">Currently listed</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary-500/10 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-primary-400" />
              </div>
              <span className="text-2xl font-bold text-white">{brokerListings.length * 142}</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Total Views</h3>
            <p className="text-xs text-gray-500 mt-1">Estimated</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-accent-500/10 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-accent-400" />
              </div>
              <span className="text-2xl font-bold text-white">{calculateTotalValue(brokerListings)}</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Total Value</h3>
            <p className="text-xs text-gray-500 mt-1">Portfolio worth</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'listings'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
            }`}
          >
            <Building2 className="w-5 h-5" />
            Manage Listings
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
            {/* Listings Management */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Your Listings</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Listing</span>
            </button>
          </div>

          <div className="space-y-4">
            {brokerListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-5 hover:border-gray-600 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">{listing.name}</h3>
                    <p className="text-gray-400 text-sm">{listing.industry} • {listing.location}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditListing(listing)}
                      className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteListing(listing.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-gray-500 text-xs">Price</p>
                    <p className="text-white font-semibold">{listing.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Revenue</p>
                    <p className="text-white font-semibold">{listing.revenue}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Employees</p>
                    <p className="text-white font-semibold">{listing.employees}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Status</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      listing.isActive ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {listing.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm">{listing.description}</p>
              </div>
            ))}

            {brokerListings.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-gray-400 text-lg font-medium mb-2">No listings yet</h3>
                <p className="text-gray-500 text-sm">Create your first listing to get started</p>
              </div>
            )}
          </div>
        </div>
          </>
        ) : (
          <BusinessOpportunityScanner />
        )}
      </main>

      {/* Create Listing Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Create New Listing</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Business Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    onBlur={handleCurrencyBlur}
                    onFocus={handleCurrencyFocus}
                    placeholder="1000000"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Annual Revenue</label>
                  <input
                    type="text"
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleInputChange}
                    onBlur={handleCurrencyBlur}
                    onFocus={handleCurrencyFocus}
                    placeholder="500000"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., New York, NY"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Employees</label>
                  <input
                    type="number"
                    name="employees"
                    value={formData.employees}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Year Established</label>
                  <input
                    type="number"
                    name="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cash Flow</label>
                  <input
                    type="text"
                    name="cashFlow"
                    value={formData.cashFlow}
                    onChange={handleInputChange}
                    onBlur={handleCurrencyBlur}
                    onFocus={handleCurrencyFocus}
                    placeholder="200000"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Assets</label>
                  <input
                    type="text"
                    name="assets"
                    value={formData.assets}
                    onChange={handleInputChange}
                    onBlur={handleCurrencyBlur}
                    onFocus={handleCurrencyFocus}
                    placeholder="1500000"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Liabilities</label>
                  <input
                    type="text"
                    name="liabilities"
                    value={formData.liabilities}
                    onChange={handleInputChange}
                    onBlur={handleCurrencyBlur}
                    onFocus={handleCurrencyFocus}
                    placeholder="300000"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                >
                  Create Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Listing Modal */}
      {showEditModal && editingListing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Listing</h2>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setEditingListing(null)
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdateListing} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Business Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    onBlur={handleCurrencyBlur}
                    onFocus={handleCurrencyFocus}
                    placeholder="1000000"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Annual Revenue</label>
                  <input
                    type="text"
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleInputChange}
                    onBlur={handleCurrencyBlur}
                    onFocus={handleCurrencyFocus}
                    placeholder="500000"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., New York, NY"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Employees</label>
                  <input
                    type="number"
                    name="employees"
                    value={formData.employees}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Year Established</label>
                  <input
                    type="number"
                    name="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cash Flow</label>
                  <input
                    type="text"
                    name="cashFlow"
                    value={formData.cashFlow}
                    onChange={handleInputChange}
                    onBlur={handleCurrencyBlur}
                    onFocus={handleCurrencyFocus}
                    placeholder="200000"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Assets</label>
                  <input
                    type="text"
                    name="assets"
                    value={formData.assets}
                    onChange={handleInputChange}
                    onBlur={handleCurrencyBlur}
                    onFocus={handleCurrencyFocus}
                    placeholder="1500000"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Liabilities</label>
                  <input
                    type="text"
                    name="liabilities"
                    value={formData.liabilities}
                    onChange={handleInputChange}
                    onBlur={handleCurrencyBlur}
                    onFocus={handleCurrencyFocus}
                    placeholder="300000"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 bg-gray-800 border-gray-700 rounded"
                />
                <label className="text-sm text-gray-300">Active Listing</label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingListing(null)
                  }}
                  className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                >
                  Update Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BrokerDashboard
