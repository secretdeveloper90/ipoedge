import React, { useState, useEffect } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={scrollToTop}
          className="w-10 h-10 bg-white/95 backdrop-blur-sm !border !border-gray-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 hover:bg-blue-50 text-gray-700 hover:text-blue-600 flex items-center justify-center"
          type="button"
          aria-label="Scroll to Top"
        >
          <ArrowUpOutlined className="text-lg font-bold" />
        </button>
    </div>
  );
};

export default BackToTop;
