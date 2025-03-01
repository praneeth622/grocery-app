import React, { useState } from 'react';
import { Filter, ShoppingBag, ChevronDown } from 'lucide-react';
import { Product } from '../components/FeaturedProducts';

const ShopPage = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('all');
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Organic Avocados",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      reviews: 128,
      isOrganic: true,
      inStock: true,
      category: "fruits"
    },
    // Add more products here
  ]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fruits', name: 'Fruits & Vegetables' },
    { id: 'dairy', name: 'Dairy & Eggs' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'meat', name: 'Meat & Fish' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <Filter size={20} className="mr-2" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          
          <div className="space-y-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                className={`w-full text-left px-3 py-2 rounded ${
                  filterCategory === category.id
                    ? 'bg-green-50 text-green-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Shop Fresh Products</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-md px-2 py-1"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-green-600 font-semibold">₹{product.price}</span>
                    <button className="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;