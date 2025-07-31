import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Button,
  Typography,
  Tag,
  Breadcrumb,
  Tabs
} from 'antd';
import {
  HomeOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useBuybacks } from '../hooks';
import { ROUTES } from '../constants';
import { SkeletonCard, EmptyState, ResponsiveImage } from '../components/common';
import { formatDate } from '../utils';

const { Title, Text } = Typography;

const BuybackPage: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('current');

  // Determine status from URL or use active tab
  const getStatusFromPath = () => {
    const path = location.pathname;
    if (path.includes('current-buyback')) return 'current';
    if (path.includes('upcoming-buyback')) return 'upcoming';
    if (path.includes('closed-buyback')) return 'closed';
    return activeTab;
  };

  const status = getStatusFromPath();
  const { buybacks, loading } = useBuybacks(status);

  const getPageTitle = () => {
    switch (status) {
      case 'current': return 'Current Buybacks';
      case 'upcoming': return 'Upcoming Buybacks';
      case 'closed': return 'Closed Buybacks';
      default: return 'Buybacks';
    }
  };

  const getBuybackStatusColor = (buybackStatus: string) => {
    switch (buybackStatus) {
      case 'current': return 'green';
      case 'upcoming': return 'blue';
      case 'closed': return 'orange';
      default: return 'default';
    }
  };

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
          <Breadcrumb.Item>Buyback</Breadcrumb.Item>
          <Breadcrumb.Item>{getPageTitle()}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-8">
          <Title level={1} className="mb-2">{getPageTitle()}</Title>
          <Text className="text-gray-600">
            Track share buyback announcements and participate in buyback offers
          </Text>
        </div>

        {/* Tabs for different statuses */}
        <Card className="mb-6">
          <Tabs
            activeKey={status}
            onChange={setActiveTab}
            items={[
              {
                key: 'current',
                label: 'Current Buybacks',
                children: null
              },
              {
                key: 'upcoming',
                label: 'Upcoming Buybacks',
                children: null
              },
              {
                key: 'closed',
                label: 'Closed Buybacks',
                children: null
              }
            ]}
          />
        </Card>

        {/* Buyback Grid */}
        {loading ? (
          <Row gutter={[24, 24]}>
            {Array.from({ length: 8 }, (_, index) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={index}>
                <SkeletonCard loading={true} />
              </Col>
            ))}
          </Row>
        ) : buybacks.length === 0 ? (
          <EmptyState
            title="No buybacks found"
            description={`There are no ${status} buybacks at the moment.`}
            action={{
              text: "View All Buybacks",
              href: "/buyback"
            }}
          />
        ) : (
          <Row gutter={[24, 24]}>
            {buybacks.map((buyback) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={buyback.id}>
                <Card
                  className="card-hover h-full animate-fadeIn"
                  cover={
                    <div className="p-4 bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <ResponsiveImage
                          src={buyback.logo}
                          alt={buyback.companyName}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <Title level={5} className="mb-1 line-clamp-1">
                            {buyback.companyName}
                          </Title>
                          <Text className="text-gray-500 text-sm">
                            Record: {formatDate(buyback.recordDate)}
                          </Text>
                        </div>
                      </div>
                    </div>
                  }
                  actions={[
                    <Button type="link" key="view">
                      View Details
                    </Button>,
                    <Button
                      type="primary"
                      key="participate"
                      disabled={buyback.status !== 'current'}
                    >
                      {buyback.status === 'current' ? 'Participate' : 'View'}
                    </Button>
                  ]}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Text strong>Status:</Text>
                      <Tag color={getBuybackStatusColor(buyback.status)}>
                        {buyback.status.charAt(0).toUpperCase() + buyback.status.slice(1)}
                      </Tag>
                    </div>

                    <div className="flex justify-between">
                      <Text strong>Buyback Price:</Text>
                      <Text className="font-medium">
                        ₹{buyback.buybackPrice.toLocaleString()}
                      </Text>
                    </div>

                    <div className="flex justify-between">
                      <Text strong>Issue Size:</Text>
                      <Text>{buyback.issueSize}</Text>
                    </div>

                    <div className="flex justify-between">
                      <Text strong>Shares:</Text>
                      <Text>{buyback.sharesCount.toLocaleString()}</Text>
                    </div>

                    <div className="flex justify-between">
                      <Text strong>Percentage:</Text>
                      <Text className="text-blue-600 font-medium">
                        {buyback.percentage}%
                      </Text>
                    </div>

                    <div className="flex justify-between">
                      <Text strong>Method:</Text>
                      <Text className="capitalize">{buyback.method}</Text>
                    </div>

                    {buyback.issueDate && buyback.closeDate && (
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex justify-between text-sm">
                          <Text>Issue Date:</Text>
                          <Text>{formatDate(buyback.issueDate)}</Text>
                        </div>
                        <div className="flex justify-between text-sm">
                          <Text>Close Date:</Text>
                          <Text>{formatDate(buyback.closeDate)}</Text>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default BuybackPage;
