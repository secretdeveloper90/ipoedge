import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onFinish = async (_values: LoginFormData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      message.success('Login successful!');
      navigate('/');
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    message.info(`${provider} login coming soon!`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"></div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20 animate-gradientShift"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/10 via-transparent to-indigo-500/15 animate-gradientShift" style={{ animationDelay: '2s' }}></div>

      {/* Floating Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-cyan-400/20 rounded-full blur-3xl animate-floatSlow"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/25 to-indigo-400/30 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/25 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/60 rounded-full animate-twinkle"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-cyan-400/70 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-purple-400/80 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-indigo-400/50 rounded-full animate-twinkle" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 right-20 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-twinkle" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* IPO Themed Animated Elements - Desktop Only */}
      <div className="hidden md:block absolute inset-0 overflow-hidden">
        {/* Animated Person with Laptop */}
        <div className="absolute bottom-20 left-8 animate-floatGentle" style={{ animationDelay: '1s' }}>
          <div className="relative">
            {/* Person silhouette */}
            <div className="w-16 h-20 relative">
              {/* Head */}
              <div className="w-4 h-4 bg-white/20 rounded-full mx-auto mb-1"></div>
              {/* Body */}
              <div className="w-6 h-8 bg-white/15 rounded-lg mx-auto mb-1"></div>
              {/* Laptop */}
              <div className="w-8 h-4 bg-white/25 rounded-sm mx-auto relative">
                <div className="w-6 h-3 bg-blue-400/30 rounded-sm absolute top-0.5 left-1 animate-pulse"></div>
                <div className="w-1 h-1 bg-green-400 rounded-full absolute top-1 left-2 animate-ping"></div>
              </div>
            </div>
            {/* Typing indicator */}
            <div className="absolute -top-2 -right-2 flex space-x-0.5">
              <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>

        {/* IPO Application UI Cards */}
        <div className="absolute top-16 left-12 w-52 h-36 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl animate-floatGentle transform rotate-3" style={{ animationDelay: '0s' }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-white/70 text-xs font-semibold">NIFTY 50</div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-green-400 text-xl font-bold">+1.24%</div>
            <div className="text-white/50 text-xs mb-2">₹19,850.25</div>
            <div className="w-full h-1.5 bg-white/20 rounded-full">
              <div className="w-3/4 h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex justify-between text-xs text-white/40 mt-1">
              <span>Low: 19,720</span>
              <span>High: 19,890</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-24 right-16 w-48 h-32 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl animate-floatGentle transform -rotate-6" style={{ animationDelay: '2s' }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-white/70 text-xs font-semibold">BANKNIFTY</div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-purple-400 text-xl font-bold">+2.87%</div>
            <div className="text-white/50 text-xs mb-2">₹44,125.80</div>
            <div className="w-full h-1.5 bg-white/20 rounded-full">
              <div className="w-4/5 h-full bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex justify-between text-xs text-white/40 mt-1">
              <span>Low: 43,890</span>
              <span>High: 44,250</span>
            </div>
          </div>
        </div>

        {/* IPO Application Form Preview */}
        <div className="absolute top-1/2 right-8 w-44 h-40 bg-white/8 backdrop-blur-md rounded-2xl border border-white/15 shadow-xl animate-floatGentle transform rotate-12" style={{ animationDelay: '4s' }}>
          <div className="p-3">
            <div className="text-white/60 text-xs font-semibold mb-2">IPO Application</div>
            <div className="space-y-2">
              <div className="w-full h-2 bg-white/20 rounded animate-pulse"></div>
              <div className="w-3/4 h-2 bg-white/15 rounded animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-full h-2 bg-white/20 rounded animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="w-2/3 h-2 bg-white/15 rounded animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="text-green-400 text-xs font-bold">APPLY NOW</div>
              <div className="w-4 h-4 border border-green-400 rounded animate-spin"></div>
            </div>
          </div>
        </div>

        {/* Floating Chart Elements */}
        <div className="absolute top-1/4 left-1/3 animate-floatGentle" style={{ animationDelay: '3s' }}>
          <svg width="60" height="30" viewBox="0 0 60 30" className="opacity-20">
            <polyline
              fill="none"
              stroke="rgb(34, 197, 94)"
              strokeWidth="2"
              points="0,25 10,20 20,22 30,15 40,18 50,10 60,12"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* IPO Status Indicators */}
        <div className="absolute top-1/3 right-1/4 animate-floatGentle" style={{ animationDelay: '6s' }}>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="text-white/60 text-xs">IPO LIVE</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-1/4 left-1/3 animate-floatGentle" style={{ animationDelay: '7s' }}>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="text-white/60 text-xs">UPCOMING</div>
            </div>
          </div>
        </div>

        {/* Animated Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-shimmerSlow"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-shimmerSlow" style={{ animationDelay: '3s' }}></div>
      </div>



      {/* Floating Navigation Hint - Desktop Only */}
      <div className="hidden lg:block absolute top-6 right-6 z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-4 py-2 animate-floatGentle">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-white/70 text-xs font-medium">Welcome to IPO Edge</span>
          </div>
        </div>
      </div>

      {/* Floating Quick Stats - Desktop Only */}
      <div className="hidden lg:block absolute bottom-6 left-6 z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 animate-floatGentle" style={{ animationDelay: '2s' }}>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg">150+</div>
              <div className="text-white/60 text-xs">Active IPOs</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg">₹2.5L Cr</div>
              <div className="text-white/60 text-xs">Market Cap</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-purple-400 font-bold text-lg">98%</div>
              <div className="text-white/60 text-xs">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Feature Highlights - Desktop Only */}
      <div className="hidden lg:block absolute bottom-6 right-6 z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 animate-floatGentle" style={{ animationDelay: '4s' }}>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/70 text-xs">Real-time IPO Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-white/70 text-xs">Expert Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span className="text-white/70 text-xs">Instant Applications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner Elements - Desktop Only */}
      <div className="hidden lg:block absolute top-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-lg animate-pulse"></div>
        <div className="absolute top-8 left-8 w-4 h-4 border-l border-t border-blue-400/40 rounded-tl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="hidden lg:block absolute top-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-400/30 rounded-tr-lg animate-pulse"></div>
        <div className="absolute top-8 right-8 w-4 h-4 border-r border-t border-violet-400/40 rounded-tr animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="hidden lg:block absolute bottom-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-green-400/30 rounded-bl-lg animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-4 h-4 border-l border-b border-cyan-400/40 rounded-bl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="hidden lg:block absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-indigo-400/30 rounded-br-lg animate-pulse"></div>
        <div className="absolute bottom-8 right-8 w-4 h-4 border-r border-b border-purple-400/40 rounded-br animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-md transition-all duration-1000 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Main Login Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
            {/* Card Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/40 rounded-3xl"></div>

            <div className="relative z-10">
              {/* Logo and Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-xl animate-float">
                  <span className="text-white text-2xl font-bold">IE</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h1>
                <p className="text-slate-600">Sign in to your IPO Edge account</p>
              </div>

              {/* Login Form */}
              <Form
                form={form}
                name="login"
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
                className="space-y-4"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Email address"
                    size="large"
                    className="rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-colors duration-300"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Password"
                    size="large"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    className="rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-colors duration-300"
                  />
                </Form.Item>

                <div className="flex items-center justify-between">
                  <Form.Item name="remember" valuePropName="checked" className="mb-0">
                    <Checkbox className="text-gray-600">Remember me</Checkbox>
                  </Form.Item>
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-300 text-sm font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Form.Item className="mb-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 border-none hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </Form.Item>
              </Form>

              {/* Social Login */}
              <div className="space-y-4">
                <Divider className="text-gray-400 text-sm">Or continue with</Divider>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleSocialLogin('Google')}
                    className="h-12 rounded-xl border-0 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 text-gray-700 font-medium"
                    style={{
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button
                    onClick={() => handleSocialLogin('Apple')}
                    className="h-12 rounded-xl border-0 bg-black hover:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 text-white font-medium"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Apple
                  </Button>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-8">
                <span className="text-gray-600">Don't have an account? </span>
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                >
                  Sign up
                </Link>
              </div>

              {/* Back to Home Button - All Screens */}
              <div className="mt-8">
                <Link
                  to="/"
                  className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white rounded-2xl py-4 px-6 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group"
                >
                  <svg
                    className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-semibold group-hover:text-cyan-100 transition-colors duration-300">Back to Home</span>
                  <div className="w-2 h-2 bg-white/60 rounded-full group-hover:bg-white/80 transition-colors duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
