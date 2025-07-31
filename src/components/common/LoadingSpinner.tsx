import React from 'react';
import Lottie from 'lottie-react';

// Simple loading animation data
const loadingAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "Loading",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle1",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] }, { t: 60, s: [360] }], ix: 10 },
        p: { a: 0, k: [50, 50, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [60, 60], ix: 2 },
              p: { a: 0, k: [0, 0], ix: 3 }
            },
            {
              ty: "st",
              c: { a: 0, k: [0.058, 0.647, 0.914, 1], ix: 3 },
              o: { a: 0, k: 100, ix: 4 },
              w: { a: 0, k: 4, ix: 5 },
              lc: 2,
              d: [{ n: "d", nm: "dash", v: { a: 0, k: 20, ix: 1 } }, { n: "g", nm: "gap", v: { a: 0, k: 10, ix: 2 } }]
            }
          ]
        }
      ],
      ip: 0,
      op: 60,
      st: 0
    }
  ]
};

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = '#0ea5e9',
  text 
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={`${sizeClasses[size]} relative`}>
        <Lottie 
          animationData={loadingAnimation} 
          loop={true}
          style={{ filter: `hue-rotate(${color === '#0ea5e9' ? '0deg' : '180deg'})` }}
        />
      </div>
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
