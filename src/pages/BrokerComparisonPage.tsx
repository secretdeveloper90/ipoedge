import React from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Typography,
  Rate,
  Breadcrumb,
  Tag,
  Space,
  Empty,
} from 'antd';
import {
  HomeOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { ResponsiveImage } from '../components/common';
import { formatBrokerValue, getBrokerStatusColor } from '../utils/brokerValidation';
import { useBrokerComparison } from '../contexts/BrokerComparisonContext';
import { trackComparisonEvent } from '../utils/comparisonUtils';

const { Title, Text } = Typography;

interface BrokerComparisonPageProps {}

const BrokerComparisonPage: React.FC<BrokerComparisonPageProps> = () => {
  const { state, removeBroker, clearAll } = useBrokerComparison();
  const comparedBrokers = state.comparedBrokers;

  const handleRemoveBroker = (brokerId: string) => {
    const broker = comparedBrokers.find(b => b.id === brokerId);
    removeBroker(brokerId);
    if (broker) {
      trackComparisonEvent('remove_broker', broker.name, {
        remaining_count: comparedBrokers.length - 1
      });
    }
  };

  const handleClearAll = () => {
    trackComparisonEvent('clear_all', undefined, {
      cleared_count: comparedBrokers.length
    });
    clearAll();
  };

  // Track page view
  React.useEffect(() => {
    if (comparedBrokers.length > 0) {
      trackComparisonEvent('view_comparison', undefined, {
        broker_count: comparedBrokers.length,
        broker_names: comparedBrokers.map(b => b.name)
      });
    }
  }, [comparedBrokers]);

  if (comparedBrokers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <Breadcrumb.Item>
              <Link to={ROUTES.HOME}>
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={ROUTES.BROKERS}>Brokers</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Compare</Breadcrumb.Item>
          </Breadcrumb>

          {/* Page Header */}
          <div className="mb-8">
            <Title level={1} className="mb-2">Broker Comparison</Title>
            <Text className="text-gray-600">
              Compare up to 3 brokers side by side to find the best fit for your trading needs
            </Text>
          </div>

          {/* Empty State */}
          <Card className="text-center py-16">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Title level={4} className="text-gray-500 mb-2">
                    No brokers selected for comparison
                  </Title>
                  <Text className="text-gray-400 mb-4 block">
                    Select brokers from the broker listing page to start comparing
                  </Text>
                </div>
              }
            >
              <Link to={ROUTES.BROKERS}>
                <Button type="primary" size="large" icon={<PlusOutlined />}>
                  Browse Brokers
                </Button>
              </Link>
            </Empty>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <Breadcrumb.Item>
            <Link to={ROUTES.HOME}>
              <HomeOutlined /> Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={ROUTES.BROKERS}>Brokers</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Compare</Breadcrumb.Item>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <Title level={1} className="mb-2">Broker Comparison</Title>
            <Text className="text-gray-600">
              Comparing {comparedBrokers.length} broker{comparedBrokers.length > 1 ? 's' : ''}
            </Text>
          </div>
          <Space>
            <Link to={ROUTES.BROKERS}>
              <Button icon={<PlusOutlined />}>
                Add More Brokers
              </Button>
            </Link>
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          </Space>
        </div>

        {/* Broker Cards Overview */}
        <Row gutter={[16, 16]} className="mb-8">
          {comparedBrokers.map((broker) => (
            <Col xs={24} sm={12} lg={8} key={broker.id}>
              <Card className="text-center h-full">
                <div className="relative">
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    className="absolute top-0 right-0"
                    onClick={() => handleRemoveBroker(broker.id)}
                  />
                  <ResponsiveImage
                    src={broker.logo}
                    alt={broker.name}
                    className="w-16 h-16 mx-auto rounded-lg object-cover mb-3"
                  />
                  <Title level={4} className="mb-2">{broker.name}</Title>
                  <div className="flex items-center justify-center mb-2">
                    <Rate disabled defaultValue={broker.rating} allowHalf />
                    <Text className="text-gray-500 ml-2">({broker.rating})</Text>
                  </div>
                  <Tag color="blue">{broker.type}</Tag>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Comparison Tables */}
        <div className="space-y-8">
          {/* Basic Information */}
          <Card title="Basic Information" className="shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Feature</th>
                    {comparedBrokers.map(broker => (
                      <th key={broker.id} className="text-center py-3 px-4 font-semibold min-w-[200px]">
                        {broker.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Broker Type</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        <Tag color="blue">{broker.type}</Tag>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Active Clients</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        {broker.activeClients}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Rating</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <Rate disabled defaultValue={broker.rating} allowHalf className="text-sm" />
                          <Text className="ml-2">({broker.rating})</Text>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Account Charges */}
          <Card title="Account Charges" className="shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Charge Type</th>
                    {comparedBrokers.map(broker => (
                      <th key={broker.id} className="text-center py-3 px-4 font-semibold min-w-[200px]">
                        {broker.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Account Opening</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        <Tag color={getBrokerStatusColor(broker.accountOpening)}>
                          {formatBrokerValue(broker.accountOpening)}
                        </Tag>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Account Maintenance</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        <Tag color={getBrokerStatusColor(broker.accountMaintenance)}>
                          {formatBrokerValue(broker.accountMaintenance)}
                        </Tag>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Call & Trade</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        <Tag color={getBrokerStatusColor(broker.callTrade)}>
                          {formatBrokerValue(broker.callTrade)}
                        </Tag>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Brokerage Charges */}
          <Card title="Brokerage Charges" className="shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Segment</th>
                    {comparedBrokers.map(broker => (
                      <th key={broker.id} className="text-center py-3 px-4 font-semibold min-w-[200px]">
                        {broker.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Equity Delivery</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        {broker.brokerage?.equityDelivery || 'N/A'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Equity Intraday</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        {broker.brokerage?.equityIntraday || 'N/A'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Equity Futures</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        {broker.brokerage?.equityFutures || 'N/A'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Equity Options</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        {broker.brokerage?.equityOptions || 'N/A'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Margins */}
          <Card title="Margin Requirements" className="shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Segment</th>
                    {comparedBrokers.map(broker => (
                      <th key={broker.id} className="text-center py-3 px-4 font-semibold min-w-[200px]">
                        {broker.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Equity Delivery</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        {broker.margins?.equityDelivery || 'N/A'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Equity Intraday</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        {broker.margins?.equityIntraday || 'N/A'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Equity Futures</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        {broker.margins?.equityFutures || 'N/A'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Equity Options</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        {broker.margins?.equityOptions || 'N/A'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Features & Services */}
          <Card title="Features & Services" className="shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Feature</th>
                    {comparedBrokers.map(broker => (
                      <th key={broker.id} className="text-center py-3 px-4 font-semibold min-w-[200px]">
                        {broker.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Trading Platforms</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {broker.platforms?.slice(0, 3).map((platform, index) => (
                            <Tag key={index} className="text-xs">{platform}</Tag>
                          ))}
                          {broker.platforms?.length > 3 && (
                            <Tag className="text-xs">+{broker.platforms.length - 3} more</Tag>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Services</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {broker.services?.slice(0, 3).map((service, index) => (
                            <Tag key={index} className="text-xs" color="blue">{service}</Tag>
                          ))}
                          {broker.services?.length > 3 && (
                            <Tag className="text-xs" color="blue">+{broker.services.length - 3} more</Tag>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Additional Features</td>
                    {comparedBrokers.map(broker => (
                      <td key={broker.id} className="py-3 px-4 text-center">
                        <div className="space-y-1">
                          {broker.additionalFeatures?.['3in1Account'] && (
                            <Tag className="text-xs" color="green">3-in-1 Account</Tag>
                          )}
                          {broker.additionalFeatures?.freeTradingCalls && (
                            <Tag className="text-xs" color="green">Free Trading Calls</Tag>
                          )}
                          {broker.additionalFeatures?.freeResearch && (
                            <Tag className="text-xs" color="green">Free Research</Tag>
                          )}
                          {broker.additionalFeatures?.marginFunding && (
                            <Tag className="text-xs" color="green">Margin Funding</Tag>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Pros and Cons */}
          <Card title="Pros & Cons" className="shadow-sm">
            <Row gutter={[16, 16]}>
              {comparedBrokers.map(broker => (
                <Col xs={24} lg={24 / comparedBrokers.length} key={broker.id}>
                  <div className="border rounded-lg p-4">
                    <Title level={5} className="text-center mb-4">{broker.name}</Title>

                    <div className="mb-4">
                      <Text strong className="text-green-600 flex items-center mb-2">
                        <CheckCircleOutlined className="mr-2" />
                        Pros
                      </Text>
                      <ul className="list-none space-y-1">
                        {broker.pros?.slice(0, 3).map((pro, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Text strong className="text-red-600 flex items-center mb-2">
                        <CloseCircleOutlined className="mr-2" />
                        Cons
                      </Text>
                      <ul className="list-none space-y-1">
                        {broker.cons?.slice(0, 3).map((con, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrokerComparisonPage;
