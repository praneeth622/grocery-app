import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, User, History } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import CartDropdown from './CartDropdown';
import SmartSearchBar from './SmartSearchBar';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <header className={`theme-bg-alt shadow-sm sticky top-0 z-40 theme-border transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-600 dark:text-green-400 transition-colors duration-300">
            Fresh Farm
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:text-green-600 dark:hover:text-green-400 theme-text transition-colors duration-300 ${location.pathname === '/' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/shop"
              className={`hover:text-green-600 dark:hover:text-green-400 theme-text transition-colors duration-300 ${location.pathname === '/shop' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
              id="header-categories"
            >
              Shop
            </Link>
            <Link 
              to="/categories"
              className={`hover:text-green-600 dark:hover:text-green-400 theme-text transition-colors duration-300 ${location.pathname === '/categories' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
            >
              Categories
            </Link>
            <Link 
              to="/about"
              className={`hover:text-green-600 dark:hover:text-green-400 theme-text transition-colors duration-300 ${location.pathname === '/about' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/order-history"
              className={`hover:text-green-600 dark:hover:text-green-400 theme-text transition-colors duration-300 ${location.pathname === '/order-history' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
            >
              Orders
            </Link>
            <Link 
              to="/contact"
              className={`hover:text-green-600 dark:hover:text-green-400 theme-text transition-colors duration-300 ${location.pathname === '/contact' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
            >
              Contact
            </Link>
          </nav>

          {/* Search Bar and Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <div id="header-search" className="w-64 lg:w-auto">
              <SmartSearchBar />
            </div>
            
            <Link to="/wishlist" className="relative p-2 hover:text-green-600 dark:hover:text-green-400 theme-text transition-colors duration-300">
              <Heart size={24} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <div className="relative">
              <button 
                id="header-cart"
                onClick={toggleCart} 
                className="relative p-2 hover:text-green-600 dark:hover:text-green-400 theme-text transition-colors duration-300"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            <Link to="/account" className="p-2 hover:text-green-600 dark:hover:text-green-400 theme-text transition-colors duration-300">
              <User size={24} />
            </Link>
            
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleCart} 
              className="relative p-2 mr-2 hover:text-green-600 dark:hover:text-green-400 theme-text transition-colors duration-300"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            <ThemeToggle />

            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none theme-text transition-colors duration-300"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3">
          <SmartSearchBar />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden theme-bg-alt theme-border border-t transition-colors duration-300">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`py-2 theme-text transition-colors duration-300 ${location.pathname === '/' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop"
                className={`py-2 theme-text transition-colors duration-300 ${location.pathname === '/shop' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/categories"
                className={`py-2 theme-text transition-colors duration-300 ${location.pathname === '/categories' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/about"
                className={`py-2 theme-text transition-colors duration-300 ${location.pathname === '/about' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/order-history"
                className={`py-2 theme-text transition-colors duration-300 ${location.pathname === '/order-history' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Order History
              </Link>
              <Link 
                to="/wishlist"
                className={`py-2 theme-text transition-colors duration-300 ${location.pathname === '/wishlist' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link 
                to="/account"
                className={`py-2 theme-text transition-colors duration-300 ${location.pathname === '/account' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
              <Link 
                to="/contact"
                className={`py-2 theme-text transition-colors duration-300 ${location.pathname === '/contact' ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Dropdown */}
      {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
    </header>
  );
};

export default Header;
