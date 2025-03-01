import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, StarHalf, ShoppingCart, Heart, ChevronRight, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../components/FeaturedProducts';
import FeaturedProducts from '../components/FeaturedProducts';
import LoadingSpinner from '../components/SkeletonLoader';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { addToCart } = useCart();

  // Move allProducts outside of the component or use useMemo
  const allProducts: Product[] = [
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
      isNew: true,
      description: "Freshly baked whole grain bread made with premium ingredients. High in fiber and perfect for sandwiches or toast.",
      category: "bakery"
    },
  ];

  useEffect(() => {
    try {
      setLoading(true);
      const foundProduct = allProducts.find((p) => p.id === parseInt(id || '0'));
      
      if (!foundProduct) {
        setError('Product not found');
        return;
      }

      setProduct(foundProduct);
      const related = allProducts.filter(
        (p) => p.category === foundProduct.category && p.id !== foundProduct.id
      );
      setRelatedProducts(related);
    } catch (err) {
      setError('Error loading product');
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="text-gray-600 text-sm flex items-center space-x-1">
        <ArrowLeft size={16} />
        <span>Back to home</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="flex flex-col space-y-4">
          <div className="relative">  
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg" />
            <button className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
              <Heart size={24} />
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star size={24} />
              <Star size={24} />
              <Star size={24} />
              <Star size={24} />
              <StarHalf size={24} />
            </div>
            <span className="text-gray-600 text-sm">({product.reviews} reviews)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-semibold">₹{product.price}</span>
            {product.discount && (
              <span className="text-gray-600 line-through">₹{product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="text-green-600">Save {product.discount}%</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">In stock</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">Ships within 24 hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Quantity:</span>
            <div className="flex items-center space-x-2">
              <button
                className="p-2 border border-gray-300 rounded"
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 1}
              >
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button
                className="p-2 border border-gray-300 rounded"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={24} />
            <span>Add to cart</span>
          </button>
          <div className="flex items-center space-x-2">
            <Truck size={24} />
            <span>Ships within 24 hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield size={24} />
            <span>Secure transaction</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-gray-600">{product.description}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Related products</h2>
        <div className="gap-8 mt-4">
          {relatedProducts.map((product) => (
            <FeaturedProducts key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;