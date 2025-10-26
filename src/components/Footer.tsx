import { motion } from 'framer-motion'
import { TrendingUp, Twitter, Linkedin, Github, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: ['Features', 'Analytics', 'AI Solutions', 'Automation', 'Pricing'],
    Company: ['About Us', 'Careers', 'Blog', 'Press', 'Partners'],
    Resources: ['Documentation', 'Help Center', 'API Reference', 'Community', 'Tutorials'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security', 'Compliance'],
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ]

  return (
    <footer className="relative py-20 px-6 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center glow-effect">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">BizBroker AI</span>
            </motion.div>
            <p className="text-gray-400 mb-6">
              Revolutionizing business brokerage with advanced AI, data analytics, and
              intelligent automation.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:border-primary-400 transition-all"
                >
                  <social.icon className="w-5 h-5 text-gray-400 hover:text-primary-400 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-bold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-primary-400 transition-colors inline-block"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} BizBroker AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
