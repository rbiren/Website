import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from './Hero'
import Features from './Features'
import ListingsSection from './ListingsSection'
import DataAnalytics from './DataAnalytics'
import AIShowcase from './AIShowcase'
import AutomationWorkflow from './AutomationWorkflow'
import ContactForm from './ContactForm'
import Navigation from './Navigation'
import Footer from './Footer'

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-blue-950/20 to-purple-950/20 -z-10" />

      {/* Animated floating orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '3s', transform: `translateY(${scrollY * -0.15}px)` }}
        />
      </div>

      <Navigation />
      <Hero />
      <Features />
      <ListingsSection />
      <DataAnalytics />
      <AIShowcase />
      <AutomationWorkflow />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default HomePage
