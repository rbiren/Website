import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Target,
  TrendingUp,
  Shield,
  Clock,
  Database,
  Users,
  Sparkles,
  Activity,
} from 'lucide-react'

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: Target,
      title: 'Precision Targeting',
      description: 'AI-driven algorithms identify the most profitable business opportunities',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: 'Market Intelligence',
      description: 'Real-time market trends and predictive analytics for informed decisions',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Comprehensive risk analysis powered by machine learning models',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Clock,
      title: 'Time Optimization',
      description: 'Automate repetitive tasks and focus on high-value activities',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Database,
      title: 'Data Integration',
      description: 'Seamlessly connect and analyze data from multiple sources',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Users,
      title: 'Client Matching',
      description: 'Smart algorithms match businesses with ideal buyers',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Sparkles,
      title: 'Smart Valuation',
      description: 'AI-powered business valuation with accuracy and speed',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Activity,
      title: 'Performance Tracking',
      description: 'Monitor and optimize every aspect of your brokerage operations',
      gradient: 'from-cyan-500 to-blue-500',
    },
  ]

  return (
    <section id="features" className="relative py-32 px-6">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block px-4 py-2 glass-effect rounded-full text-primary-400 font-semibold mb-4"
          >
            Powerful Features
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to
            <br />
            <span className="text-gradient">Excel in Business Brokerage</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our comprehensive suite of AI-powered tools gives you the competitive edge
            in today's fast-paced business acquisition market.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-effect rounded-2xl p-6 hover:border-primary-400/50 transition-all cursor-pointer group"
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
