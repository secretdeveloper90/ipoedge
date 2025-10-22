import React from 'react';
import { Typography, Card, Row, Col, Form, Input, Button, Select, message } from 'antd';
import { SendOutlined, QuestionCircleOutlined, BugOutlined, StarOutlined, CustomerServiceOutlined, MessageOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ContactPage: React.FC = () => {
  const [form] = Form.useForm();

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: <QuestionCircleOutlined /> },
    { value: 'technical', label: 'Technical Support', icon: <BugOutlined /> },
    { value: 'feedback', label: 'Feedback & Suggestions', icon: <StarOutlined /> },
    { value: 'partnership', label: 'Partnership', icon: <CustomerServiceOutlined /> },
    { value: 'media', label: 'Media & Press', icon: <MessageOutlined /> }
  ];

  const onFinish = (values: Record<string, string>) => {
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
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="shadow-lg border-0">
          <Title level={2} className="!mb-6 text-gray-800 text-center">Send us a Message</Title>
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
      </div>
    </div>
  );
};

export default ContactPage;
