import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 theme-bg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 theme-text">Contact Us</h1>
        <p className="theme-text-light mb-8 max-w-3xl">Have questions or feedback? We're here to help! Reach out to our team using any of the methods below.</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="theme-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 theme-text">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium theme-text">Our Location</h3>
                    <p className="theme-text-light text-sm mt-1">123 Green Avenue, Bengaluru, Karnataka 560001, India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium theme-text">Call Us</h3>
                    <p className="theme-text-light text-sm mt-1">+91 98765 43210</p>
                    <p className="theme-text-light text-sm">Customer Support: +91 87654 32109</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium theme-text">Email Us</h3>
                    <p className="theme-text-light text-sm mt-1">support@freshfarm.com</p>
                    <p className="theme-text-light text-sm">info@freshfarm.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 mr-4">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium theme-text">Working Hours</h3>
                    <p className="theme-text-light text-sm mt-1">Monday - Saturday: 8:00 AM - 9:00 PM</p>
                    <p className="theme-text-light text-sm">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-3 theme-text">Follow Us</h3>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="theme-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 theme-text">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium theme-text mb-1">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 theme-input theme-border rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium theme-text mb-1">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 theme-input theme-border rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium theme-text mb-1">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 theme-input theme-border rounded-md focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Order Inquiry">Order Inquiry</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Delivery Information">Delivery Information</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium theme-text mb-1">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 theme-input theme-border rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mb-16">
          <div className="theme-card rounded-lg shadow-sm p-6 mb-4">
            <h2 className="text-xl font-semibold mb-4 theme-text">Our Location</h2>
            <p className="theme-text-light mb-4">Visit our store and experience the freshness in person!</p>
          </div>
          
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.8865403854!2d77.49085739765966!3d12.95395822573297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1650456252270!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Fresh Farm Location"
            ></iframe>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="theme-card rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center mb-6">
            <MessageSquare size={24} className="text-green-600 mr-3" />
            <h2 className="text-xl font-semibold theme-text">Frequently Asked Questions</h2>
          </div>
          
          <p className="theme-text-light mb-4">
            Here are answers to some common questions. Visit our <a href="/faq" className="text-green-600 hover:text-green-700">FAQ page</a> for more detailed information.
          </p>
          
          <div className="space-y-4 mt-6">
            <div className="theme-border border rounded-lg p-4">
              <h3 className="font-medium theme-text">What are your delivery hours?</h3>
              <p className="theme-text-light text-sm mt-2">We deliver from 10:00 AM to 8:00 PM, seven days a week.</p>
            </div>
            
            <div className="theme-border border rounded-lg p-4">
              <h3 className="font-medium theme-text">How can I track my order?</h3>
              <p className="theme-text-light text-sm mt-2">You can track your order by logging into your account and visiting the "My Orders" section.</p>
            </div>
            
            <div className="theme-border border rounded-lg p-4">
              <h3 className="font-medium theme-text">What is your return policy?</h3>
              <p className="theme-text-light text-sm mt-2">If you're not satisfied with the quality of a product, you can request a refund or replacement within 24 hours of delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;