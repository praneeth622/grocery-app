import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Fresh Organic Produce",
      subtitle: "Farm to table, delivered to your doorstep",
      description: "Enjoy 20% off on your first order with code FRESH20",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Shop Now",
      color: "from-green-500 to-green-700"
    },
    {
      id: 2,
      title: "Summer Fruits Collection",
      subtitle: "Refreshing seasonal favorites",
      description: "Free delivery on orders over ₹50",
      image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Explore",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Weekly Meal Prep Essentials",
      subtitle: "Save time with our curated bundles",
      description: "Get 15% off meal prep bundles this week",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "View Bundles",
      color: "from-blue-400 to-blue-600"
    }
  ];

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning, slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <section className="relative overflow-hidden" aria-label="Featured promotions">
      <div 
        className="relative h-[400px] md:h-[500px] transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        <div className="absolute inset-0 flex">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className="min-w-full h-full flex-shrink-0 relative"
              aria-hidden={currentSlide !== index}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-70`}></div>
              </div>
              
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4 md:px-8 flex flex-col items-start justify-center h-full text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 max-w-md">{slide.title}</h2>
                  <p className="text-xl md:text-2xl mb-2 md:mb-4">{slide.subtitle}</p>
                  <p className="text-lg mb-6 max-w-md">{slide.description}</p>
                  <button 
                    className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-full font-medium text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                    aria-label={slide.cta}
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;