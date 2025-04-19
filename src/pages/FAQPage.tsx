import  { useState } from 'react';
import { ChevronDown, ChevronUp, Search, ShoppingBag, Truck, RotateCcw, CreditCard, Shield, Clock, ChevronRight } from 'lucide-react';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});

  // Toggle specific FAQ item
  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // FAQ Categories
  const categories = [
    { id: 'all', name: 'All Questions', icon: <ChevronDown size={18} /> },
    { id: 'orders', name: 'Orders & Shipping', icon: <ShoppingBag size={18} /> },
    { id: 'delivery', name: 'Delivery', icon: <Truck size={18} /> },
    { id: 'returns', name: 'Returns & Refunds', icon: <RotateCcw size={18} /> },
    { id: 'payment', name: 'Payment', icon: <CreditCard size={18} /> },
    { id: 'account', name: 'Account', icon: <Shield size={18} /> }
  ];

  // FAQ Data
  const faqs = [
    {
      id: 'faq-1',
      category: 'orders',
      question: 'How do I place an order?',
      answer: 'You can place an order on our website by browsing products, adding them to your cart, and proceeding to checkout. You\'ll need to provide your delivery address and payment information to complete the order. Alternatively, you can place an order through our mobile app which offers the same functionality.'
    },
    {
      id: 'faq-2',
      category: 'orders',
      question: 'Can I modify my order after placing it?',
      answer: 'Yes, you can modify your order within 30 minutes of placing it. To do this, go to "My Orders" in your account, select the order you want to modify, and click on "Modify Order". After 30 minutes, your order enters the processing stage and cannot be modified.'
    },
    {
      id: 'faq-3',
      category: 'orders',
      question: 'How can I cancel my order?',
      answer: 'You can cancel your order within 30 minutes of placing it by going to "My Orders" in your account and selecting "Cancel Order". If you need to cancel an order after 30 minutes, please contact our customer service team, though cancellation may not be possible if the order has already been processed or shipped.'
    },
    {
      id: 'faq-4',
      category: 'delivery',
      question: 'What are your delivery hours?',
      answer: 'We deliver from 10:00 AM to 8:00 PM, seven days a week. During checkout, you can select your preferred delivery time slot within these hours.'
    },
    {
      id: 'faq-5',
      category: 'delivery',
      question: 'How much is the delivery fee?',
      answer: 'The delivery fee is ₹30 for orders under ₹500. For orders above ₹500, delivery is free. Additional charges may apply for express delivery or locations outside our standard delivery zones.'
    },
    {
      id: 'faq-6',
      category: 'delivery',
      question: 'Where do you deliver?',
      answer: 'We currently deliver to most areas in Bengaluru, Mumbai, Delhi, Chennai, Hyderabad, and Pune. You can check if we deliver to your area by entering your PIN code on our website or app before placing your order.'
    },
    {
      id: 'faq-7',
      category: 'delivery',
      question: 'How can I track my order?',
      answer: 'You can track your order by logging into your account and visiting the "My Orders" section. For each active order, you\'ll see real-time updates including order confirmation, processing, out for delivery, and delivered statuses. If your order is out for delivery, you may also receive the delivery person\'s contact information.'
    },
    {
      id: 'faq-8',
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'If you\'re not satisfied with the quality of any product, you can request a refund or replacement within 24 hours of delivery. Our delivery personnel can also accept returns at the time of delivery if you find an issue with the product. Simply contact our customer service team through the app, website, or phone, and we\'ll arrange for a return and refund.'
    },
    {
      id: 'faq-9',
      category: 'returns',
      question: 'How long does it take to process refunds?',
      answer: 'Refunds are typically processed within 3-5 business days after we receive and verify the returned items. The exact time it takes for the refund to appear in your account depends on your bank or payment method. Credit card refunds usually take 5-7 business days, while UPI and wallet refunds are generally processed within 1-3 business days.'
    },
    {
      id: 'faq-10',
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept a variety of payment methods including credit cards, debit cards, UPI (Google Pay, PhonePe, BHIM), net banking, digital wallets (Paytm, Amazon Pay), and cash on delivery. All online transactions are secure and encrypted.'
    },
    {
      id: 'faq-11',
      category: 'payment',
      question: 'Is it safe to save my card details on your platform?',
      answer: 'Yes, it\'s safe to save your card details on our platform. We use industry-standard security protocols, and all payment information is encrypted and stored in compliance with PCI DSS standards. We also offer tokenization for card payments, which means your actual card details are not stored on our servers.'
    },
    {
      id: 'faq-12',
      category: 'account',
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking on the "Sign Up" or "Register" button on our website or app. You\'ll need to provide your name, email address, phone number, and a password. Alternatively, you can sign up using your Google, Facebook, or Apple account for a faster registration process.'
    },
    {
      id: 'faq-13',
      category: 'account',
      question: 'How can I reset my password?',
      answer: 'To reset your password, click on the "Login" button, then select "Forgot Password". Enter your registered email address or phone number, and we\'ll send you a password reset link or OTP. Follow the instructions to create a new password. For security reasons, password reset links expire after 24 hours.'
    },
    {
      id: 'faq-14',
      category: 'orders',
      question: 'What do I do if an item is missing from my order?',
      answer: 'If an item is missing from your order, please contact our customer service team immediately through the "Help" section in our app or website. Provide your order number and details of the missing item. We\'ll verify the issue and arrange to deliver the missing item as soon as possible, or process a refund for the item.'
    },
    {
      id: 'faq-15',
      category: 'delivery',
      question: 'Do you offer same-day delivery?',
      answer: 'Yes, we offer same-day delivery for orders placed before 3:00 PM, subject to product availability and your location. During checkout, you\'ll see available delivery slots for your order. For faster delivery, you can also choose our express delivery option for an additional fee.'
    }
  ];

  // Filter FAQs based on search query and active category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery.trim() === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our products, services, delivery, returns, and more.
            If you can't find what you're looking for, please <a href="/contact" className="text-green-600 hover:underline">contact us</a>.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Search for questions..."
            />
          </div>
        </div>
        
        {/* FAQ Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`inline-flex items-center px-4 py-2 rounded-full border transition-colors ${
                activeCategory === category.id
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Featured Topics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-green-50 rounded-lg p-6">
            <Truck size={28} className="text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Delivery Information</h3>
            <p className="text-gray-600 mb-3">Learn about our delivery areas, timings, and tracking options.</p>
            <button 
              onClick={() => setActiveCategory('delivery')}
              className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
            >
              View details <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <RotateCcw size={28} className="text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Returns & Refunds</h3>
            <p className="text-gray-600 mb-3">Understand our easy return process and refund policies.</p>
            <button 
              onClick={() => setActiveCategory('returns')}
              className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
            >
              View details <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <CreditCard size={28} className="text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment Options</h3>
            <p className="text-gray-600 mb-3">Explore the various payment methods we accept.</p>
            <button 
              onClick={() => setActiveCategory('payment')}
              className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
            >
              View details <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
        
        {/* FAQ Accordion */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any FAQs matching your search. Try different keywords or browse categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div 
                key={faq.id} 
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className={`w-full px-6 py-4 text-left flex justify-between items-center ${
                    openQuestions[faq.id] ? 'bg-green-50' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{faq.question}</span>
                  {openQuestions[faq.id] ? (
                    <ChevronUp size={20} className="text-green-600" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </button>
                
                {openQuestions[faq.id] && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        {/* Still Need Help */}
        <div className="bg-gray-50 rounded-lg p-8 text-center mb-8">
          <Clock size={32} className="mx-auto text-green-600 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our customer support team is available from 8 AM to 10 PM, 7 days a week to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <a 
              href="/contact" 
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Contact Support
            </a>
            <a 
              href="tel:+919876543210" 
              className="inline-block px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Call Us: +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;