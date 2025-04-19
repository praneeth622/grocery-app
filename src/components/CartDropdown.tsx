import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface CartDropdownProps {
  onClose?: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div 
      className="absolute right-0 mt-2 w-80 theme-card rounded-md shadow-lg py-2 z-10 theme-border transition-all duration-300"
      aria-label="Shopping cart dropdown"
    >
      <div className="px-4 py-2 border-b theme-border">
        <h3 className="text-lg font-medium theme-text">Your Cart</h3>
        <p className="text-sm theme-text-light">{cartItems.length} items</p>
      </div>
      
      <div className="max-h-80 overflow-y-auto py-2">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6">
            <ShoppingBag size={40} className="text-gray-300 dark:text-gray-600 mb-2" />
            <p className="theme-text-light">Your cart is empty</p>
            <Link 
              to="/shop" 
              className="mt-2 text-green-600 dark:text-green-400 text-sm font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors"
              onClick={onClose}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="px-4 py-3 theme-hover transition-colors flex items-center">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md theme-border">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium theme-text line-clamp-1">{item.name}</p>
                  <p className="text-sm theme-text-light">₹{item.price.toFixed(2)}</p>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center theme-border rounded">
                      <button
                        className="p-1 theme-text-light hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 text-sm theme-text">{item.quantity}</span>
                      <button
                        className="p-1 theme-text-light hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <button
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <>
          <div className="border-t theme-border px-4 py-3">
            <div className="flex justify-between text-sm font-medium">
              <p className="theme-text">Subtotal</p>
              <p className="theme-text">₹{totalPrice.toFixed(2)}</p>
            </div>
            <p className="text-xs theme-text-light mt-1">Shipping and taxes calculated at checkout</p>
          </div>
          
          <div className="px-4 py-3 border-t theme-border">
            <Link
              to="/cart"
              className="block w-full bg-green-600 dark:bg-green-500 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
              onClick={onClose}
            >
              View Cart
            </Link>
            <Link
              to="/checkout"
              className="block w-full mt-2 border border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 text-center py-2 px-4 rounded-md hover:bg-green-50 dark:hover:bg-green-950/50 transition-colors"
              onClick={onClose}
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;