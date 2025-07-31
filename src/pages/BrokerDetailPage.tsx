import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Typography,
  Rate,
  Breadcrumb,
  Tag,
  Descriptions,
  Table,
  Tabs,
  List,
  Space,
  Statistic,
  Alert,
  Badge,
  Avatar,
  Skeleton,
} from "antd";
import {
  HomeOutlined,
  BankOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StarOutlined,
  UserOutlined,
  TrophyOutlined,
  DesktopOutlined,
  PhoneOutlined,
  CrownOutlined,
  FireOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  LineChartOutlined,
  WalletOutlined,
  PercentageOutlined,
  ShareAltOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { ROUTES } from "../constants";
import { useBrokerByName } from "../hooks/useBrokers";
import { formatDisplayValue } from "../utils/formatUtils";
import { useBrokerComparison } from "../contexts/BrokerComparisonContext";
import { trackComparisonEvent } from "../utils/comparisonUtils";
import "../styles/broker-details.css";

const { Title, Text, Paragraph } = Typography;

const BrokerDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { broker, loading: brokerLoading } = useBrokerByName(name || "");
  const { addBroker, removeBroker, isBrokerInComparison } = useBrokerComparison();
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Update loading state based on broker loading
    if (!brokerLoading) {
      const timer = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [brokerLoading]);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleComparisonToggle = () => {
    if (!broker) return;

    if (isBrokerInComparison(broker.id)) {
      removeBroker(broker.id);
      trackComparisonEvent('remove_broker', broker.name, {
        source: 'broker_detail'
      });
    } else {
      const success = addBroker(broker);
      if (success) {
        trackComparisonEvent('add_broker', broker.name, {
          source: 'broker_detail'
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <Skeleton.Button active size="small" style={{ marginBottom: 24 }} />
          <Card className="mb-6">
            <Skeleton avatar active paragraph={{ rows: 3 }} />
          </Card>
          <Row gutter={[16, 16]} className="mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Col xs={12} sm={6} key={i}>
                <Card>
                  <Skeleton active paragraph={{ rows: 1 }} />
                </Card>
              </Col>
            ))}
          </Row>
          <Card>
            <Skeleton active paragraph={{ rows: 8 }} />
          </Card>
        </div>
      </div>
    );
  }

  if (!broker) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <BankOutlined className="text-3xl text-gray-400" />
            </div>
            <Title level={3} className="mb-2">
              Broker not found
            </Title>
            <Text type="secondary">
              The broker you're looking for doesn't exist or has been removed.
            </Text>
          </div>
          <Link to={ROUTES.BROKERS}>
            <Button type="primary" size="large" className="w-full">
              Back to Brokers
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const brokerageColumns = [
    {
      title: "Segment",
      dataIndex: "segment",
      key: "segment",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Charges",
      dataIndex: "charges",
      key: "charges",
      render: (text: string) => (
        <Tag color={text === "Zero" || text === "Free" ? "green" : "blue"}>
          {text}
        </Tag>
      ),
    },
  ];

  const brokerageData = [
    {
      key: "1",
      segment: "Equity Delivery",
      charges: formatDisplayValue(
        broker.brokerage?.equityDelivery || broker.equityDelivery
      ),
    },
    {
      key: "2",
      segment: "Equity Intraday",
      charges: formatDisplayValue(
        broker.brokerage?.equityIntraday || broker.equityIntraday
      ),
    },
    {
      key: "3",
      segment: "Equity Futures",
      charges: formatDisplayValue(broker.brokerage?.equityFutures),
    },
    {
      key: "4",
      segment: "Equity Options",
      charges: formatDisplayValue(broker.brokerage?.equityOptions),
    },
    {
      key: "5",
      segment: "Currency Futures",
      charges: formatDisplayValue(broker.brokerage?.currencyFutures),
    },
    {
      key: "6",
      segment: "Currency Options",
      charges: formatDisplayValue(broker.brokerage?.currencyOptions),
    },
    {
      key: "7",
      segment: "Commodity Futures",
      charges: formatDisplayValue(broker.brokerage?.commodityFutures),
    },
    {
      key: "8",
      segment: "Commodity Options",
      charges: formatDisplayValue(broker.brokerage?.commodityOptions),
    },
  ];

  const marginData = broker.margins
    ? [
        {
          key: "1",
          segment: "Equity Delivery",
          margin: formatDisplayValue(broker.margins.equityDelivery),
        },
        {
          key: "2",
          segment: "Equity Intraday",
          margin: formatDisplayValue(broker.margins.equityIntraday),
        },
        {
          key: "3",
          segment: "Equity Futures",
          margin: formatDisplayValue(broker.margins.equityFutures),
        },
        {
          key: "4",
          segment: "Equity Options",
          margin: formatDisplayValue(broker.margins.equityOptions),
        },
        {
          key: "5",
          segment: "Currency Futures",
          margin: formatDisplayValue(broker.margins.currencyFutures),
        },
        {
          key: "6",
          segment: "Currency Options",
          margin: formatDisplayValue(broker.margins.currencyOptions),
        },
        {
          key: "7",
          segment: "Commodity Futures",
          margin: formatDisplayValue(broker.margins.commodityFutures),
        },
        {
          key: "8",
          segment: "Commodity Options",
          margin: formatDisplayValue(broker.margins.commodityOptions),
        },
      ]
    : [];

  const marginColumns = [
    {
      title: "Segment",
      dataIndex: "segment",
      key: "segment",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Margin",
      dataIndex: "margin",
      key: "margin",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6 bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm animate-fadeInUp">
          <Breadcrumb.Item>
            <Link
              to={ROUTES.HOME}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <HomeOutlined /> Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              to={ROUTES.BROKERS}
              className="hover:text-blue-600 transition-colors"
            >
              Brokers
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-medium">
            {broker.name}
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* Enhanced Header Section */}
        <Card
          className="mb-6 overflow-hidden border-0 shadow-2xl animate-fadeInUp animate-delay-100"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "20px",
          }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          </div>

          <div className="relative z-10">
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} sm={8} md={6} lg={4}>
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar
                      src={broker.logo}
                      alt={broker.name}
                      size={isMobile ? 80 : 120}
                      className="shadow-2xl border-4 border-white/30 backdrop-blur-sm"
                      style={{
                        backgroundColor: "#fff",
                        padding: "8px",
                      }}
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <CheckCircleOutlined className="text-white text-xs" />
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={16} md={12} lg={14}>
                <div className={isMobile ? "text-center" : ""}>
                  <Title
                    level={isMobile ? 3 : 2}
                    className="!text-white !mb-2 flex items-center gap-3"
                    style={{ margin: 0 }}
                  >
                    {broker.name}
                    {broker.type === "Discount Broker" && (
                      <Badge
                        count="Discount"
                        style={{
                          backgroundColor: "#10b981",
                          fontSize: "11px",
                          fontWeight: "600",
                          borderRadius: "12px",
                          padding: "0 8px",
                        }}
                      />
                    )}
                    {broker.type === "Full Service Broker" && (
                      <Badge
                        count="Full Service"
                        style={{
                          backgroundColor: "#3b82f6",
                          fontSize: "11px",
                          fontWeight: "600",
                          borderRadius: "12px",
                          padding: "0 8px",
                        }}
                      />
                    )}
                  </Title>

                  <Text className="text-white/90 text-lg font-medium block mb-3">
                    {broker.type || "Stockbroker"}
                  </Text>

                  {broker.activeClients && (
                    <div className="flex items-center gap-2 text-white/90">
                      <UserOutlined className="text-lg" />
                      <Text strong className="text-white text-lg">
                        {broker.activeClients}
                      </Text>
                      <Text className="text-white/80">Active Clients</Text>
                    </div>
                  )}
                </div>
              </Col>

              <Col xs={24} sm={24} md={6} lg={6}>
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <Statistic
                      title={
                        <span className="text-white/90 font-medium">
                          Overall Rating
                        </span>
                      }
                      value={broker.rating}
                      precision={1}
                      valueStyle={{
                        color: "#fff",
                        fontSize: isMobile ? "24px" : "32px",
                        fontWeight: "bold",
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      }}
                      prefix={<StarOutlined className="text-yellow-400 mr-2" />}
                      suffix={
                        <span className="text-white/80 text-lg">/ 5</span>
                      }
                    />
                    <Rate
                      disabled
                      value={broker.rating}
                      className="mt-3"
                      style={{ fontSize: isMobile ? "14px" : "16px" }}
                    />
                    <div className="mt-2 text-white/80 text-sm">
                      Based on user reviews
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Card>

        {/* Enhanced Quick Stats */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={12} sm={6}>
            <Card
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-emerald-50 to-green-100 animate-slideInLeft animate-delay-200"
              style={{ borderRadius: "16px" }}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <WalletOutlined className="text-white text-lg" />
                </div>
                <Text className="text-gray-600 text-sm font-medium block mb-1">
                  Account Opening
                </Text>
                <div
                  className={`text-2xl font-bold ${
                    broker.accountOpening === "Free" ||
                    broker.accountOpening === 0
                      ? "text-emerald-600"
                      : "text-blue-600"
                  }`}
                >
                  {broker.accountOpening}
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={12} sm={6}>
            <Card
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-blue-50 to-indigo-100 animate-slideInLeft animate-delay-300"
              style={{ borderRadius: "16px" }}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <BankOutlined className="text-white text-lg" />
                </div>
                <Text className="text-gray-600 text-sm font-medium block mb-1">
                  Annual Maintenance
                </Text>
                <div
                  className={`text-2xl font-bold ${
                    broker.accountMaintenance === "Free" ||
                    broker.accountMaintenance === 0
                      ? "text-emerald-600"
                      : "text-blue-600"
                  }`}
                >
                  {broker.accountMaintenance}
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={12} sm={6}>
            <Card
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-purple-50 to-violet-100 animate-slideInRight animate-delay-300"
              style={{ borderRadius: "16px" }}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <PhoneOutlined className="text-white text-lg" />
                </div>
                <Text className="text-gray-600 text-sm font-medium block mb-1">
                  Call & Trade
                </Text>
                <div
                  className={`text-2xl font-bold ${
                    broker.callTrade === "Free" || broker.callTrade === 0
                      ? "text-emerald-600"
                      : "text-purple-600"
                  }`}
                >
                  {formatDisplayValue(broker.callTrade)}
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={12} sm={6}>
            <Card
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-orange-50 to-amber-100 animate-slideInRight animate-delay-400"
              style={{ borderRadius: "16px" }}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <TrophyOutlined className="text-white text-lg" />
                </div>
                <Text className="text-gray-600 text-sm font-medium block mb-1">
                  Trading Segments
                </Text>
                <div className="text-2xl font-bold text-orange-600">
                  {broker.services.length}
                  <span className="text-sm text-gray-500 ml-1">segments</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Enhanced Main Content Tabs */}
        <Card
          className="border-0 shadow-xl overflow-hidden animate-fadeInUp animate-delay-200"
          style={{ borderRadius: "20px" }}
        >
          <Tabs
            defaultActiveKey="overview"
            size={isMobile ? "middle" : "large"}
            className="custom-tabs"
            style={{ minHeight: "500px" }}
            tabBarStyle={{
              borderBottom: "2px solid #f1f5f9",
              marginBottom: "32px",
              paddingLeft: isMobile ? "16px" : "24px",
              paddingRight: isMobile ? "16px" : "24px",
            }}
          >
            <Tabs.TabPane
              tab={
                <span className="flex items-center gap-2 font-medium">
                  <EyeOutlined />
                  Overview
                </span>
              }
              key="overview"
            >
              <div className="px-4 md:px-6">
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={16}>
                    {broker.about && (
                      <Card
                        className="mb-6 border-0 bg-gradient-to-r from-blue-50 to-indigo-50"
                        style={{ borderRadius: "16px" }}
                      >
                        <Title
                          level={4}
                          className="flex items-center gap-2 text-gray-800 mb-4"
                        >
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <BankOutlined className="text-white text-sm" />
                          </div>
                          About {broker.name}
                        </Title>
                        <Paragraph className="text-gray-700 text-base leading-relaxed">
                          {broker.about}
                        </Paragraph>
                      </Card>
                    )}

                    <Card
                      className="mb-6 border-0 bg-gradient-to-r from-emerald-50 to-green-50"
                      style={{ borderRadius: "16px" }}
                    >
                      <Title
                        level={4}
                        className="flex items-center gap-2 text-gray-800 mb-4"
                      >
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                          <TrophyOutlined className="text-white text-sm" />
                        </div>
                        Services Offered
                      </Title>
                      <Space wrap className="mb-4">
                        {broker.services.map((service, index) => (
                          <Tag
                            key={index}
                            className="px-4 py-2 text-sm font-medium border-0 shadow-sm"
                            style={{
                              background:
                                "linear-gradient(135deg, #10b981, #059669)",
                              color: "white",
                              borderRadius: "20px",
                            }}
                          >
                            {service}
                          </Tag>
                        ))}
                      </Space>
                    </Card>

                    <Card
                      className="border-0 bg-gradient-to-r from-amber-50 to-orange-50"
                      style={{ borderRadius: "16px" }}
                    >
                      <Title
                        level={4}
                        className="flex items-center gap-2 text-gray-800 mb-4"
                      >
                        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                          <StarOutlined className="text-white text-sm" />
                        </div>
                        Key Features
                      </Title>
                      <List
                        dataSource={broker.features}
                        renderItem={(feature) => (
                          <List.Item className="py-3 border-b border-gray-100 last:border-b-0">
                            <div className="flex items-start gap-3">
                              <CheckCircleOutlined className="text-emerald-500 text-lg mt-0.5 flex-shrink-0" />
                              <Text className="text-gray-700 text-base">
                                {feature}
                              </Text>
                            </div>
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>

                  <Col xs={24} lg={8}>
                    <Card
                      title={
                        <span className="flex items-center gap-2 text-gray-800">
                          <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                            <UserOutlined className="text-white text-xs" />
                          </div>
                          Quick Info
                        </span>
                      }
                      className="mb-4 border-0 shadow-lg"
                      style={{ borderRadius: "16px" }}
                    >
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="Broker Type">
                          <Tag
                            color={
                              broker.type === "Discount Broker"
                                ? "green"
                                : "blue"
                            }
                            className="px-3 py-1 rounded-full font-medium"
                          >
                            {broker.type || "Stockbroker"}
                          </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Account Opening">
                          <Text
                            strong
                            className={
                              broker.accountOpening === "Free"
                                ? "text-emerald-600"
                                : "text-blue-600"
                            }
                          >
                            {broker.accountOpening}
                          </Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="AMC">
                          <Text
                            strong
                            className={
                              broker.accountMaintenance === "Free" ||
                              broker.accountMaintenance === 0
                                ? "text-emerald-600"
                                : "text-blue-600"
                            }
                          >
                            {broker.accountMaintenance}
                          </Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Rating">
                          <Rate
                            disabled
                            value={broker.rating}
                            style={{ fontSize: "14px" }}
                          />
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>

                    {broker.platforms && broker.platforms.length > 0 && (
                      <Card
                        title={
                          <span className="flex items-center gap-2 text-gray-800">
                            <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center">
                              <DesktopOutlined className="text-white text-xs" />
                            </div>
                            Trading Platforms
                          </span>
                        }
                        className="border-0 shadow-lg"
                        style={{ borderRadius: "16px" }}
                      >
                        <List
                          size="small"
                          dataSource={broker.platforms}
                          renderItem={(platform) => (
                            <List.Item className="py-2">
                              <div className="flex items-center gap-2">
                                <DesktopOutlined className="text-purple-500" />
                                <Text className="text-gray-700">
                                  {platform}
                                </Text>
                              </div>
                            </List.Item>
                          )}
                        />
                      </Card>
                    )}
                  </Col>
                </Row>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <span className="flex items-center gap-2 font-medium">
                  <WalletOutlined />
                  Brokerage & Charges
                </span>
              }
              key="charges"
            >
              <div className="px-4 md:px-6">
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={12}>
                    <Card
                      className="border-0 shadow-lg"
                      style={{ borderRadius: "16px" }}
                    >
                      <Title
                        level={4}
                        className="flex items-center gap-2 text-gray-800 mb-4"
                      >
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <WalletOutlined className="text-white text-sm" />
                        </div>
                        Brokerage Charges
                      </Title>
                      {isMobile ? (
                        <div className="space-y-3">
                          {brokerageData.map((item) => (
                            <Card
                              key={item.key}
                              size="small"
                              className="bg-gray-50"
                            >
                              <div className="flex justify-between items-center">
                                <Text strong className="text-gray-700">
                                  {item.segment}
                                </Text>
                                <Tag
                                  color={
                                    item.charges === "Zero" ||
                                    item.charges === "Free"
                                      ? "green"
                                      : "blue"
                                  }
                                >
                                  {item.charges}
                                </Tag>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <Table
                          dataSource={brokerageData}
                          columns={brokerageColumns}
                          pagination={false}
                          size="middle"
                          className="custom-table"
                        />
                      )}
                    </Card>
                  </Col>
                  {broker.margins && (
                    <Col xs={24} lg={12}>
                      <Card
                        className="border-0 shadow-lg"
                        style={{ borderRadius: "16px" }}
                      >
                        <Title
                          level={4}
                          className="flex items-center gap-2 text-gray-800 mb-4"
                        >
                          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <LineChartOutlined className="text-white text-sm" />
                          </div>
                          Margin Information
                        </Title>
                        {isMobile ? (
                          <div className="space-y-3">
                            {marginData.map((item) => (
                              <Card
                                key={item.key}
                                size="small"
                                className="bg-gray-50"
                              >
                                <div className="flex justify-between items-center">
                                  <Text strong className="text-gray-700">
                                    {item.segment}
                                  </Text>
                                  <Tag color="blue">{item.margin}</Tag>
                                </div>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <Table
                            dataSource={marginData}
                            columns={marginColumns}
                            pagination={false}
                            size="middle"
                            className="custom-table"
                          />
                        )}
                      </Card>
                    </Col>
                  )}
                </Row>
              </div>
            </Tabs.TabPane>

            {(broker.pros || broker.cons) && (
              <Tabs.TabPane
                tab={
                  <span className="flex items-center gap-2 font-medium">
                    <CheckCircleOutlined />
                    Pros & Cons
                  </span>
                }
                key="proscons"
              >
                <div className="px-4 md:px-6">
                  <Row gutter={[24, 24]}>
                    {broker.pros && broker.pros.length > 0 && (
                      <Col xs={24} lg={12}>
                        <Card
                          title={
                            <span className="flex items-center gap-2 text-emerald-600">
                              <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
                                <CheckCircleOutlined className="text-white text-xs" />
                              </div>
                              Advantages
                            </span>
                          }
                          className="h-full border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50"
                          style={{ borderRadius: "16px" }}
                        >
                          <List
                            dataSource={broker.pros}
                            renderItem={(pro) => (
                              <List.Item className="py-3 border-b border-emerald-100 last:border-b-0">
                                <div className="flex items-start gap-3">
                                  <CheckCircleOutlined className="text-emerald-500 text-lg mt-0.5 flex-shrink-0" />
                                  <Text className="text-gray-700">{pro}</Text>
                                </div>
                              </List.Item>
                            )}
                          />
                        </Card>
                      </Col>
                    )}

                    {broker.cons && broker.cons.length > 0 && (
                      <Col xs={24} lg={12}>
                        <Card
                          title={
                            <span className="flex items-center gap-2 text-red-600">
                              <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center">
                                <CloseCircleOutlined className="text-white text-xs" />
                              </div>
                              Disadvantages
                            </span>
                          }
                          className="h-full border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-50"
                          style={{ borderRadius: "16px" }}
                        >
                          <List
                            dataSource={broker.cons}
                            renderItem={(con) => (
                              <List.Item className="py-3 border-b border-red-100 last:border-b-0">
                                <div className="flex items-start gap-3">
                                  <CloseCircleOutlined className="text-red-500 text-lg mt-0.5 flex-shrink-0" />
                                  <Text className="text-gray-700">{con}</Text>
                                </div>
                              </List.Item>
                            )}
                          />
                        </Card>
                      </Col>
                    )}
                  </Row>
                </div>
              </Tabs.TabPane>
            )}

            {broker.charges && (
              <Tabs.TabPane
                tab={
                  <span className="flex items-center gap-2 font-medium">
                    <PercentageOutlined />
                    Detailed Charges
                  </span>
                }
                key="detailedcharges"
              >
                <div className="px-4 md:px-6">
                  <Alert
                    message="Detailed Charges Breakdown"
                    description="Complete breakdown of all charges including transaction charges, GST, STT, and SEBI charges for different trading segments."
                    type="info"
                    showIcon
                    className="mb-6 border-0 shadow-sm"
                    style={{ borderRadius: "12px" }}
                  />

                  <Row gutter={[24, 24]}>
                    <Col xs={24} lg={12}>
                      <Card
                        title={
                          <span className="flex items-center gap-2 text-emerald-600">
                            <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
                              <LineChartOutlined className="text-white text-xs" />
                            </div>
                            Delivery Trading Charges
                          </span>
                        }
                        className="border-0 shadow-lg"
                        style={{ borderRadius: "16px" }}
                      >
                        <Descriptions
                          column={1}
                          size="small"
                          bordered
                          className="custom-descriptions"
                        >
                          <Descriptions.Item label="Transaction Charges (BSE)">
                            {formatDisplayValue(broker.charges.delivery.transactionCharges.BSE)}
                          </Descriptions.Item>
                          <Descriptions.Item label="Transaction Charges (NSE)">
                            {formatDisplayValue(broker.charges.delivery.transactionCharges.NSE)}
                          </Descriptions.Item>
                          <Descriptions.Item label="DP Charges">
                            {formatDisplayValue(broker.charges.delivery.dpCharges)}
                          </Descriptions.Item>
                          <Descriptions.Item label="GST">
                            {broker.charges.delivery.gst}
                          </Descriptions.Item>
                          <Descriptions.Item label="STT">
                            {broker.charges.delivery.stt}
                          </Descriptions.Item>
                          <Descriptions.Item label="SEBI Charges">
                            {broker.charges.delivery.sebiCharges}
                          </Descriptions.Item>
                        </Descriptions>
                      </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                      <Card
                        title={
                          <span className="flex items-center gap-2 text-blue-600">
                            <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                              <ThunderboltOutlined className="text-white text-xs" />
                            </div>
                            Intraday Trading Charges
                          </span>
                        }
                        className="border-0 shadow-lg"
                        style={{ borderRadius: "16px" }}
                      >
                        <Descriptions
                          column={1}
                          size="small"
                          bordered
                          className="custom-descriptions"
                        >
                          <Descriptions.Item label="Transaction Charges (BSE)">
                            {formatDisplayValue(broker.charges.intraday.transactionCharges.BSE)}
                          </Descriptions.Item>
                          <Descriptions.Item label="Transaction Charges (NSE)">
                            {formatDisplayValue(broker.charges.intraday.transactionCharges.NSE)}
                          </Descriptions.Item>
                          <Descriptions.Item label="DP Charges">
                            {formatDisplayValue(broker.charges.intraday.dpCharge)}
                          </Descriptions.Item>
                          <Descriptions.Item label="GST">
                            {broker.charges.intraday.gst}
                          </Descriptions.Item>
                          <Descriptions.Item label="STT">
                            {broker.charges.intraday.stt}
                          </Descriptions.Item>
                          <Descriptions.Item label="SEBI Charges">
                            {broker.charges.intraday.sebiCharges}
                          </Descriptions.Item>
                        </Descriptions>
                      </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                      <Card
                        title={
                          <span className="flex items-center gap-2 text-orange-600">
                            <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center">
                              <FireOutlined className="text-white text-xs" />
                            </div>
                            Futures Trading Charges
                          </span>
                        }
                        className="border-0 shadow-lg"
                        style={{ borderRadius: "16px" }}
                      >
                        <Descriptions
                          column={1}
                          size="small"
                          bordered
                          className="custom-descriptions"
                        >
                          <Descriptions.Item label="Transaction Charges (BSE)">
                            {formatDisplayValue(broker.charges.futures.transactionCharges.BSE)}
                          </Descriptions.Item>
                          <Descriptions.Item label="Transaction Charges (NSE)">
                            {formatDisplayValue(broker.charges.futures.transactionCharges.NSE)}
                          </Descriptions.Item>
                          <Descriptions.Item label="Clearing Charges">
                            {typeof broker.charges.futures.clearingCharges ===
                            "object"
                              ? formatDisplayValue(broker.charges.futures.clearingCharges.NSE ||
                                broker.charges.futures.clearingCharges.BSE)
                              : formatDisplayValue(broker.charges.futures.clearingCharges)}
                          </Descriptions.Item>
                          <Descriptions.Item label="GST">
                            {broker.charges.futures.gst}
                          </Descriptions.Item>
                          <Descriptions.Item label="STT">
                            {broker.charges.futures.stt}
                          </Descriptions.Item>
                          <Descriptions.Item label="SEBI Charges">
                            {broker.charges.futures.sebiCharges}
                          </Descriptions.Item>
                        </Descriptions>
                      </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                      <Card
                        title={
                          <span className="flex items-center gap-2 text-purple-600">
                            <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center">
                              <PercentageOutlined className="text-white text-xs" />
                            </div>
                            Options Trading Charges
                          </span>
                        }
                        className="border-0 shadow-lg"
                        style={{ borderRadius: "16px" }}
                      >
                        <Descriptions
                          column={1}
                          size="small"
                          bordered
                          className="custom-descriptions"
                        >
                          <Descriptions.Item label="Transaction Charges (BSE)">
                            {formatDisplayValue(broker.charges.options.transactionCharges.BSE)}
                          </Descriptions.Item>
                          <Descriptions.Item label="Transaction Charges (NSE)">
                            {formatDisplayValue(broker.charges.options.transactionCharges.NSE)}
                          </Descriptions.Item>
                          <Descriptions.Item label="Clearing Charges">
                            {typeof broker.charges.options.clearingCharges ===
                            "object"
                              ? formatDisplayValue(broker.charges.options.clearingCharges.NSE ||
                                broker.charges.options.clearingCharges.BSE)
                              : formatDisplayValue(broker.charges.options.clearingCharges)}
                          </Descriptions.Item>
                          <Descriptions.Item label="GST">
                            {broker.charges.options.gst}
                          </Descriptions.Item>
                          <Descriptions.Item label="STT">
                            {broker.charges.options.stt}
                          </Descriptions.Item>
                          <Descriptions.Item label="SEBI Charges">
                            {broker.charges.options.sebiCharges}
                          </Descriptions.Item>
                        </Descriptions>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Tabs.TabPane>
            )}

            {broker.additionalFeatures && (
              <Tabs.TabPane
                tab={
                  <span className="flex items-center gap-2 font-medium">
                    <TrophyOutlined />
                    Features & Services
                  </span>
                }
                key="features"
              >
                <div className="px-4 md:px-6">
                  <Row gutter={[24, 24]}>
                    <Col xs={24} lg={12}>
                      <Card
                        title={
                          <span className="flex items-center gap-2 text-gray-800">
                            <div className="w-6 h-6 bg-indigo-500 rounded-md flex items-center justify-center">
                              <TrophyOutlined className="text-white text-xs" />
                            </div>
                            Additional Features
                          </span>
                        }
                        className="border-0 shadow-lg"
                        style={{ borderRadius: "16px" }}
                      >
                        <List
                          dataSource={Object.entries(broker.additionalFeatures)}
                          renderItem={([feature, available]) => (
                            <List.Item className="py-3 border-b border-gray-100 last:border-b-0">
                              <div className="flex items-start gap-3">
                                {available ? (
                                  <CheckCircleOutlined className="text-emerald-500 text-lg mt-0.5 flex-shrink-0" />
                                ) : (
                                  <CloseCircleOutlined className="text-red-500 text-lg mt-0.5 flex-shrink-0" />
                                )}
                                <Text
                                  className={
                                    available
                                      ? "text-gray-700"
                                      : "text-gray-400"
                                  }
                                >
                                  {feature
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                                </Text>
                              </div>
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>

                    {broker.otherInvestments &&
                      broker.otherInvestments.length > 0 && (
                        <Col xs={24} lg={12}>
                          <Card
                            title={
                              <span className="flex items-center gap-2 text-gray-800">
                                <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center">
                                  <GlobalOutlined className="text-white text-xs" />
                                </div>
                                Other Investment Options
                              </span>
                            }
                            className="border-0 shadow-lg"
                            style={{ borderRadius: "16px" }}
                          >
                            <Space wrap>
                              {broker.otherInvestments.map(
                                (investment, index) => (
                                  <Tag
                                    key={index}
                                    className="px-3 py-1 text-sm font-medium border-0 shadow-sm"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                                      color: "white",
                                      borderRadius: "16px",
                                    }}
                                  >
                                    {investment.charAt(0).toUpperCase() +
                                      investment.slice(1)}
                                  </Tag>
                                )
                              )}
                            </Space>
                          </Card>
                        </Col>
                      )}
                  </Row>
                </div>
              </Tabs.TabPane>
            )}
          </Tabs>
        </Card>

        {/* Enhanced Action Buttons */}
        <div className="mt-8 space-y-6">
          {/* Primary CTA */}
          <Card
            className="border-0 shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "20px",
            }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10 text-center py-8 px-6">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CrownOutlined className="text-white text-2xl" />
                  </div>
                  <Title level={3} className="!text-white !mb-2">
                    Ready to Start Trading?
                  </Title>
                  <Text className="text-white/90 text-lg">
                    Join thousands of traders who trust {broker.name}
                  </Text>
                </div>

                <Button
                  type="primary"
                  size="large"
                  className="h-14 px-8 text-lg font-semibold border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 focus-ring"
                  style={{
                    background: "#fff",
                    color: "#667eea",
                    borderRadius: "12px",
                    minWidth: isMobile ? "100%" : "280px",
                  }}
                  icon={<CrownOutlined />}
                  aria-label={`Open trading account with ${broker.name}`}
                >
                  Open Account with {broker.name}
                </Button>
              </div>
            </div>
          </Card>

          {/* Secondary Actions */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ borderRadius: "16px" }}
              >
                <div className="py-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <GlobalOutlined className="text-white text-lg" />
                  </div>
                  <Text strong className="text-gray-800 block mb-2">
                    Visit Website
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    Explore official website
                  </Text>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={8}>
              <Card
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ borderRadius: "16px" }}
              >
                <div className="py-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <PhoneOutlined className="text-white text-lg" />
                  </div>
                  <Text strong className="text-gray-800 block mb-2">
                    Contact Support
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    Get help & assistance
                  </Text>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={8}>
              <Card
                className={`text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  broker && isBrokerInComparison(broker.id) ? 'ring-2 ring-purple-500' : ''
                }`}
                style={{ borderRadius: "16px" }}
                onClick={handleComparisonToggle}
              >
                <div className="py-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${
                    broker && isBrokerInComparison(broker.id)
                      ? 'from-green-500 to-emerald-600'
                      : 'from-purple-500 to-violet-600'
                  } rounded-full flex items-center justify-center mx-auto mb-3`}>
                    {broker && isBrokerInComparison(broker.id) ? (
                      <CheckCircleOutlined className="text-white text-lg" />
                    ) : (
                      <ShareAltOutlined className="text-white text-lg" />
                    )}
                  </div>
                  <Text strong className="text-gray-800 block mb-2">
                    {broker && isBrokerInComparison(broker.id) ? 'Added to Compare' : 'Add to Compare'}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {broker && isBrokerInComparison(broker.id)
                      ? 'Click to remove from comparison'
                      : 'Compare with other brokers'
                    }
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BrokerDetailPage;
