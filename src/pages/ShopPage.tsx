import React, { useState, useMemo } from 'react';
import { Filter, ShoppingBag, ChevronDown, Star } from 'lucide-react';
import { Product } from '../components/FeaturedProducts';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import toast from 'react-hot-toast';

const ShopPage = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(1000);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const { addToCart } = useCart();
  const { theme } = useTheme();

  // Use products from data file instead of hardcoded ones
  const [products] = useState<Product[]>(allProducts);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply category filter
    if (filterCategory !== 'all') {
      result = result.filter(product => product.category === filterCategory);
    }

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
  }, [products, filterCategory, sortBy, priceRange, organicOnly, inStockOnly]);

  const handleAddToCart = (product: Product) => {
    if (product.inStock) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      } as any);
      toast.success(`${product.name} added to cart`);
    }
  };

  // Updated categories to match the ones in the data file
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fruits-vegetables', name: 'Fruits & Vegetables' },
    { id: 'dairy-eggs', name: 'Dairy & Eggs' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'meat-seafood', name: 'Meat & Seafood' },
    { id: 'organic', name: 'Organic Products' },
    { id: 'pantry', name: 'Pantry Essentials' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'snacks', name: 'Snacks & Confectionery' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 theme-bg">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 theme-card p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <Filter size={20} className="mr-2 theme-text" />
            <h2 className="text-lg font-semibold theme-text">Filters</h2>
          </div>

          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-2 theme-text">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilterCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded ${
                      filterCategory === category.id
                        ? theme === 'dark' 
                          ? 'bg-green-900/20 text-green-400' 
                          : 'bg-green-50 text-green-600'
                        : theme === 'dark'
                          ? 'hover:bg-gray-700 theme-text'
                          : 'hover:bg-gray-50 theme-text'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

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
              <label className="flex items-center theme-text">
                <input
                  type="checkbox"
                  checked={organicOnly}
                  onChange={(e) => setOrganicOnly(e.target.checked)}
                  className="rounded text-green-600 focus:ring-green-500"
                />
                <span className="ml-2">Organic Only</span>
              </label>
              <label className="flex items-center theme-text">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-green-600 focus:ring-green-500"
                />
                <span className="ml-2">In Stock Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold theme-text">
              Shop Fresh Products ({filteredAndSortedProducts.length})
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm theme-text-light">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-md px-2 py-1 theme-input theme-border"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="theme-card rounded-lg shadow-sm overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium hover:text-green-600 transition-colors theme-text">
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
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        product.inStock
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : theme === 'dark' 
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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