import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Shield, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'card' | 'upi';
}

interface FormErrors {
  [key: string]: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    // Pincode validation
    const pincodeRegex = /^[0-9]{6}$/;
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = 'Invalid pincode (6 digits required)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    setLoading(true);
    // Simulate order processing
    toast.loading('Processing your order...');
    setTimeout(() => {
      toast.success('Order placed successfully!');
      clearCart();
      setLoading(false);
      navigate('/order-success');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 theme-bg">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 theme-text">Your cart is empty</h2>
          <Link to="/shop" className="text-green-600 hover:text-green-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const inputClasses = (errorKey: string) => `
    w-full 
    px-3 
    py-2 
    rounded-md 
    border
    ${errors[errorKey] 
      ? 'border-red-500 dark:border-red-400' 
      : 'border-gray-300 dark:border-gray-600'
    }
    ${theme === 'dark' 
      ? 'bg-gray-800 text-gray-100' 
      : 'bg-white text-gray-900'
    }
    focus:ring-2 
    focus:ring-green-500 
    dark:focus:ring-green-400 
    focus:border-transparent
    placeholder-gray-400
    dark:placeholder-gray-500
    transition-colors
    duration-200
  `;

  const labelClasses = "block text-sm font-medium theme-text mb-1";

  return (
    <div className="container mx-auto px-4 py-8 theme-bg">
      <Link to="/cart" className="theme-text hover:text-green-600 flex items-center mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Cart
      </Link>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 theme-card rounded-lg shadow-sm p-6 border theme-border">
          <h2 className="text-2xl font-semibold mb-6 theme-text">Checkout Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={inputClasses('firstName')}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className={labelClasses}>
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={inputClasses('lastName')}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClasses('email')}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className={labelClasses}>
                  Phone*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputClasses('phone')}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Address Fields */}
            <div>
              <label className={labelClasses}>
                Address*
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={inputClasses('address')}
                placeholder="Enter full address"
              />
              {errors.address && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClasses}>
                  City*
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={inputClasses('city')}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className={labelClasses}>
                  State*
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={inputClasses('state')}
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <label className={labelClasses}>
                  Pincode*
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className={inputClasses('pincode')}
                  placeholder="Enter pincode"
                />
                {errors.pincode && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium theme-text mb-2">
                Payment Method*
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 theme-text">Cash on Delivery</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 theme-text">Credit/Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 theme-text">UPI</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 theme-card rounded-lg shadow-sm p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4 theme-text">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium theme-text">{item.name}</h3>
                    <p className="text-sm theme-text-light">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium theme-text">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t theme-border pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="theme-text-light">Subtotal</span>
              <span className="theme-text">₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="theme-text-light">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t theme-border pt-2">
              <span className="theme-text">Total</span>
              <span className="theme-text">₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>

          <div className="mt-6 space-y-3">
            <div className="flex items-center text-sm theme-text-light">
              <Truck size={18} className="mr-2 text-green-600" />
              <span>Free delivery on orders over ₹500</span>
            </div>
            <div className="flex items-center text-sm theme-text-light">
              <Shield size={18} className="mr-2 text-green-600" />
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center text-sm theme-text-light">
              <Clock size={18} className="mr-2 text-green-600" />
              <span>Delivery within 24-48 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
