import React from 'react';
import { Typography, Collapse, Card, Input, Row, Col } from 'antd';
import { 
  SearchOutlined, 
  QuestionCircleOutlined,
  DollarOutlined,
  SafetyOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  BankOutlined,
  TrophyOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const { Search } = Input;

const FAQsPage: React.FC = () => {
  const lastUpdated = "October 1, 2025";

  const faqCategories = [
    {
      title: 'General IPO Questions',
      icon: <QuestionCircleOutlined className="text-blue-500" />,
      faqs: [
        {
          question: 'What is an IPO?',
          answer: 'An Initial Public Offering (IPO) is when a private company offers its shares to the public for the first time. This allows the company to raise capital from public investors and become a publicly traded company on stock exchanges.'
        },
        {
          question: 'How do I apply for an IPO?',
          answer: 'You can apply for an IPO through your broker\'s online platform, mobile app, or by visiting their branch. You need a demat account, trading account, and sufficient funds in your bank account to apply for an IPO.'
        },
        {
          question: 'What is the minimum investment required for an IPO?',
          answer: 'The minimum investment varies for each IPO. For retail investors, it\'s typically one lot, which can range from ₹10,000 to ₹2,00,000 depending on the company\'s share price and lot size.'
        },
        {
          question: 'What is GMP (Grey Market Premium)?',
          answer: 'GMP is the premium at which IPO shares are traded in the unofficial grey market before they are listed on stock exchanges. It gives an indication of market sentiment and expected listing price.'
        }
      ]
    },
    {
      title: 'Investment & Pricing',
      icon: <DollarOutlined className="text-green-500" />,
      faqs: [
        {
          question: 'How is the IPO price determined?',
          answer: 'IPO prices are determined through a book-building process where institutional investors bid for shares. The final price is set within the price band based on demand and valuation metrics.'
        },
        {
          question: 'Can I modify or cancel my IPO application?',
          answer: 'Yes, you can modify or cancel your IPO application before the issue closes. However, once the issue closes, no modifications or cancellations are allowed.'
        },
        {
          question: 'What happens if I don\'t get allotment?',
          answer: 'If you don\'t get allotment, the blocked amount in your bank account will be unblocked and refunded within 7-10 working days after the allotment process is completed.'
        },
        {
          question: 'How much can I invest in an IPO?',
          answer: 'Retail investors can invest up to ₹2 lakhs in an IPO. If you want to invest more, you\'ll be considered as an HNI (High Net Worth Individual) investor with different allotment rules.'
        }
      ]
    },
    {
      title: 'Allotment & Listing',
      icon: <TrophyOutlined className="text-purple-500" />,
      faqs: [
        {
          question: 'How is IPO allotment decided?',
          answer: 'IPO allotment is done through a computerized lottery system. For retail investors, if the issue is oversubscribed, allotment is done on a proportionate basis or through lottery.'
        },
        {
          question: 'When will I know about my allotment status?',
          answer: 'Allotment status is typically announced 5-7 days after the IPO closes. You can check your status on the registrar\'s website, NSE/BSE websites, or through your broker.'
        },
        {
          question: 'When do IPO shares get listed?',
          answer: 'IPO shares are usually listed on stock exchanges within 6-10 working days after the issue closes. The exact listing date is mentioned in the IPO prospectus.'
        },
        {
          question: 'Can I sell IPO shares immediately after listing?',
          answer: 'Yes, you can sell your IPO shares immediately after they are listed on the stock exchange during market hours, provided they are credited to your demat account.'
        }
      ]
    },
    {
      title: 'Platform & Technical',
      icon: <FileTextOutlined className="text-orange-500" />,
      faqs: [
        {
          question: 'How accurate is the information on IPO Edge?',
          answer: 'We source our information from official documents like DRHP, RHP, and stock exchange announcements. Our data is updated in real-time and verified by our research team.'
        },
        {
          question: 'Is IPO Edge free to use?',
          answer: 'Yes, IPO Edge is completely free to use. We provide comprehensive IPO information, analysis, and tools without any subscription fees.'
        },
        {
          question: 'How often is the data updated?',
          answer: 'Our data is updated in real-time during market hours. IPO subscription numbers, GMP data, and other metrics are refreshed every few minutes.'
        },
        {
          question: 'Can I get notifications for new IPOs?',
          answer: 'Yes, you can subscribe to our notifications to get alerts about new IPO launches, subscription updates, allotment results, and listing dates.'
        }
      ]
    },
    {
      title: 'Risks & Safety',
      icon: <SafetyOutlined className="text-red-500" />,
      faqs: [
        {
          question: 'What are the risks of investing in IPOs?',
          answer: 'IPO investments carry risks including market volatility, company performance uncertainty, listing price fluctuations, and potential loss of capital. Always research thoroughly before investing.'
        },
        {
          question: 'Should I invest in every IPO?',
          answer: 'No, you should carefully evaluate each IPO based on company fundamentals, business model, financial health, market conditions, and your investment goals before investing.'
        },
        {
          question: 'How do I research an IPO before investing?',
          answer: 'Read the company\'s prospectus, analyze financial statements, understand the business model, check promoter background, evaluate industry prospects, and consider expert opinions.'
        },
        {
          question: 'Is my money safe when applying for IPOs?',
          answer: 'Yes, your money is safe. The amount is blocked in your bank account and is handled through SEBI-regulated processes. If you don\'t get allotment, the money is refunded.'
        }
      ]
    }
  ];

  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Title level={1} className="!text-white !mb-6 text-4xl md:text-6xl font-bold">
            Frequently Asked Questions
          </Title>
          <Paragraph className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed !mb-8">
            Find answers to common questions about IPOs, our platform, and investment processes.
          </Paragraph>
          <Text className="text-blue-200 text-lg">Last updated: {lastUpdated}</Text>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <Search
              placeholder="Search for questions..."
              size="large"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow-lg"
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Stats */}
        <Row gutter={[24, 24]} className="mb-16">
          <Col xs={24} sm={8}>
            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <QuestionCircleOutlined className="text-4xl text-blue-500 mb-4" />
              <Title level={3} className="!mb-2">50+</Title>
              <Paragraph className="text-gray-600">Questions Answered</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <ClockCircleOutlined className="text-4xl text-green-500 mb-4" />
              <Title level={3} className="!mb-2">24/7</Title>
              <Paragraph className="text-gray-600">Support Available</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <BankOutlined className="text-4xl text-purple-500 mb-4" />
              <Title level={3} className="!mb-2">100%</Title>
              <Paragraph className="text-gray-600">Accurate Information</Paragraph>
            </Card>
          </Col>
        </Row>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="shadow-lg border-0">
              <div className="flex items-center mb-6">
                <div className="text-2xl mr-4">{category.icon}</div>
                <Title level={3} className="!mb-0">{category.title}</Title>
              </div>
              
              <Collapse 
                ghost 
                expandIconPosition="end"
                className="bg-transparent"
              >
                {category.faqs.map((faq, faqIndex) => (
                  <Panel 
                    header={
                      <span className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200">
                        {faq.question}
                      </span>
                    } 
                    key={faqIndex}
                    className="!border-b border-gray-200 last:!border-b-0"
                  >
                    <Paragraph className="text-gray-600 leading-relaxed pl-4 border-l-4 border-blue-200">
                      {faq.answer}
                    </Paragraph>
                  </Panel>
                ))}
              </Collapse>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {searchTerm && filteredFAQs.length === 0 && (
          <Card className="text-center py-16 shadow-lg border-0">
            <QuestionCircleOutlined className="text-6xl text-gray-400 mb-6" />
            <Title level={3} className="text-gray-600 !mb-4">No results found</Title>
            <Paragraph className="text-gray-500 text-lg">
              Try searching with different keywords or browse through our categories above.
            </Paragraph>
          </Card>
        )}

        {/* Contact Support */}
        <Card className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
          <div className="text-center py-8">
            <Title level={2} className="!text-white !mb-6">Still have questions?</Title>
            <Paragraph className="text-xl text-blue-100 !mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help you.
            </Paragraph>
            <div className="space-x-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Contact Support
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Email Us
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FAQsPage;
