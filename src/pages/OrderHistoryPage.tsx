import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Package, ShoppingBag, ChevronRight, ArrowLeft } from 'lucide-react';

// Mock data for order history
const orderHistory = [
  {
    id: 'ORD-12345',
    date: '2025-04-15',
    items: [
      { name: 'Organic Avocados', quantity: 3, price: 45.00 },
      { name: 'Fresh Strawberries', quantity: 1, price: 80.00 },
      { name: 'Brown Eggs (12)', quantity: 1, price: 60.00 },
    ],
    total: 185.00,
    status: 'delivered',
    deliveryDate: '2025-04-17'
  },
  {
    id: 'ORD-12278',
    date: '2025-04-01',
    items: [
      { name: 'Organic Bananas', quantity: 2, price: 25.00 },
      { name: 'Whole Wheat Bread', quantity: 1, price: 35.00 },
      { name: 'Milk (1L)', quantity: 2, price: 80.00 },
      { name: 'Chicken Breast', quantity: 1, price: 120.00 },
    ],
    total: 260.00,
    status: 'delivered',
    deliveryDate: '2025-04-03'
  },
  {
    id: 'ORD-12026',
    date: '2025-03-20',
    items: [
      { name: 'Fresh Tomatoes', quantity: 1, price: 35.00 },
      { name: 'Bell Peppers', quantity: 2, price: 60.00 },
      { name: 'Cucumber', quantity: 3, price: 30.00 },
      { name: 'Garlic', quantity: 1, price: 15.00 },
      { name: 'Onions', quantity: 1, price: 20.00 },
    ],
    total: 160.00,
    status: 'delivered',
    deliveryDate: '2025-03-22'
  },
  {
    id: 'ORD-11987',
    date: '2025-03-10',
    items: [
      { name: 'Fresh Farm Box (Weekly)', quantity: 1, price: 499.00 },
    ],
    total: 499.00,
    status: 'delivered',
    deliveryDate: '2025-03-11'
  },
  {
    id: 'ORD-13578',
    date: '2025-04-18',
    items: [
      { name: 'Organic Apples', quantity: 2, price: 80.00 },
      { name: 'Greek Yogurt', quantity: 3, price: 120.00 },
      { name: 'Quinoa (500g)', quantity: 1, price: 90.00 },
    ],
    total: 290.00,
    status: 'in-transit',
    estimatedDelivery: '2025-04-20'
  }
];

const OrderHistoryPage: React.FC = () => {
  // Function to format date in a user-friendly way
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to render status icon based on order status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-600" size={24} />;
      case 'in-transit':
        return <Package className="text-blue-500" size={24} />;
      case 'processing':
        return <Clock className="text-orange-500" size={24} />;
      default:
        return <ShoppingBag className="text-gray-500" size={24} />;
    }
  };

  // Function to get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'in-transit':
        return 'In Transit';
      case 'processing':
        return 'Processing';
      default:
        return 'Order Placed';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 theme-bg">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-green-600 flex items-center mb-6 hover:underline">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-2xl font-semibold mb-6 theme-text">Your Order History</h1>
        
        {/* Timeline Layout */}
        <div className="space-y-6">
          {orderHistory.map((order, index) => (
            <div key={order.id} className="theme-card rounded-lg shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="p-4 border-b theme-border flex justify-between items-center">
                <div>
                  <h2 className="font-medium theme-text">{order.id}</h2>
                  <p className="text-sm theme-text-light">Placed on {formatDate(order.date)}</p>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <span className={`ml-2 text-sm font-medium ${
                    order.status === 'delivered' ? 'text-green-600' : 
                    order.status === 'in-transit' ? 'text-blue-500' : 'text-orange-500'
                  }`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <ShoppingBag size={18} className="text-gray-500 mr-2" />
                  <span className="theme-text font-medium">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'} – ₹{order.total.toFixed(2)}
                  </span>
                </div>
                
                {/* Items Preview */}
                <div className="theme-text-light text-sm mb-4 ml-7">
                  {order.items.slice(0, 2).map((item, idx) => (
                    <div key={idx}>{item.quantity}x {item.name}</div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="text-green-600">+ {order.items.length - 2} more items</div>
                  )}
                </div>
                
                {/* Delivery Information */}
                <div className="ml-7 mt-3">
                  {order.status === 'delivered' ? (
                    <p className="text-sm theme-text-light">
                      Delivered on {formatDate(order.deliveryDate)}
                    </p>
                  ) : (
                    <p className="text-sm theme-text-light">
                      Estimated delivery: {formatDate(order.estimatedDelivery)}
                    </p>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="mt-4 flex justify-between items-center">
                  <button className="text-sm text-green-600 font-medium hover:underline">
                    View Order Details
                  </button>
                  <button className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center">
                    Reorder
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                
                {/* Timeline Connector (except for the last item) */}
                {index < orderHistory.length - 1 && (
                  <div className="w-px h-4 bg-gray-200 absolute left-6 -bottom-4"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;