import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpenText } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-200' : 'text-white';
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 mb-4 md:mb-0">
          <BookOpenText size={32} className="text-white" />
          <h1 className="text-2xl font-bold tracking-tight">FlashForge</h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className={`${isActive('/')} hover:text-blue-200 transition-colors duration-200 font-medium`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/decks" className={`${isActive('/decks')} hover:text-blue-200 transition-colors duration-200 font-medium`}>
                My Decks
              </Link>
            </li>
            <li>
              <Link to="/study" className={`${isActive('/study')} hover:text-blue-200 transition-colors duration-200 font-medium`}>
                Study
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;