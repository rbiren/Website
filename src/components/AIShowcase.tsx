import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Brain, MessageSquare, Search, Sparkles, Zap, ChevronRight } from 'lucide-react'

const AIShowcase = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeDemo, setActiveDemo] = useState(0)
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', text: 'Hello! I can help you analyze business opportunities. What would you like to know?' },
  ])
  const [inputValue, setInputValue] = useState('')

  const aiCapabilities = [
    {
      icon: Brain,
      title: 'Predictive Analytics',
      description: 'AI models forecast business performance and market trends',
      demo: 'predictive',
    },
    {
      icon: MessageSquare,
      title: 'AI Assistant',
      description: 'Natural language processing for instant insights',
      demo: 'chat',
    },
    {
      icon: Search,
      title: 'Smart Discovery',
      description: 'Intelligent search and matching algorithms',
      demo: 'search',
    },
  ]

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    setChatMessages([
      ...chatMessages,
      { type: 'user', text: inputValue },
      {
        type: 'ai',
        text: 'Based on current market analysis, I recommend focusing on tech companies in the $2M-$5M range. The sector shows 23% growth with strong buyer demand.',
      },
    ])
    setInputValue('')
  }

  const predictiveInsights = [
    { metric: 'Deal Success Probability', value: '87%', trend: 'high' },
    { metric: 'Optimal Listing Price', value: '$4.2M', trend: 'optimal' },
    { metric: 'Time to Close Estimate', value: '45 days', trend: 'fast' },
    { metric: 'Buyer Interest Score', value: '9.2/10', trend: 'high' },
  ]

  return (
    <section id="ai" className="relative py-32 px-6">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block px-4 py-2 glass-effect rounded-full text-primary-400 font-semibold mb-4"
          >
            AI-Powered Intelligence
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience the Future of
            <br />
            <span className="text-gradient">Business Brokerage</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our advanced AI engine analyzes millions of data points to provide
            actionable insights and intelligent recommendations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {aiCapabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => setActiveDemo(index)}
              className={`glass-effect rounded-2xl p-6 cursor-pointer transition-all ${
                activeDemo === index ? 'border-primary-400 glow-effect' : 'hover:border-primary-400/50'
              }`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4">
                <capability.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{capability.title}</h3>
              <p className="text-gray-400">{capability.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-8"
        >
          {activeDemo === 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary-400" />
                Predictive Analytics Dashboard
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {predictiveInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-primary-950/30 to-accent-950/30 rounded-xl p-6 border border-primary-400/20"
                  >
                    <div className="text-gray-400 text-sm mb-2">{insight.metric}</div>
                    <div className="text-3xl font-bold text-white mb-2">{insight.value}</div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        insight.trend === 'high' ? 'bg-green-400' :
                        insight.trend === 'optimal' ? 'bg-blue-400' : 'bg-purple-400'
                      } animate-pulse`} />
                      <span className="text-sm text-gray-400 capitalize">{insight.trend}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeDemo === 1 && (
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary-400" />
                AI Business Advisor
              </h3>
              <div className="bg-gray-900/50 rounded-xl p-4 h-96 overflow-y-auto mb-4">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                          : 'glass-effect text-gray-300'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about market trends, valuations, opportunities..."
                  className="flex-1 bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-400 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl text-white font-semibold"
                >
                  Send
                </motion.button>
              </div>
            </div>
          )}

          {activeDemo === 2 && (
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Search className="w-6 h-6 text-primary-400" />
                Intelligent Business Discovery
              </h3>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search for businesses by industry, revenue, location..."
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary-400 transition-colors"
                />
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: 'TechCore Solutions',
                    industry: 'Technology',
                    revenue: '$3.2M',
                    match: '95%',
                  },
                  {
                    name: 'HealthFirst Clinics',
                    industry: 'Healthcare',
                    revenue: '$2.8M',
                    match: '89%',
                  },
                  {
                    name: 'RetailMax Group',
                    industry: 'Retail',
                    revenue: '$4.5M',
                    match: '87%',
                  },
                ].map((business, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="glass-effect rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-primary-400/50 transition-all"
                  >
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{business.name}</h4>
                      <div className="flex gap-4 text-sm text-gray-400">
                        <span>{business.industry}</span>
                        <span>•</span>
                        <span>{business.revenue} Annual Revenue</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-400 mb-1">Match Score</div>
                        <div className="text-lg font-bold text-green-400">{business.match}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default AIShowcase
