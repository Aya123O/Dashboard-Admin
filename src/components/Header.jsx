import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-700 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">TapTask</h1>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-indigo-300" />
              </div>
              <input
                type="text"
                placeholder="Search leads..."
                className="block w-full pl-10 pr-4 py-3 border-0 rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-indigo-200 focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30">
              <Bell className="h-5 w-5 text-white" />
            </button>
            <button className="flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-xl p-2 transition-all duration-200 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30">
              <User className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;