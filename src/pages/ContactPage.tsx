import React from 'react';
import { Typography, Card, Row, Col, Form, Input, Button, Select, message } from 'antd';
import { 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
  BugOutlined,
  StarOutlined,
  SendOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ContactPage: React.FC = () => {
  const lastUpdated = "October 1, 2025";
  const [form] = Form.useForm();

  const contactInfo = [
    {
      icon: <MailOutlined className="text-blue-500" />,
      title: 'Email Us',
      primary: 'ipoedge@gmail.com',
      secondary: 'ipoedge@gmail.com',
      description: 'Send us your queries and we\'ll respond within 24 hours'
    },
    {
      icon: <PhoneOutlined className="text-green-500" />,
      title: 'Call Us',
      primary: '+91 12345 67890',
      secondary: '+91 98765 43210',
      description: 'Speak directly with our support team'
    },
    {
      icon: <EnvironmentOutlined className="text-purple-500" />,
      title: 'Visit Us',
      primary: '123 Business District',
      secondary: 'Mumbai, Maharashtra 400001',
      description: 'Our office is open Monday to Friday'
    },
    {
      icon: <ClockCircleOutlined className="text-orange-500" />,
      title: 'Business Hours',
      primary: 'Monday - Friday',
      secondary: '9:00 AM - 6:00 PM IST',
      description: 'We\'re here to help during business hours'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: <QuestionCircleOutlined /> },
    { value: 'technical', label: 'Technical Support', icon: <BugOutlined /> },
    { value: 'feedback', label: 'Feedback & Suggestions', icon: <StarOutlined /> },
    { value: 'partnership', label: 'Partnership', icon: <CustomerServiceOutlined /> },
    { value: 'media', label: 'Media & Press', icon: <MessageOutlined /> }
  ];

  const officeLocations = [
    {
      city: 'Mumbai',
      address: '123 Business District, Bandra Kurla Complex',
      phone: '+91 12345 67890',
      email: 'ipoedge@gmail.com'
    },
    {
      city: 'Surat',
      address: '456 Corporate Hub, Connaught Place',
      phone: '+91 11111 22222',
      email: 'ipoedge@gmail.com'
    },
  ];

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    message.success('Thank you for contacting us! We\'ll get back to you soon.');
    form.resetFields();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Title level={1} className="!text-white !mb-6 text-4xl md:text-6xl font-bold">
            Contact Us
          </Title>
          <Paragraph className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Have questions about IPOs or need help with our platform?
            We're here to assist you every step of the way.
          </Paragraph>
          <Text className="text-blue-200 text-lg">Last updated: {lastUpdated}</Text>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Information */}
        <div className="mb-20">
          <Title level={2} className="text-center !mb-12 text-gray-800">Get in Touch</Title>
          <Row gutter={[24, 24]}>
            {contactInfo.map((info, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card className="h-full text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
                  <div className="text-4xl mb-4">{info.icon}</div>
                  <Title level={4} className="!mb-3">{info.title}</Title>
                  <Text strong className="block text-lg mb-1">{info.primary}</Text>
                  <Text className="block text-gray-600 mb-3">{info.secondary}</Text>
                  <Paragraph className="text-sm text-gray-500">{info.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Contact Form and Quick Actions */}
        <Row gutter={[32, 32]} className="mb-20">
          {/* Contact Form */}
          <Col xs={24} lg={14}>
            <Card className="shadow-lg border-0">
              <Title level={3} className="!mb-6 text-gray-800">Send us a Message</Title>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                      <Input size="large" placeholder="Enter your first name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                      <Input size="large" placeholder="Enter your last name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input size="large" placeholder="Enter your email address" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                  <Input size="large" placeholder="Enter your phone number" />
                </Form.Item>

                <Form.Item
                  name="inquiryType"
                  label="Inquiry Type"
                  rules={[{ required: true, message: 'Please select inquiry type' }]}
                >
                  <Select size="large" placeholder="Select inquiry type">
                    {inquiryTypes.map((type) => (
                      <Option key={type.value} value={type.value}>
                        <div className="flex items-center">
                          <span className="mr-2">{type.icon}</span>
                          {type.label}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[{ required: true, message: 'Please enter subject' }]}
                >
                  <Input size="large" placeholder="Enter message subject" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[{ required: true, message: 'Please enter your message' }]}
                >
                  <TextArea 
                    rows={6} 
                    placeholder="Enter your message here..."
                    showCount
                    maxLength={1000}
                  />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large" 
                    icon={<SendOutlined />}
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Quick Actions */}
          <Col xs={24} lg={10}>
            <div className="space-y-6">
              {/* Live Chat */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center p-4">
                  <MessageOutlined className="text-4xl text-blue-500 mb-4" />
                  <Title level={4} className="!mb-3">Live Chat Support</Title>
                  <Paragraph className="text-gray-600 !mb-4">
                    Get instant help from our support team
                  </Paragraph>
                  <Button type="primary" size="large" className="w-full">
                    Start Live Chat
                  </Button>
                </div>
              </Card>

              {/* FAQ */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center p-4">
                  <QuestionCircleOutlined className="text-4xl text-green-500 mb-4" />
                  <Title level={4} className="!mb-3">Frequently Asked Questions</Title>
                  <Paragraph className="text-gray-600 !mb-4">
                    Find quick answers to common questions
                  </Paragraph>
                  <Button size="large" className="w-full">
                    Browse FAQs
                  </Button>
                </div>
              </Card>

              {/* Help Center */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center p-4">
                  <CustomerServiceOutlined className="text-4xl text-purple-500 mb-4" />
                  <Title level={4} className="!mb-3">Help Center</Title>
                  <Paragraph className="text-gray-600 !mb-4">
                    Access guides, tutorials, and documentation
                  </Paragraph>
                  <Button size="large" className="w-full">
                    Visit Help Center
                  </Button>
                </div>
              </Card>
            </div>
          </Col>
        </Row>

        {/* Office Locations */}
        <div className="mb-20">
          <Title level={2} className="text-center !mb-12 text-gray-800">Our Offices</Title>
          <Row gutter={[24, 24]}>
            {officeLocations.map((office, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                  <Title level={4} className="!mb-4 text-blue-600">{office.city}</Title>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <EnvironmentOutlined className="text-gray-500 mt-1 mr-3" />
                      <Text className="text-gray-600">{office.address}</Text>
                    </div>
                    <div className="flex items-center">
                      <PhoneOutlined className="text-gray-500 mr-3" />
                      <Text className="text-gray-600">{office.phone}</Text>
                    </div>
                    <div className="flex items-center">
                      <MailOutlined className="text-gray-500 mr-3" />
                      <Text className="text-gray-600">{office.email}</Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Emergency Contact */}
        <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 shadow-xl">
          <div className="text-center py-8">
            <Title level={2} className="!text-white !mb-6">Emergency Support</Title>
            <Paragraph className="text-xl text-red-100 !mb-8 max-w-2xl mx-auto">
              For urgent technical issues or account-related emergencies, 
              contact our 24/7 emergency support line.
            </Paragraph>
            <div className="space-x-4">
              <Button size="large" className="bg-white text-red-600 border-0 hover:bg-gray-100 mb-4 sm:mb-0">
                <PhoneOutlined /> Call Emergency Line
              </Button>
              <Button size="large" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-red-600">
                <MessageOutlined /> Emergency Chat
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
