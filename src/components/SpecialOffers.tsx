import React from 'react';
import { Clock, Truck, Shield, ArrowRight } from 'lucide-react';

const SpecialOffers = () => {
  return (
    <section className="py-12 bg-white" aria-labelledby="special-offers-heading">
      <div className="container mx-auto px-4">
        <h2 id="special-offers-heading" className="text-2xl font-bold mb-8 text-gray-800">Special Offers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Offer */}
          <div className="bg-gradient-to-r bg-green-500  rounded-lg overflow-hidden shadow-md">
            <div className="p-6 md:p-8 flex flex-col h-full">
              <div className="flex-grow">
                <span className="inline-block bg-white text-green-600 px-3 py-1 rounded-full text-sm font-medium mb-4">Limited Time</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Fresh Produce Box</h3>
                <p className="text-green-50 mb-4">Get a curated box of seasonal fruits and vegetables delivered weekly.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-white">
                    <span className="bg-white/20 p-1 rounded-full mr-2">
                      <Clock size={16} className="text-white" />
                    </span>
                    Save 20% on your first subscription
                  </li>
                  <li className="flex items-center text-white">
                    <span className="bg-white/20 p-1 rounded-full mr-2">
                      <Truck size={16} className="text-white" />
                    </span>
                    Free delivery on all subscription boxes
                  </li>
                  <li className="flex items-center text-white">
                    <span className="bg-white/20 p-1 rounded-full mr-2">
                      <Shield size={16} className="text-white" />
                    </span>
                    Customize your box contents each week
                  </li>
                </ul>
              </div>
              <a 
                href="#subscribe" 
                className="inline-flex items-center justify-center bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
                aria-label="Subscribe to Fresh Produce Box"
              >
                Subscribe Now
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
          
          {/* Second Offer */}
          <div className="bg-gradient-to-r bg-amber-400  rounded-lg overflow-hidden shadow-md">
            <div className="p-6 md:p-8 flex flex-col h-full">
              <div className="flex-grow">
                <span className="inline-block bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-4">Weekend Special</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Family Meal Bundle</h3>
                <p className="text-orange-50 mb-4">Everything you need for 3 delicious family meals at one great price.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-white">
                    <span className="bg-white/20 p-1 rounded-full mr-2">
                      <Clock size={16} className="text-white" />
                    </span>
                    Save up to 30% compared to buying separately
                  </li>
                  <li className="flex items-center text-white">
                    <span className="bg-white/20 p-1 rounded-full mr-2">
                      <Truck size={16} className="text-white" />
                    </span>
                    Next-day delivery available
                  </li>
                  <li className="flex items-center text-white">
                    <span className="bg-white/20 p-1 rounded-full mr-2">
                      <Shield size={16} className="text-white" />
                    </span>
                    Recipe cards included with every bundle
                  </li>
                </ul>
              </div>
              <a 
                href="#bundle" 
                className="inline-flex items-center justify-center bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500"
                aria-label="Order Family Meal Bundle"
              >
                Order Bundle
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <Truck className="text-green-600" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Free Delivery</h3>
            <p className="text-gray-600">Free delivery on orders over ₹50. Same-day delivery available in select areas.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <Shield className="text-green-600" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Freshness Guarantee</h3>
            <p className="text-gray-600">Not satisfied with the freshness? We'll refund or replace your items, no questions asked.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <Clock className="text-green-600" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600">Choose your delivery time slots. Easily reschedule or skip deliveries as needed.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;