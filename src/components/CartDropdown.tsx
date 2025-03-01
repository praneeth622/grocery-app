import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div 
      className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-10 border border-gray-200"
      aria-label="Shopping cart dropdown"
    >
      <div className="px-4 py-2 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-900">Your Cart</h3>
        <p className="text-sm text-gray-500">{cartItems.length} items</p>
      </div>
      
      <div className="max-h-80 overflow-y-auto py-2">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6">
            <ShoppingBag size={40} className="text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">Your cart is empty</p>
            <Link 
              to="/shop" 
              className="mt-2 text-green-600 text-sm font-medium hover:text-green-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="px-4 py-3 hover:bg-gray-50 flex items-center">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center border rounded">
                      <button
                        className="p-1 text-gray-600 hover:text-gray-800"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        className="p-1 text-gray-600 hover:text-gray-800"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <button
                      className="text-red-500 hover:text-red-700"
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
          <div className="border-t border-gray-100 px-4 py-3">
            <div className="flex justify-between text-sm font-medium">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-900">${totalPrice.toFixed(2)}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">Shipping and taxes calculated at checkout</p>
          </div>
          
          <div className="px-4 py-3 border-t border-gray-100">
            <Link
              to="/cart"
              className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              View Cart
            </Link>
            <Link
              to="/checkout"
              className="block w-full mt-2 border border-green-600 text-green-600 text-center py-2 px-4 rounded-md hover:bg-green-50 transition-colors"
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