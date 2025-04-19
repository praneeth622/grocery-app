import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, Truck, Shield, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4 theme-text">Your Cart is Empty</h2>
          <p className="theme-text-light mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/" 
            className="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded-full inline-flex items-center hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to="/" className="theme-text-light hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center">
          <ArrowLeft size={20} className="mr-2" />
          Continue Shopping
        </Link>
        <h1 className="text-2xl font-semibold ml-4 theme-text">Shopping Cart ({cartItems.length} items)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="theme-card rounded-lg">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-4 border-b theme-border last:border-b-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-md"
                />
                
                <div className="flex-1 ml-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium theme-text">{item.name}</h3>
                      <p className="text-sm theme-text-light">Unit Price: ₹{item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center theme-border rounded-md">
                      <button
                        className="p-2 theme-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        <Minus size={16} className="theme-text" />
                      </button>
                      <span className="px-4 py-2 theme-border-x theme-text">{item.quantity}</span>
                      <button
                        className="p-2 theme-hover transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} className="theme-text" />
                      </button>
                    </div>
                    <span className="font-medium theme-text">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="theme-card rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 theme-text">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="theme-text-light">Subtotal</span>
                <span className="font-medium theme-text">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="theme-text-light">Shipping</span>
                <span className="text-green-600 dark:text-green-400">Free</span>
              </div>
              <div className="theme-border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold theme-text">Total</span>
                  <span className="font-semibold theme-text">₹{totalPrice.toFixed(2)}</span>
                </div>
                <span className="text-sm theme-text-light">Including GST</span>
              </div>
            </div>

            <button className="w-full bg-green-600 dark:bg-green-500 text-white py-3 rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors mb-4">
              <Link to="/checkout">
                Proceed to Checkout
              </Link>
            </button>

            <div className="space-y-3">
              <div className="flex items-center text-sm theme-text-light">
                <Truck size={18} className="mr-2" />
                <span>Free delivery on orders over ₹500</span>
              </div>
              <div className="flex items-center text-sm theme-text-light">
                <Shield size={18} className="mr-2" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center text-sm theme-text-light">
                <Clock size={18} className="mr-2" />
                <span>Delivery within 24-48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;