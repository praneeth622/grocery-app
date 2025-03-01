import React, { useState } from 'react';
import { Star, StarHalf, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isOrganic: boolean;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
  description?: string;
  category?: string;
}

interface FeaturedProductsProps {
  title?: string;
  products?: Product[];
  showViewAll?: boolean;
}

const FeaturedProducts = ({ 
  title = "Featured Products", 
  products: propProducts, 
  showViewAll = true 
}: FeaturedProductsProps) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const defaultProducts: Product[] = [
    {
      id: 1,
      name: "Organic Avocados",
      price: 4.99,
      originalPrice: 6.99,
      image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      reviews: 128,
      isOrganic: true,
      inStock: true,
      discount: 28,
      description: "Fresh organic avocados, perfect for guacamole, salads, or spreading on toast. Rich in healthy fats and nutrients.",
      category: "fruits-vegetables"
    },
    {
      id: 2,
      name: "Fresh Strawberries",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.0,
      reviews: 96,
      isOrganic: true,
      inStock: true,
      isNew: true,
      description: "Sweet and juicy organic strawberries. Perfect for desserts, smoothies, or enjoying as a healthy snack.",
      category: "fruits-vegetables"
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      price: 2.99,
      originalPrice: 3.99,
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
      price: 5.49,
      image: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      reviews: 183,
      isOrganic: true,
      inStock: true,
      isNew: true,
      description: "Farm fresh free-range eggs from hens raised in humane conditions with access to outdoor areas.",
      category: "dairy-eggs"
    },
    {
      id: 5,
      name: "Greek Yogurt",
      price: 3.99,
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
      price: 2.49,
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
      price: 3.79,
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
      price: 7.99,
      originalPrice: 9.99,
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviews: 231,
      isOrganic: true,
      inStock: true,
      discount: 20,
      description: "Pure organic honey sourced from local beekeepers. Raw and unfiltered to preserve natural enzymes and nutrients.",
      category: "pantry"
    }
  ];

  const products = propProducts || defaultProducts;

  const toggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={16} className="fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={16} className="fill-yellow-400 text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <section className="py-12 bg-gray-50" aria-labelledby="featured-products-heading">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 id="featured-products-heading" className="text-2xl font-bold text-gray-800">{title}</h2>
          {showViewAll && (
            <Link 
              to="/shop" 
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
              aria-label="View all products"
            >
              View All
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              aria-label={product.name}
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                  {product.isOrganic && (
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">Organic</span>
                  )}
                  {product.isNew && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">New</span>
                  )}
                  {product.discount && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-{product.discount}%</span>
                  )}
                </div>
                
                {/* Wishlist Button */}
                <button
                  className={`absolute top-2 right-2 p-1.5 rounded-full ${
                    isInWishlist(product.id) 
                      ? 'bg-red-50 text-red-500' 
                      : 'bg-white/80 text-gray-400 hover:text-red-500'
                  } transition-colors`}
                  onClick={(e) => toggleWishlist(product, e)}
                  aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart 
                    size={20} 
                    className={isInWishlist(product.id) ? "fill-red-500" : ""} 
                  />
                </button>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center mb-1">
                  <div className="flex">
                    {renderRatingStars(product.rating)}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>
                
                <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                
                <div className="flex items-center mb-3">
                  <span className="font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  
                  <button
                    className={`p-2 rounded-full ${
                      product.inStock 
                        ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    } transition-colors`}
                    disabled={!product.inStock}
                    onClick={(e) => product.inStock && handleAddToCart(product, e)}
                    aria-label={product.inStock ? "Add to cart" : "Out of stock"}
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
              
              {/* Quick Add Overlay (visible on hover) */}
              {hoveredProduct === product.id && product.inStock && (
                <div 
                  className="absolute inset-x-0 bottom-0 bg-green-600 text-white py-3 text-center font-medium transition-all"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  Quick Add to Cart
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;