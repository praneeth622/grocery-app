import React from 'react';
import { Truck, Leaf, Shield, Clock } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "100% Organic Products",
      description: "We ensure all our products are certified organic and sustainably sourced."
    },
    {
      icon: <Truck className="w-8 h-8 text-green-600" />,
      title: "Fast Delivery",
      description: "Same-day delivery available for orders placed before 2 PM."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Quality Guarantee",
      description: "We stand behind the quality of every product we sell."
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "24/7 Support",
      description: "Our customer support team is always here to help you."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Fresh Farm</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Fresh Farm started in 2020 with a simple mission: to make fresh, organic produce accessible to everyone. 
            We work directly with local farmers to bring you the freshest fruits, vegetables, and other daily essentials.
          </p>
          
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Fresh Farm Field"
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-green-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for fresh updates, exclusive offers, and seasonal recipes.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg border-y border-l focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button className="bg-green-600 text-white px-6 py-2 rounded-r-lg hover:bg-green-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;