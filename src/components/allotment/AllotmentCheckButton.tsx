import React from 'react';
import { Button, Card } from 'antd';
import { LinkOutlined, BankOutlined } from '@ant-design/icons';

interface AllotmentLink {
  name: string;
  url: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const allotmentLinks: AllotmentLink[] = [
  {
    name: 'Allotment Check',
    url: 'https://www.bseindia.com/investors/appli_check.aspx',
    description: 'Check your IPO allotment status on Bombay Stock Exchange',
    icon: <BankOutlined />,
    color: 'text-red-600',
    bgColor: 'bg-red-50 hover:bg-red-100'
  }
];

const AllotmentCheckButtons: React.FC = () => {
  const handleCheckAllotment = (url: string, name: string) => {
    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Optional: Track analytics
    console.log(`User clicked ${name} allotment check`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
          <span className="text-blue-600 text-sm font-medium">🎯 Official BSE Portal</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Check Your IPO Allotment Status
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Get instant access to your IPO allotment results through the official BSE website.
          Secure, fast, and reliable verification in just a few clicks.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Main Check Button */}
        <div className="md:col-span-2 flex justify-center">
          <Card
            className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group max-w-2xl w-full overflow-hidden relative"
            onClick={() => handleCheckAllotment(allotmentLinks[0].url, allotmentLinks[0].name)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
            <div className="relative text-center p-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">
                  <BankOutlined />
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                BSE Allotment Check
              </h3>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Official Bombay Stock Exchange portal for instant IPO allotment verification
              </p>

              <Button
                type="primary"
                size="large"
                icon={<LinkOutlined />}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 border-0 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold h-12 px-8 w-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckAllotment(allotmentLinks[0].url, allotmentLinks[0].name);
                }}
              >
                Check Allotment Status
              </Button>
            </div>
          </Card>
        </div>

      </div>

      {/* Features Grid - Centered */}
      <div className="flex justify-center mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-green-600 text-2xl">⚡</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2 text-lg">Instant Results</h4>
            <p className="text-gray-600">Get your allotment status in real-time from BSE</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-blue-600 text-2xl">🔒</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2 text-lg">100% Secure</h4>
            <p className="text-gray-600">Direct connection to official BSE portal</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-purple-600 text-2xl">📱</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2 text-lg">Mobile Friendly</h4>
            <p className="text-gray-600">Works perfectly on all devices</p>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
          How to Check Your Allotment
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Click Check Button</h4>
            <p className="text-gray-600 text-sm">Click the "Check Allotment Status" button above</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Enter Details</h4>
            <p className="text-gray-600 text-sm">Provide your PAN number and application number</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Get Results</h4>
            <p className="text-gray-600 text-sm">View your allotment status instantly</p>
          </div>
        </div>
      </div>

      {/* Information Note */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600 text-xl">💡</span>
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-semibold text-amber-800 mb-2">
              Important Information
            </h4>
            <div className="space-y-2 text-amber-700">
              <p className="flex items-center">
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                Allotment results are typically published 3-7 days after the IPO closes
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                You'll need your PAN number and application number
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                Keep your application receipt handy for quick reference
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllotmentCheckButtons;
