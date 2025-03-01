import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  slug: string;
}

interface CategoryNavProps {
  title?: string;
}

const CategoryNav = ({ title = "Shop by Category" }: CategoryNavProps) => {
  const categories: Category[] = [
    { id: 1, name: "Fruits & Vegetables", icon: "🍎", color: "bg-green-100 text-green-800", slug: "fruits-vegetables" },
    { id: 2, name: "Dairy & Eggs", icon: "🥛", color: "bg-blue-100 text-blue-800", slug: "dairy-eggs" },
    { id: 3, name: "Bakery", icon: "🍞", color: "bg-yellow-100 text-yellow-800", slug: "bakery" },
    { id: 4, name: "Meat & Seafood", icon: "🥩", color: "bg-red-100 text-red-800", slug: "meat-seafood" },
    { id: 5, name: "Frozen Foods", icon: "❄️", color: "bg-indigo-100 text-indigo-800", slug: "frozen-foods" },
    { id: 6, name: "Snacks", icon: "🍿", color: "bg-orange-100 text-orange-800", slug: "snacks" },
    { id: 7, name: "Beverages", icon: "🥤", color: "bg-purple-100 text-purple-800", slug: "beverages" },
    { id: 8, name: "Organic", icon: "🌱", color: "bg-emerald-100 text-emerald-800", slug: "organic" },
  ];

  return (
    <section className="py-10 bg-white" aria-labelledby="categories-heading">
      <div className="container mx-auto px-4">
        <h2 id="categories-heading" className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className={`${category.color} rounded-lg p-4 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              style={{ minHeight: '120px' }}
              aria-label={`Browse ${category.name}`}
            >
              <span className="text-3xl mb-2" aria-hidden="true">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;