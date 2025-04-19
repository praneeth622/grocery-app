import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, StarHalf, ShoppingCart, Heart, Truck, Shield, ArrowLeft, 
  Plus, Minus, Check, Info, Calendar, Clock, Box
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { Product } from '../components/FeaturedProducts';
import ProductRecommendations from '../components/ProductRecommendations';
import toast from 'react-hot-toast';
import { products as allProductsData } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { theme } = useTheme();
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const allProducts: Product[] = allProductsData;

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        const foundProduct = allProducts.find((p) => p.id === parseInt(id || '0'));

        if (!foundProduct) {
          setError('Product not found');
          return;
        }

        setProduct(foundProduct);
        setLoading(false);
      }, 300);
    } catch (err) {
      setError('Error loading product');
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity } as any);
      toast.success(`Added ${quantity} ${product.name}${quantity > 1 ? 's' : ''} to cart`);
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`Removed ${product.name} from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`Added ${product.name} to wishlist`);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 theme-bg">
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
          <span className="ml-3 theme-text-light">Loading product...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center theme-bg">
        <h2 className="text-2xl font-semibold mb-4 theme-text">Product not found</h2>
        <Link to="/shop" className="text-green-600 hover:text-green-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="text-yellow-400" fill="currentColor" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="text-yellow-400" fill="currentColor" />);
    }
    
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />);
    }

    return stars;
  };

  const inWishlist = product ? isInWishlist(product.id) : false;

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const savingsPercentage = product.discount || 0;

  return (
    <div className="theme-bg min-h-screen pb-12">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-wrap items-center gap-2 text-sm mb-6">
          <Link to="/" className="theme-text-light hover:text-green-600">Home</Link>
          <span className="theme-text-light">/</span>
          <Link to="/shop" className="theme-text-light hover:text-green-600">Shop</Link>
          <span className="theme-text-light">/</span>
          <Link to={`/category/${product.category}`} className="theme-text-light hover:text-green-600">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' ')}
          </Link>
          <span className="theme-text-light">/</span>
          <span className="theme-text font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="relative theme-card p-6 rounded-xl shadow-md overflow-hidden group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto rounded-lg object-contain mx-auto transition-transform duration-500 group-hover:scale-105" 
                style={{ maxHeight: '500px' }}
              />
              
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount && (
                  <div className="bg-red-500 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-sm">
                    {product.discount}% OFF
                  </div>
                )}
                
                {product.isOrganic && (
                  <div className={`${theme === 'dark' ? 'bg-green-900/60 text-green-300' : 'bg-green-100 text-green-800'} px-3 py-1.5 rounded-full text-sm font-medium shadow-sm`}>
                    Organic
                  </div>
                )}
                
                {product.isNew && (
                  <div className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                    New
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleWishlistToggle}
                className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md transition-all ${
                  inWishlist 
                    ? 'bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-300' 
                    : theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="theme-card p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-2 mb-2">
                {product.inStock ? (
                  <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900/30 dark:text-green-300">
                    In Stock
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full dark:bg-red-900/30 dark:text-red-300">
                    Out of Stock
                  </span>
                )}
                <span className="theme-text-light text-sm">SKU: {product.id.toString().padStart(6, '0')}</span>
              </div>
              
              <h1 className="text-3xl font-bold theme-text mb-3">{product.name}</h1>
              
              <div className="flex items-end gap-3 mt-3 mb-4">
                <span className="text-3xl font-bold text-green-600">₹{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl theme-text-light line-through">₹{product.originalPrice.toFixed(2)}</span>
                )}
                {savings > 0 && (
                  <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-md dark:bg-green-900/30 dark:text-green-300">
                    Save ₹{savings.toFixed(2)} ({savingsPercentage}%)
                  </span>
                )}
              </div>
              
              <div className="flex items-center mt-4 mb-6">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="ml-2 theme-text-light text-sm">
                  {product.rating.toFixed(1)} ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="theme-text-light mb-6 pb-6 border-b theme-border">
                <p>{product.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 mb-4">
                <label htmlFor="quantity" className="font-medium theme-text mb-2 sm:mb-0">Quantity:</label>
                <div className="flex items-center h-12">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className={`w-12 h-full rounded-l-lg flex items-center justify-center transition-colors ${
                      quantity <= 1 
                        ? `${theme === 'dark' ? 'bg-gray-800 text-gray-600' : 'bg-gray-100 text-gray-400'} cursor-not-allowed` 
                        : `${theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                    }`}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-full border-x-0 theme-border text-center theme-input"
                    aria-label="Product quantity"
                  />
                  <button
                    onClick={incrementQuantity}
                    className={`w-12 h-full rounded-r-lg flex items-center justify-center transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3.5 px-4 rounded-lg flex items-center justify-center transition-colors ${
                    product.inStock
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : `${theme === 'dark' ? 'bg-gray-700 text-gray-500' : 'bg-gray-300 text-gray-600'} cursor-not-allowed`
                  }`}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button
                  onClick={handleWishlistToggle}
                  className={`sm:w-auto py-3.5 px-4 rounded-lg flex items-center justify-center transition-colors border ${
                    inWishlist
                      ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
                      : `${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'}`
                  }`}
                >
                  {inWishlist ? (
                    <>
                      <Check size={20} className="mr-2" />
                      <span className="hidden sm:inline">In Wishlist</span>
                    </>
                  ) : (
                    <>
                      <Heart size={20} className="mr-2" />
                      <span className="hidden sm:inline">Add to Wishlist</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="theme-card p-5 rounded-xl space-y-4 shadow-md">
              <div className="flex items-start">
                <div className={`p-2.5 rounded-full ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-100'} mr-3`}>
                  <Truck className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium theme-text">Free Delivery</h3>
                  <p className="text-sm theme-text-light">Free delivery on orders over ₹500</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className={`p-2.5 rounded-full ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-100'} mr-3`}>
                  <Shield className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium theme-text">Quality Guarantee</h3>
                  <p className="text-sm theme-text-light">Fresh products guaranteed or full refund</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className={`p-2.5 rounded-full ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-100'} mr-3`}>
                  <Clock className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium theme-text">Express Delivery</h3>
                  <p className="text-sm theme-text-light">Get your order within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="theme-card rounded-xl shadow-md overflow-hidden mb-12">
          <div className="flex border-b theme-border overflow-x-auto scrollbar-hide">
            <button 
              className={`px-5 py-4 font-medium text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'description' 
                  ? 'theme-text border-b-2 border-green-600' 
                  : 'theme-text-light hover:text-green-600'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`px-5 py-4 font-medium text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'details' 
                  ? 'theme-text border-b-2 border-green-600' 
                  : 'theme-text-light hover:text-green-600'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Product Details
            </button>
            <button 
              className={`px-5 py-4 font-medium text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'reviews' 
                  ? 'theme-text border-b-2 border-green-600' 
                  : 'theme-text-light hover:text-green-600'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews})
            </button>
            <button 
              className={`px-5 py-4 font-medium text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'shipping' 
                  ? 'theme-text border-b-2 border-green-600' 
                  : 'theme-text-light hover:text-green-600'
              }`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping & Returns
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="space-y-4 theme-text">
                <p>{product.description}</p>
                <p>Sourced from trusted farmers, our {product.name.toLowerCase()} are harvested at the peak of freshness to ensure maximum flavor and nutritional value. Perfect for your everyday cooking or eating fresh.</p>
              </div>
            )}
            
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg theme-text">Product Information</h3>
                  <div className="theme-border border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b theme-border">
                          <td className={`p-3 theme-text-light ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>Category</td>
                          <td className="p-3 theme-text">{product.category.replace('-', ' ')}</td>
                        </tr>
                        <tr className="border-b theme-border">
                          <td className={`p-3 theme-text-light ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>Origin</td>
                          <td className="p-3 theme-text">India</td>
                        </tr>
                        <tr className="border-b theme-border">
                          <td className={`p-3 theme-text-light ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>Organic</td>
                          <td className="p-3 theme-text">{product.isOrganic ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                          <td className={`p-3 theme-text-light ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>Quality</td>
                          <td className="p-3 theme-text">Premium</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg theme-text">Benefits</h3>
                  <ul className="space-y-2">
                    {[
                      'Rich in essential nutrients and vitamins',
                      'Supports a healthy immune system',
                      'Sustainably grown with care for the environment',
                      'Free from harmful pesticides and chemicals',
                      'Supports local farming communities'
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={18} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="theme-text">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-lg theme-text">Customer Reviews</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="theme-text-light text-sm">Based on {product.reviews} reviews</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm">
                    Write a Review
                  </button>
                </div>
                
                <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <p className="theme-text">Reviews coming soon!</p>
                </div>
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg theme-text mb-3">Shipping Information</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Truck size={18} className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="theme-text">Free shipping on orders above ₹500</p>
                        <p className="theme-text-light text-sm">Standard delivery within 24-48 hours</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Box size={18} className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="theme-text">Express delivery available</p>
                        <p className="theme-text-light text-sm">Get your order within 12 hours (additional charges apply)</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg theme-text mb-3">Return Policy</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Calendar size={18} className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="theme-text">24 hours return policy</p>
                        <p className="theme-text-light text-sm">Not satisfied with the product? Return within 24 hours for a full refund</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Info size={18} className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="theme-text">Quality guarantee</p>
                        <p className="theme-text-light text-sm">If the product quality doesn't meet our standards, we offer a full refund or replacement</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold theme-text mb-6">You May Also Like</h2>
          <ProductRecommendations currentProductId={product.id} category={product.category} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;