import React from 'react';
import { Typography, Card, Row, Col, Timeline, Statistic } from 'antd';
import { 
  TrophyOutlined, 
  TeamOutlined, 
  GlobalOutlined, 
  SafetyOutlined,
  RocketOutlined,
  HeartOutlined,
  EyeOutlined,
  BulbOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const AboutPage: React.FC = () => {
  const stats = [
    { title: 'IPOs Tracked', value: '100+', icon: <RocketOutlined /> },
    { title: 'Active Users', value: '2K+', icon: <TeamOutlined /> },
    { title: 'Months in Market', value: '2+', icon: <TrophyOutlined /> },
    { title: 'Data Accuracy', value: '99%', icon: <SafetyOutlined /> },
  ];

  const values = [
    {
      icon: <EyeOutlined className="text-blue-500" />,
      title: 'Transparency',
      description: 'We believe in providing clear, accurate, and unbiased information about IPO investments.'
    },
    {
      icon: <BulbOutlined className="text-yellow-500" />,
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology and user-centric features.'
    },
    {
      icon: <HeartOutlined className="text-red-500" />,
      title: 'Trust',
      description: 'Building long-term relationships with our users through reliable and trustworthy services.'
    },
    {
      icon: <GlobalOutlined className="text-green-500" />,
      title: 'Accessibility',
      description: 'Making IPO information accessible to everyone, from beginners to experienced investors.'
    }
  ];

  const timeline = [
    {
      color: 'blue',
      children: (
        <div>
          <Text strong>2025 - Foundation</Text>
          <br />
          <Text type="secondary">IPO Edge was founded with a vision to democratize IPO information and empower retail investors</Text>
        </div>
      )
    },
    {
      color: 'green',
      children: (
        <div>
          <Text strong>Q2 2025 - Platform Launch</Text>
          <br />
          <Text type="secondary">Launched our comprehensive IPO tracking platform with real-time data and analytics</Text>
        </div>
      )
    },
    {
      color: 'orange',
      children: (
        <div>
          <Text strong>Q3 2025 - Mobile Experience</Text>
          <br />
          <Text type="secondary">Optimized mobile-responsive design and enhanced user experience across all devices</Text>
        </div>
      )
    },
    {
      color: 'purple',
      children: (
        <div>
          <Text strong>Q4 2025 - AI Integration</Text>
          <br />
          <Text type="secondary">Integrated AI-powered analysis and intelligent IPO recommendations</Text>
        </div>
      )
    },
    {
      color: 'red',
      children: (
        <div>
          <Text strong>2026 - Market Expansion</Text>
          <br />
          <Text type="secondary">Planned expansion to cover SME IPOs, buyback offers, and international markets</Text>
        </div>
      )
    },
    {
      color: 'cyan',
      children: (
        <div>
          <Text strong>2026+ - Advanced Features</Text>
          <br />
          <Text type="secondary">Roadmap includes advanced portfolio management, social trading, and institutional features</Text>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Title level={1} className="!text-white !mb-6 text-4xl md:text-6xl font-bold">
            About IPO Edge
          </Title>
          <Paragraph className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Empowering investors with comprehensive IPO insights, real-time data, and intelligent analysis 
            to make informed investment decisions in the Indian stock market.
          </Paragraph>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <Row gutter={[32, 32]} className="mb-20">
          <Col xs={24} lg={12}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RocketOutlined className="text-3xl text-blue-600" />
                </div>
                <Title level={3} className="!mb-4 text-blue-800">Our Mission</Title>
                <Paragraph className="text-gray-600 text-lg leading-relaxed">
                  To democratize access to IPO information and empower every retail investor with
                  institutional-grade research, real-time data, and intelligent insights for better investment decisions.
                </Paragraph>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <EyeOutlined className="text-3xl text-purple-600" />
                </div>
                <Title level={3} className="!mb-4 text-purple-800">Our Vision</Title>
                <Paragraph className="text-gray-600 text-lg leading-relaxed">
                  To become India's leading next-generation IPO platform, leveraging cutting-edge technology
                  and AI to transform how retail investors discover, analyze, and invest in public offerings.
                </Paragraph>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Statistics */}
        <div className="mb-20">
          <Title level={2} className="text-center !mb-12 text-gray-800">Our Impact</Title>
          <Row gutter={[24, 24]}>
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
                  <div className="text-3xl text-blue-600 mb-4">{stat.icon}</div>
                  <Statistic 
                    title={stat.title} 
                    value={stat.value} 
                    valueStyle={{ color: '#1890ff', fontSize: '2rem', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <Title level={2} className="text-center !mb-12 text-gray-800">Our Values</Title>
          <Row gutter={[24, 24]}>
            {values.map((value, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card className="h-full text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <Title level={4} className="!mb-3">{value.title}</Title>
                  <Paragraph className="text-gray-600">{value.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Company Timeline */}
        <div className="mb-20">
          <Title level={2} className="text-center !mb-12 text-gray-800">Our Journey</Title>
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0 p-6">
              <Timeline mode="left" items={timeline} />
            </Card>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-20">
          <Title level={2} className="text-center !mb-12 text-gray-800">What We Offer</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <Title level={4} className="!mb-4 text-blue-600">Real-time IPO Tracking</Title>
                <Paragraph className="text-gray-600">
                  Stay updated with live IPO subscription data, GMP trends, and market sentiment analysis.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <Title level={4} className="!mb-4 text-green-600">Comprehensive Analysis</Title>
                <Paragraph className="text-gray-600">
                  Detailed company analysis, financial metrics, and expert recommendations for every IPO.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <Title level={4} className="!mb-4 text-purple-600">Investment Tools</Title>
                <Paragraph className="text-gray-600">
                  Advanced tools for portfolio tracking, allotment status, and broker comparison.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <Title level={2} className="!text-white !mb-6">Ready to Start Your IPO Journey?</Title>
          <Paragraph className="text-xl text-blue-100 !mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust IPO Edge for their investment decisions. 
            Start exploring IPO opportunities today!
          </Paragraph>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Explore IPOs
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
