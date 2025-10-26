import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Brain, Zap, ChevronDown } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container mx-auto text-center"
      >
        {/* Floating badges */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">AI-Powered Business Intelligence</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Transform Business
          <br />
          <span className="text-gradient">Acquisitions with AI</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          Leverage advanced data analytics, artificial intelligence, and automation to
          make smarter business broker decisions with unprecedented precision.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full text-white font-semibold flex items-center gap-2 hover:shadow-2xl hover:shadow-primary-500/50 transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Analysis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            className="px-8 py-4 glass-effect rounded-full text-gray-300 font-semibold hover:border-primary-400 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[
            {
              icon: BarChart3,
              title: 'Advanced Analytics',
              description: 'Real-time data insights and predictive modeling',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: Brain,
              title: 'AI-Powered Intelligence',
              description: 'Machine learning algorithms for market analysis',
              color: 'from-purple-500 to-pink-500',
            },
            {
              icon: Zap,
              title: 'Workflow Automation',
              description: 'Streamline processes and save valuable time',
              color: 'from-orange-500 to-yellow-500',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="glass-effect rounded-2xl p-6 hover:border-primary-400/50 transition-all cursor-pointer group"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-primary-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
