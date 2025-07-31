import React from 'react';
import { Typography, Card, Alert, Row, Col } from 'antd';
import {
  ExclamationCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  DollarCircleOutlined,
  FileProtectOutlined,
  SafetyOutlined,
  BankOutlined,
  TrophyOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const DisclaimerPage: React.FC = () => {
  const lastUpdated = "January 15, 2024";

  const riskFactors = [
    {
      icon: <DollarCircleOutlined className="text-red-500" />,
      title: 'Market Risk',
      description: 'IPO prices can be highly volatile and may result in significant losses'
    },
    {
      icon: <TrophyOutlined className="text-orange-500" />,
      title: 'Company Risk',
      description: 'New companies may not perform as expected after going public'
    },
    {
      icon: <BankOutlined className="text-purple-500" />,
      title: 'Liquidity Risk',
      description: 'Some IPO shares may have limited trading volume after listing'
    },
    {
      icon: <SafetyOutlined className="text-blue-500" />,
      title: 'Regulatory Risk',
      description: 'Changes in regulations may affect IPO performance and availability'
    }
  ];

  const disclaimerSections = [
    {
      title: 'Investment Advisory Disclaimer',
      icon: <WarningOutlined className="text-red-500" />,
      content: [
        'IPO Edge is not a SEBI registered investment advisor or research analyst',
        'We do not provide personalized investment advice or recommendations',
        'All content is for informational and educational purposes only',
        'You should consult qualified financial advisors before making investment decisions'
      ]
    },
    {
      title: 'Information Accuracy',
      icon: <InfoCircleOutlined className="text-blue-500" />,
      content: [
        'While we strive for accuracy, we cannot guarantee the completeness of all information',
        'Data is sourced from public documents and third-party providers',
        'Information may become outdated or incorrect due to market changes',
        'Users should verify information independently before making decisions'
      ]
    },
    {
      title: 'No Liability',
      icon: <FileProtectOutlined className="text-purple-500" />,
      content: [
        'We are not liable for any investment losses or financial damages',
        'Users assume full responsibility for their investment decisions',
        'We disclaim liability for errors, omissions, or technical issues',
        'Third-party content and links are not under our control or responsibility'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ExclamationCircleOutlined className="text-6xl mb-6" />
          <Title level={1} className="!text-white !mb-6 text-4xl md:text-6xl font-bold">
            Important Disclaimer
          </Title>
          <Paragraph className="text-xl md:text-2xl text-red-100 max-w-4xl mx-auto leading-relaxed">
            Please read this disclaimer carefully before using our services. 
            Understanding these risks and limitations is crucial for your investment safety.
          </Paragraph>
          <Text className="text-red-200 text-lg">Last updated: {lastUpdated}</Text>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Critical Warning */}
        <Alert
          message="CRITICAL INVESTMENT WARNING"
          description="IPO investments carry significant risks including total loss of capital. This platform provides information only and does not constitute investment advice. Always consult qualified financial advisors before investing."
          type="error"
          showIcon
          icon={<ExclamationCircleOutlined />}
          className="mb-12 text-lg p-6"
        />

        {/* Main Disclaimer */}
        <Card className="shadow-lg border-0 mb-12">
          <div className="text-center mb-8">
            <Title level={2} className="!mb-6 text-red-700">General Disclaimer</Title>
            <Paragraph className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              IPO Edge is an information platform that provides data, analysis, and educational content 
              related to Initial Public Offerings (IPOs) in the Indian stock market. We are 
              <Text strong className="text-red-600"> NOT a SEBI registered investment advisor, research analyst, or broker</Text>.
            </Paragraph>
          </div>

          <div className="bg-red-50 p-8 rounded-lg border-l-4 border-red-500">
            <Title level={3} className="!mb-6 text-red-800">Key Points to Remember</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text strong className="text-red-700 block mb-2">No Investment Advice</Text>
                <Text className="text-gray-700">
                  We do not provide personalized investment recommendations or advice
                </Text>
              </div>
              <div>
                <Text strong className="text-red-700 block mb-2">Educational Purpose Only</Text>
                <Text className="text-gray-700">
                  All content is for informational and educational purposes only
                </Text>
              </div>
              <div>
                <Text strong className="text-red-700 block mb-2">High Risk Investments</Text>
                <Text className="text-gray-700">
                  IPOs are speculative investments with potential for significant losses
                </Text>
              </div>
              <div>
                <Text strong className="text-red-700 block mb-2">Consult Professionals</Text>
                <Text className="text-gray-700">
                  Always seek advice from qualified financial advisors before investing
                </Text>
              </div>
            </div>
          </div>
        </Card>

        {/* Risk Factors */}
        <div className="mb-12">
          <Title level={2} className="text-center !mb-12 text-gray-800">Investment Risk Factors</Title>
          <Row gutter={[24, 24]}>
            {riskFactors.map((risk, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card className="h-full text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                  <div className="text-4xl mb-4">{risk.icon}</div>
                  <Title level={4} className="!mb-3 text-red-700">{risk.title}</Title>
                  <Paragraph className="text-gray-600">{risk.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Detailed Disclaimers */}
        <div className="mb-12">
          <Title level={2} className="text-center !mb-12 text-gray-800">Detailed Disclaimers</Title>
          <div className="space-y-8">
            {disclaimerSections.map((section, index) => (
              <Card key={index} className="shadow-lg border-0">
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">{section.icon}</div>
                  <Title level={3} className="!mb-0">{section.title}</Title>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <Text className="text-gray-700 leading-relaxed">{item}</Text>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* SEBI Guidelines */}
        <Card className="shadow-lg border-0 mb-12">
          <Title level={3} className="!mb-6 text-blue-700">SEBI Guidelines and Compliance</Title>
          <div className="bg-blue-50 p-6 rounded-lg">
            <Paragraph className="text-gray-700 leading-relaxed mb-4">
              In accordance with SEBI (Securities and Exchange Board of India) guidelines:
            </Paragraph>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>We are not authorized to provide investment advice or recommendations</li>
              <li>We do not facilitate IPO applications or trading activities</li>
              <li>All users must conduct their own due diligence before investing</li>
              <li>We recommend using only SEBI registered intermediaries for investments</li>
              <li>Investors should read all offer documents carefully before applying</li>
            </ul>
          </div>
        </Card>

        {/* Data Sources */}
        <Card className="shadow-lg border-0 mb-12">
          <Title level={3} className="!mb-6 text-purple-700">Data Sources and Accuracy</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Title level={4} className="!mb-4 text-green-600">Our Data Sources</Title>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Company prospectuses and official filings</li>
                <li>Stock exchange announcements</li>
                <li>Regulatory authority publications</li>
                <li>Third-party financial data providers</li>
                <li>Public market information</li>
              </ul>
            </Col>
            <Col xs={24} md={12}>
              <Title level={4} className="!mb-4 text-orange-600">Accuracy Limitations</Title>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Information may become outdated quickly</li>
                <li>Third-party data may contain errors</li>
                <li>Market conditions change rapidly</li>
                <li>Technical issues may affect data accuracy</li>
                <li>Users should verify information independently</li>
              </ul>
            </Col>
          </Row>
        </Card>

        {/* Contact for Clarifications */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 text-white border-0 shadow-xl">
          <div className="text-center py-8">
            <Title level={2} className="!text-white !mb-6">Questions About This Disclaimer?</Title>
            <Paragraph className="text-xl text-gray-300 !mb-8 max-w-2xl mx-auto">
              If you need clarification about any part of this disclaimer or our services, 
              please don't hesitate to contact us.
            </Paragraph>
            <div className="space-x-4">
              <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 mb-4 sm:mb-0">
                Contact Legal Team
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-colors duration-200">
                Read Terms & Conditions
              </button>
            </div>
          </div>
        </Card>

        {/* Final Warning */}
        <div className="mt-12">
          <Alert
            message="FINAL REMINDER"
            description="By using IPO Edge, you acknowledge that you have read, understood, and agree to this disclaimer. You accept full responsibility for your investment decisions and understand the risks involved in IPO investments."
            type="warning"
            showIcon
            className="text-center p-6"
          />
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
