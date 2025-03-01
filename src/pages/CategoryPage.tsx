import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const categoryData = {
    'fruits-vegetables': {
      name: 'Fruits & Vegetables',
      description: 'Fresh, organic produce sourced directly from local farmers',
      products: [
        {
          id: 1,
          name: 'Organic Avocados',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad',
          rating: 4.5,
          isOrganic: true
        },
        // Add more products...
      ]
    },
    // Add more categories...
  };

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setProducts(categoryData[categorySlug]?.products || []);
      setLoading(false);
    }, 1000);
  }, [categorySlug]);

  if (!categoryData[categorySlug]) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Category not found</h1>
        <Link to="/categories" className="text-green-600 hover:text-green-700">
          View all categories
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/categories" className="text-gray-600 flex items-center mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Categories
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm h-fit">
          <div className="flex items-center mb-4">
            <Filter size={20} className="mr-2" />
            <h2 className="font-semibold">Filters</h2>
          </div>
          
          {/* Add your filter options here */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <input type="range" className="w-full" />
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Organic Only</h3>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Show organic products</span>
              </label>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-4">
            {categoryData[categorySlug].name}
          </h1>
          <p className="text-gray-600 mb-6">
            {categoryData[categorySlug].description}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link 
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-green-600 font-semibold">
                        ₹{product.price}
                      </span>
                      {product.isOrganic && (
                        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                          Organic
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
