import React from 'react';
import { Typography, Card, Row, Col, Steps, Timeline, Button } from 'antd';
import {
  BookOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  MailOutlined,
  MessageOutlined,
  UserOutlined,
  FileTextOutlined,
  SafetyOutlined,
  TrophyOutlined,
  DollarOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

const HelpCenterPage: React.FC = () => {
  const helpCategories = [
    {
      title: 'Getting Started',
      icon: <UserOutlined className="text-blue-500" />,
      description: 'Learn the basics of IPO investing and how to use our platform',
      articles: [
        'How to create an account',
        'Understanding IPO basics',
        'Setting up notifications',
        'Navigating the dashboard'
      ]
    },
    {
      title: 'IPO Research',
      icon: <BookOutlined className="text-green-500" />,
      description: 'Master the art of IPO analysis and research',
      articles: [
        'Reading IPO prospectus',
        'Financial analysis guide',
        'Understanding GMP',
        'Risk assessment'
      ]
    },
    {
      title: 'Application Process',
      icon: <FileTextOutlined className="text-purple-500" />,
      description: 'Step-by-step guide to applying for IPOs',
      articles: [
        'How to apply for IPOs',
        'Required documents',
        'Payment methods',
        'Application categories'
      ]
    },
    {
      title: 'Allotment & Listing',
      icon: <TrophyOutlined className="text-orange-500" />,
      description: 'Everything about allotment process and listing',
      articles: [
        'Allotment process explained',
        'Checking allotment status',
        'Listing day trading',
        'Refund process'
      ]
    }
  ];

  const supportChannels = [
    {
      title: 'Live Chat',
      icon: <MessageOutlined className="text-blue-500" />,
      description: 'Get instant help from our support team',
      availability: '24/7 Available',
      action: 'Start Chat'
    },
    {
      title: 'Email Support',
      icon: <MailOutlined className="text-green-500" />,
      description: 'Send us detailed queries via email',
      availability: 'Response within 24 hours',
      action: 'Send Email'
    },
    {
      title: 'Phone Support',
      icon: <PhoneOutlined className="text-purple-500" />,
      description: 'Speak directly with our experts',
      availability: 'Mon-Fri, 9 AM - 6 PM',
      action: 'Call Now'
    },
    {
      title: 'Video Tutorials',
      icon: <VideoCameraOutlined className="text-orange-500" />,
      description: 'Watch step-by-step video guides',
      availability: 'Available anytime',
      action: 'Watch Videos'
    }
  ];

  const ipoSteps = [
    {
      title: 'Research',
      description: 'Analyze the company and IPO details'
    },
    {
      title: 'Apply',
      description: 'Submit your application through broker'
    },
    {
      title: 'Wait',
      description: 'Wait for allotment results'
    },
    {
      title: 'Check Status',
      description: 'Verify your allotment status'
    },
    {
      title: 'Trading',
      description: 'Trade shares after listing'
    }
  ];

  const quickTips = [
    {
      icon: <SafetyOutlined className="text-red-500" />,
      title: 'Risk Management',
      tip: 'Never invest more than you can afford to lose in IPOs'
    },
    {
      icon: <DollarOutlined className="text-green-500" />,
      title: 'Diversification',
      tip: 'Don\'t put all your money in a single IPO'
    },
    {
      icon: <ClockCircleOutlined className="text-blue-500" />,
      title: 'Timing',
      tip: 'Apply early to avoid last-minute technical issues'
    },
    {
      icon: <BookOutlined className="text-purple-500" />,
      title: 'Research',
      tip: 'Always read the company prospectus before investing'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Title level={1} className="!text-white !mb-6 text-4xl md:text-6xl font-bold">
            Help Center
          </Title>
          <Paragraph className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Your comprehensive guide to IPO investing and using our platform effectively.
            Find tutorials, guides, and get support when you need it.
          </Paragraph>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Support */}
        <div className="mb-20">
          <Title level={2} className="text-center !mb-12 text-gray-800">Get Help Now</Title>
          <Row gutter={[24, 24]}>
            {supportChannels.map((channel, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card className="h-full text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
                  <div className="text-4xl mb-4">{channel.icon}</div>
                  <Title level={4} className="!mb-3">{channel.title}</Title>
                  <Paragraph className="text-gray-600 !mb-4">{channel.description}</Paragraph>
                  <Text className="text-sm text-gray-500 block mb-4">{channel.availability}</Text>
                  <Button type="primary" className="w-full">
                    {channel.action}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Help Categories */}
        <div className="mb-20">
          <Title level={2} className="text-center !mb-12 text-gray-800">Browse Help Topics</Title>
          <Row gutter={[24, 24]}>
            {helpCategories.map((category, index) => (
              <Col xs={24} md={12} lg={6} key={index}>
                <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <Title level={4} className="!mb-3">{category.title}</Title>
                    <Paragraph className="text-gray-600 !mb-6">{category.description}</Paragraph>
                  </div>
                  <div className="space-y-3">
                    {category.articles.map((article, articleIndex) => (
                      <div key={articleIndex} className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-200">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        <Text className="text-sm">{article}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* IPO Process Guide */}
        <div className="mb-20">
          <Title level={2} className="text-center !mb-12 text-gray-800">IPO Investment Process</Title>
          <Card className="shadow-lg border-0 p-8">
            <Steps current={-1} className="mb-8">
              {ipoSteps.map((step, index) => (
                <Step 
                  key={index}
                  title={step.title} 
                  description={step.description}
                />
              ))}
            </Steps>
            <div className="text-center mt-8">
              <Button type="primary" size="large">
                Learn More About IPO Process
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Tips */}
        <div className="mb-20">
          <Title level={2} className="text-center !mb-12 text-gray-800">Quick Tips for Success</Title>
          <Row gutter={[24, 24]}>
            {quickTips.map((tip, index) => (
              <Col xs={24} md={12} key={index}>
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl mt-1">{tip.icon}</div>
                    <div>
                      <Title level={4} className="!mb-2">{tip.title}</Title>
                      <Paragraph className="text-gray-600 !mb-0">{tip.tip}</Paragraph>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Recent Updates */}
        <div className="mb-20">
          <Title level={2} className="text-center !mb-12 text-gray-800">Recent Updates & Announcements</Title>
          <Card className="shadow-lg border-0">
            <Timeline>
              <Timeline.Item color="blue">
                <div>
                  <Text strong>New Feature: Advanced IPO Analytics</Text>
                  <br />
                  <Text type="secondary">Added comprehensive financial ratio analysis for better IPO evaluation</Text>
                  <br />
                  <Text type="secondary" className="text-xs">2 days ago</Text>
                </div>
              </Timeline.Item>
              <Timeline.Item color="green">
                <div>
                  <Text strong>Platform Update: Mobile App Enhancement</Text>
                  <br />
                  <Text type="secondary">Improved user interface and faster loading times</Text>
                  <br />
                  <Text type="secondary" className="text-xs">1 week ago</Text>
                </div>
              </Timeline.Item>
              <Timeline.Item color="orange">
                <div>
                  <Text strong>New Guide: SME IPO Investment Strategy</Text>
                  <br />
                  <Text type="secondary">Comprehensive guide for investing in SME IPOs</Text>
                  <br />
                  <Text type="secondary" className="text-xs">2 weeks ago</Text>
                </div>
              </Timeline.Item>
              <Timeline.Item color="purple">
                <div>
                  <Text strong>Feature Launch: Real-time GMP Tracking</Text>
                  <br />
                  <Text type="secondary">Live grey market premium updates for all active IPOs</Text>
                  <br />
                  <Text type="secondary" className="text-xs">3 weeks ago</Text>
                </div>
              </Timeline.Item>
            </Timeline>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
          <div className="text-center py-8">
            <Title level={2} className="!text-white !mb-6">Need Personal Assistance?</Title>
            <Paragraph className="text-xl text-blue-100 !mb-8 max-w-2xl mx-auto">
              Our expert team is ready to help you with personalized guidance and support.
            </Paragraph>
            <div className="space-x-4">
              <Button size="large" className="bg-white text-blue-600 border-0 hover:bg-gray-100">
                Schedule a Call
              </Button>
              <Button size="large" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600">
                Send Message
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenterPage;
