import  { useState, useRef, useEffect } from 'react';
import { HelpCircle, ShoppingCart, Tag, Phone, MessageCircle, X, Book, ChevronRight} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ContextualHelp = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);
  
  // List of help topics
  const helpTopics = [
    {
      id: 'cart',
      title: 'How to add to cart',
      icon: <ShoppingCart size={18} />,
      description: 'Tap the "Add to Cart" button on any product card to add it to your shopping cart. For products with multiple quantities, you can adjust the amount before adding to cart.'
    },
    {
      id: 'offers',
      title: 'How to apply offers',
      icon: <Tag size={18} />,
      description: 'Browse available offers in the Offers tab. Select an offer to see eligible products. Offers are automatically applied at checkout when you purchase qualifying items.'
    },
    {
      id: 'support',
      title: 'Contact support',
      icon: <Phone size={18} />,
      description: 'Our support team is available from 8am-8pm daily. Contact us for assistance.',
      hasAction: true,
      actionText: 'Contact Us',
      actionIcon: <ChevronRight size={14} />,
      onAction: () => {
        setIsOpen(false);
        navigate('/contact');
      }
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      icon: <MessageCircle size={18} />,
      description: 'Find answers to common questions about orders, delivery, and returns in our extensive FAQ section.',
      hasAction: true,
      actionText: 'View FAQs',
      actionIcon: <ChevronRight size={14} />,
      onAction: () => {
        setIsOpen(false);
        navigate('/faq');
      }
    },
    {
      id: 'guide',
      title: 'Shopping Guide',
      icon: <Book size={18} />,
      description: 'Learn how to make the most of your shopping experience with our helpful guide to selecting and storing fresh produce.'
    }
  ];
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveTopicId(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle help menu
  const toggleHelp = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveTopicId(null);
    }
  };
  
  // Show help topic details
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  
  const showTopicDetails = (topicId: string) => {
    setActiveTopicId(topicId);
  };
  
  const closeTopicDetails = () => {
    setActiveTopicId(null);
  };
  
  const activeTopic = helpTopics.find(topic => topic.id === activeTopicId);

  return (
    <div ref={helpRef} className="fixed right-4 bottom-20 md:bottom-4 z-50">
      {/* Help button */}
      <button
        onClick={toggleHelp}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-green-600 text-white transform rotate-45' 
            : 'bg-white text-green-600 hover:bg-green-50 hover:shadow-xl'
        }`}
        aria-label="Help"
      >
        {isOpen ? <X size={24} /> : <HelpCircle size={24} />}
      </button>
      
      {/* Help quick access buttons (animation) */}
      {!isOpen && (
        <div className="absolute bottom-16 right-1 space-y-2 transition-all duration-300">
          {/* These could be quick access buttons that appear on hover */}
        </div>
      )}
      
      {/* Help menu */}
      {isOpen && !activeTopic && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
          <div className="p-4 bg-green-50 border-b border-gray-100">
            <h3 className="font-medium text-lg text-gray-800">How can we help you?</h3>
            <p className="text-sm text-gray-600 mt-1">Select a topic to get assistance</p>
          </div>
          <ul className="py-2">
            {helpTopics.map((topic) => (
              <li key={topic.id}>
                <button
                  onClick={() => showTopicDetails(topic.id)}
                  className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors group"
                >
                  <span className="flex items-center justify-center w-8 h-8 mr-3 text-green-600 bg-green-50 rounded-full group-hover:bg-green-100">
                    {topic.icon}
                  </span>
                  <span className="flex-1">{topic.title}</span>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                </button>
              </li>
            ))}
          </ul>
          <div className="p-3 bg-gray-50 border-t border-gray-100">
            <Link 
              to="/contact" 
              className="text-sm text-green-600 hover:text-green-700 flex items-center justify-center py-1"
            >
              <Phone size={14} className="mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      )}
      
      {/* Help topic details */}
      {isOpen && activeTopic && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
          <div className="p-4 bg-green-50 border-b border-gray-100 flex items-center">
            <button 
              onClick={closeTopicDetails} 
              className="mr-3 w-6 h-6 flex items-center justify-center rounded-full hover:bg-green-100 text-gray-600"
              aria-label="Back to topics"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h3 className="font-medium text-gray-800">{activeTopic.title}</h3>
          </div>
          <div className="p-4">
            <div className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 mr-3 text-green-600 bg-green-50 rounded-full">
                {activeTopic.icon}
              </span>
              <p className="text-sm text-gray-600 flex-1">{activeTopic.description}</p>
            </div>
            
            {activeTopic.hasAction && (
              <button
                onClick={activeTopic.onAction}
                className="mt-4 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center transition-colors"
              >
                {activeTopic.actionIcon && <span className="mr-2">{activeTopic.actionIcon}</span>}
                {activeTopic.actionText}
              </button>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium mb-2">Was this helpful?</h4>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    toast.success('Thanks for your feedback!');
                    closeTopicDetails();
                  }}
                  className="flex-1 py-1 px-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-md text-sm transition-colors"
                >
                  Yes, thanks!
                </button>
                <button 
                  onClick={() => {
                    toast.success('We\'ll improve our help content');
                    closeTopicDetails();
                  }}
                  className="flex-1 py-1 px-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-md text-sm transition-colors"
                >
                  Not really
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextualHelp;
