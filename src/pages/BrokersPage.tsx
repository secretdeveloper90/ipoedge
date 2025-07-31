import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Typography,
  Rate,
  Breadcrumb,
  Table,
  Tag,
  Input,
  Select,
  Space,
  Alert,
  Checkbox,
  Badge,
  Affix,
} from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  ReloadOutlined,
  SwapOutlined,
  EyeOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useBrokers } from "../hooks";
import { ROUTES } from "../constants";
import {
  SkeletonCard,
  EmptyState,
  ResponsiveImage,
} from "../components/common";
import {
  formatBrokerValue,
  getBrokerStatusColor,
} from "../utils/brokerValidation";
import { brokerNameToSlug } from "../utils";
import { useBrokerComparison } from "../contexts/BrokerComparisonContext";
import { trackComparisonEvent } from "../utils/comparisonUtils";

const { Title, Text } = Typography;
const { Option } = Select;

const BrokersPage: React.FC = () => {
  const { brokers, loading, error, refetch } = useBrokers();
  const {
    addBroker,
    removeBroker,
    isBrokerInComparison,
    comparisonCount,
    canAddMoreBrokers,
  } = useBrokerComparison();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle broker comparison
  const handleComparisonToggle = (broker: any, checked: boolean) => {
    if (checked) {
      const success = addBroker(broker);
      if (success) {
        trackComparisonEvent("add_broker", broker.name, {
          source: "broker_listing",
          total_count: comparisonCount + 1,
        });
      }
    } else {
      removeBroker(broker.id);
      trackComparisonEvent("remove_broker", broker.name, {
        source: "broker_listing",
        total_count: comparisonCount - 1,
      });
    }
  };

  // Filter and sort brokers
  const filteredBrokers = brokers
    .filter((broker) => {
      const query = searchQuery.toLowerCase();
      return (
        broker.name.toLowerCase().includes(query) ||
        broker.type.toLowerCase().includes(query) ||
        broker.services.some((service) =>
          service.toLowerCase().includes(query)
        ) ||
        broker.platforms.some((platform) =>
          platform.toLowerCase().includes(query)
        ) ||
        broker.features?.some((feature) =>
          feature.toLowerCase().includes(query)
        )
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "accountOpening": {
          const aOpening =
            a.accountOpening === "Free" ? 0 : Number(a.accountOpening);
          const bOpening =
            b.accountOpening === "Free" ? 0 : Number(b.accountOpening);
          return aOpening - bOpening;
        }
        case "accountMaintenance": {
          const aMaintenance =
            a.accountMaintenance === "Free" ? 0 : Number(a.accountMaintenance);
          const bMaintenance =
            b.accountMaintenance === "Free" ? 0 : Number(b.accountMaintenance);
          return aMaintenance - bMaintenance;
        }
        default:
          return 0;
      }
    });

  // Desktop table columns
  const desktopTableColumns = [
    {
      title: "",
      key: "compare",
      width: 50,
      fixed: "left" as const,
      render: (_: any, record: (typeof brokers)[0]) => (
        <Checkbox
          checked={isBrokerInComparison(record.id)}
          onChange={(e) => handleComparisonToggle(record, e.target.checked)}
          disabled={!canAddMoreBrokers && !isBrokerInComparison(record.id)}
        />
      ),
    },
    {
      title: "Broker",
      dataIndex: "name",
      key: "name",
      width: 250,
      fixed: "left" as const,
      render: (text: string, record: (typeof brokers)[0]) => (
        <div className="flex items-center space-x-3">
          <ResponsiveImage
            src={record.logo}
            alt={record.name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <Text strong>{text}</Text>
            <div>
              <Rate
                disabled
                defaultValue={record.rating}
                allowHalf
                className="text-xs"
              />
              <Text className="text-gray-500 ml-2">({record.rating})</Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Account Opening",
      dataIndex: "accountOpening",
      key: "accountOpening",
      width: 140,
      render: (value: string | number) => (
        <Tag color={getBrokerStatusColor(value)}>
          {formatBrokerValue(value)}
        </Tag>
      ),
    },
    {
      title: "AMC",
      dataIndex: "accountMaintenance",
      key: "accountMaintenance",
      width: 120,
      render: (value: string | number) => (
        <Tag color={getBrokerStatusColor(value)}>
          {formatBrokerValue(value)}
        </Tag>
      ),
    },
    {
      title: "Equity Delivery",
      dataIndex: ["brokerage", "equityDelivery"],
      key: "equityDelivery",
      width: 140,
      render: (value: string | number) => (
        <Tag color={getBrokerStatusColor(value)}>
          {formatBrokerValue(value)}
        </Tag>
      ),
    },
    {
      title: "Equity Intraday",
      dataIndex: ["brokerage", "equityIntraday"],
      key: "equityIntraday",
      width: 140,
      render: (value: string) => (
        <Tag color={getBrokerStatusColor(value)}>
          {formatBrokerValue(value)}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 180,
      fixed: "right" as const,
      render: (_: any, record: any) => (
        <Space>
          <Link to={`/broker/${brokerNameToSlug(record.name)}`}>
            <Button type="link" size="small">
              Details
            </Button>
          </Link>
          <Button type="primary" size="small">
            Open Account
          </Button>
        </Space>
      ),
    },
  ];

  // Mobile table columns (enhanced UI)
  const mobileTableColumns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: (typeof brokers)[0]) => (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <ResponsiveImage
                  src={record.logo}
                  alt={record.name}
                  className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-100"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <Text strong className="text-base text-gray-800 block">
                  {text}
                </Text>
                <div className="flex items-center mt-1">
                  <Rate
                    disabled
                    defaultValue={record.rating}
                    allowHalf
                    className="text-sm"
                  />
                  <Text className="text-gray-500 ml-2 text-sm font-medium">
                    ({record.rating})
                  </Text>
                </div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end space-y-2">
              <Checkbox
                checked={isBrokerInComparison(record.id)}
                onChange={(e) =>
                  handleComparisonToggle(record, e.target.checked)
                }
                disabled={
                  !canAddMoreBrokers && !isBrokerInComparison(record.id)
                }
              />
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">
                  Rank
                </div>
                <div className="text-lg font-bold text-blue-600">
                  #{Math.floor(Math.random() * 10) + 1}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-xs text-gray-500 uppercase tracking-wide">
                    Opening
                  </Text>
                  <div className="mt-1">
                    <Tag
                      color={getBrokerStatusColor(record.accountOpening)}
                      className="font-semibold border-0 shadow-sm"
                    >
                      {formatBrokerValue(record.accountOpening)}
                    </Tag>
                  </div>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-xs text-gray-500 uppercase tracking-wide">
                    AMC
                  </Text>
                  <div className="mt-1">
                    <Tag
                      color={getBrokerStatusColor(record.accountMaintenance)}
                      className="font-semibold border-0 shadow-sm"
                    >
                      {formatBrokerValue(record.accountMaintenance)}
                    </Tag>
                  </div>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path
                      fillRule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-xs text-gray-500 uppercase tracking-wide">
                    Delivery
                  </Text>
                  <div className="mt-1">
                    <Tag
                      color={getBrokerStatusColor(
                        record.brokerage?.equityDelivery
                      )}
                      className="font-semibold border-0 shadow-sm"
                    >
                      {formatBrokerValue(record.brokerage?.equityDelivery)}
                    </Tag>
                  </div>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-xs text-gray-500 uppercase tracking-wide">
                    Intraday
                  </Text>
                  <div className="mt-1">
                    <Tag
                      color={getBrokerStatusColor(
                        record.brokerage?.equityIntraday
                      )}
                      className="font-semibold border-0 shadow-sm"
                    >
                      {formatBrokerValue(record.brokerage?.equityIntraday)}
                    </Tag>
                  </div>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Link
              to={`/broker/${brokerNameToSlug(record.name)}`}
              className="flex-1"
            >
              <Button
                type="default"
                size="middle"
                className="w-full h-10 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 font-medium rounded-lg transition-all duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Details
              </Button>
            </Link>
            <Button
              type="primary"
              size="middle"
              className="flex-1 h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Open Account
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-500">Active</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-500">Est. 2010</span>
                </div>
              </div>
              <div className="text-gray-400">
                {record.services.length} Services
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

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
          <Breadcrumb.Item>Brokers</Breadcrumb.Item>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-8">
          <Title level={1} className="mb-2">
            Details of India's Top Stock Brokers
          </Title>
          <Text className="text-gray-600">
            Analyze account charges, AMC, trading fees, and platform services to
            choose the right broker for you.
          </Text>
        </div>

        {/* Floating Comparison Button */}
        {comparisonCount > 0 && (
          <Affix offsetBottom={20}>
            <div className="fixed bottom-6 right-6 z-50">
              <Link to={ROUTES.BROKER_COMPARE}>
                <Badge count={comparisonCount} offset={[-5, 5]}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<SwapOutlined />}
                    className="shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Compare Brokers
                  </Button>
                </Badge>
              </Link>
            </div>
          </Affix>
        )}

        {/* Error State */}
        {error && (
          <Alert
            message="Error Loading Brokers"
            description={error}
            type="error"
            showIcon
            action={
              <Button size="small" icon={<ReloadOutlined />} onClick={refetch}>
                Retry
              </Button>
            }
            className="mb-6"
          />
        )}

        {/* Filters and Controls */}
        <Card className="mb-6">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="Search brokers..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
              />
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Select
                placeholder="Sort by"
                style={{ width: "100%" }}
                value={sortBy}
                onChange={setSortBy}
              >
                <Option value="rating">Rating</Option>
                <Option value="name">Name</Option>
                <Option value="accountOpening">Account Opening</Option>
                <Option value="accountMaintenance">Account Maintenance</Option>
              </Select>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Select
                placeholder="View"
                style={{ width: "100%" }}
                value={viewMode}
                onChange={setViewMode}
              >
                <Option value="grid">Grid View</Option>
                <Option value="table">Table View</Option>
              </Select>
            </Col>
          </Row>
        </Card>

        {/* Content */}
        {loading ? (
          <Row gutter={[24, 24]}>
            {Array.from({ length: 8 }, (_, index) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={index}>
                <SkeletonCard loading={true} />
              </Col>
            ))}
          </Row>
        ) : filteredBrokers.length === 0 ? (
          <EmptyState
            title="No brokers found"
            description="Try adjusting your search criteria."
          />
        ) : viewMode === "grid" ? (
          <Row gutter={[24, 24]}>
            {filteredBrokers.map((broker) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={broker.id}>
                <Card
                  className="card-hover h-full animate-fadeIn shadow-xl"
                  cover={
                    <div className="p-4 bg-gray-50 text-center">
                      <ResponsiveImage
                        src={broker.logo}
                        alt={broker.name}
                        className="w-16 h-16 mx-auto rounded-lg object-cover mb-3"
                      />
                      <Title level={4} className="mb-2">
                        {broker.name}
                      </Title>
                      <div className="flex items-center justify-center">
                        <Rate disabled defaultValue={broker.rating} allowHalf />
                        <Text className="text-gray-500 ml-2">
                          ({broker.rating})
                        </Text>
                      </div>
                    </div>
                  }
                  actions={[
                    <div
                      key="actions"
                      className="flex flex-col gap-3 w-full p-2"
                    >
                      {/* Primary Action Button */}
                      <Button
                        type="primary"
                        size="middle"
                        className="w-full h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        style={{
                          background:
                            "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                          boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                        }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          Open Account
                        </span>
                      </Button>

                      {/* Secondary Actions */}
                      <div className="flex gap-2">
                        <Link
                          to={`/broker/${brokerNameToSlug(broker.name)}`}
                          className="flex-1"
                        >
                          <Button className="w-full h-9 bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md">
                            <span className="flex items-center justify-center gap-1.5">
                              <EyeOutlined className="text-sm" />
                              Details
                            </span>
                          </Button>
                        </Link>

                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleComparisonToggle(
                              broker,
                              !isBrokerInComparison(broker.id)
                            );
                          }}
                          disabled={
                            !canAddMoreBrokers &&
                            !isBrokerInComparison(broker.id)
                          }
                          className={`flex-1 h-9 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                            isBrokerInComparison(broker.id)
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 border-0 text-white hover:from-green-600 hover:to-emerald-600"
                              : "bg-white border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-purple-600 hover:text-purple-700"
                          }`}
                          style={
                            isBrokerInComparison(broker.id)
                              ? {
                                  background:
                                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                  boxShadow:
                                    "0 2px 10px rgba(16, 185, 129, 0.3)",
                                }
                              : {}
                          }
                        >
                          <span className="flex items-center justify-center gap-1.5">
                            {isBrokerInComparison(broker.id) ? (
                              <>
                                <CheckCircleOutlined className="text-sm" />
                                Added
                              </>
                            ) : (
                              <>
                                <SwapOutlined className="text-sm" />
                                Compare
                              </>
                            )}
                          </span>
                        </Button>
                      </div>
                    </div>,
                  ]}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Text strong>Account Opening:</Text>
                      <Tag color={getBrokerStatusColor(broker.accountOpening)}>
                        {formatBrokerValue(broker.accountOpening)}
                      </Tag>
                    </div>

                    <div className="flex justify-between">
                      <Text strong>AMC:</Text>
                      <Tag
                        color={getBrokerStatusColor(broker.accountMaintenance)}
                      >
                        {formatBrokerValue(broker.accountMaintenance)}
                      </Tag>
                    </div>

                    <div className="flex justify-between">
                      <Text strong>Equity Delivery:</Text>
                      <Tag
                        color={getBrokerStatusColor(
                          broker.brokerage?.equityDelivery
                        )}
                      >
                        {formatBrokerValue(broker.brokerage?.equityDelivery)}
                      </Tag>
                    </div>

                    <div className="flex justify-between">
                      <Text strong>Equity Intraday:</Text>
                      <Tag
                        color={getBrokerStatusColor(
                          broker.brokerage?.equityIntraday
                        )}
                      >
                        {formatBrokerValue(broker.brokerage?.equityIntraday)}
                      </Tag>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <Text className="text-gray-600 text-sm">
                        Services: {broker.services.slice(0, 3).join(", ")}
                        {broker.services.length > 3 && "..."}
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className={isMobile ? "space-y-4" : ""}>
            {isMobile ? (
              <div className="bg-transparent">
                <Table
                  dataSource={filteredBrokers}
                  columns={mobileTableColumns}
                  rowKey="id"
                  showHeader={false}
                  pagination={{
                    pageSize: 5,
                    simple: true,
                    className: "text-center mt-6",
                  }}
                  size="small"
                  className="mobile-table"
                />
              </div>
            ) : (
              <Card>
                <div className="overflow-x-auto">
                  <Table
                    dataSource={filteredBrokers}
                    columns={desktopTableColumns}
                    rowKey="id"
                    scroll={{ x: 1200 }}
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} brokers`,
                      className: "pagination-center",
                    }}
                  />
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrokersPage;
