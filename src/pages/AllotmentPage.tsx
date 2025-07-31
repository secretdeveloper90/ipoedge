import React, { useEffect } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { ArrowDownOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { LaptopAnimation, IPOProcessTimeline, AllotmentCheckButtons } from '../components/allotment';
import '../styles/allotment.css';

const AllotmentPage: React.FC = () => {
  useEffect(() => {
    // Smooth scroll behavior for the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div className="text-center lg:text-left space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
                    <span className="text-blue-300 text-sm font-medium">🚀 Instant IPO Status Check</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                      IPO Allotment
                    </span>
                    <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                      Made Simple
                    </span>
                  </h1>
                </div>
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                  Track your IPO journey with our lightning-fast status checker.
                  Get instant results from BSE with just your PAN and application number.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    type="primary"
                    size="large"
                    icon={<CheckCircleOutlined />}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 border-0 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold h-14 px-8 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    onClick={() => scrollToSection('allotment-check')}
                  >
                    Check Allotment Now
                  </Button>
                  <Button
                    size="large"
                    icon={<ArrowDownOutlined />}
                    className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-slate-900 font-semibold h-14 px-8 text-lg backdrop-blur-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={() => scrollToSection('ipo-process')}
                  >
                    Learn Process
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">10K+</div>
                    <div className="text-sm text-slate-400">Checks Daily</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">99.9%</div>
                    <div className="text-sm text-slate-400">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">&lt;2s</div>
                    <div className="text-sm text-slate-400">Response Time</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="flex justify-center">
                <LaptopAnimation className="w-full max-w-lg" />
              </div>
            </Col>
          </Row>
        </div>

        {/* Enhanced Floating Animation Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 shadow-2xl backdrop-blur-sm border border-cyan-300/30"></div>
        </div>
        <div className="absolute top-40 right-20 animate-floatSlow">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-50 shadow-2xl backdrop-blur-sm border border-purple-300/30 animate-breathe"></div>
        </div>
        <div className="absolute bottom-32 left-1/4 animate-wiggle" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-70 shadow-xl backdrop-blur-sm border border-emerald-300/30"></div>
        </div>
        <div className="absolute top-1/3 left-8 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-65 shadow-lg backdrop-blur-sm border border-yellow-300/30"></div>
        </div>
        <div className="absolute bottom-1/3 right-12 animate-breathe" style={{ animationDelay: '1.5s' }}>
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-blue-600 rounded-full opacity-55 shadow-2xl backdrop-blur-sm border border-indigo-300/30"></div>
        </div>
        <div className="absolute top-2/3 right-1/4 animate-floatSlow" style={{ animationDelay: '3s' }}>
          <div className="w-4 h-4 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full opacity-75 shadow-md backdrop-blur-sm border border-rose-300/30"></div>
        </div>

        {/* Additional Modern Elements */}
        <div className="absolute top-1/2 left-16 animate-float" style={{ animationDelay: '4s' }}>
          <div className="w-3 h-3 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full opacity-80 shadow-lg backdrop-blur-sm"></div>
        </div>
        <div className="absolute bottom-1/4 right-8 animate-breathe" style={{ animationDelay: '2.5s' }}>
          <div className="w-7 h-7 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full opacity-60 shadow-xl backdrop-blur-sm border border-sky-300/30"></div>
        </div>
      </section>

      {/* IPO Process Section */}
      <section id="ipo-process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🎯 Complete IPO Process Explained
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Understanding the IPO journey from application to listing helps you track your investment
              and know exactly when to check your allotment status.
            </p>
          </div>

          <IPOProcessTimeline />
        </div>
      </section>

      {/* Allotment Check Section */}
      <section id="allotment-check" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AllotmentCheckButtons />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              💻 Why Use Our Allotment Checker?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the most reliable and fastest way to check your IPO allotment status
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
              <Card className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Instant Results</h3>
                <p className="text-gray-600">
                  Direct link to official BSE website for real-time allotment status
                </p>
              </Card>

              <Card className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">100% Secure</h3>
                <p className="text-gray-600">
                  We redirect you to the official BSE website - your data stays safe and secure
                </p>
              </Card>

              <Card className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-violet-50">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Mobile Friendly</h3>
                <p className="text-gray-600">
                  Responsive design works perfectly on all devices - check anywhere, anytime
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Check Your IPO Allotment?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't wait! Check your allotment status now and stay updated with your IPO investment journey.
          </p>
          <Button
            type="primary"
            size="large"
            icon={<CheckCircleOutlined />}
            className="bg-yellow-500 border-yellow-500 hover:bg-yellow-400 text-black font-semibold h-14 px-12 text-lg"
            onClick={() => scrollToSection('allotment-check')}
          >
            Check My Allotment Status
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AllotmentPage;
