import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isOrganic?: boolean;
  inStock: boolean;
  discount?: number;
  description?: string;
  category: string;
  isNew?: boolean;
  quantity?: number;
}

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  
  // Get only featured products (first 6 products with highest rating)
  const featuredProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const handleAddToCart = (product: Product) => {
    if (product.inStock) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 duration-300"
          >
            <Link to={`/product/${product.id}`} className="relative block">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-60 object-cover"
              />
              
              {product.discount && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md font-bold text-sm">
                  {product.discount}% OFF
                </div>
              )}
              
              {product.isNew && (
                <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-md font-bold text-sm">
                  NEW
                </div>
              )}
              
              {product.isOrganic && (
                <div className="absolute top-3 right-3 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  Organic
                </div>
              )}
            </Link>
            
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-lg hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              <div className="flex items-center mt-2">
                <div className="flex items-center text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <span className="ml-1 text-gray-600 text-sm">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <div>
                  <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`rounded-full p-2 transition-colors ${
                    product.inStock
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label={product.inStock ? "Add to cart" : "Out of stock"}
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
              
              {!product.inStock && (
                <p className="text-red-500 text-sm mt-2">Out of Stock</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <Link to="/shop" className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
