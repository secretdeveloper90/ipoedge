import React, { useState } from 'react';
import { Skeleton } from 'antd';
import { PictureOutlined } from '@ant-design/icons';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setImageLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setImageLoading(false);
    setImageError(true);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      // If no fallbackSrc or fallback also failed, show error state
      setImageError(true);
    }
    onError?.();
  };

  // If image failed and no fallback, show animated icon
  if (imageError && (!fallbackSrc || currentSrc === fallbackSrc)) {
    return (
      <div className={`relative ${className} flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300`}>
        <div className="text-center p-2">
          <PictureOutlined
            className="text-2xl text-gray-400 animate-pulse mb-1"
            style={{ fontSize: 'clamp(16px, 4vw, 32px)' }}
          />
          <div className="text-xs text-gray-500 animate-pulse delay-300">
            Image
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {imageLoading && (
        <Skeleton.Image
          active
          className="absolute inset-0 w-full h-full"
        />
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </div>
  );
};

export default ResponsiveImage;
