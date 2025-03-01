import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, LogOut, Settings, Package, UserCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import CartDropdown from './CartDropdown';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  
  const { totalItems: cartItemsCount } = useCart();
  const { totalItems: wishlistItemsCount } = useWishlist();
  
  // Sample suggestions data
  const allSuggestions = [
    'Organic Apples', 'Fresh Milk', 'Whole Wheat Bread', 
    'Avocados', 'Free Range Eggs', 'Organic Bananas',
    'Greek Yogurt', 'Spinach', 'Sweet Potatoes'
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = allSuggestions.filter(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close profile dropdown if clicked outside
      if (
        profileDropdownRef.current && 
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
      
      // Close cart dropdown if clicked outside
      if (
        cartDropdownRef.current && 
        !cartDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCartDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    // Close cart dropdown if profile dropdown is opened
    if (!isProfileDropdownOpen) {
      setIsCartDropdownOpen(false);
    }
  };

  const toggleCartDropdown = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen);
    // Close profile dropdown if cart dropdown is opened
    if (!isCartDropdownOpen) {
      setIsProfileDropdownOpen(false);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" aria-label="Go to homepage">
              <span className="text-green-600 font-bold text-2xl">Fresh<span className="text-green-800">Mart</span></span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Shop</Link>
            <Link to="/categories" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Categories</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">About</Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block relative w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Search for products"
                aria-autocomplete="list"
                aria-controls={suggestions.length > 0 ? "search-suggestions" : undefined}
                aria-expanded={suggestions.length > 0}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            {/* Autocomplete suggestions */}
            {suggestions.length > 0 && (
              <ul 
                id="search-suggestions"
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                role="listbox"
              >
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    role="option"
                    aria-selected="false"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-6">
            
            
            {/* Cart with Dropdown */}
            <div className="relative" ref={cartDropdownRef}>
              <button 
                className="text-gray-700 hover:text-green-600 transition-colors relative"
                aria-label="View shopping cart"
                onClick={toggleCartDropdown}
                aria-expanded={isCartDropdownOpen}
                aria-controls="cart-dropdown"
              >
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>
              
              {/* Cart Dropdown */}
              {isCartDropdownOpen && <CartDropdown />}
            </div>
            
            {/* Profile with Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button 
                className="text-gray-700 hover:text-green-600 transition-colors flex items-center"
                aria-label="View account options"
                onClick={toggleProfileDropdown}
                aria-expanded={isProfileDropdownOpen}
                aria-controls="profile-dropdown"
              >
                <User size={24} />
                <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div 
                  id="profile-dropdown"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                  aria-label="User menu"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Welcome!</p>
                    <p className="text-xs text-gray-500">example@email.com</p>
                  </div>
                  
                  <Link 
                    to="/account" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <UserCircle size={16} className="mr-2" />
                    My Account
                  </Link>
                  
                  <Link 
                    to="/orders" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Package size={16} className="mr-2" />
                    My Orders
                  </Link>
                  
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  
                  <div className="border-t border-gray-100 mt-1">
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      onClick={() => console.log('Logout clicked')}
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu" 
          className="md:hidden bg-white border-t border-gray-200 py-4"
        >
          <div className="px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Search for products"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-[calc(100%-2rem)] mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <nav className="flex flex-col space-y-3 px-4">
            <Link to="/" className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors">Shop</Link>
            <Link to="/categories" className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors">Categories</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors">About</Link>
          </nav>
          
          <div className="flex justify-around mt-4 pt-4 border-t border-gray-200">
            <Link 
              to="/wishlist"
              className="flex flex-col items-center text-gray-700"
              aria-label="View wishlist"
            >
              <Heart size={24} />
              <span className="text-sm mt-1">Wishlist</span>
            </Link>
            <Link 
              to="/cart"
              className="flex flex-col items-center text-gray-700"
              aria-label="View shopping cart"
            >
              <ShoppingCart size={24} />
              <span className="text-sm mt-1">Cart</span>
            </Link>
            <Link 
              to="/account"
              className="flex flex-col items-center text-gray-700"
              aria-label="View account"
            >
              <User size={24} />
              <span className="text-sm mt-1">Account</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;