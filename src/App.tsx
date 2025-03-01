import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoryNav from './components/CategoryNav';
import FeaturedProducts from './components/FeaturedProducts';
import SpecialOffers from './components/SpecialOffers';
import Footer from './components/Footer';
import SkeletonLoader from './components/SkeletonLoader';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import CartPage from './pages/CartPage';
import ShopPage from './pages/ShopPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={
                      <>
                        <HeroSection />
                        <CategoryNav />
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
                  </Routes>
                </main>
                <Footer />
              </>
            )}
          </div>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;