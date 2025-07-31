import React from 'react';

interface LaptopAnimationProps {
  className?: string;
}

const LaptopAnimation: React.FC<LaptopAnimationProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 600 400"
        className="w-full h-full drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Enhanced Gradient Definitions */}
        <defs>
          <linearGradient id="laptopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="50%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="30%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#334155" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="contentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="30%" stopColor="#1d4ed8" />
            <stop offset="70%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
          <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="dropShadow">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.25"/>
          </filter>
        </defs>

        {/* Modern Laptop Design */}
        {/* Laptop Base Shadow */}
        <ellipse
          cx="300"
          cy="340"
          rx="200"
          ry="20"
          fill="#1f2937"
          opacity="0.3"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.4;0.2"
            dur="4s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Laptop Base */}
        <rect
          x="120"
          y="300"
          width="360"
          height="25"
          rx="15"
          fill="url(#laptopGradient)"
          filter="url(#dropShadow)"
        >
          <animate
            attributeName="y"
            values="300;295;300"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Laptop Screen Frame */}
        <rect
          x="150"
          y="80"
          width="300"
          height="200"
          rx="12"
          fill="url(#laptopGradient)"
          filter="url(#dropShadow)"
        >
          <animate
            attributeName="y"
            values="80;75;80"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Screen Bezel */}
        <rect
          x="160"
          y="90"
          width="280"
          height="180"
          rx="8"
          fill="url(#screenGradient)"
        />

        {/* Screen Content Background */}
        <rect
          x="170"
          y="100"
          width="260"
          height="160"
          rx="6"
          fill="url(#contentGradient)"
          filter="url(#softGlow)"
        />

        {/* Header Bar */}
        <rect
          x="170"
          y="100"
          width="260"
          height="30"
          rx="6"
          fill="#1e40af"
          opacity="0.9"
        />

        {/* Window Controls */}
        <circle cx="185" cy="115" r="4" fill="#ef4444" opacity="0.8"/>
        <circle cx="200" cy="115" r="4" fill="#f59e0b" opacity="0.8"/>
        <circle cx="215" cy="115" r="4" fill="#10b981" opacity="0.8"/>

        {/* IPO Allotment Title */}
        <text
          x="300"
          y="120"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="bold"
        >
          IPO Allotment Status
        </text>

        {/* Main Content Card */}
        <rect
          x="190"
          y="145"
          width="220"
          height="100"
          rx="8"
          fill="url(#cardGradient)"
          filter="url(#softGlow)"
          opacity="0.95"
        >
          <animate
            attributeName="opacity"
            values="0.9;1;0.9"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Form Elements */}
        <rect x="200" y="155" width="80" height="15" rx="3" fill="#e5e7eb"/>
        <text x="205" y="165" fill="#6b7280" fontSize="8">PAN Number</text>

        <rect x="290" y="155" width="110" height="15" rx="3" fill="#e5e7eb"/>
        <text x="295" y="165" fill="#6b7280" fontSize="8">Application Number</text>

        {/* Check Button */}
        <rect
          x="240"
          y="180"
          width="120"
          height="25"
          rx="12"
          fill="url(#successGradient)"
          filter="url(#glow)"
        >
          <animate
            attributeName="fill"
            values="url(#successGradient);#22c55e;url(#successGradient)"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>

        <text
          x="300"
          y="195"
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="bold"
        >
          Check Status
        </text>

        {/* Status Indicator */}
        <circle
          cx="300"
          cy="225"
          r="8"
          fill="#10b981"
          filter="url(#glow)"
        >
          <animate
            attributeName="r"
            values="6;10;6"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        <text
          x="320"
          y="230"
          fill="#10b981"
          fontSize="9"
          fontWeight="bold"
        >
          Allotted
        </text>

        {/* Keyboard */}
        <rect
          x="160"
          y="320"
          width="280"
          height="15"
          rx="3"
          fill="#374151"
          opacity="0.8"
        />

        {/* Individual Keys */}
        <g opacity="0.6">
          <rect x="170" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="180" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="190" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="200" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="210" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="220" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="230" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="240" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="250" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="260" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="270" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="280" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="290" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="300" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="310" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="320" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="330" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="340" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="350" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="360" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="370" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="380" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="390" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="400" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="410" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
          <rect x="420" y="325" width="8" height="5" rx="1" fill="#6b7280"/>
        </g>

        {/* Trackpad */}
        <rect
          x="270"
          y="345"
          width="60"
          height="35"
          rx="6"
          fill="#1f2937"
          stroke="#374151"
          strokeWidth="1"
        />

        {/* Floating Elements */}
        <g>
          {/* Success Icon */}
          <circle
            cx="120"
            cy="150"
            r="12"
            fill="#10b981"
            opacity="0.8"
            filter="url(#glow)"
          >
            <animate
              attributeName="cy"
              values="150;140;150"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <text x="120" y="155" textAnchor="middle" fill="white" fontSize="12">✓</text>

          {/* Chart Icon */}
          <circle
            cx="480"
            cy="180"
            r="12"
            fill="#3b82f6"
            opacity="0.8"
            filter="url(#glow)"
          >
            <animate
              attributeName="cy"
              values="180;170;180"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <text x="480" y="185" textAnchor="middle" fill="white" fontSize="12">📊</text>

          {/* Speed Icon */}
          <circle
            cx="100"
            cy="220"
            r="10"
            fill="#f59e0b"
            opacity="0.7"
            filter="url(#glow)"
          >
            <animate
              attributeName="cy"
              values="220;210;220"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <text x="100" y="225" textAnchor="middle" fill="white" fontSize="10">⚡</text>

          {/* Document Icon */}
          <circle
            cx="500"
            cy="120"
            r="10"
            fill="#8b5cf6"
            opacity="0.7"
            filter="url(#glow)"
          >
            <animate
              attributeName="cy"
              values="120;110;120"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>
          <text x="500" y="125" textAnchor="middle" fill="white" fontSize="10">📄</text>
        </g>
      </svg>
    </div>
  );
};

export default LaptopAnimation;
