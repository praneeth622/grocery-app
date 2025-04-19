import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from './FeaturedProducts';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { products as dataProducts } from '../data/products';

interface ProductRecommendationsProps {
  currentProductId?: number;
  category?: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProductId,
  category
}) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { addToCart } = useCart();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Use products from data file instead of mock data
  const allProducts: Product[] = dataProducts;

  /* Removed hardcoded products
  const oldProducts: Product[] = [
    {
      id: 1,
      name: "Organic Avocados",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      reviews: 128,
      isOrganic: true,
      inStock: true,
      discount: 25,
      category: "fruits"
    },
    {
      id: 2,
      name: "Fresh Strawberries",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.3,
      reviews: 96,
      isOrganic: false,
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
      category: "dairy"
    },
    {
      id: 5,
      name: "Greek Yogurt",
      price: 39.9,
      originalPrice: 49.9,
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.2,
      reviews: 147,
      isOrganic: false,
      inStock: true,
      discount: 20,
      category: "dairy"
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
      category: "vegetables"
    }
  ]; */

  // Get recently viewed products from localStorage
  const getRecentlyViewed = (): number[] => {
    const recentlyViewed = localStorage.getItem('recentlyViewed');
    return recentlyViewed ? JSON.parse(recentlyViewed) : [];
  };

  // Add a product to recently viewed
  const addToRecentlyViewed = (productId: number) => {
    if (!productId) return;

    const recentlyViewed = getRecentlyViewed();

    // Remove the product if it's already in the list
    const filteredList = recentlyViewed.filter((id: number) => id !== productId);

    // Add the product to the beginning of the list
    const newList = [productId, ...filteredList].slice(0, 10); // Keep only 10 most recent

    localStorage.setItem('recentlyViewed', JSON.stringify(newList));
  };

  // Add current product to recently viewed when component mounts
  useEffect(() => {
    if (currentProductId) {
      addToRecentlyViewed(currentProductId);
    }
  }, [currentProductId]);

  // Get recommendations based on current product and recently viewed
  useEffect(() => {
    setLoading(true);

    // Reduced timeout for faster loading
    setTimeout(() => {
      let recommendedProducts: Product[] = [];

      // Strategy 1: Similar category products
      if (category) {
        const similarCategoryProducts = allProducts.filter(
          p => p.category === category && p.id !== currentProductId
        );
        recommendedProducts = [...recommendedProducts, ...similarCategoryProducts];
      }

      // Strategy 2: Recently viewed products
      const recentlyViewedIds = getRecentlyViewed();
      const recentlyViewedProducts = allProducts.filter(
        p => recentlyViewedIds.includes(p.id) && p.id !== currentProductId
      );
      recommendedProducts = [...recommendedProducts, ...recentlyViewedProducts];

      // Strategy 3: Featured or popular products as fallback
      if (recommendedProducts.length < 4) {
        const popularProducts = allProducts
          .filter(p => p.id !== currentProductId)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4 - recommendedProducts.length);

        recommendedProducts = [...recommendedProducts, ...popularProducts];
      }

      // Remove duplicates
      const uniqueRecommendations = Array.from(
        new Map(recommendedProducts.map(item => [item.id, item])).values()
      ).slice(0, 6);

      setRecommendations(uniqueRecommendations);
      setLoading(false);
    }, 200); // Reduced from 500ms to 200ms for faster loading
  }, [currentProductId, category]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    } as any); // Using type assertion to avoid TypeScript error
    toast.success(`${product.name} added to cart`);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      setScrollPosition(scrollRef.current.scrollLeft - 320);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      setScrollPosition(scrollRef.current.scrollLeft + 320);
    }
  };

  // Check if we can scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  if (recommendations.length === 0 && !loading) {
    return null;
  }

  return (
    <section className="py-6 px-4 bg-white rounded-lg shadow-sm my-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recommended For You</h2>
          <div className="flex space-x-2">
            <button
              onClick={scrollLeft}
              disabled={scrollPosition <= 0}
              className={`p-1 rounded-full border ${
                scrollPosition <= 0
                  ? 'text-gray-300 border-gray-200'
                  : 'text-gray-600 border-gray-300 hover:bg-gray-100'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="p-1 rounded-full border text-gray-600 border-gray-300 hover:bg-gray-100"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex space-x-4 overflow-x-auto pb-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="min-w-[220px] animate-pulse">
                <div className="bg-gray-200 h-32 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar gap-4 snap-x"
            onScroll={handleScroll}
          >
            {recommendations.map((product) => (
              <div
                key={product.id}
                className="min-w-[220px] bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0 relative snap-start hover:shadow-md transition-shadow duration-200"
              >
                {/* "You might like" tag */}
                <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs py-0.5 px-2 rounded-full">
                  You might like
                </div>

                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 w-full object-cover"
                  />
                </Link>

                <div className="p-3">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-medium text-sm mb-1 truncate">{product.name}</h3>
                  </Link>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-semibold text-green-600">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`p-1.5 rounded-full ${
                        product.inStock
                          ? 'bg-green-50 text-green-600 hover:bg-green-100'
                          : 'bg-gray-50 text-gray-400'
                      }`}
                      aria-label={product.inStock ? "Add to cart" : "Out of stock"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z"></path>
                        <path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z"></path>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductRecommendations;