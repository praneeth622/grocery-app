import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductRecommendations from '../components/ProductRecommendations';

const CategoriesPage = () => {
  const categories = [
    {
      id: 'fruits-vegetables',
      name: 'Fruits & Vegetables',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      description: 'Fresh, organic produce sourced directly from local farmers',
      itemCount: 248,
      featured: true
    },
    {
      id: 'dairy-eggs',
      name: 'Dairy & Eggs',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      description: 'Farm-fresh dairy products and free-range eggs sourced from ethical farms',
      itemCount: 86,
      featured: true
    },
    {
      id: 'bakery',
      name: 'Bakery',
      image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      description: 'Freshly baked breads, cakes, and pastries made with high-quality ingredients',
      itemCount: 124,
      featured: true
    },
    {
      id: 'meat-seafood',
      name: 'Meat & Seafood',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      description: 'Premium cuts of meat and fresh seafood from sustainable sources',
      itemCount: 78,
      featured: false
    },
    {
      id: 'pantry',
      name: 'Pantry Essentials',
      image: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      description: 'Stock your pantry with everyday essentials and specialty ingredients',
      itemCount: 215,
      featured: false
    },
    {
      id: 'beverages',
      name: 'Beverages',
      image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      description: 'Refreshing drinks, juices, teas, and coffee to keep you hydrated',
      itemCount: 92,
      featured: false
    },
    {
      id: 'snacks',
      name: 'Snacks & Confectionery',
      image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      description: 'Delicious treats, chocolates, and snacks for any time of day',
      itemCount: 183,
      featured: false
    },
    {
      id: 'organic',
      name: 'Organic Products',
      image: 'https://images.unsplash.com/photo-1612006564629-47a0739f4eb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      description: 'Certified organic foods free from synthetic pesticides and fertilizers',
      itemCount: 176,
      featured: false
    }
  ];

  // Separate featured categories
  const featuredCategories = categories.filter(category => category.featured);
  const regularCategories = categories.filter(category => !category.featured);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Shop by Category</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">Browse our wide selection of fresh, high-quality products conveniently organized by category.</p>
        
        {/* Featured Categories with larger cards */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCategories.map(category => (
              <Link 
                key={category.id}
                to={`/category/${category.id}`}
                className="group block relative rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div className="aspect-w-16 aspect-h-9 h-56">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                      <p className="text-white/80 text-sm mb-2">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/90 text-sm">{category.itemCount} items</span>
                        <span className="flex items-center text-white text-sm font-medium group-hover:text-green-400 transition-colors">
                          Shop now
                          <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* All Categories Grid */}
        <h2 className="text-xl font-semibold mb-6">All Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regularCategories.map(category => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative h-40">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{category.itemCount} items</span>
                  <span className="flex items-center text-green-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse
                    <ChevronRight size={16} className="ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Popular Products Section */}
        <div className="mt-16">
          <ProductRecommendations />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;