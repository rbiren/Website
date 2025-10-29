# Business Broker Platform - Project Context

## Project Overview

A comprehensive business broker platform built with React, TypeScript, and Vite. The platform enables three user types (buyers, sellers, and brokers) to interact with business listings. Brokers can create and manage listings, buyers can view detailed information about available businesses, and sellers can track their listing performance.

## Tech Stack

### Core Technologies
- **React 18.3.1** - UI library with hooks and functional components
- **TypeScript 5.5.3** - Type-safe JavaScript
- **Vite 5.4.10** - Build tool and dev server with HMR

### UI & Styling
- **Tailwind CSS 3.4.14** - Utility-first CSS framework
- **Framer Motion 11.11.17** - Animation library for smooth transitions
- **Lucide React 0.462.0** - Icon library

### Routing & State Management
- **React Router DOM 6.27.0** - Client-side routing
- **Context API** - Global state management (AuthContext, ListingsContext)

### Data Visualization
- **Recharts 2.13.3** - Charts and graphs for dashboard analytics

### AI Integration
- **Anthropic SDK 0.32.1** - Claude AI integration for web-based opportunity discovery
- **Claude Sonnet 4.5** - Latest AI model for intelligent company search

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS & Autoprefixer** - CSS processing

## Project Structure

```
Website/
├── src/
│   ├── components/
│   │   ├── Login.tsx                 # User authentication with 3 user types
│   │   ├── SignUp.tsx                # User registration form
│   │   ├── Dashboard.tsx             # Routes to type-specific dashboards
│   │   ├── BuyerDashboard.tsx        # Buyer view with full listing details
│   │   ├── SellerDashboard.tsx       # Seller view with performance stats
│   │   ├── BrokerDashboard.tsx       # Broker view with CRUD operations
│   │   ├── BusinessOpportunityScanner.tsx  # AI-powered opportunity analysis
│   │   ├── HomePage.tsx              # Main landing page
│   │   ├── Hero.tsx                  # Hero section with CTAs
│   │   ├── Navigation.tsx            # Top navigation bar
│   │   ├── ListingsSection.tsx       # Public listings with anonymity
│   │   ├── ProtectedRoute.tsx        # Route guard for authentication
│   │   └── [other components]        # Features, testimonials, etc.
│   ├── contexts/
│   │   ├── AuthContext.tsx           # Authentication state management
│   │   └── ListingsContext.tsx       # Listings state management
│   ├── App.tsx                       # Root component with routing
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles & Tailwind imports
├── public/                           # Static assets
├── package.json                      # Dependencies and scripts
├── vite.config.ts                    # Vite configuration
├── tailwind.config.js                # Tailwind customization
├── tsconfig.json                     # TypeScript configuration
└── PROJECT_CONTEXT.md                # This file
```

## Core Components Documentation

### Authentication System

#### **AuthContext.tsx** (src/contexts/AuthContext.tsx)
**Purpose**: Manages user authentication and session state

**Key Features**:
- Defines three user types: `'buyer' | 'seller' | 'broker'`
- Hardcoded demo credentials (username: "user", password: "password")
- Provides login/logout functionality
- Persists user session across page refreshes via localStorage

**Key Code**:
```typescript
export type UserType = 'buyer' | 'seller' | 'broker'

interface User {
  username: string
  userType: UserType
}

const login = (username: string, password: string, userType: UserType): boolean => {
  if (username === 'user' && password === 'password') {
    setUser({ username, userType })
    return true
  }
  return false
}
```

#### **Login.tsx** (src/components/Login.tsx)
**Purpose**: User authentication interface

**Key Features**:
- Username and password inputs
- 3-column grid for user type selection (Buyer, Seller, Broker)
- Visual feedback for selected user type
- Error messaging for invalid credentials
- Back button to homepage
- Link to signup page
- Demo credentials displayed at bottom

**User Flow**:
1. User enters credentials
2. Selects user type (buyer/seller/broker)
3. Submits form
4. On success: redirects to /dashboard
5. On failure: shows error message

#### **SignUp.tsx** (src/components/SignUp.tsx)
**Purpose**: User registration interface

**Key Features**:
- User type selection at top of form
- Username, email, password, and confirm password fields
- Client-side validation (password matching, minimum length)
- Success animation after registration
- Auto-login after 1.5 seconds
- Demo mode note (all registrations use same demo credentials)

**Validation Rules**:
- Passwords must match
- Password minimum 6 characters
- All fields required

#### **ProtectedRoute.tsx** (src/components/ProtectedRoute.tsx)
**Purpose**: Route guard for authenticated pages

**Logic**: Checks if user is authenticated, redirects to /login if not

### Listings Management System

#### **ListingsContext.tsx** (src/contexts/ListingsContext.tsx)
**Purpose**: Centralized state management for business listings

**Listing Interface**:
```typescript
export interface Listing {
  id: string                    // Unique identifier
  name: string                  // Business name
  industry: string              // Industry category
  price: string                 // Asking price (formatted)
  revenue: string               // Annual revenue (formatted)
  description: string           // Business description
  location: string              // Geographic location
  employees: number             // Number of employees
  yearEstablished: number       // Year business was established
  assets: string                // Total assets (formatted)
  liabilities: string           // Total liabilities (formatted)
  cashFlow: string              // Annual cash flow (formatted)
  createdBy: string             // Username of creator
  createdAt: Date               // Creation timestamp
  isActive: boolean             // Listing status
}
```

**Pre-populated Data**: 3 sample listings
- Tech Consulting Firm
- Restaurant Chain
- E-commerce Platform

**Functions**:
- `addListing(listing: Omit<Listing, 'id' | 'createdAt'>): void`
- `updateListing(id: string, updates: Partial<Listing>): void`
- `deleteListing(id: string): void`
- `getActiveListings(): Listing[]` - Returns only active listings
- `getListingsByCreator(username: string): Listing[]` - Returns user's listings

#### **ListingsSection.tsx** (src/components/ListingsSection.tsx)
**Purpose**: Public-facing listings on homepage with anonymity

**Anonymity Features**:
- Business name replaced with: `{industry} Business - #{id}`
- Revenue field blurred with lock icon overlay
- Limited information displayed
- "Sign In for Full Details" CTA on each listing
- Lock icon badge in top-right corner

**Displayed Information**:
- Industry badge
- Anonymous business identifier
- Location
- Asking price (visible)
- Revenue (blurred)
- Number of employees
- Year established
- Truncated description (2 lines)

**User Flow**:
- Anonymous visitors see limited info
- Click "Sign In for Full Details" → navigates to /login
- Click "Create Buyer Account" → navigates to /signup

### Dashboard System

#### **Dashboard.tsx** (src/components/Dashboard.tsx)
**Purpose**: Router component that directs users to appropriate dashboard

**Logic**:
```typescript
if (user?.userType === 'buyer') return <BuyerDashboard />
if (user?.userType === 'seller') return <SellerDashboard />
if (user?.userType === 'broker') return <BrokerDashboard />
```

#### **BuyerDashboard.tsx** (src/components/BuyerDashboard.tsx)
**Purpose**: Dashboard for buyers to view available businesses

**Key Features**:
- "Available Businesses" section showing all active listings
- Full listing details (no anonymity)
- Detailed metrics grid:
  - Asking Price
  - Annual Revenue
  - Cash Flow
  - Employees
  - Year Established
  - Location
  - Assets
  - Liabilities
- Business description
- "Express Interest" button (currently non-functional placeholder)

**Data Source**: `getActiveListings()` from ListingsContext

#### **SellerDashboard.tsx** (src/components/SellerDashboard.tsx)
**Purpose**: Dashboard for sellers with listing performance stats

**Key Features**:
- Overview stats cards
- Engagement chart (views over time)
- Inquiries chart
- Performance metrics

#### **BrokerDashboard.tsx** (src/components/BrokerDashboard.tsx)
**Purpose**: Dashboard for brokers to manage business listings

**Key Features**:

1. **Dynamic Stats Cards**:
   - Total Listings: `brokerListings.length`
   - Active Listings: `brokerListings.filter(l => l.isActive).length`
   - Total Views: `brokerListings.length * 142` (simulated)
   - Total Value: `calculateTotalValue(brokerListings)`

2. **Create New Listing Modal**:
   - 11 input fields (name, industry, location, price, revenue, etc.)
   - Smart currency formatting on blur
   - Raw number input on focus
   - Active/Inactive toggle

3. **Listing Management**:
   - View all listings in cards
   - Edit button opens pre-filled modal
   - Delete button with confirmation
   - Toggle active/inactive status
   - Visual indicators for active status

4. **Edit Listing Modal**:
   - Pre-populated with existing data
   - Same smart formatting as create modal
   - Update functionality

**Helper Functions**:

```typescript
// Format number as currency with commas
const formatCurrency = (value: string): string => {
  const numericValue = value.replace(/[^\d.]/g, '')
  if (!numericValue) return ''
  const number = parseFloat(numericValue)
  if (isNaN(number)) return ''
  return `${number.toLocaleString('en-US')}`
}

// Extract numeric value from formatted string
const getNumericValue = (value: string): string => {
  return value.replace(/[^\d.]/g, '')
}

// Calculate total portfolio value
const calculateTotalValue = (listings: Listing[]): string => {
  const total = listings.reduce((sum, listing) => {
    const priceValue = parseFloat(listing.price.replace(/[^\d.]/g, ''))
    return sum + (isNaN(priceValue) ? 0 : priceValue)
  }, 0)
  return `${(total / 1000000).toFixed(1)}M`
}

// Format currency on field blur (when leaving field)
const handleCurrencyBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  if (['price', 'revenue', 'assets', 'liabilities', 'cashFlow'].includes(name)) {
    setFormData(prev => ({ ...prev, [name]: formatCurrency(value) }))
  }
}

// Show raw number on field focus (when editing)
const handleCurrencyFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  if (['price', 'revenue', 'assets', 'liabilities', 'cashFlow'].includes(name)) {
    setFormData(prev => ({ ...prev, [name]: getNumericValue(value) }))
  }
}
```

**Currency Fields**: price, revenue, assets, liabilities, cashFlow
- All use onBlur/onFocus handlers for smart formatting
- Placeholders show raw numbers (e.g., "1000000")
- Display shows formatted with commas (e.g., "1,000,000")

### AI Integration

#### **BusinessOpportunityScanner.tsx** (src/components/BusinessOpportunityScanner.tsx)
**Purpose**: AI-powered web search agent that finds real business acquisition opportunities

**Key Features**:

1. **Criteria Configuration**:
   - Industry selection (multi-select from 10 categories)
   - Price range (min/max)
   - Revenue range (min/max)
   - Location/region preferences
   - Employee count range (min/max)
   - Additional search parameters (free-text)

2. **AI Web Search Engine**:
   - Uses Claude Sonnet 4.5 (latest model) via Anthropic SDK
   - Actively searches for real companies matching criteria
   - Generates 5-10 potential acquisition targets from the web
   - Provides realistic business estimates (revenue, valuation, employees)
   - Identifies companies with acquisition potential
   - Real-time search progress indicators

3. **Company Results Display**:
   - Color-coded match scores (green: 80+, yellow: 60-79, orange: 50-59)
   - Company name, industry, and location
   - Clickable website links (opens in new tab)
   - Estimated valuation and revenue
   - 3-5 key insights per company
   - AI reasoning explaining acquisition potential
   - Search query that would find each company
   - Option to start new search with different criteria

**User Interface**:
- Tab-based navigation in Buyer and Broker dashboards
- Animated globe icon with pulsing effect
- "AI Web Search Agent" branding
- Real-time search progress indicators
- Animated transitions between criteria form and results
- Responsive grid layout for all screen sizes
- Loading states with progress messages during AI search
- Error handling with user-friendly messages

**AI Integration Details**:
```typescript
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
```

**API Configuration**:
- Model: `claude-sonnet-4-5-20250929` (Latest Claude Sonnet 4.5)
- Max tokens: 8000 (increased for detailed company research)
- Browser-enabled (dangerouslyAllowBrowser: true)
- Response format: JSON array with structured company data

**Accessibility**:
- Available to: Buyers and Brokers only (not Sellers)
- Accessible via "AI Opportunity Scanner" tab in dashboards
- Searches the web for real companies (not local listings)

**Workflow**:
1. User sets search criteria (industries, location, size, etc.)
2. Clicks "Search for Companies" button
3. AI agent shows search progress with status updates
4. Claude analyzes web data to find matching companies (typically 3-8 seconds)
5. Results display 5-10 potential acquisition targets with:
   - Company details and websites
   - Estimated valuations and metrics
   - AI reasoning for acquisition potential
   - Search queries that would find them
6. User can click website links to research companies further
7. User can start new search with adjusted criteria

### Navigation & Routing

#### **App.tsx** (src/App.tsx)
**Purpose**: Root component with routing configuration

**Route Structure**:
```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

**Providers Hierarchy**:
```typescript
<AuthProvider>
  <ListingsProvider>
    <Router>
      {/* Routes */}
    </Router>
  </ListingsProvider>
</AuthProvider>
```

#### **Navigation.tsx** (src/components/Navigation.tsx)
**Purpose**: Top navigation bar

**Key Features**:
- Logo and branding
- Navigation links (Features, Listings, Analytics, Contact)
- "Client Login" button → navigates to /login
- Responsive design
- Smooth scroll to sections

#### **Hero.tsx** (src/components/Hero.tsx)
**Purpose**: Hero section on homepage

**CTA Buttons**:
- "Start Free Analysis" → navigates to /login
- "Watch Demo" → smooth scrolls to #contact section

#### **HomePage.tsx** (src/components/HomePage.tsx)
**Purpose**: Main landing page composition

**Sections**:
- Navigation
- Hero
- Features
- ListingsSection (active businesses preview)
- Analytics
- Testimonials
- Contact

## Implemented Features

### Authentication & User Management
- ✅ Login system with hardcoded demo credentials (user/password)
- ✅ Three user types: Buyer, Seller, Broker
- ✅ Protected routes requiring authentication
- ✅ User type-based dashboard routing
- ✅ Session persistence via localStorage
- ✅ Signup page with validation
- ✅ Auto-login after successful registration
- ✅ Logout functionality

### Listings Management (Broker)
- ✅ Create new business listings (11 fields)
- ✅ Edit existing listings with pre-populated data
- ✅ Delete listings
- ✅ Toggle listing active/inactive status
- ✅ Smart currency formatting (focus/blur handlers)
- ✅ Dynamic stats calculations
- ✅ View all personal listings
- ✅ Pre-populated sample data (3 listings)
- ✅ AI Web Search Agent for finding acquisition targets
- ✅ Market research with Claude AI
- ✅ Tab navigation between listings management and AI scanner

### Buyer Features
- ✅ View all active listings
- ✅ Full listing details (no anonymity)
- ✅ Comprehensive financial metrics
- ✅ Clean, organized card layout
- ✅ "Express Interest" button (UI only)
- ✅ AI Web Search Agent powered by Claude Sonnet 4.5
- ✅ Find real companies on the web based on criteria
- ✅ View company websites and contact information
- ✅ Tab navigation between listings and AI scanner

### Seller Features
- ✅ Dashboard with performance metrics
- ✅ Engagement charts
- ✅ Inquiries tracking
- ✅ Overview statistics

### Public Features (Homepage)
- ✅ Anonymous listing preview
- ✅ Partial information display with lock indicators
- ✅ Revenue field blurred for non-authenticated users
- ✅ "Sign In for Full Details" CTA
- ✅ "Create Buyer Account" CTA
- ✅ Responsive grid layout

### UI/UX Features
- ✅ Smooth animations (Framer Motion)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Glass-morphism effects
- ✅ Gradient backgrounds
- ✅ Animated floating orbs
- ✅ Icon integration (Lucide React)
- ✅ Loading states
- ✅ Error messaging
- ✅ Success animations
- ✅ Back navigation buttons

## Architectural Decisions & Patterns

### State Management Strategy
**Decision**: Use Context API instead of Redux or other state management libraries

**Rationale**:
- Project scope doesn't require complex state management
- Context API sufficient for two global states (auth, listings)
- Reduces bundle size and complexity
- Easy to understand and maintain

**Implementation**:
- `AuthContext`: User session and authentication methods
- `ListingsContext`: Centralized listing data with CRUD operations

### Protected Routing Pattern
**Pattern**: Higher-order component for route protection

```typescript
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

**Benefits**:
- Centralized authentication check
- Automatic redirect to login
- Easy to apply to multiple routes
- Clean component composition

### Type-Based Dashboard Routing
**Pattern**: Single dashboard route that internally routes based on user type

```typescript
// Dashboard.tsx acts as a router
const Dashboard = () => {
  const { user } = useAuth()
  if (user?.userType === 'buyer') return <BuyerDashboard />
  if (user?.userType === 'seller') return <SellerDashboard />
  if (user?.userType === 'broker') return <BrokerDashboard />
  return null
}
```

**Benefits**:
- Single URL for all dashboard types
- Clean route structure
- Easy to add new user types
- Centralized dashboard logic

### Currency Formatting Strategy
**Pattern**: Focus/blur event handlers for smart formatting

**Implementation**:
- `onFocus`: Strip formatting, show raw numbers
- `onBlur`: Apply formatting with commas
- `onChange`: Store raw value

**User Experience**:
1. Field shows: "1,000,000"
2. User clicks: Shows "1000000" (easy to edit)
3. User types: "2500000"
4. User leaves field: Shows "2,500,000"

**Benefits**:
- Natural editing experience
- Consistent display formatting
- No interference with user input
- Automatic formatting on blur

### Component Composition Pattern
**Pattern**: Container/Presentational component separation

**Example**:
- HomePage (container) composes Navigation, Hero, Features, etc.
- Each section is self-contained and reusable

**Benefits**:
- Modular code organization
- Easy to rearrange sections
- Better code reusability
- Simplified testing

### Modal Management Pattern
**Pattern**: Local state for modal visibility with separate create/edit states

```typescript
const [showCreateModal, setShowCreateModal] = useState(false)
const [editingListing, setEditingListing] = useState<Listing | null>(null)
```

**Benefits**:
- Clear separation between create and edit modes
- Easy to determine current operation
- Can have different validation rules
- Better user feedback

## Current State

### What's Working
✅ **Authentication System**
- Login with demo credentials
- User type selection
- Session persistence
- Protected routes
- Signup flow with auto-login

✅ **Broker Dashboard**
- Create listings with 11 fields
- Edit existing listings
- Delete listings
- Toggle active/inactive
- Dynamic stats cards
- Smart currency formatting
- View all personal listings

✅ **Buyer Dashboard**
- View all active listings
- Full financial details
- Comprehensive metrics
- Clean card layout

✅ **Seller Dashboard**
- Performance statistics
- Engagement charts
- Overview metrics

✅ **Homepage**
- Anonymous listing preview
- Public-facing business cards
- Gated content with lock indicators
- CTAs for signup/login

✅ **Navigation**
- Functional routing between all pages
- Back buttons where needed
- Smooth scrolling to sections
- Client login access

✅ **UI/UX**
- Responsive design
- Animations and transitions
- Loading states
- Error handling

✅ **AI Features**
- Claude Sonnet 4.5 (latest model) integration
- Web search agent for finding real companies
- Identifies 5-10 acquisition targets per search
- Smart company matching with 0-100 scoring
- Detailed AI-generated insights and reasoning
- Company website links and contact info
- Realistic valuation and revenue estimates
- Multi-criteria filtering (industry, size, location, revenue)
- Real-time search progress indicators
- Tab-based navigation for scanner access
- Real-time AI analysis (3-8 seconds per search)

### Demo Credentials
- **Username**: user
- **Password**: password
- **User Types**: Select at login/signup (buyer, seller, or broker)

### Known Limitations

#### 1. Demo Mode / No Backend
**Current**: All functionality is client-side only

**Limitations**:
- Same credentials for all users
- No real user accounts
- No data persistence (refreshes clear data)
- No real authentication/authorization
- Signup doesn't create actual accounts

**Impact**: This is a demo/prototype - not production-ready

#### 2. In-Memory Data Storage
**Current**: Listings stored in Context state only

**Limitations**:
- Data lost on page refresh
- No database integration
- No data synchronization
- No multi-user support

**Impact**: Changes don't persist across sessions

#### 3. Static Analytics
**Current**: Charts and stats use placeholder/calculated data

**Limitations**:
- Views count is calculated (listings * 142)
- No real tracking
- No historical data
- No real-time updates

**Impact**: Analytics are illustrative only

#### 4. Non-Functional Features
**Current**: Some UI elements are placeholders

**Examples**:
- "Express Interest" button (BuyerDashboard)
- "Watch Demo" video functionality
- Contact form submission
- Email notifications

**Impact**: UI is complete but lacks backend integration

#### 5. Single Broker Limitation
**Current**: All listings appear to be from same broker

**Limitation**: No way to distinguish between different brokers creating listings

**Impact**: All logged-in users see all listings (no user-specific filtering working correctly due to demo credentials)

#### 6. No Image Upload
**Current**: Listings don't support images

**Missing**: Photo upload, gallery, business logos

**Impact**: Listings are text-only

#### 7. No Search/Filter
**Current**: All listings shown without filtering

**Missing**:
- Search by industry
- Filter by price range
- Sort by various criteria
- Location-based filtering

**Impact**: Difficult to navigate with many listings

#### 8. No Messaging System
**Current**: No communication between users

**Missing**:
- Broker-Buyer messaging
- Inquiry system
- Notification system

**Impact**: No way to express interest functionally

## Next Planned Steps

### Priority 1: Backend Integration
- [ ] Set up backend API (Node.js/Express or similar)
- [ ] Implement real authentication with JWT
- [ ] Create database schema (PostgreSQL or MongoDB)
- [ ] Add user registration endpoint
- [ ] Add login/logout endpoints
- [ ] Migrate listings to database
- [ ] Add CRUD API endpoints for listings

### Priority 2: User Management
- [ ] Multiple user accounts with unique credentials
- [ ] User profiles
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Role-based permissions
- [ ] User-specific listing management

### Priority 3: Enhanced Listing Features
- [ ] Image upload for listings
- [ ] Document attachments (financial statements, etc.)
- [ ] Rich text editor for descriptions
- [ ] Business logo upload
- [ ] Multiple photos per listing
- [ ] Photo gallery component

### Priority 4: Search & Discovery
- [ ] Search functionality
- [ ] Filter by industry
- [ ] Filter by price range
- [ ] Filter by location
- [ ] Sort options (price, date, etc.)
- [ ] Advanced search with multiple criteria

### Priority 5: Messaging System
- [ ] Inquiry system
- [ ] Direct messaging between buyers and brokers
- [ ] Email notifications
- [ ] In-app notification system
- [ ] Message history

### Priority 6: Analytics & Tracking
- [ ] Real view tracking
- [ ] User engagement metrics
- [ ] Listing performance analytics
- [ ] Dashboard analytics with real data
- [ ] Export analytics reports

### Priority 7: Additional Features
- [ ] Saved/favorited listings for buyers
- [ ] Comparison tool for multiple businesses
- [ ] Valuation calculator
- [ ] Document vault for sensitive files
- [ ] Video tours for businesses
- [ ] Virtual data room

### Priority 8: Admin Panel
- [ ] Admin dashboard
- [ ] User management
- [ ] Listing moderation
- [ ] Analytics overview
- [ ] System settings

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Environment Setup

**Required Node Version**: 16+ (project uses Vite 5)

**Installation**:
```bash
git clone [repository-url]
cd Website
npm install
npm run dev
```

## Key Files to Understand

1. **src/contexts/AuthContext.tsx** - Start here to understand authentication
2. **src/contexts/ListingsContext.tsx** - Understand data management
3. **src/App.tsx** - See overall routing structure
4. **src/components/Dashboard.tsx** - See type-based routing
5. **src/components/BrokerDashboard.tsx** - Most complex component with CRUD
6. **src/components/BusinessOpportunityScanner.tsx** - AI integration and analysis engine
7. **src/components/BuyerDashboard.tsx** - Buyer experience with AI scanner
8. **src/components/Login.tsx** - Entry point for users
9. **src/components/ListingsSection.tsx** - Public-facing listings

## Testing the Application

### Test User Flow: Buyer
1. Navigate to homepage (http://localhost:5173)
2. Click "Client Login" or CTA in hero
3. Enter credentials: user/password
4. Select "Buyer" user type
5. Click "Sign In"
6. View full listing details in dashboard
7. Click "Express Interest" (non-functional)
8. Click "AI Web Search Agent" tab (AI Opportunity Scanner)
9. Select target industries (e.g., Technology, Healthcare)
10. Set price range and revenue requirements
11. Enter location/region (e.g., "California" or "United States")
12. Add employee count range
13. Add additional search parameters (e.g., "SaaS businesses with recurring revenue")
14. Click "Search for Companies"
15. Watch real-time search progress (AI agent initializing, analyzing, searching web)
16. Review 5-10 discovered companies with:
    - Match scores and color-coded badges
    - Company websites (click to open in new tab)
    - Estimated valuations and revenue
    - AI-generated insights about acquisition potential
    - Search queries that would find each company
17. Click company website links to research further
18. Click "New Search" to adjust criteria and find more targets
19. Logout from header

### Test User Flow: Broker
1. Navigate to homepage
2. Click "Client Login"
3. Enter credentials: user/password
4. Select "Broker" user type
5. Click "Sign In"
6. View broker dashboard with stats
7. Click "Create New Listing"
8. Fill out form (test currency formatting on blur)
9. Submit form
10. See new listing appear
11. Click "Edit" on any listing
12. Modify values
13. Save changes
14. Click "Delete" to remove listing
15. Toggle active/inactive status
16. Click "AI Opportunity Scanner" tab
17. Select industries to search (e.g., E-commerce, Retail)
18. Set price and revenue ranges for target companies
19. Enter location and employee requirements
20. Add custom search parameters
21. Click "Search for Companies"
22. Watch AI agent search progress in real-time
23. View discovered companies with:
    - Acquisition potential scores
    - Company details and websites
    - Valuation estimates
    - AI insights about market fit
24. Click company websites to verify and research
25. Click "New Search" to find different acquisition targets
26. Return to "Manage Listings" tab to continue CRUD operations

### Test User Flow: Seller
1. Navigate to homepage
2. Click "Client Login"
3. Enter credentials: user/password
4. Select "Seller" user type
5. Click "Sign In"
6. View seller dashboard with charts
7. Explore performance metrics

### Test User Flow: Anonymous/Signup
1. Navigate to homepage
2. Scroll to "Featured Businesses" section
3. Notice limited information (blurred revenue, lock icons)
4. Click "Sign In for Full Details" → goes to login
5. Click "Back to Home"
6. Click "Create Buyer Account" → goes to signup
7. Fill out signup form
8. Select user type
9. Submit form
10. See success animation
11. Automatically redirected to dashboard

## Troubleshooting

### Issue: Server won't start
**Solution**: Try clearing Vite cache
```bash
rm -rf node_modules/.vite
npm run dev
```

### Issue: Changes not appearing
**Solution**: HMR might be stuck, hard refresh browser (Ctrl+Shift+R)

### Issue: Can't login
**Solution**: Ensure credentials are exactly: user/password (case-sensitive)

### Issue: Listings not appearing
**Solution**: Check if you're logged in as buyer (for full view) or on homepage (for limited view)

### Issue: Currency formatting not working
**Solution**: Make sure to blur the field (click outside) after typing

## Contributing Guidelines

### Code Style
- Use TypeScript for all new components
- Follow existing naming conventions
- Use functional components with hooks
- Add prop types/interfaces
- Comment complex logic

### Component Structure
```typescript
// Imports
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Interface/Type definitions
interface Props {
  // prop types
}

// Component
const ComponentName = ({ props }: Props) => {
  // State
  const [state, setState] = useState()

  // Hooks
  const navigate = useNavigate()

  // Functions
  const handleAction = () => {
    // logic
  }

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

// Export
export default ComponentName
```

### Git Workflow
- Create feature branches
- Write descriptive commit messages
- Test before committing
- Keep commits focused and atomic

## License & Credits

**Project**: Business Broker Platform Demo
**Purpose**: Portfolio/Demonstration
**Status**: Prototype/Demo (Not Production Ready)

---

**Last Updated**: 2025-10-29 (Added AI Web Search Agent with Claude Sonnet 4.5)
**Version**: 1.2.0
**Maintained By**: Development Team
