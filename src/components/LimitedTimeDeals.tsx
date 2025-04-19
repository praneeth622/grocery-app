import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Deal {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  endTime: number; // timestamp
}

const deals: Deal[] = [
  {
    id: "1",
    name: "Organic Avocados Pack",
    image: "/images/products/avocados.jpg",
    price: 199,
    originalPrice: 299,
    discountPercentage: 33,
    endTime: Date.now() + 4 * 60 * 60 * 1000 // 4 hours from now
  },
  {
    id: "2",
    name: "Fresh Farm Box",
    image: "/images/products/farm-box.jpg",
    price: 499,
    originalPrice: 799,
    discountPercentage: 38,
    endTime: Date.now() + 6 * 60 * 60 * 1000 // 6 hours from now
  },
  {
    id: "3",
    name: "Premium Mangoes",
    image: "/images/products/mangoes.jpg",
    price: 299,
    originalPrice: 399,
    discountPercentage: 25,
    endTime: Date.now() + 8 * 60 * 60 * 1000 // 8 hours from now
  }
];

const LimitedTimeDeals: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const newTimeLeft: { [key: string]: string } = {};
      
      deals.forEach(deal => {
        const difference = deal.endTime - now;
        
        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          newTimeLeft[deal.id] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
          newTimeLeft[deal.id] = "ENDED";
        }
      });
      
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 theme-bg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold theme-text">Limited-Time Deals</h2>
            <p className="theme-text-light">Grab these special offers before they're gone!</p>
          </div>
          <Link 
            to="/shop" 
            className="flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            View all deals
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Link 
              to={`/product/${deal.id}`} 
              key={deal.id}
              className="group"
            >
              <div className="theme-card hover:shadow-md transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={deal.image} 
                    alt={deal.name} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    -{deal.discountPercentage}%
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="theme-text font-medium mb-2">{deal.name}</h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-green-600">₹{deal.price}</span>
                      <span className="ml-2 text-sm theme-text-light line-through">₹{deal.originalPrice}</span>
                    </div>
                  </div>

                  <div className="flex items-center theme-text-light bg-opacity-10 rounded-lg p-2 bg-orange-50 dark:bg-orange-900">
                    <Clock size={16} className="text-orange-500 mr-2" />
                    <span className="text-orange-600 dark:text-orange-400 font-medium">
                      {timeLeft[deal.id]} left
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LimitedTimeDeals;