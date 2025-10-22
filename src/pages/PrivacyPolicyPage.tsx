import React from "react";
import { Typography, Card, Anchor, Divider } from "antd";
import {
  SafetyCertificateOutlined,
  LockOutlined,
  EyeOutlined,
  UserOutlined,
  SafetyOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Link } = Anchor;

const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = "October 1, 2025";

  const sections = [
    { key: "information-collection", title: "Information We Collect" },
    { key: "information-use", title: "How We Use Your Information" },
    { key: "information-sharing", title: "Information Sharing and Disclosure" },
    { key: "data-security", title: "Data Security" },
    { key: "cookies", title: "Cookies and Tracking Technologies" },
    { key: "user-rights", title: "Your Rights and Choices" },
    { key: "data-retention", title: "Data Retention" },
    { key: "children-privacy", title: "Children's Privacy" },
    { key: "international-transfers", title: "International Data Transfers" },
    { key: "policy-changes", title: "Changes to This Policy" },
    { key: "contact-us", title: "Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SafetyCertificateOutlined className="text-6xl mb-6" />
          <Title
            level={1}
            className="!text-white !mb-6 text-4xl md:text-6xl font-bold"
          >
            Privacy Policy
          </Title>
          <Paragraph className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your personal information.
          </Paragraph>
          <Text className="text-blue-200 text-lg">
            Last updated: {lastUpdated}
          </Text>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents */}
          <div className="lg:w-1/4">
            <Card className="sticky top-8 shadow-lg border-0">
              <Title level={4} className="!mb-4">
                Table of Contents
              </Title>
              <Anchor affix={false} offsetTop={100} className="privacy-anchor">
                {sections.map((section) => (
                  <Link
                    key={section.key}
                    href={`#${section.key}`}
                    title={section.title}
                  />
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
                  <LockOutlined className="text-3xl text-blue-600 mr-4" />
                  <Title level={2} className="!mb-0">
                    Introduction
                  </Title>
                </div>
                <Paragraph className="text-lg text-gray-700 leading-relaxed">
                  IPO Edge ("we," "our," or "us") is committed to protecting
                  your privacy and ensuring the security of your personal
                  information. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our
                  website and use our services.
                </Paragraph>
                <Paragraph className="text-gray-700 leading-relaxed">
                  By using our services, you agree to the collection and use of
                  information in accordance with this policy. If you do not
                  agree with our policies and practices, please do not use our
                  services.
                </Paragraph>
              </div>

              <Divider />

              {/* Information We Collect */}
              <div id="information-collection" className="mb-12">
                <div className="flex items-center mb-6">
                  <UserOutlined className="text-3xl text-green-600 mr-4" />
                  <Title level={3} className="!mb-0">
                    Information We Collect
                  </Title>
                </div>

                <Title level={4} className="!mb-4 text-blue-600">
                  Personal Information
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  We may collect the following types of personal information:
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>Name, email address, and contact information</li>
                  <li>Account credentials and authentication information</li>
                  <li>Financial information related to IPO applications</li>
                  <li>Investment preferences and portfolio information</li>
                  <li>Communication history and support interactions</li>
                </ul>

                <Title level={4} className="!mb-4 text-blue-600">
                  Automatically Collected Information
                </Title>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>IP address, browser type, and device information</li>
                  <li>Usage data, including pages visited and time spent</li>
                  <li>Location data (with your consent)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <Divider />

              {/* How We Use Your Information */}
              <div id="information-use" className="mb-12">
                <div className="flex items-center mb-6">
                  <EyeOutlined className="text-3xl text-purple-600 mr-4" />
                  <Title level={3} className="!mb-0">
                    How We Use Your Information
                  </Title>
                </div>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  We use your information for the following purposes:
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>Provide and maintain our services</li>
                  <li>Process IPO applications and transactions</li>
                  <li>
                    Send notifications about IPO updates and market insights
                  </li>
                  <li>Improve our platform and user experience</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Comply with legal obligations and prevent fraud</li>
                  <li>Send marketing communications (with your consent)</li>
                </ul>
              </div>

              <Divider />

              {/* Information Sharing */}
              <div id="information-sharing" className="mb-12">
                <div className="flex items-center mb-6">
                  <SafetyOutlined className="text-3xl text-orange-600 mr-4" />
                  <Title level={3} className="!mb-0">
                    Information Sharing and Disclosure
                  </Title>
                </div>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information in the following
                  circumstances:
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With service providers who assist in our operations</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>With regulatory authorities as required by law</li>
                </ul>
              </div>

              <Divider />

              {/* Data Security */}
              <div id="data-security" className="mb-12">
                <div className="flex items-center mb-6">
                  <FileProtectOutlined className="text-3xl text-red-600 mr-4" />
                  <Title level={3} className="!mb-0">
                    Data Security
                  </Title>
                </div>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures
                  to protect your personal information:
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and data centers</li>
                  <li>Regular security audits and assessments</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
              </div>

              <Divider />

              {/* Cookies */}
              <div id="cookies" className="mb-12">
                <Title level={3} className="!mb-4">
                  Cookies and Tracking Technologies
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your
                  experience:
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>Marketing cookies for personalized content</li>
                </ul>
                <Paragraph className="text-gray-700 leading-relaxed">
                  You can control cookie settings through your browser
                  preferences.
                </Paragraph>
              </div>

              <Divider />

              {/* User Rights */}
              <div id="user-rights" className="mb-12">
                <Title level={3} className="!mb-4">
                  Your Rights and Choices
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  You have the following rights regarding your personal
                  information:
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your personal information</li>
                  <li>Restrict or object to processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <Divider />

              {/* Contact Information */}
              <div id="contact-us" className="mb-8">
                <Title level={3} className="!mb-4">
                  Contact Us
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or our data
                  practices, please contact us:
                </Paragraph>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Text strong>Email:</Text> ipoedge@gmail.com
                  <br />
                </div>
              </div>

              {/* Last Updated */}
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <Text strong className="text-blue-800">
                  This Privacy Policy was last updated on {lastUpdated}. We may
                  update this policy from time to time, and we will notify you
                  of any material changes.
                </Text>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
