import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Divider, message, Progress } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  PhoneOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

// Simple animation data for success checkmark
const successAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "Success",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Check",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [50, 50, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0, 0, 100] }, { t: 30, s: [100, 100, 100] }], ix: 6 }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sh",
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-10, 0], [-2, 8], [10, -8]],
                  c: false
                },
                ix: 2
              }
            },
            {
              ty: "st",
              c: { a: 0, k: [0.133, 0.773, 0.369, 1], ix: 3 },
              o: { a: 0, k: 100, ix: 4 },
              w: { a: 0, k: 4, ix: 5 },
              lc: 2,
              lj: 2
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



interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface PasswordStrength {
  score: number;
  feedback: string[];
  color: string;
}

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ score: 0, feedback: [], color: '#ff4d4f' });
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) {
      score += 25;
    } else {
      feedback.push('At least 8 characters');
    }

    if (/[A-Z]/.test(password)) {
      score += 25;
    } else {
      feedback.push('One uppercase letter');
    }

    if (/[a-z]/.test(password)) {
      score += 25;
    } else {
      feedback.push('One lowercase letter');
    }

    if (/[0-9]/.test(password)) {
      score += 25;
    } else {
      feedback.push('One number');
    }

    let color = '#ff4d4f';
    if (score >= 75) color = '#52c41a';
    else if (score >= 50) color = '#faad14';
    else if (score >= 25) color = '#fa8c16';

    return { score, feedback, color };
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const onFinish = async (_values: RegisterFormData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentStep(1);
      setTimeout(() => {
        message.success('Registration successful!');
        navigate('/login');
      }, 2000);
    } catch (error) {
      message.error('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    message.info(`${provider} registration coming soon!`);
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6">
            <Lottie animationData={successAnimation} loop={false} />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Registration Successful!</h1>
          <p className="text-gray-600 mb-6">Welcome to IPO Edge. Redirecting to login...</p>
          <div className="w-64 mx-auto">
            <Progress percent={100} strokeColor="#52c41a" showInfo={false} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900"></div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-pink-600/20 animate-gradientShift"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-violet-500/10 via-transparent to-purple-500/15 animate-gradientShift" style={{ animationDelay: '2s' }}></div>

      {/* Floating Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-violet-400/20 rounded-full blur-3xl animate-floatSlow"></div>
        <div className="absolute top-3/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/25 to-purple-400/30 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-violet-400/20 to-indigo-400/25 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-20 w-2 h-2 bg-purple-400/60 rounded-full animate-twinkle"></div>
        <div className="absolute top-32 left-24 w-1.5 h-1.5 bg-violet-400/70 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-1 h-1 bg-pink-400/80 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-2.5 h-2.5 bg-indigo-400/50 rounded-full animate-twinkle" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 left-16 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-twinkle" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* IPO Themed Animated Elements - Desktop Only */}
      <div className="hidden md:block absolute inset-0 overflow-hidden">
        {/* Animated Person with Laptop - Different Position */}
        <div className="absolute top-20 right-12 animate-floatGentle" style={{ animationDelay: '2s' }}>
          <div className="relative">
            {/* Person silhouette */}
            <div className="w-16 h-20 relative">
              {/* Head */}
              <div className="w-4 h-4 bg-white/20 rounded-full mx-auto mb-1"></div>
              {/* Body */}
              <div className="w-6 h-8 bg-white/15 rounded-lg mx-auto mb-1"></div>
              {/* Laptop */}
              <div className="w-8 h-4 bg-white/25 rounded-sm mx-auto relative">
                <div className="w-6 h-3 bg-purple-400/30 rounded-sm absolute top-0.5 left-1 animate-pulse"></div>
                <div className="w-1 h-1 bg-violet-400 rounded-full absolute top-1 left-2 animate-ping"></div>
              </div>
            </div>
            {/* Analysis indicators */}
            <div className="absolute -top-3 -left-3 flex flex-col space-y-1">
              <div className="w-2 h-0.5 bg-purple-400 rounded animate-pulse"></div>
              <div className="w-3 h-0.5 bg-violet-400 rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-1.5 h-0.5 bg-pink-400 rounded animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>

        {/* IPO Listing Cards */}
        <div className="absolute top-12 left-8 w-56 h-40 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl animate-floatGentle transform -rotate-3" style={{ animationDelay: '0s' }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-white/70 text-xs font-semibold">SENSEX</div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-purple-400 text-xl font-bold">+0.89%</div>
            <div className="text-white/50 text-xs mb-2">₹65,875.45</div>
            <div className="w-full h-1.5 bg-white/20 rounded-full mb-2">
              <div className="w-2/3 h-full bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex justify-between text-xs text-white/40">
              <span>Low: 65,420</span>
              <span>High: 66,120</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 right-20 w-52 h-36 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl animate-floatGentle transform rotate-6" style={{ animationDelay: '3s' }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-white/70 text-xs font-semibold">BANKEX</div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-pink-400 text-xl font-bold">+3.45%</div>
            <div className="text-white/50 text-xs mb-2">₹52,340.20</div>
            <div className="w-full h-1.5 bg-white/20 rounded-full mb-2">
              <div className="w-5/6 h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex justify-between text-xs text-white/40">
              <span>Low: 51,890</span>
              <span>High: 52,450</span>
            </div>
          </div>
        </div>

        {/* IPO Registration Form Preview */}
        <div className="absolute top-1/2 left-12 w-48 h-44 bg-white/8 backdrop-blur-md rounded-2xl border border-white/15 shadow-xl animate-floatGentle transform -rotate-12" style={{ animationDelay: '5s' }}>
          <div className="p-3">
            <div className="text-white/60 text-xs font-semibold mb-3">New IPO Registration</div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-3/4 h-1.5 bg-white/20 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2/3 h-1.5 bg-white/15 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="w-4/5 h-1.5 bg-white/20 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="w-1/2 h-1.5 bg-white/15 rounded"></div>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="text-violet-400 text-xs font-bold">REGISTER</div>
              <div className="w-4 h-4 border border-violet-400 rounded animate-spin"></div>
            </div>
          </div>
        </div>

        {/* Floating Chart Elements */}
        <div className="absolute bottom-1/3 left-1/3 animate-floatGentle" style={{ animationDelay: '4s' }}>
          <svg width="70" height="35" viewBox="0 0 70 35" className="opacity-20">
            <polyline
              fill="none"
              stroke="rgb(168, 85, 247)"
              strokeWidth="2"
              points="0,30 12,25 24,27 36,18 48,21 60,12 70,15"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* IPO Registration Status */}
        <div className="absolute top-2/3 right-1/4 animate-floatGentle" style={{ animationDelay: '6s' }}>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="text-white/60 text-xs">REGISTERING</div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/4 left-1/4 animate-floatGentle" style={{ animationDelay: '8s' }}>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="text-white/60 text-xs">NEW IPO</div>
            </div>
          </div>
        </div>

        {/* Animated Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-shimmerSlow"></div>
        <div className="absolute bottom-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent animate-shimmerSlow" style={{ animationDelay: '3s' }}></div>
      </div>



      {/* Floating Registration Info - Desktop Only */}
      <div className="hidden lg:block absolute top-6 right-6 z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-4 py-2 animate-floatGentle">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
            <span className="text-white/70 text-xs font-medium">Join IPO Edge Community</span>
          </div>
        </div>
      </div>

      {/* Registration Benefits - Desktop Only */}
      <div className="hidden lg:block absolute bottom-6 right-6 z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 animate-floatGentle" style={{ animationDelay: '3s' }}>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-white/70 text-xs">Free IPO Alerts</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-white/70 text-xs">Priority Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span className="text-white/70 text-xs">Expert Recommendations</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-lg transition-all duration-1000 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Main Register Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
            {/* Card Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/40 rounded-3xl"></div>

            <div className="relative z-10">
              {/* Logo and Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl mb-4 shadow-xl animate-float">
                  <span className="text-white text-2xl font-bold">IE</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                  Join IPO Edge
                </h1>
                <p className="text-slate-600">Create your account and start investing</p>
              </div>

              {/* Register Form */}
              <Form
                form={form}
                name="register"
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                  >
                    <Input
                      prefix={<UserOutlined className="text-gray-400" />}
                      placeholder="First name"
                      size="large"
                      className="rounded-xl border-gray-200 hover:border-purple-400 focus:border-purple-500 transition-colors duration-300"
                    />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                  >
                    <Input
                      prefix={<UserOutlined className="text-gray-400" />}
                      placeholder="Last name"
                      size="large"
                      className="rounded-xl border-gray-200 hover:border-purple-400 focus:border-purple-500 transition-colors duration-300"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="Email address"
                    size="large"
                    className="rounded-xl border-gray-200 hover:border-purple-400 focus:border-purple-500 transition-colors duration-300"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: 'Please input your phone number!' },
                    { pattern: /^[0-9+\-\s()]+$/, message: 'Please enter a valid phone number!' }
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    placeholder="Phone number"
                    size="large"
                    className="rounded-xl border-gray-200 hover:border-purple-400 focus:border-purple-500 transition-colors duration-300"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 8, message: 'Password must be at least 8 characters!' }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Password"
                    size="large"
                    onChange={onPasswordChange}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    className="rounded-xl border-gray-200 hover:border-purple-400 focus:border-purple-500 transition-colors duration-300"
                  />
                </Form.Item>

                {/* Password Strength Indicator */}
                {form.getFieldValue('password') && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Password strength</span>
                      <span className="text-sm font-medium" style={{ color: passwordStrength.color }}>
                        {passwordStrength.score >= 75 ? 'Strong' :
                         passwordStrength.score >= 50 ? 'Medium' :
                         passwordStrength.score >= 25 ? 'Weak' : 'Very Weak'}
                      </span>
                    </div>
                    <Progress
                      percent={passwordStrength.score}
                      strokeColor={passwordStrength.color}
                      showInfo={false}
                      size="small"
                    />
                    {passwordStrength.feedback.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {passwordStrength.feedback.map((item, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-500">
                            <CloseCircleOutlined className="mr-1 text-red-400" />
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Confirm password"
                    size="large"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    className="rounded-xl border-gray-200 hover:border-purple-400 focus:border-purple-500 transition-colors duration-300"
                  />
                </Form.Item>

                <Form.Item
                  name="terms"
                  valuePropName="checked"
                  rules={[{ required: true, message: 'Please accept the terms and conditions!' }]}
                >
                  <Checkbox className="text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-purple-600 hover:text-purple-700">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-purple-600 hover:text-purple-700">
                      Privacy Policy
                    </Link>
                  </Checkbox>
                </Form.Item>

                <Form.Item className="mb-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 border-none hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </Form.Item>
              </Form>

              {/* Social Register */}
              <div className="space-y-4">
                <Divider className="text-gray-400 text-sm">Or register with</Divider>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleSocialRegister('Google')}
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
                    onClick={() => handleSocialRegister('Apple')}
                    className="h-12 rounded-xl border-0 bg-black hover:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 text-white font-medium"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Apple
                  </Button>
                </div>
              </div>

              {/* Sign In Link */}
              <div className="text-center mt-8">
                <span className="text-gray-600">Already have an account? </span>
                <Link
                  to="/login"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
                >
                  Sign in
                </Link>
              </div>

              {/* Back to Home Button - All Screens */}
              <div className="mt-8">
                <Link
                  to="/"
                  className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-violet-500 hover:to-purple-500 text-white rounded-2xl py-4 px-6 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group"
                >
                  <svg
                    className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-semibold group-hover:text-violet-100 transition-colors duration-300">Back to Home</span>
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

export default RegisterPage;
