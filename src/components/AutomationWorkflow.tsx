import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import {
  FileSearch,
  UserCheck,
  FileText,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Clock,
  Zap,
} from 'lucide-react'

const AutomationWorkflow = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeStep, setActiveStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const workflowSteps = [
    {
      icon: FileSearch,
      title: 'Business Discovery',
      description: 'AI automatically scans and identifies potential opportunities',
      duration: '2-3 days',
      automation: '95%',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: UserCheck,
      title: 'Buyer Matching',
      description: 'Smart algorithms match businesses with qualified buyers',
      duration: '1-2 days',
      automation: '90%',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FileText,
      title: 'Document Preparation',
      description: 'Automated generation of contracts and legal documents',
      duration: '3-4 hours',
      automation: '85%',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: DollarSign,
      title: 'Valuation Analysis',
      description: 'AI-powered business valuation and pricing optimization',
      duration: '1-2 hours',
      automation: '92%',
      color: 'from-orange-500 to-yellow-500',
    },
    {
      icon: CheckCircle,
      title: 'Deal Closure',
      description: 'Streamlined closing process with automated workflows',
      duration: '5-7 days',
      automation: '80%',
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setIsAnimating(true)
        setTimeout(() => {
          setActiveStep((prev) => (prev + 1) % workflowSteps.length)
          setIsAnimating(false)
        }, 500)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [inView, workflowSteps.length])

  const automationBenefits = [
    { label: 'Time Saved', value: '75%', icon: Clock },
    { label: 'Efficiency Gain', value: '3x', icon: Zap },
    { label: 'Error Reduction', value: '95%', icon: CheckCircle },
  ]

  return (
    <section id="automation" className="relative py-32 px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/10 via-transparent to-accent-950/10 pointer-events-none" />

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
            Intelligent Automation
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Streamlined Workflows
            <br />
            <span className="text-gradient">Powered by Automation</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our automated workflow engine handles repetitive tasks, allowing you to
            focus on building relationships and closing deals.
          </p>
        </motion.div>

        {/* Automation Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {automationBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-2xl p-6 text-center"
            >
              <benefit.icon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gradient mb-2">{benefit.value}</div>
              <div className="text-gray-400">{benefit.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Workflow Visualization */}
        <div className="glass-effect rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-8 text-center">Automated Deal Pipeline</h3>

          {/* Desktop View - Horizontal Flow */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 opacity-20" />

              <div className="flex justify-between items-start relative">
                {workflowSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center flex-1 relative">
                    {/* Step Circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.1, type: 'spring' }}
                      className="relative"
                    >
                      <motion.div
                        animate={{
                          scale: activeStep === index ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.5 }}
                        className={`w-32 h-32 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center cursor-pointer shadow-lg ${
                          activeStep === index ? 'glow-effect' : ''
                        }`}
                        onClick={() => setActiveStep(index)}
                      >
                        <step.icon className="w-12 h-12 text-white" />
                      </motion.div>

                      {/* Progress Ring */}
                      {activeStep === index && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1.3, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className={`absolute inset-0 border-4 border-primary-400 rounded-full`}
                        />
                      )}
                    </motion.div>

                    {/* Step Info */}
                    <div className="mt-6 text-center">
                      <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-400 mb-3 max-w-[200px]">
                        {step.description}
                      </p>
                      <div className="flex flex-col gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-950/30 rounded-full text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{step.duration}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-950/30 rounded-full text-xs">
                          <Zap className="w-3 h-3" />
                          <span>{step.automation} automated</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    {index < workflowSteps.length - 1 && (
                      <ArrowRight className="absolute top-16 -right-8 w-16 h-6 text-primary-400 opacity-50" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View - Vertical Flow */}
          <div className="md:hidden space-y-6">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveStep(index)}
                className={`glass-effect rounded-xl p-6 cursor-pointer transition-all ${
                  activeStep === index ? 'border-primary-400 glow-effect' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-400 mb-3">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-950/30 rounded-full text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{step.duration}</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-950/30 rounded-full text-xs">
                        <Zap className="w-3 h-3" />
                        <span>{step.automation} automated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AutomationWorkflow
