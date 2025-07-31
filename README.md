# IPO Edge - Modern IPO Tracking Platform

A comprehensive, modern web application for tracking Initial Public Offerings (IPOs) in the Indian stock market, built with React, TypeScript, Tailwind CSS, and Ant Design.

## 🚀 Features

### Core Features
- **IPO Tracking**: Track current, upcoming, and listed IPOs with real-time data
- **Detailed IPO Information**: Company details, subscription status, GMP, and more
- **Buyback Tracking**: Monitor share buyback announcements and offers
- **Broker Comparison**: Compare brokerage charges and features of top brokers
- **IPO Calendar**: Visual calendar showing important IPO dates
- **Advanced Filtering**: Filter IPOs by status, category, exchange, and price range
- **Search Functionality**: Search IPOs by company name, sector, or exchange
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Features
- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS, Ant Design
- **State Management**: Context API with custom hooks
- **Mock API Layer**: Simulated backend with realistic data
- **Local Storage**: User preferences and favorites persistence
- **Loading States**: Skeleton loaders and smooth animations
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Performance**: Optimized with lazy loading and code splitting

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: Ant Design for professional components
- **Icons**: React Icons and Ant Design Icons
- **Routing**: React Router DOM for navigation
- **State Management**: React Context API with custom hooks
- **Development**: ESLint, TypeScript for code quality

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd IPOEdge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Loading, ErrorBoundary, etc.)
│   ├── ipo/           # IPO-specific components
│   └── layout/        # Layout components (Header, Footer, etc.)
├── pages/             # Page components
├── hooks/             # Custom React hooks
├── services/          # API services and utilities
├── data/              # Mock data
├── types/             # TypeScript type definitions
├── constants/         # Application constants
├── utils/             # Utility functions
├── context/           # React Context providers
└── router/            # Routing configuration
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#0ea5e9)
- **Success**: Green (#22c55e)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Responsive**: Tailwind CSS responsive utilities

### Components
- **Cards**: Hover effects with smooth transitions
- **Buttons**: Consistent styling with Ant Design
- **Forms**: Accessible form controls with validation
- **Navigation**: Responsive navigation with mobile menu

## 📱 Pages

1. **Home Page**: Hero section, featured IPOs, statistics, and broker highlights
2. **IPO Listing**: Filterable and sortable list of IPOs with pagination
3. **IPO Details**: Comprehensive IPO information with subscription status
4. **Buybacks**: Current, upcoming, and closed buyback offers
5. **Brokers**: Comparison table and grid view of stock brokers
6. **Calendar**: Visual calendar showing IPO events and dates
7. **Authentication**: Login and registration pages (UI only)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features Implementation

### IPO Tracking
- Real-time subscription status
- Grey Market Premium (GMP) tracking
- Detailed company information
- Important dates and deadlines

### Data Management
- Mock API with realistic data
- Local storage for user preferences
- Favorites system
- Search history

### User Experience
- Skeleton loading states
- Smooth animations and transitions
- Error boundaries for graceful error handling
- Responsive design for all devices

## 🚀 Performance Optimizations

- **Vite**: Fast development and optimized builds
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Responsive images with fallbacks
- **Caching**: Local storage for user data
- **Bundle Size**: Tree shaking and minimal dependencies

## 🔮 Future Enhancements

- **Backend Integration**: Connect to real IPO data APIs
- **User Authentication**: Complete user management system
- **Push Notifications**: Real-time IPO updates
- **Advanced Analytics**: IPO performance tracking
- **Mobile App**: React Native version
- **Dark Mode**: Theme switching capability

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Built with ❤️ using React, TypeScript, and modern web technologies.
