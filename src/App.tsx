import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoryNav from './components/CategoryNav';
import FeaturedProducts from './components/FeaturedProducts';
import SpecialOffers from './components/SpecialOffers';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import CartPage from './pages/CartPage';
import ShopPage from './pages/ShopPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import { Toaster } from 'react-hot-toast';
import CheckoutPage from './pages/CheckoutPage';
import OnboardingTutorial from './components/OnboardingTutorial';
import BottomNavigation from './components/BottomNavigation';
import ContextualHelp from './components/ContextualHelp';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import LimitedTimeDeals from './components/LimitedTimeDeals';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [firstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    // Check if this is first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore') === 'true';
    setFirstVisit(!hasVisitedBefore);
    
    if (!hasVisitedBefore) {
      localStorage.setItem('hasVisitedBefore', 'true');
    }
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen theme-bg flex flex-col">
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 6000,
                  style: {
                    background: '#333',
                    color: '#fff',
                  },
                  success: {
                    style: {
                      background: '#16a34a',
                    },
                  },
                  error: {
                    style: {
                      background: '#dc2626',
                    },
                  },
                }}
              />
              {isLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <Header />
                  <main className="flex-grow pb-16 md:pb-0">
                    <Routes>
                      <Route path="/" element={
                        <>
                          <HeroSection />
                          <CategoryNav />
                          <LimitedTimeDeals />
                          <FeaturedProducts />
                          <SpecialOffers />
                        </>
                      } />
                      <Route path="/shop" element={<ShopPage />} />
                      <Route path="/categories" element={<CategoriesPage />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/category/:categorySlug" element={<CategoryPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/order-history" element={<OrderHistoryPage />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                  </main>
                  <Footer />
                  <BottomNavigation />
                  <ContextualHelp />
                  {firstVisit && <OnboardingTutorial />}
                </>
              )}
            </div>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
