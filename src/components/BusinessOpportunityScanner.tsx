import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, TrendingUp, DollarSign, MapPin, Users, Target, Loader2, CheckCircle, AlertCircle, Globe, ExternalLink } from 'lucide-react'
import Anthropic from '@anthropic-ai/sdk'

interface ScanCriteria {
  industries: string[]
  minPrice: string
  maxPrice: string
  minRevenue: string
  maxRevenue: string
  location: string
  minEmployees: string
  maxEmployees: string
  additionalCriteria: string
}

interface CompanyResult {
  name: string
  industry: string
  location: string
  estimatedRevenue: string
  estimatedPrice: string
  employees: string
  description: string
  website: string
  reasoning: string
  score: number
  insights: string[]
  searchQuery: string
}

const BusinessOpportunityScanner = () => {
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState<CompanyResult[]>([])
  const [error, setError] = useState<string>('')
  const [showCriteria, setShowCriteria] = useState(true)
  const [searchProgress, setSearchProgress] = useState<string[]>([])

  const [criteria, setCriteria] = useState<ScanCriteria>({
    industries: [],
    minPrice: '',
    maxPrice: '',
    minRevenue: '',
    maxRevenue: '',
    location: '',
    minEmployees: '',
    maxEmployees: '',
    additionalCriteria: ''
  })

  const availableIndustries = ['Technology', 'Healthcare', 'Retail', 'Food & Beverage', 'E-commerce', 'Manufacturing', 'Professional Services', 'Real Estate', 'Entertainment', 'Education']

  const handleIndustryToggle = (industry: string) => {
    setCriteria(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCriteria(prev => ({ ...prev, [name]: value }))
  }

  const scanOpportunities = async () => {
    setScanning(true)
    setError('')
    setResults([])
    setSearchProgress([])

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

      if (!apiKey) {
        throw new Error('Anthropic API key not configured. Please add VITE_ANTHROPIC_API_KEY to your .env file.')
      }

      const anthropic = new Anthropic({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      })

      setSearchProgress(prev => [...prev, '🤖 AI Agent initializing...'])
      setSearchProgress(prev => [...prev, '🔍 Analyzing search criteria...'])

      // Build the web search prompt
      const prompt = `You are an AI agent specialized in finding business acquisition opportunities on the web. Based on the following criteria, you need to identify real companies that might be available for acquisition or investment.

**Search Criteria:**
${criteria.industries.length > 0 ? `- Industries: ${criteria.industries.join(', ')}` : '- Industries: Any'}
${criteria.minPrice || criteria.maxPrice ? `- Price Range: ${criteria.minPrice ? '$' + criteria.minPrice : 'Any'} to ${criteria.maxPrice ? '$' + criteria.maxPrice : 'Any'}` : ''}
${criteria.minRevenue || criteria.maxRevenue ? `- Revenue Range: ${criteria.minRevenue ? '$' + criteria.minRevenue : 'Any'} to ${criteria.maxRevenue ? '$' + criteria.maxRevenue : 'Any'}` : ''}
${criteria.location ? `- Location: ${criteria.location}` : '- Location: Any'}
${criteria.minEmployees || criteria.maxEmployees ? `- Employee Count: ${criteria.minEmployees || 'Any'} to ${criteria.maxEmployees || 'Any'}` : ''}
${criteria.additionalCriteria ? `- Additional Requirements: ${criteria.additionalCriteria}` : ''}

Your task:
1. Identify 5-10 real companies that match these criteria
2. For each company, provide realistic estimates of their business metrics
3. Explain why each company is a good match
4. Provide insights about acquisition potential

Focus on finding companies that are:
- In the specified industries
- Located in the target area
- Size-appropriate (employees, revenue)
- Potentially available for acquisition (family-owned, succession planning, market consolidation opportunities)

Format your response as a JSON array with this structure:
[
  {
    "name": "Company Name",
    "industry": "Industry",
    "location": "City, State",
    "estimatedRevenue": "Estimated annual revenue",
    "estimatedPrice": "Estimated valuation/price",
    "employees": "Number of employees",
    "description": "Brief description of the company and what they do",
    "website": "company-website.com (if known, or 'N/A')",
    "reasoning": "Why this company matches the criteria and acquisition potential",
    "score": 85,
    "insights": ["insight 1", "insight 2", "insight 3"],
    "searchQuery": "Search query that would find this company"
  }
]

Only include companies with a score of 60 or higher. Sort by score descending.`

      setSearchProgress(prev => [...prev, '🌐 Searching the web for companies...'])
      setSearchProgress(prev => [...prev, '📊 Analyzing company data...'])

      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 8000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })

      setSearchProgress(prev => [...prev, '✅ Processing results...'])

      // Parse the response
      const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

      // Extract JSON from the response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('Could not parse AI response. Please try again.')
      }

      const companies: CompanyResult[] = JSON.parse(jsonMatch[0])

      if (companies.length === 0) {
        setError('No companies found matching your criteria. Try adjusting your search parameters.')
      } else {
        setResults(companies)
        setShowCriteria(false)
        setSearchProgress(prev => [...prev, `✅ Found ${companies.length} matching opportunities!`])
      }

    } catch (err: any) {
      console.error('Scan error:', err)
      if (err.message?.includes('not_found_error')) {
        setError('API configuration error. Please check the model name or contact support.')
      } else {
        setError(err.message || 'Failed to scan opportunities. Please try again.')
      }
    } finally {
      setScanning(false)
    }
  }

  const resetScan = () => {
    setResults([])
    setShowCriteria(true)
    setError('')
    setSearchProgress([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-8 h-8 animate-pulse" />
              <h2 className="text-3xl font-bold">AI Web Search Agent</h2>
            </div>
            <p className="text-purple-100">
              AI-powered agent that explores the web to find business acquisition opportunities
            </p>
          </div>
          <Target className="w-16 h-16 opacity-20" />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {showCriteria ? (
          <motion.div
            key="criteria"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Set Your Search Criteria</h3>

            {/* Industries */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Target Industries
              </label>
              <div className="flex flex-wrap gap-2">
                {availableIndustries.map(industry => (
                  <button
                    key={industry}
                    onClick={() => handleIndustryToggle(industry)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      criteria.industries.includes(industry)
                        ? 'bg-purple-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Min Price
                </label>
                <input
                  type="text"
                  name="minPrice"
                  value={criteria.minPrice}
                  onChange={handleInputChange}
                  placeholder="e.g., 500000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Max Price
                </label>
                <input
                  type="text"
                  name="maxPrice"
                  value={criteria.maxPrice}
                  onChange={handleInputChange}
                  placeholder="e.g., 5000000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Revenue Range */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  Min Revenue
                </label>
                <input
                  type="text"
                  name="minRevenue"
                  value={criteria.minRevenue}
                  onChange={handleInputChange}
                  placeholder="e.g., 1000000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  Max Revenue
                </label>
                <input
                  type="text"
                  name="maxRevenue"
                  value={criteria.maxRevenue}
                  onChange={handleInputChange}
                  placeholder="e.g., 10000000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location/Region
              </label>
              <input
                type="text"
                name="location"
                value={criteria.location}
                onChange={handleInputChange}
                placeholder="e.g., California, New York, Texas, United States"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
              />
            </div>

            {/* Employee Range */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Min Employees
                </label>
                <input
                  type="text"
                  name="minEmployees"
                  value={criteria.minEmployees}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Max Employees
                </label>
                <input
                  type="text"
                  name="maxEmployees"
                  value={criteria.maxEmployees}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Additional Criteria */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Search Parameters
              </label>
              <textarea
                name="additionalCriteria"
                value={criteria.additionalCriteria}
                onChange={handleInputChange}
                placeholder="e.g., Looking for family-owned businesses, companies with recurring revenue, SaaS businesses, businesses in growth markets, succession planning opportunities..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
              />
            </div>

            {/* Search Progress */}
            {scanning && searchProgress.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Search Progress:</h4>
                <div className="space-y-1">
                  {searchProgress.map((progress, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-blue-700"
                    >
                      {progress}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Search Button */}
            <button
              onClick={scanOpportunities}
              disabled={scanning}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {scanning ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Searching the Web...
                </>
              ) : (
                <>
                  <Globe className="w-6 h-6" />
                  Search for Companies
                </>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Results Header */}
            <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Companies Found
                </h3>
                <p className="text-gray-600">
                  Discovered {results.length} potential acquisition {results.length === 1 ? 'target' : 'targets'}
                </p>
              </div>
              <button
                onClick={resetScan}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                New Search
              </button>
            </div>

            {/* Results List */}
            {results.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Companies Found
                </h3>
                <p className="text-gray-600 mb-6">
                  No companies matched your criteria. Try adjusting your search parameters.
                </p>
                <button
                  onClick={resetScan}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Adjust Criteria
                </button>
              </div>
            ) : (
              results.map((company, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
                >
                  {/* Score Badge & Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-2xl font-bold text-gray-900">
                          {company.name}
                        </h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {company.industry}
                        </span>
                        {company.website !== 'N/A' && (
                          <a
                            href={`https://${company.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-700 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {company.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {company.employees} employees
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${
                          company.score >= 80
                            ? 'bg-green-100 text-green-700'
                            : company.score >= 60
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {company.score}
                      </div>
                      <span className="text-sm text-gray-500 mt-1">Match Score</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-4">{company.description}</p>

                  {/* Business Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Est. Valuation</p>
                      <p className="text-lg font-semibold text-gray-900">{company.estimatedPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Est. Revenue</p>
                      <p className="text-lg font-semibold text-gray-900">{company.estimatedRevenue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Search Query</p>
                      <p className="text-sm font-medium text-blue-600 truncate">{company.searchQuery}</p>
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div className="mb-4 p-4 bg-purple-50 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      AI Analysis
                    </h5>
                    <p className="text-gray-700">{company.reasoning}</p>
                  </div>

                  {/* Key Insights */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Key Insights</h5>
                    <div className="space-y-2">
                      {company.insights.map((insight, insightIdx) => (
                        <div
                          key={insightIdx}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <p>{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BusinessOpportunityScanner
