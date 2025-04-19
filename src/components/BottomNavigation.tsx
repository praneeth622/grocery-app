import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Tag, ShoppingCart, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Navigation items
  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: <Home size={20} />,
    },
    {
      name: 'Categories',
      path: '/categories',
      icon: <Grid size={20} />,
    },
    {
      name: 'Offers',
      path: '/offers',
      icon: <Tag size={20} />,
    },
    {
      name: 'Cart',
      path: '/cart',
      icon: <ShoppingCart size={20} />,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <User size={20} />,
    }
  ];

  // Show navigation on smaller screens only
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-between items-center px-2">
        {navItems.map((item) => {
          const isActive = 
            (item.path === '/' && currentPath === '/') || 
            (item.path !== '/' && currentPath.startsWith(item.path));
            
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 ${
                isActive 
                  ? 'text-green-600' 
                  : 'text-gray-600'
              }`}
            >
              <div className={`p-1 rounded-full ${isActive ? 'bg-green-50' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'font-medium' : ''}`}>
                {item.name}
              </span>
              <div className={`h-1 w-6 rounded mt-1 ${isActive ? 'bg-green-600' : 'bg-transparent'}`}></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;