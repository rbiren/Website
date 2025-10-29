import { createContext, useContext, useState, ReactNode } from 'react'

export interface Listing {
  id: string
  name: string
  industry: string
  price: string
  revenue: string
  description: string
  location: string
  employees: number
  yearEstablished: number
  assets: string
  liabilities: string
  cashFlow: string
  createdBy: string
  createdAt: Date
  isActive: boolean
}

interface ListingsContextType {
  listings: Listing[]
  addListing: (listing: Omit<Listing, 'id' | 'createdAt'>) => void
  updateListing: (id: string, listing: Partial<Listing>) => void
  deleteListing: (id: string) => void
  getActiveListings: () => Listing[]
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined)

export const useListings = () => {
  const context = useContext(ListingsContext)
  if (!context) {
    throw new Error('useListings must be used within ListingsProvider')
  }
  return context
}

interface ListingsProviderProps {
  children: ReactNode
}

export const ListingsProvider = ({ children }: ListingsProviderProps) => {
  const [listings, setListings] = useState<Listing[]>([
    // Sample listings
    {
      id: '1',
      name: 'Tech Solutions Inc.',
      industry: 'Technology',
      price: '$2,500,000',
      revenue: '$1,200,000',
      description: 'Established software development company with recurring revenue from enterprise clients.',
      location: 'San Francisco, CA',
      employees: 15,
      yearEstablished: 2015,
      assets: '$3,000,000',
      liabilities: '$500,000',
      cashFlow: '$400,000',
      createdBy: 'broker',
      createdAt: new Date('2024-01-15'),
      isActive: true,
    },
    {
      id: '2',
      name: 'Green Coffee Shop',
      industry: 'Food & Beverage',
      price: '$450,000',
      revenue: '$320,000',
      description: 'Popular local coffee shop with loyal customer base and prime location.',
      location: 'Portland, OR',
      employees: 8,
      yearEstablished: 2018,
      assets: '$600,000',
      liabilities: '$150,000',
      cashFlow: '$120,000',
      createdBy: 'broker',
      createdAt: new Date('2024-02-10'),
      isActive: true,
    },
    {
      id: '3',
      name: 'Fitness Pro Gym',
      industry: 'Health & Fitness',
      price: '$850,000',
      revenue: '$580,000',
      description: 'Modern fitness center with state-of-the-art equipment and high membership retention.',
      location: 'Austin, TX',
      employees: 12,
      yearEstablished: 2016,
      assets: '$1,200,000',
      liabilities: '$350,000',
      cashFlow: '$200,000',
      createdBy: 'broker',
      createdAt: new Date('2024-01-20'),
      isActive: true,
    },
  ])

  const addListing = (listing: Omit<Listing, 'id' | 'createdAt'>) => {
    const newListing: Listing = {
      ...listing,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setListings([...listings, newListing])
  }

  const updateListing = (id: string, updatedListing: Partial<Listing>) => {
    setListings(listings.map(listing =>
      listing.id === id ? { ...listing, ...updatedListing } : listing
    ))
  }

  const deleteListing = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id))
  }

  const getActiveListings = () => {
    return listings.filter(listing => listing.isActive)
  }

  return (
    <ListingsContext.Provider value={{ listings, addListing, updateListing, deleteListing, getActiveListings }}>
      {children}
    </ListingsContext.Provider>
  )
}
