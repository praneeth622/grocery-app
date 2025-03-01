import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CategoriesPage = () => {
  const categories = [
    {
      id: 'fruits-vegetables',
      name: 'Fruits & Vegetables',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
      itemCount: 150,
      subCategories: ['Fresh Fruits', 'Fresh Vegetables', 'Herbs & Seasonings']
    },
    {
      id: 'dairy-eggs',
      name: 'Dairy & Eggs',
      image: 'https://images.unsplash.com/photo-1594020293008-5f99f60c5e47',
      itemCount: 80,
      subCategories: ['Milk', 'Cheese', 'Eggs', 'Yogurt']
    },
    // Add more categories as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-8">Shop by Category</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h2 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                {category.name}
              </h2>
            </div>
            
            <div className="p-4">
              <div className="text-sm text-gray-600 mb-3">
                {category.itemCount} items
              </div>
              
              <div className="space-y-2">
                {category.subCategories.map((sub, index) => (
                  <div
                    key={index}
                    className="flex items-center text-gray-700 hover:text-green-600"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;