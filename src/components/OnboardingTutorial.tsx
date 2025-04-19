import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Layers, Menu, X } from 'lucide-react';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  targetElement: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon: React.ReactNode;
}

const OnboardingTutorial = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialComplete, setTutorialComplete] = useState(false);

  const tutorialSteps: TutorialStep[] = [
    {
      id: 1,
      title: 'Browse Categories',
      description: 'Find products organized by category for easier shopping',
      targetElement: 'header-categories',
      position: 'bottom',
      icon: <Layers size={24} />
    },
    {
      id: 2,
      title: 'Search Products',
      description: 'Quickly find what you need by searching here',
      targetElement: 'header-search',
      position: 'bottom',
      icon: <Search size={24} />
    },
    {
      id: 3,
      title: 'View Your Cart',
      description: 'See items you\'ve added and proceed to checkout',
      targetElement: 'header-cart',
      position: 'bottom',
      icon: <ShoppingCart size={24} />
    }
  ];

  useEffect(() => {
    // Check if onboarding has been completed before
    const hasCompletedOnboarding = localStorage.getItem('onboardingComplete') === 'true';
    
    if (!hasCompletedOnboarding) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTutorial();
    }
  };

  const handleSkip = () => {
    completeTutorial();
  };

  const completeTutorial = () => {
    setTutorialComplete(true);
    setIsVisible(false);
    localStorage.setItem('onboardingComplete', 'true');
  };

  const resetTutorial = () => {
    localStorage.removeItem('onboardingComplete');
    setCurrentStep(0);
    setTutorialComplete(false);
    setIsVisible(true);
  };

  if (!isVisible) {
    // Optional: Add a small button in corner to restart tutorial
    return (
      <button 
        onClick={resetTutorial}
        className="fixed bottom-4 right-4 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 z-50"
        title="Restart Tutorial"
      >
        <Menu size={16} />
      </button>
    );
  }

  const currentTutorialStep = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="absolute inset-0" onClick={handleSkip}></div>
      
      {/* Tutorial overlay */}
      <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4 z-10 animate-fade-in">
        <button 
          onClick={handleSkip}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center mb-4">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            {currentTutorialStep.icon}
          </div>
          <h2 className="text-xl font-semibold">{currentTutorialStep.title}</h2>
        </div>
        
        <p className="text-gray-600 mb-8">{currentTutorialStep.description}</p>
        
        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 mb-6">
          {tutorialSteps.map((_, index) => (
            <div 
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'w-8 bg-green-600' 
                  : 'w-2 bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handleSkip}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          >
            {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
      
      {/* Arrow pointing to target element */}
      <div 
        className="absolute transition-all duration-300 pointer-events-none"
        style={{
          top: `${getTargetPosition(currentTutorialStep.targetElement, currentTutorialStep.position).top}px`,
          left: `${getTargetPosition(currentTutorialStep.targetElement, currentTutorialStep.position).left}px`,
        }}
      >
        <div className="w-8 h-8 bg-green-500 transform rotate-45 animate-pulse"></div>
      </div>
    </div>
  );
};

// Helper function to get position of target element
const getTargetPosition = (elementId: string, position: 'top' | 'bottom' | 'left' | 'right') => {
  const element = document.getElementById(elementId);
  if (!element) {
    return { top: 0, left: 0 };
  }
  
  const rect = element.getBoundingClientRect();
  
  switch (position) {
    case 'top':
      return { top: rect.top - 20, left: rect.left + rect.width / 2 };
    case 'bottom':
      return { top: rect.bottom + 20, left: rect.left + rect.width / 2 };
    case 'left':
      return { top: rect.top + rect.height / 2, left: rect.left - 20 };
    case 'right':
      return { top: rect.top + rect.height / 2, left: rect.right + 20 };
    default:
      return { top: rect.bottom + 20, left: rect.left + rect.width / 2 };
  }
};

export default OnboardingTutorial;
