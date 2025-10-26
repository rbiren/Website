import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { TrendingUp, DollarSign, Activity, Users } from 'lucide-react'

const DataAnalytics = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const revenueData = [
    { month: 'Jan', revenue: 45000, deals: 12, profit: 35000 },
    { month: 'Feb', revenue: 52000, deals: 15, profit: 42000 },
    { month: 'Mar', revenue: 61000, deals: 18, profit: 51000 },
    { month: 'Apr', revenue: 58000, deals: 16, profit: 48000 },
    { month: 'May', revenue: 70000, deals: 22, profit: 60000 },
    { month: 'Jun', revenue: 85000, deals: 28, profit: 75000 },
  ]

  const industryData = [
    { name: 'Technology', value: 35, color: '#0ea5e9' },
    { name: 'Healthcare', value: 25, color: '#d946ef' },
    { name: 'Retail', value: 20, color: '#f59e0b' },
    { name: 'Manufacturing', value: 15, color: '#10b981' },
    { name: 'Services', value: 5, color: '#8b5cf6' },
  ]

  const performanceMetrics = [
    {
      icon: TrendingUp,
      label: 'Revenue Growth',
      value: '+47%',
      trend: 'up',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: DollarSign,
      label: 'Avg Deal Size',
      value: '$2.8M',
      trend: 'up',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Activity,
      label: 'Success Rate',
      value: '94%',
      trend: 'up',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      label: 'Active Clients',
      value: '156',
      trend: 'up',
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section id="analytics" className="relative py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/10 to-transparent pointer-events-none" />

      <div className="container mx-auto relative z-10">
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
            Data Analytics Dashboard
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real-Time Insights at
            <br />
            <span className="text-gradient">Your Fingertips</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Advanced analytics powered by AI to track performance, identify trends,
            and make data-driven decisions instantly.
          </p>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect rounded-2xl p-6 hover:border-primary-400/50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold">
                  ↗ {metric.value}
                </span>
              </div>
              <div className="text-gray-400 text-sm mb-1">{metric.label}</div>
              <div className="text-2xl font-bold text-white">{metric.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-6 text-white">Revenue & Profit Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0ea5e9"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#d946ef"
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Deal Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-6 text-white">Industry Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Deals Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-2xl p-6 lg:col-span-2"
          >
            <h3 className="text-xl font-bold mb-6 text-white">Monthly Deal Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Bar dataKey="deals" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DataAnalytics
