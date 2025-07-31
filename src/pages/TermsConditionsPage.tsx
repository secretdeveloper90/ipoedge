import React from 'react';
import { Typography, Card, Anchor, Divider } from 'antd';
import { 
  FileTextOutlined, 
  SafetyOutlined, 
  ExclamationCircleOutlined,
  UserOutlined,
  LockOutlined,
  BankOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Link } = Anchor;

const TermsConditionsPage: React.FC = () => {
  const lastUpdated = "January 15, 2024";

  const sections = [
    { key: 'acceptance', title: 'Acceptance of Terms' },
    { key: 'description', title: 'Description of Service' },
    { key: 'user-accounts', title: 'User Accounts and Registration' },
    { key: 'user-conduct', title: 'User Conduct and Responsibilities' },
    { key: 'intellectual-property', title: 'Intellectual Property Rights' },
    { key: 'disclaimers', title: 'Disclaimers and Limitations' },
    { key: 'investment-risks', title: 'Investment Risks and Warnings' },
    { key: 'privacy', title: 'Privacy and Data Protection' },
    { key: 'termination', title: 'Termination of Service' },
    { key: 'governing-law', title: 'Governing Law and Jurisdiction' },
    { key: 'modifications', title: 'Modifications to Terms' },
    { key: 'contact', title: 'Contact Information' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileTextOutlined className="text-6xl mb-6" />
          <Title level={1} className="!text-white !mb-6 text-4xl md:text-6xl font-bold">
            Terms & Conditions
          </Title>
          <Paragraph className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before using our services.
            By accessing our platform, you agree to be bound by these terms.
          </Paragraph>
          <Text className="text-blue-200 text-lg">Last updated: {lastUpdated}</Text>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents */}
          <div className="lg:w-1/4">
            <Card className="sticky top-8 shadow-lg border-0">
              <Title level={4} className="!mb-4">Table of Contents</Title>
              <Anchor
                affix={false}
                offsetTop={100}
                className="terms-anchor"
              >
                {sections.map((section) => (
                  <Link key={section.key} href={`#${section.key}`} title={section.title} />
                ))}
              </Anchor>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <Card className="shadow-lg border-0 p-8">
              {/* Introduction */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <FileTextOutlined className="text-3xl text-blue-600 mr-4" />
                  <Title level={2} className="!mb-0">Terms and Conditions of Use</Title>
                </div>
                <Paragraph className="text-lg text-gray-700 leading-relaxed">
                  Welcome to IPO Edge. These Terms and Conditions ("Terms") govern your use of our website, 
                  mobile application, and related services (collectively, the "Service") operated by IPO Edge 
                  ("we," "our," or "us").
                </Paragraph>
              </div>

              <Divider />

              {/* Acceptance of Terms */}
              <div id="acceptance" className="mb-12">
                <div className="flex items-center mb-6">
                  <UserOutlined className="text-3xl text-green-600 mr-4" />
                  <Title level={3} className="!mb-0">Acceptance of Terms</Title>
                </div>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  By accessing and using our Service, you accept and agree to be bound by the terms and 
                  provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>You must be at least 18 years old to use our services</li>
                  <li>You must have the legal capacity to enter into binding agreements</li>
                  <li>Your use of the service constitutes acceptance of these terms</li>
                  <li>These terms apply to all users of the service</li>
                </ul>
              </div>

              <Divider />

              {/* Description of Service */}
              <div id="description" className="mb-12">
                <div className="flex items-center mb-6">
                  <BankOutlined className="text-3xl text-purple-600 mr-4" />
                  <Title level={3} className="!mb-0">Description of Service</Title>
                </div>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  IPO Edge provides information and analysis related to Initial Public Offerings (IPOs) 
                  and other investment opportunities in the Indian stock market. Our services include:
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>Real-time IPO tracking and subscription data</li>
                  <li>Company analysis and financial information</li>
                  <li>Market insights and expert opinions</li>
                  <li>Allotment status checking tools</li>
                  <li>Broker comparison and recommendations</li>
                  <li>Educational content and investment guides</li>
                </ul>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <Text strong className="text-yellow-800">
                    Important: We are an information platform only. We do not provide investment advice 
                    or facilitate actual IPO applications.
                  </Text>
                </div>
              </div>

              <Divider />

              {/* User Accounts */}
              <div id="user-accounts" className="mb-12">
                <div className="flex items-center mb-6">
                  <LockOutlined className="text-3xl text-orange-600 mr-4" />
                  <Title level={3} className="!mb-0">User Accounts and Registration</Title>
                </div>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  To access certain features of our service, you may be required to create an account:
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>You must provide accurate and complete information during registration</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>You may not create multiple accounts or share your account with others</li>
                  <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                </ul>
              </div>

              <Divider />

              {/* User Conduct */}
              <div id="user-conduct" className="mb-12">
                <div className="flex items-center mb-6">
                  <SafetyOutlined className="text-3xl text-red-600 mr-4" />
                  <Title level={3} className="!mb-0">User Conduct and Responsibilities</Title>
                </div>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  You agree to use our service responsibly and in accordance with these terms:
                </Paragraph>
                
                <Title level={4} className="!mb-4 text-green-600">Permitted Uses</Title>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>Access and use information for personal investment research</li>
                  <li>Share content with proper attribution</li>
                  <li>Provide feedback and suggestions for improvement</li>
                  <li>Report technical issues or inaccuracies</li>
                </ul>

                <Title level={4} className="!mb-4 text-red-600">Prohibited Uses</Title>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Distribute malware or engage in harmful activities</li>
                  <li>Scrape or extract data without permission</li>
                  <li>Impersonate others or provide false information</li>
                  <li>Interfere with the proper functioning of the service</li>
                </ul>
              </div>

              <Divider />

              {/* Investment Risks */}
              <div id="investment-risks" className="mb-12">
                <div className="flex items-center mb-6">
                  <ExclamationCircleOutlined className="text-3xl text-red-600 mr-4" />
                  <Title level={3} className="!mb-0">Investment Risks and Warnings</Title>
                </div>
                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 mb-6">
                  <Title level={4} className="!mb-4 text-red-800">Important Investment Disclaimer</Title>
                  <ul className="list-disc list-inside space-y-2 text-red-700">
                    <li>All investments carry risk of loss, including total loss of capital</li>
                    <li>Past performance does not guarantee future results</li>
                    <li>IPO investments are particularly risky and speculative</li>
                    <li>You should consult with qualified financial advisors before investing</li>
                    <li>We are not SEBI registered investment advisors</li>
                    <li>All information is for educational purposes only</li>
                  </ul>
                </div>
              </div>

              <Divider />

              {/* Disclaimers */}
              <div id="disclaimers" className="mb-12">
                <Title level={3} className="!mb-4">Disclaimers and Limitations</Title>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  Our service is provided "as is" without warranties of any kind:
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>We do not guarantee the accuracy or completeness of information</li>
                  <li>We are not liable for any investment losses or damages</li>
                  <li>Service availability may be interrupted or discontinued</li>
                  <li>Third-party content and links are not under our control</li>
                  <li>We disclaim all warranties, express or implied</li>
                </ul>
              </div>

              <Divider />

              {/* Governing Law */}
              <div id="governing-law" className="mb-12">
                <Title level={3} className="!mb-4">Governing Law and Jurisdiction</Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of India. 
                  Any disputes arising under these terms shall be subject to the exclusive jurisdiction 
                  of the courts in Mumbai, Maharashtra.
                </Paragraph>
              </div>

              <Divider />

              {/* Contact Information */}
              <div id="contact" className="mb-8">
                <Title level={3} className="!mb-4">Contact Information</Title>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  If you have questions about these Terms and Conditions, please contact us:
                </Paragraph>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Text strong>Email:</Text> ipoedge@gmail.com<br />
                  <Text strong>Phone:</Text> +91 12345 67890<br />
                  <Text strong>Address:</Text> 123 Business District, Mumbai, Maharashtra 400001<br />
                  <Text strong>Legal Department:</Text> ipoedge@gmail.com
                </div>
              </div>

              {/* Last Updated */}
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <Text strong className="text-blue-800">
                  These Terms and Conditions were last updated on {lastUpdated}. 
                  We reserve the right to modify these terms at any time. Continued use of our service 
                  constitutes acceptance of any changes.
                </Text>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
