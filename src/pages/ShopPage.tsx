import React, { useState, useMemo } from 'react';
import { Filter, ShoppingBag, ChevronDown, Star } from 'lucide-react';
import { Product } from '../components/FeaturedProducts';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ShopPage = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(1000);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const { addToCart } = useCart();

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
    {
        id: 3,
        name: "Whole Grain Bread",
        price: 299,
        originalPrice: 399,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.8,
        reviews: 215,
        isOrganic: false,
        inStock: true,
        discount: 25,
        description: "Freshly baked whole grain bread made with premium ingredients. High in fiber and perfect for sandwiches or toast.",
        category: "bakery"
      },
      {
        id: 4,
        name: "Free Range Eggs",
        price: 54.9,
        image: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.7,
        reviews: 183,
        isOrganic: true,
        inStock: true,
        isNew: true,
        description: "Farm fresh free-range eggs from hens raised in humane conditions with access to outdoor areas.",
        category: "Dairy & Eggs"
      },
      {
        id: 5,
        name: "Greek Yogurt",
        price: 39.9,
        originalPrice: 4.99,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.2,
        reviews: 147,
        isOrganic: false,
        inStock: true,
        discount: 20,
        description: "Creamy Greek yogurt, high in protein and probiotics. Perfect for breakfast, snacks, or as a cooking ingredient.",
        category: "dairy-eggs"
      },
      {
        id: 6,
        name: "Organic Spinach",
        price: 24.9,
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.6,
        reviews: 92,
        isOrganic: true,
        inStock: false,
        description: "Fresh organic spinach leaves, packed with nutrients and antioxidants. Great for salads, smoothies, or cooking.",
        category: "fruits-vegetables"
      },
      {
        id: 7,
        name: "Almond Milk",
        price: 379,
        image: "https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.3,
        reviews: 76,
        isOrganic: true,
        inStock: true,
        description: "Creamy unsweetened almond milk. A delicious dairy-free alternative that's perfect for cereal, coffee, or drinking.",
        category: "beverages"
      },
      {
        id: 8,
        name: "Organic Honey",
        price: 799,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.9,
        reviews: 231,
        isOrganic: true,
        inStock: true,
        discount: 20,
        description: "Pure organic honey sourced from local beekeepers. Raw and unfiltered to preserve natural enzymes and nutrients.",
        category: "pantry"
      }
  ]);

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
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fruits', name: 'Fruits & Vegetables' },
    { id: 'bakery', name: 'Bakery' },
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
          
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
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

            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
                <div className="flex justify-between text-sm text-gray-600">
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
                <span className="ml-2">Organic Only</span>
              </label>
              <label className="flex items-center">
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
            <h1 className="text-2xl font-semibold">
              Shop Fresh Products ({filteredAndSortedProducts.length})
            </h1>
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
            {filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mt-1">
                    <div className="flex items-center text-yellow-400">
                      <Star size={16} fill="currentColor" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex justify-between items-center">
                    <div className="space-y-1">
                      <span className="text-green-600 font-semibold">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through block">
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