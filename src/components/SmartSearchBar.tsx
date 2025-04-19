import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic, X, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const SmartSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Milk', 'Wheat Bread', 'Banana', 'Organic Vegetables'
  ]);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save searches to localStorage
  const saveSearch = (term: string) => {
    if (!term.trim()) return;
    
    const newSearches = [
      term,
      ...recentSearches.filter(s => s !== term)
    ].slice(0, 5);
    
    setRecentSearches(newSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newSearches));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      saveSearch(searchTerm);
      // In a real app, you would navigate to search results page
      toast.success(`Searching for "${searchTerm}"`);
      setSearchTerm('');
      setIsExpanded(false);
    }
  };

  // Start voice recognition
  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error("Voice recognition not supported in your browser");
      return;
    }
    
    setIsListening(true);
    
    // Simulate voice recognition for demo
    toast.success("Listening...");
    setTimeout(() => {
      setSearchTerm("organic apples");
      setIsListening(false);
      toast.success("Recognized: 'organic apples'");
    }, 2000);
    
    // In a real implementation, you would use the Web Speech API
  };

  // Handle recent search click
  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    inputRef.current?.focus();
  };

  // Handle clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex items-center bg-gray-100 dark:bg-gray-800/50 rounded-full overflow-hidden transition-all duration-300 ${
          isExpanded ? 'ring-2 ring-green-500 dark:ring-green-500/70 shadow-md' : ''
        }`}>
          <Search className="absolute left-3 text-gray-500 dark:text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for fresh products..."
            className="w-full pl-10 pr-12 py-3 bg-gray-100 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsExpanded(true)}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-12 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={startVoiceRecognition}
            className={`absolute right-3 p-1 rounded-full transition-colors ${
              isListening 
                ? 'text-red-500 dark:text-red-400 animate-pulse' 
                : 'text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
            }`}
            disabled={isListening}
          >
            <Mic size={20} />
          </button>
        </div>
      </form>

      {/* Recent searches dropdown */}
      {isExpanded && recentSearches.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Searches</h3>
            <button 
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              onClick={clearRecentSearches}
            >
              Clear
            </button>
          </div>
          <ul>
            {recentSearches.map((term, index) => (
              <li key={index}>
                <button
                  className="flex items-center w-full px-4 py-2 text-left text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                  onClick={() => handleRecentSearchClick(term)}
                >
                  <Clock size={16} className="text-gray-400 dark:text-gray-500 mr-2" />
                  <span>{term}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SmartSearchBar;
