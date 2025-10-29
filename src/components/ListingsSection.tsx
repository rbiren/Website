import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useListings } from '../contexts/ListingsContext'
import { Building2, TrendingUp, Users, MapPin, Calendar, Lock } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const ListingsSection = () => {
  const { getActiveListings } = useListings()
  const navigate = useNavigate()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const activeListings = getActiveListings()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="listings" className="relative py-20 px-6">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Active Business Opportunities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Featured Businesses</span> for Sale
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover exclusive opportunities. Sign in as a buyer for full details and financial information.
          </p>
        </motion.div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activeListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              variants={itemVariants}
              className="glass-effect rounded-2xl p-6 hover:border-primary-400/50 transition-all cursor-pointer group relative overflow-hidden"
              whileHover={{ y: -5 }}
            >
              {/* Lock indicator */}
              <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-2">
                <Lock className="w-4 h-4 text-gray-400" />
              </div>

              {/* Industry Badge */}
              <div className="inline-block mb-4">
                <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-xs font-medium">
                  {listing.industry}
                </span>
              </div>

              {/* Anonymous Business Name */}
              <h3 className="text-xl font-bold text-white mb-2">
                {listing.industry} Business - #{listing.id.slice(0, 4).toUpperCase()}
              </h3>

              {/* Location */}
              <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{listing.location}</span>
              </div>

              {/* Key Metrics - Partially Hidden */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Asking Price</p>
                  <p className="text-green-400 font-semibold">{listing.price}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 relative">
                  <p className="text-gray-500 text-xs mb-1">Revenue</p>
                  <p className="text-white font-semibold blur-sm">$XXX,XXX</p>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{listing.employees} employees</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Est. {listing.yearEstablished}</span>
                </div>
              </div>

              {/* Description - Truncated */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {listing.description}
              </p>

              {/* CTA Button */}
              <button
                onClick={() => navigate('/login')}
                className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/50 transition-all flex items-center justify-center space-x-2 group-hover:scale-105"
              >
                <span>Sign In for Full Details</span>
                <Lock className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-3xl mx-auto">
            <Building2 className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Unlock Full Business Details
            </h3>
            <p className="text-gray-400 mb-6">
              Create a buyer account to access complete financial information, contact details, and exclusive insights on all available businesses.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            >
              Create Buyer Account
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ListingsSection
