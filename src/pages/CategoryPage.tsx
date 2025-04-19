import  { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, ArrowLeft, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../components/FeaturedProducts';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import ProductRecommendations from '../components/ProductRecommendations';
import { products as allProducts } from '../data/products';

// Define type for category data
type CategoryDataType = {
  [key: string]: {
    name: string;
    image: string;
    description: string;
  }
};

// Category data for banners and descriptions
const categoryData: CategoryDataType = {
  'fruits-vegetables': {
    name: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Fresh, organic produce sourced directly from local farmers'
  },
  'dairy-eggs': {
    name: 'Dairy & Eggs',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Farm-fresh dairy products and free-range eggs sourced from ethical farms'
  },
  'bakery': {
    name: 'Bakery',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Freshly baked breads, cakes, and pastries made with high-quality ingredients'
  },
  'meat-seafood': {
    name: 'Meat & Seafood',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Premium cuts of meat and fresh seafood from sustainable sources'
  },
  'pantry': {
    name: 'Pantry Essentials',
    image: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Stock your pantry with everyday essentials and specialty ingredients'
  },
  'beverages': {
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Refreshing drinks, juices, teas, and coffee to keep you hydrated'
  },
  'snacks': {
    name: 'Snacks & Confectionery',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Delicious treats, chocolates, and snacks for any time of day'
  },
  'organic': {
    name: 'Organic Products',
    image: 'https://images.unsplash.com/photo-1612006564629-47a0739f4eb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Certified organic foods free from synthetic pesticides and fertilizers'
  }
};

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(1000);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const { addToCart } = useCart();
  const { theme } = useTheme();

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const categoryProducts = allProducts.filter(p => p.category === categorySlug);
      setProducts(categoryProducts);
      setLoading(false);
    }, 500);
  }, [categorySlug]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!products.length) return [];

    let result = [...products];

    // Apply price filter
    result = result.filter(product => product.price <= priceRange);

    // Apply organic filter
    if (organicOnly) {
      result = result.filter(product => product.isOrganic);
    }

    // Apply in-stock filter
    if (inStockOnly) {
      result = result.filter(product => product.inStock);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [products, priceRange, organicOnly, inStockOnly, sortBy]);

  const handleAddToCart = (product: Product) => {
    if (product.inStock) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1 // This will be handled by the cart context
      } as any); // Using type assertion to avoid TypeScript error
      toast.success(`${product.name} added to cart`);
    }
  };

  if (!categorySlug || !categoryData[categorySlug]) {
    return (
      <div className="container mx-auto px-4 py-8 text-center theme-bg">
        <h1 className="text-2xl font-semibold mb-4 theme-text">Category not found</h1>
        <Link to="/categories" className="text-green-600 hover:text-green-700">
          View all categories
        </Link>
      </div>
    );
  }

  return (
    <div className="theme-bg min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link to="/categories" className="theme-text-light hover:text-green-600 flex items-center mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Categories
        </Link>

        {/* Category Banner */}
        <div className="relative w-full h-48 md:h-64 mb-8 rounded-lg overflow-hidden">
          <img
            src={categoryData[categorySlug].image}
            alt={categoryData[categorySlug].name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="px-6 py-4">
              <h1 className="text-3xl font-bold text-white mb-2">
                {categoryData[categorySlug].name}
              </h1>
              <p className="text-white/90 max-w-md">
                {categoryData[categorySlug].description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 theme-card p-4 rounded-lg shadow-sm h-fit">
            <div className="flex items-center mb-4">
              <Filter size={20} className="mr-2 theme-text" />
              <h2 className="font-semibold theme-text">Filters</h2>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-2 theme-text">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-green-600"
                  />
                  <div className="flex justify-between text-sm theme-text-light">
                    <span>₹0</span>
                    <span>₹{priceRange}</span>
                  </div>
                </div>
              </div>

              {/* Other Filters */}
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={organicOnly}
                    onChange={(e) => setOrganicOnly(e.target.checked)}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 theme-text">Organic Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 theme-text">In Stock Only</span>
                </label>
              </div>

              {/* Sort By (Mobile Only) */}
              <div className="md:hidden">
                <h3 className="font-medium mb-2 theme-text">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full theme-border theme-input rounded-md px-2 py-1.5"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold theme-text">
                {filteredAndSortedProducts.length} Products
              </h2>
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm theme-text-light">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="theme-border theme-input rounded-md px-2 py-1"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <div key={n} className="animate-pulse">
                    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} h-48 rounded-lg mb-4`}></div>
                    <div className={`h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4 mb-2`}></div>
                    <div className={`h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/2`}></div>
                  </div>
                ))}
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-8">
                <div className="theme-text-light mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 theme-text">No products match your filters</h3>
                <p className="theme-text-light mb-4">Try adjusting your filters or browse other categories</p>
                <button
                  onClick={() => {
                    setPriceRange(1000);
                    setOrganicOnly(false);
                    setInStockOnly(false);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <div key={product.id} className="theme-card rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300">
                    <div className="relative">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {product.discount}% OFF
                        </div>
                      )}
                      {product.isNew && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          NEW
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-medium theme-text group-hover:text-green-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-yellow-400">
                          <Star size={16} fill="currentColor" />
                          <span className="ml-1 text-sm theme-text-light">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        {product.isOrganic && (
                          <span className={`ml-auto text-xs ${theme === 'dark' ? 'bg-green-900/20 text-green-300' : 'bg-green-50 text-green-600'} px-2 py-1 rounded-full font-medium`}>
                            Organic
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex justify-between items-center">
                        <div className="space-y-1">
                          <span className="text-green-600 font-semibold">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm theme-text-light line-through block">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            product.inStock
                              ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-sm'
                              : `${theme === 'dark' ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                          }`}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Recommendations */}
      <ProductRecommendations category={categorySlug} />
    </div>
  );
};

export default CategoryPage;
