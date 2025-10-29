import { useAuth } from '../contexts/AuthContext'
import BuyerDashboard from './BuyerDashboard'
import SellerDashboard from './SellerDashboard'
import BrokerDashboard from './BrokerDashboard'

const Dashboard = () => {
  const { user } = useAuth()

  if (user?.userType === 'buyer') {
    return <BuyerDashboard />
  }

  if (user?.userType === 'seller') {
    return <SellerDashboard />
  }

  if (user?.userType === 'broker') {
    return <BrokerDashboard />
  }

  return null
}

export default Dashboard
