import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Typography,
  Breadcrumb,
  Alert,
  Badge,
  Card,
  Table,
  Tag
} from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  ShareAltOutlined,
  HeartOutlined,
  HeartFilled,
  BuildOutlined,
  RiseOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  ShoppingOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  DollarOutlined,
  BankOutlined,
  TeamOutlined,
  FileTextOutlined,
  TrophyOutlined,
  SafetyOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LinkOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useIPOByName } from '../hooks';
import { Loading, ResponsiveImage } from '../components/common';
import { ROUTES } from '../constants';
import { formatDate } from '../utils';
import { favoriteIPOsStorage } from '../services/storage';
import { getIPODetailPageSEO } from '../utils/seoUtils';
import {
  formatCurrencyValue,
  formatSubscriptionTimes,
  formatSharesCount,
  calculateSubscriptionWidth,
  isOversubscribed,
  formatSubscriptionStatus
} from '../utils/formatUtils';

const { Title, Text } = Typography;

const IPODetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { ipo, loading, error } = useIPOByName(name || '');
  const [isFavorite, setIsFavorite] = React.useState(false);

  // SEO optimization
  React.useEffect(() => {
    if (ipo) {
      // Apply SEO when IPO data is loaded
      const seoData = getIPODetailPageSEO(ipo);
      // We need to manually update meta tags since we can't use hooks conditionally
      document.title = seoData.title || '';

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', seoData.description || '');
      }
    }
  }, [ipo]);

  React.useEffect(() => {
    if (ipo) {
      setIsFavorite(favoriteIPOsStorage.isFavorite(ipo.id));
    }
  }, [ipo]);

  const handleFavoriteToggle = () => {
    if (!ipo) return;

    favoriteIPOsStorage.toggle(ipo.id);
    setIsFavorite(!isFavorite);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current': return <CheckCircleOutlined />;
      case 'upcoming': return <ClockCircleOutlined />;
      case 'listed': return <RiseOutlined />;
      case 'closed': return <ExclamationCircleOutlined />;
      default: return <InfoCircleOutlined />;
    }
  };

  const getOfferPriceText = () => {
    if (!ipo) return '';
    if (typeof ipo.offerPrice === 'number') {
      return `₹${ipo.offerPrice}`;
    }
    if (ipo.offerPrice.min === ipo.offerPrice.max) {
      return `₹${ipo.offerPrice.min}`;
    }
    return `₹${ipo.offerPrice.min} - ₹${ipo.offerPrice.max}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading size="large" />
      </div>
    );
  }

  if (error || !ipo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert
          message="Error"
          description={error || "IPO not found"}
          type="error"
          showIcon
          action={
            <Link to={ROUTES.IPO}>
              <Button size="small" type="primary">
                Back to IPO List
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      
      {/* Navigation */}
      <div className="top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={ROUTES.HOME} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                <HomeOutlined className="mr-2" />
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={ROUTES.IPO} className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                IPO
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="text-gray-800 font-semibold">{ipo.name}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 sm:px-8 lg:px-12 py-6 sm:py-8 relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute inset-0 bg-white/5 bg-grid-pattern opacity-30"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

              <div className="relative z-10">
                <Row gutter={[24, 24]} align="middle">
                  {/* Company Logo */}
                  <Col xs={24} sm={8} md={6} lg={5}>
                    <div className="flex justify-center sm:justify-start">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-white/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                        <ResponsiveImage
                          src={ipo.logo || "https://media.ipoji.com/ipo/images/ipo.png"}
                          alt={ipo.name}
                          className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 object-contain bg-white rounded-3xl shadow-2xl border-3 border-white/40 group-hover:scale-105 transition-all duration-300 p-3"
                          fallbackSrc="https://media.ipoji.com/ipo/images/ipo.png"
                        />
                        <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-3 border-white">
                          <CheckCircleOutlined className="text-white text-base" />
                        </div>
                        <div
                          className="absolute -top-2 -left-2 z-10"
                          style={{
                            background: ipo.category === 'mainboard'
                              ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                              : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            color: 'white',
                            fontSize: '10px',
                            fontWeight: '800',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            border: '2px solid white',
                            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.8px',
                            minWidth: 'fit-content',
                            whiteSpace: 'nowrap',
                            transform: 'rotate(-5deg)',
                            transformOrigin: 'center'
                          }}
                        >
                          {ipo.category === 'mainboard' ? 'MAINBOARD' : 'SME'}
                        </div>
                      </div>
                    </div>
                  </Col>

                  {/* Company Information */}
                  <Col xs={24} sm={16} md={18} lg={19}>
                    <div className="text-center sm:text-left">
                      <Title level={1} className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                        {ipo.name}
                      </Title>

                      {/* Status and Info Tags */}
                      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 mb-4">
                        <div className="bg-white/25 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border-2 border-white/40 shadow-lg hover:bg-white/30 transition-all duration-300">
                          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
                            {getStatusIcon(ipo.status)}
                            <Text className="font-semibold text-white text-xs sm:text-sm tracking-wide">
                              {ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)}
                            </Text>
                          </div>
                        </div>
                        <div className="bg-white/25 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border-2 border-white/40 shadow-lg hover:bg-white/30 transition-all duration-300">
                          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
                            <CalendarOutlined className="text-white text-sm sm:text-base" />
                            <Text className="font-semibold text-white text-xs sm:text-sm tracking-wide">
                              {formatDate(ipo.offerDate.start)} - {formatDate(ipo.offerDate.end)}
                            </Text>
                          </div>
                        </div>
                        <div className="bg-white/25 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border-2 border-white/40 shadow-lg hover:bg-white/30 transition-all duration-300">
                          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
                            <GlobalOutlined className="text-white text-sm sm:text-base" />
                            <Text className="font-semibold text-white text-xs sm:text-sm tracking-wide">{ipo.exchange}</Text>
                          </div>
                        </div>
                        <div className="bg-white/25 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border-2 border-white/40 shadow-lg hover:bg-white/30 transition-all duration-300">
                          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
                            <BuildOutlined className="text-white text-sm sm:text-base" />
                            <Text className="font-semibold text-white text-xs sm:text-sm tracking-wide">{ipo.sector || 'Sector TBD'}</Text>
                          </div>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <Row gutter={[8, 8]}>
                        <Col xs={12} sm={6} md={6}>
                          <div className="bg-white/15 backdrop-blur-sm p-1 sm:p-3 rounded-xl border border-white/20 text-center">
                            <div className="flex items-center justify-center mb-1">
                              <DollarOutlined className="mr-1 text-white text-sm sm:text-lg" />
                              <Text className="text-white/80 text-xs font-medium">Issue Size</Text>
                            </div>
                            <Text className="text-white text-sm sm:text-base font-bold break-words">{ipo.issueSize}</Text>
                          </div>
                        </Col>

                        <Col xs={12} sm={6} md={6}>
                          <div className="bg-white/15 backdrop-blur-sm p-1 sm:p-3 rounded-xl border border-white/20 text-center">
                            <div className="flex items-center justify-center mb-1">
                              <ShoppingOutlined className="mr-1 text-white text-sm sm:text-lg" />
                              <Text className="text-white/80 text-xs font-medium">Lot Size</Text>
                            </div>
                            <Text className="text-white text-sm sm:text-base font-bold">{ipo.lotSize.toLocaleString()}</Text>
                          </div>
                        </Col>

                        <Col xs={12} sm={6} md={6}>
                          <div className="bg-white/15 backdrop-blur-sm p-1 sm:p-3 rounded-xl border border-white/20 text-center">
                            <div className="flex items-center justify-center mb-1">
                              <LineChartOutlined className="mr-1 text-white text-sm sm:text-lg" />
                              <Text className="text-white/80 text-xs font-medium">Listed at</Text>
                            </div>
                            <Text className="text-white text-sm sm:text-base font-bold">{ipo.listingPrice ? `₹${ipo.listingPrice}` : 'TBD'}</Text>
                          </div>
                        </Col>

                        <Col xs={12} sm={6} md={6}>
                          <div className="bg-white/15 backdrop-blur-sm p-1 sm:p-3 rounded-xl border border-white/20 text-center">
                            <div className="flex items-center justify-center mb-1">
                              <TrophyOutlined className="mr-1 text-white text-sm sm:text-lg" />
                              <Text className="text-white/80 text-xs font-medium">GMP</Text>
                            </div>
                            <Text className="text-white text-sm sm:text-base font-bold">
                              {ipo.gmp && ipo.gmp.premium != null ? `₹${ipo.gmp.premium}` : 'N/A'}
                            </Text>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            {/* Offer Price Section */}
            <div className="bg-white px-2 sm:px-8 lg:px-12 py-3 border-t border-gray-200/20">
              <Row gutter={[24, 24]} align="middle">
                <Col xs={24} sm={12} md={8}>
                  <div className="text-center sm:text-left">
                    <Text className="text-gray-600 text-sm font-medium block mb-2">Offer Price Range</Text>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {getOfferPriceText()}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={16}>
                  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-end">
                    <Button
                      type="primary"
                      size="large"
                      className="h-10 sm:h-12 px-4 sm:px-8 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 border-0 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
                    >
                      <RiseOutlined className="mr-1 sm:mr-2" />
                      Apply for IPO
                    </Button>
                    <Button
                      icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                      onClick={handleFavoriteToggle}
                      size="large"
                      className="h-10 sm:h-12 px-3 sm:px-6 rounded-xl font-semibold border-gray-300 hover:border-blue-400 transition-all duration-300 text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">{isFavorite ? 'Favorited' : 'Favorite'}</span>
                    </Button>
                    <Button
                      icon={<ShareAltOutlined />}
                      size="large"
                      className="h-10 sm:h-12 px-3 sm:px-6 rounded-xl font-semibold border-gray-300 hover:border-blue-400 transition-all duration-300 text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          {/* Main Content Grid */}
          <Row gutter={[32, 32]}>
            {/* Left Column - Main Content */}
            <Col xs={24} lg={16}>
              <div className="space-y-8">
                {/* Key Details Section */}
                <Card
                  title={
                    <div className="flex items-center">
                      <InfoCircleOutlined className="mr-3 text-blue-600 text-xl" />
                      <span className="text-xl font-semibold text-gray-800">Key Details</span>
                    </div>
                  }
                  className="shadow-lg border-0 rounded-2xl"
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={12} sm={6} lg={6}>
                      <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-4 lg:p-5 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300 group text-center h-full flex flex-col justify-center">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <DollarOutlined className="text-white text-lg lg:text-xl" />
                        </div>
                        <div className="text-xs text-emerald-700 font-medium mb-1">Issue Size</div>
                        <div className="text-sm lg:text-lg font-bold text-emerald-800 break-words">{ipo.issueSize}</div>
                      </div>
                    </Col>

                    <Col xs={12} sm={6} lg={6}>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-4 lg:p-5 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 group text-center h-full flex flex-col justify-center">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <ShoppingOutlined className="text-white text-lg lg:text-xl" />
                        </div>
                        <div className="text-xs text-blue-700 font-medium mb-1">Lot Size</div>
                        <div className="text-sm lg:text-lg font-bold text-blue-800">{ipo.lotSize.toLocaleString()}</div>
                      </div>
                    </Col>

                    <Col xs={12} sm={6} lg={6}>
                      <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-4 lg:p-5 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300 group text-center h-full flex flex-col justify-center">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <GlobalOutlined className="text-white text-lg lg:text-xl" />
                        </div>
                        <div className="text-xs text-purple-700 font-medium mb-1">Exchange</div>
                        <div className="text-sm lg:text-lg font-bold text-purple-800 break-words">{ipo.exchange}</div>
                      </div>
                    </Col>

                    <Col xs={12} sm={6} lg={6}>
                      <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-4 lg:p-5 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300 group text-center h-full flex flex-col justify-center">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <BuildOutlined className="text-white text-lg lg:text-xl" />
                        </div>
                        <div className="text-xs text-orange-700 font-medium mb-1">Category</div>
                        <div className="text-sm lg:text-lg font-bold text-orange-800">{ipo.category.toUpperCase()}</div>
                      </div>
                    </Col>

                    {/* Additional Key Details */}
                    <Col xs={12} sm={6} lg={6}>
                      <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-4 lg:p-5 rounded-2xl border border-pink-200 hover:shadow-lg transition-all duration-300 group text-center h-full flex flex-col justify-center">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <BankOutlined className="text-white text-lg lg:text-xl" />
                        </div>
                        <div className="text-xs text-pink-700 font-medium mb-1">Face Value</div>
                        <div className="text-sm lg:text-lg font-bold text-pink-800">{ipo.faceValue ? `₹${ipo.faceValue}` : 'N/A'}</div>
                      </div>
                    </Col>

                    <Col xs={12} sm={6} lg={6}>
                      <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-4 lg:p-5 rounded-2xl border border-indigo-200 hover:shadow-lg transition-all duration-300 group text-center h-full flex flex-col justify-center">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <CalendarOutlined className="text-white text-lg lg:text-xl" />
                        </div>
                        <div className="text-xs text-indigo-700 font-medium mb-1">Listing Date</div>
                        <div className="text-sm lg:text-lg font-bold text-indigo-800">{ipo.listingDate ? formatDate(ipo.listingDate) : 'TBD'}</div>
                      </div>
                    </Col>

                    <Col xs={12} sm={6} lg={6}>
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-4 lg:p-5 rounded-2xl border border-teal-200 hover:shadow-lg transition-all duration-300 group text-center h-full flex flex-col justify-center">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <BuildOutlined className="text-white text-lg lg:text-xl" />
                        </div>
                        <div className="text-xs text-teal-700 font-medium mb-1">Sector</div>
                        <div className="text-sm lg:text-lg font-bold text-teal-800 break-words">{ipo.sector || 'Sector TBD'}</div>
                      </div>
                    </Col>

                    <Col xs={12} sm={6} lg={6}>
                      <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-4 lg:p-5 rounded-2xl border border-yellow-200 hover:shadow-lg transition-all duration-300 group text-center h-full flex flex-col justify-center">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <ClockCircleOutlined className="text-white text-lg lg:text-xl" />
                        </div>
                        <div className="text-xs text-yellow-700 font-medium mb-1">Allotment Date</div>
                        <div className="text-sm lg:text-lg font-bold text-yellow-800">{ipo.allotmentDate ? formatDate(ipo.allotmentDate) : 'TBD'}</div>
                      </div>
                    </Col>
                  </Row>
                </Card>

                {/* Subscription Status */}
                <Card
                  title={
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
                      <div className="flex items-center">
                        <BarChartOutlined className="mr-3 text-green-600 text-xl" />
                        <span className="text-xl font-semibold text-gray-800">Subscription Status</span>
                      </div>
                      {ipo.subscription && (
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-4 py-2 lg:px-5 lg:py-3 rounded-2xl text-xs lg:text-sm font-bold shadow-md ${
                              isOversubscribed(ipo.subscription.times)
                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200'
                                : 'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border border-yellow-200'
                            }`}
                            style={{
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              fontFamily: 'Inter, system-ui, sans-serif',
                              boxShadow: isOversubscribed(ipo.subscription.times)
                                ? '0 2px 8px rgba(34, 197, 94, 0.15)'
                                : '0 2px 8px rgba(245, 158, 11, 0.15)'
                            }}
                          >
                            {formatSubscriptionTimes(ipo.subscription.times)} Subscribed
                          </span>
                        </div>
                      )}
                    </div>
                  }
                  className="shadow-lg border-0 rounded-2xl"
                >
                  {ipo.subscription ? (
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12} md={6}>
                        <div className="subscription-card text-center bg-gradient-to-br from-emerald-50 to-green-100 p-4 lg:p-6 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden h-full flex flex-col justify-center">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-500"></div>
                          <div className="text-2xl lg:text-3xl font-bold text-emerald-600 mb-2">
                            {formatSubscriptionTimes(ipo.subscription.times)}
                          </div>
                          <div className="text-sm text-emerald-700 font-semibold mb-3 lg:mb-4">Overall</div>
                          <div className="w-full bg-emerald-200 rounded-full h-3 mb-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                              style={{ width: `${calculateSubscriptionWidth(ipo.subscription.times, 20)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-emerald-600 font-medium">
                            {formatSubscriptionStatus(ipo.subscription.times)}
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <div className="subscription-card text-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4 lg:p-6 rounded-2xl border border-blue-200 shadow-sm relative overflow-hidden h-full flex flex-col justify-center">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
                          <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">
                            {ipo.subscription?.retail !== undefined ? formatSubscriptionTimes(ipo.subscription.retail) : 'N/A'}
                          </div>
                          <div className="text-sm text-blue-700 font-semibold mb-3 lg:mb-4">Retail</div>
                          <div className="w-full bg-blue-200 rounded-full h-3 mb-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-cyan-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                              style={{ width: `${ipo.subscription?.retail !== undefined ? calculateSubscriptionWidth(ipo.subscription.retail, 8) : 0}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-blue-600 font-medium">Individual Investors</div>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <div className="subscription-card text-center bg-gradient-to-br from-purple-50 to-violet-100 p-4 lg:p-6 rounded-2xl border border-purple-200 shadow-sm relative overflow-hidden h-full flex flex-col justify-center">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-violet-500"></div>
                          <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-2">
                            {ipo.subscription?.hni !== undefined ? formatSubscriptionTimes(ipo.subscription.hni) : 'N/A'}
                          </div>
                          <div className="text-sm text-purple-700 font-semibold mb-3 lg:mb-4">HNI</div>
                          <div className="w-full bg-purple-200 rounded-full h-3 mb-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-violet-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                              style={{ width: `${ipo.subscription?.hni !== undefined ? calculateSubscriptionWidth(ipo.subscription.hni, 12) : 0}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-purple-600 font-medium">High Net Worth</div>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <div className="subscription-card text-center bg-gradient-to-br from-orange-50 to-amber-100 p-4 lg:p-6 rounded-2xl border border-orange-200 shadow-sm relative overflow-hidden h-full flex flex-col justify-center">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-500"></div>
                          <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-2">
                            {ipo.subscription?.qib !== undefined ? formatSubscriptionTimes(ipo.subscription.qib) : 'N/A'}
                          </div>
                          <div className="text-sm text-orange-700 font-semibold mb-3 lg:mb-4">QIB</div>
                          <div className="w-full bg-orange-200 rounded-full h-3 mb-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-orange-500 to-amber-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                              style={{ width: `${ipo.subscription?.qib !== undefined ? calculateSubscriptionWidth(ipo.subscription.qib, 7) : 0}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-orange-600 font-medium">Institutional</div>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <div className="subscription-card text-center bg-gradient-to-br from-gray-50 to-slate-100 p-4 lg:p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden h-full flex flex-col justify-center">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-slate-500"></div>
                          <div className="text-2xl lg:text-3xl font-bold text-gray-600 mb-2">
                            {ipo.subscription?.employee !== undefined ? formatSubscriptionTimes(ipo.subscription.employee) : 'N/A'}
                          </div>
                          <div className="text-sm text-gray-700 font-semibold mb-3 lg:mb-4">Employee</div>
                          <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-gray-500 to-slate-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                              style={{ width: `${ipo.subscription?.employee !== undefined ? calculateSubscriptionWidth(ipo.subscription.employee, 5) : 0}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-600 font-medium">Employee Quota</div>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <div className="text-center py-12">
                      <BarChartOutlined className="text-5xl text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg mb-2">Subscription data not available</p>
                      <p className="text-gray-400 text-sm">Subscription details will be updated once the IPO opens</p>
                    </div>
                  )}
                </Card>

                {/* Company Description */}
                <Card
                  title={
                    <div className="flex items-center">
                      <BuildOutlined className="mr-3 text-blue-600 text-xl" />
                      <span className="text-xl font-semibold text-gray-800">About the Company</span>
                    </div>
                  }
                  className="shadow-lg border-0"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    {ipo.companyDescription ? (
                      <p className="text-gray-700 leading-relaxed text-base">{ipo.companyDescription}</p>
                    ) : (
                      <div className="text-center py-8">
                        <InfoCircleOutlined className="text-4xl text-gray-400 mb-3" />
                        <p className="text-gray-500 text-base">Company description not available</p>
                        <p className="text-gray-400 text-sm mt-2">Detailed company information will be updated soon</p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Issue Details */}
                <Card
                  title={
                    <div className="flex items-center">
                      <FileTextOutlined className="mr-3 text-indigo-600 text-xl" />
                      <span className="text-xl font-semibold text-gray-800">Issue Details</span>
                    </div>
                  }
                  className="shadow-lg border-0 rounded-2xl"
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={8}>
                      <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4 lg:p-5 rounded-xl border border-blue-200 h-full flex flex-col justify-center">
                        <div className="text-xl lg:text-2xl font-bold text-blue-600 mb-1">
                          {getOfferPriceText()}
                        </div>
                        <div className="text-sm font-medium text-blue-700">Offer Price Range</div>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                      <div className="text-center bg-gradient-to-br from-orange-50 to-amber-100 p-4 lg:p-5 rounded-xl border border-orange-200 h-full flex flex-col justify-center">
                        <div className="text-xl lg:text-2xl font-bold text-orange-600 mb-1">
                          {ipo.faceValue ? `₹${ipo.faceValue}` : 'N/A'}
                        </div>
                        <div className="text-sm font-medium text-orange-700">Face Value</div>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                      <div className="text-center bg-gradient-to-br from-green-50 to-emerald-100 p-4 lg:p-5 rounded-xl border border-green-200 h-full flex flex-col justify-center">
                        <div className="text-xl lg:text-2xl font-bold text-green-600 mb-1">
                          {ipo.listingPrice ? `₹${ipo.listingPrice}` : 'TBD'}
                        </div>
                        <div className="text-sm font-medium text-green-700">Listing Price</div>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                      <div className="text-center bg-gradient-to-br from-purple-50 to-violet-100 p-4 lg:p-5 rounded-xl border border-purple-200 h-full flex flex-col justify-center">
                        <div className="text-xl lg:text-2xl font-bold text-purple-600 mb-1">
                          {ipo.totalShares ? formatSharesCount(ipo.totalShares) : 'N/A'}
                        </div>
                        <div className="text-sm font-medium text-purple-700">Total Shares</div>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                      <div className="text-center bg-gradient-to-br from-emerald-50 to-green-100 p-4 lg:p-5 rounded-xl border border-emerald-200 h-full flex flex-col justify-center">
                        <div className="text-xl lg:text-2xl font-bold text-emerald-600 mb-1">
                          {ipo.freshIssue?.amount || 'N/A'}
                        </div>
                        <div className="text-sm font-medium text-emerald-700">Fresh Issue</div>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                      <div className="text-center bg-gradient-to-br from-pink-50 to-rose-100 p-4 lg:p-5 rounded-xl border border-pink-200 h-full flex flex-col justify-center">
                        <div className="text-xl lg:text-2xl font-bold text-pink-600 mb-1">
                          {ipo.ofs?.amount || 'N/A'}
                        </div>
                        <div className="text-sm font-medium text-pink-700">OFS</div>
                      </div>
                    </Col>
                  </Row>
                </Card>

                {/* Financial Performance */}
                <Card
                  title={
                    <div className="flex items-center">
                      <BarChartOutlined className="mr-3 text-green-600 text-xl" />
                      <span className="text-xl font-semibold text-gray-800">Financial Performance</span>
                    </div>
                  }
                  className="shadow-lg border-0 rounded-2xl"
                >
                  {ipo.financials && ipo.financials.length > 0 ? (
                    <>
                    {/* Mobile-friendly financial cards */}
                    <div className="block lg:hidden">
                      <div className="space-y-4">
                        {ipo.financials.map((financial, index) => (
                          <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
                            <div className="text-center mb-3">
                              <div className="text-lg font-bold text-gray-800">{financial.year}</div>
                            </div>
                            <Row gutter={[8, 8]}>
                              <Col xs={12}>
                                <div className="text-center">
                                  <div className="text-sm text-gray-600 mb-1">Revenue</div>
                                  <div className="text-base font-semibold text-green-600">₹{financial.revenue}Cr</div>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="text-center">
                                  <div className="text-sm text-gray-600 mb-1">Profit</div>
                                  <div className={`text-base font-semibold ${financial.profit !== null && financial.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    ₹{financial.profit}Cr
                                  </div>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="text-center">
                                  <div className="text-sm text-gray-600 mb-1">Net Worth</div>
                                  <div className="text-base font-semibold text-blue-600">₹{financial.netWorth}Cr</div>
                                </div>
                              </Col>
                              {financial.assets && (
                                <Col xs={12}>
                                  <div className="text-center">
                                    <div className="text-sm text-gray-600 mb-1">Assets</div>
                                    <div className="text-base font-semibold text-purple-600">₹{financial.assets}Cr</div>
                                  </div>
                                </Col>
                              )}
                            </Row>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Desktop table */}
                    <div className="hidden lg:block overflow-x-auto">
                      <Table
                        dataSource={ipo.financials.map((item, index) => ({ ...item, key: index }))}
                        pagination={false}
                        size="small"
                        className="financial-table"
                      >
                        <Table.Column title="Year" dataIndex="year" key="year" align="center" />
                        <Table.Column
                          title="Revenue (₹Cr)"
                          dataIndex="revenue"
                          key="revenue"
                          align="center"
                          render={(value) => <span className="font-semibold text-green-600">₹{value}</span>}
                        />
                        <Table.Column
                          title="Profit (₹Cr)"
                          dataIndex="profit"
                          key="profit"
                          align="center"
                          render={(value) => (
                            <span className={`font-semibold ${value !== null && value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ₹{value}
                            </span>
                          )}
                        />
                        <Table.Column
                          title="Net Worth (₹Cr)"
                          dataIndex="netWorth"
                          key="netWorth"
                          align="center"
                          render={(value) => <span className="font-semibold text-blue-600">₹{value}</span>}
                        />
                        <Table.Column
                          title="Assets (₹Cr)"
                          dataIndex="assets"
                          key="assets"
                          align="center"
                          render={(value) => value ? <span className="font-semibold text-purple-600">₹{value}</span> : '-'}
                        />
                        <Table.Column
                          title="Borrowing (₹Cr)"
                          dataIndex="totalBorrowing"
                          key="totalBorrowing"
                          align="center"
                          render={(value) => value ? <span className="font-semibold text-orange-600">₹{value}</span> : '-'}
                        />
                      </Table>
                    </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <BarChartOutlined className="text-5xl text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg mb-2">Financial data not available</p>
                      <p className="text-gray-400 text-sm">Financial performance details will be updated once available</p>
                    </div>
                  )}
                </Card>

                {/* Valuation Metrics */}
                <Card
                  title={
                    <div className="flex items-center">
                      <PieChartOutlined className="mr-3 text-purple-600 text-xl" />
                      <span className="text-xl font-semibold text-gray-800">Valuation Metrics</span>
                    </div>
                  }
                  className="shadow-lg border-0 rounded-2xl"
                >
                  {ipo.valuations && Object.values(ipo.valuations).some(value => value != null) ? (
                    <Row gutter={[16, 16]}>
                      <Col xs={12} sm={8} lg={6}>
                        <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4 rounded-xl border border-blue-200 h-full flex flex-col justify-center">
                          <div className="text-lg lg:text-xl font-bold text-blue-600 mb-1">
                            {ipo.valuations.epsPreIpo ? `₹${ipo.valuations.epsPreIpo}` : 'N/A'}
                          </div>
                          <div className="text-xs font-medium text-blue-700">EPS Pre IPO</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={8} lg={6}>
                        <div className="text-center bg-gradient-to-br from-cyan-50 to-blue-100 p-4 rounded-xl border border-cyan-200 h-full flex flex-col justify-center">
                          <div className="text-lg lg:text-xl font-bold text-cyan-600 mb-1">
                            {ipo.valuations.epsPostIpo ? `₹${ipo.valuations.epsPostIpo}` : 'N/A'}
                          </div>
                          <div className="text-xs font-medium text-cyan-700">EPS Post IPO</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={8} lg={6}>
                        <div className="text-center bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border border-green-200 h-full flex flex-col justify-center">
                          <div className="text-lg lg:text-xl font-bold text-green-600 mb-1">
                            {ipo.valuations.roe ? `${ipo.valuations.roe}%` : 'N/A'}
                          </div>
                          <div className="text-xs font-medium text-green-700">ROE</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={8} lg={6}>
                        <div className="text-center bg-gradient-to-br from-purple-50 to-violet-100 p-4 rounded-xl border border-purple-200 h-full flex flex-col justify-center">
                          <div className="text-lg lg:text-xl font-bold text-purple-600 mb-1">
                            {ipo.valuations.roce ? `${ipo.valuations.roce}%` : 'N/A'}
                          </div>
                          <div className="text-xs font-medium text-purple-700">ROCE</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={8} lg={6}>
                        <div className="text-center bg-gradient-to-br from-orange-50 to-amber-100 p-4 rounded-xl border border-orange-200 h-full flex flex-col justify-center">
                          <div className="text-lg lg:text-xl font-bold text-orange-600 mb-1">
                            {ipo.valuations.patMargin ? `${ipo.valuations.patMargin}%` : 'N/A'}
                          </div>
                          <div className="text-xs font-medium text-orange-700">PAT Margin</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={8} lg={6}>
                        <div className="text-center bg-gradient-to-br from-red-50 to-pink-100 p-4 rounded-xl border border-red-200 h-full flex flex-col justify-center">
                          <div className="text-lg lg:text-xl font-bold text-red-600 mb-1">
                            {ipo.valuations.debtEquity || 'N/A'}
                          </div>
                          <div className="text-xs font-medium text-red-700">Debt/Equity</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={8} lg={6}>
                        <div className="text-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4 rounded-xl border border-indigo-200 h-full flex flex-col justify-center">
                          <div className="text-lg lg:text-xl font-bold text-indigo-600 mb-1">
                            {ipo.valuations.pePreIpo || 'N/A'}
                          </div>
                          <div className="text-xs font-medium text-indigo-700">P/E Pre IPO</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={8} lg={6}>
                        <div className="text-center bg-gradient-to-br from-violet-50 to-purple-100 p-4 rounded-xl border border-violet-200 h-full flex flex-col justify-center">
                          <div className="text-lg lg:text-xl font-bold text-violet-600 mb-1">
                            {ipo.valuations.pePostIpo || 'N/A'}
                          </div>
                          <div className="text-xs font-medium text-violet-700">P/E Post IPO</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={8} lg={6}>
                        <div className="text-center bg-gradient-to-br from-teal-50 to-cyan-100 p-4 rounded-xl border border-teal-200 h-full flex flex-col justify-center">
                          <div className="text-lg lg:text-xl font-bold text-teal-600 mb-1">
                            {ipo.valuations.priceToBook || 'N/A'}
                          </div>
                          <div className="text-xs font-medium text-teal-700">P/B Ratio</div>
                        </div>
                      </Col>

                    </Row>
                  ) : (
                    <div className="text-center py-12">
                      <PieChartOutlined className="text-5xl text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg mb-2">Valuation metrics not available</p>
                      <p className="text-gray-400 text-sm">Valuation details will be updated once available</p>
                    </div>
                  )}
                </Card>
              </div>
            </Col>

            {/* Right Column - Sidebar */}
            <Col xs={24} lg={8}>
              <div className="space-y-8">
                {/* Important Dates */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-4 lg:p-6">
                  <div className="flex items-center mb-4 lg:mb-6">
                    <CalendarOutlined className="mr-3 text-purple-600 text-xl" />
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Important Dates</h2>
                  </div>
                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 gap-2 sm:gap-0">
                      <div className="flex items-center">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <CheckCircleOutlined className="text-white text-sm lg:text-base" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-700 text-sm lg:text-base">Issue Opens</div>
                          <div className="text-xs lg:text-sm text-gray-500">Subscription starts</div>
                        </div>
                      </div>
                      <div className="text-blue-600 font-bold text-sm lg:text-base ml-11 sm:ml-0">{formatDate(ipo.offerDate.start)}</div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 lg:p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 gap-2 sm:gap-0">
                      <div className="flex items-center">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <ClockCircleOutlined className="text-white text-sm lg:text-base" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-700 text-sm lg:text-base">Issue Closes</div>
                          <div className="text-xs lg:text-sm text-gray-500">Last day to apply</div>
                        </div>
                      </div>
                      <div className="text-orange-600 font-bold text-sm lg:text-base ml-11 sm:ml-0">{formatDate(ipo.offerDate.end)}</div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 lg:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 gap-2 sm:gap-0">
                      <div className="flex items-center">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <RiseOutlined className="text-white text-sm lg:text-base" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-700 text-sm lg:text-base">Listing Date</div>
                          <div className="text-xs lg:text-sm text-gray-500">Trading begins</div>
                        </div>
                      </div>
                      <div className="text-green-600 font-bold text-sm lg:text-base ml-11 sm:ml-0">{ipo.listingDate ? formatDate(ipo.listingDate) : 'TBD'}</div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 lg:p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200 gap-2 sm:gap-0">
                      <div className="flex items-center">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <UserOutlined className="text-white text-sm lg:text-base" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-700 text-sm lg:text-base">Allotment Date</div>
                          <div className="text-xs lg:text-sm text-gray-500">Share allocation</div>
                        </div>
                      </div>
                      <div className="text-purple-600 font-bold text-sm lg:text-base ml-11 sm:ml-0">{ipo.allotmentDate ? formatDate(ipo.allotmentDate) : 'TBD'}</div>
                    </div>
                  </div>
                </div>

                {/* GMP Section */}
                <Card
                  title={
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center">
                        <TrophyOutlined className="mr-3 text-green-600 text-xl" />
                        <span className="text-lg lg:text-xl font-semibold text-gray-800">Grey Market Premium</span>
                      </div>
                      {ipo.gmp && (
                        <Badge
                          count="Live"
                          style={{
                            backgroundColor: '#10b981',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            padding: '3px 8px',
                            borderRadius: '8px',
                            border: '2px solid white',
                            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}
                        />
                      )}
                    </div>
                  }
                  className="shadow-lg border-0 rounded-2xl"
                >
                  {ipo.gmp && ipo.gmp.premium != null && ipo.gmp.percentage != null ? (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 lg:p-6 rounded-2xl border border-green-200 text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">₹{ipo.gmp.premium}</div>
                      <div className="text-base lg:text-lg text-green-600 mb-3 lg:mb-4 font-semibold">{ipo.gmp.percentage}% Premium</div>
                      <div className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                        Grey market premium indicates expected listing gains based on unofficial trading.
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-6 rounded-2xl border border-gray-200 text-center">
                      <TrophyOutlined className="text-4xl text-gray-400 mb-3" />
                      <div className="text-xl lg:text-2xl font-bold text-gray-500 mb-2">No GMP Data</div>
                      <div className="text-sm text-gray-500 leading-relaxed">
                        Grey market premium data is not available yet. Check back later for updates.
                      </div>
                    </div>
                  )}
                </Card>

                {/* Market Lot Information */}
                <Card
                  title={
                    <div className="flex items-center">
                      <ShoppingOutlined className="mr-3 text-purple-600 text-xl" />
                      <span className="text-lg lg:text-xl font-semibold text-gray-800">Market Lot Details</span>
                    </div>
                  }
                  className="shadow-lg border-0 rounded-2xl"
                >
                  {ipo.marketLot ? (
                    <Row gutter={[12, 12]}>
                      <Col xs={24}>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-3 lg:p-4 rounded-xl border border-green-200">
                          <div className="text-center">
                            <div className="text-lg lg:text-xl font-bold text-green-600">{formatSharesCount(ipo.marketLot.retail?.shares)}</div>
                            <div className="text-xs lg:text-sm font-medium text-green-700 mb-1 lg:mb-2">Retail Shares</div>
                            <div className="text-sm lg:text-lg font-semibold text-gray-700">{formatCurrencyValue(ipo.marketLot.retail?.amount)}</div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-3 lg:p-4 rounded-xl border border-blue-200 h-full flex flex-col justify-center">
                          <div className="text-center">
                            <div className="text-sm lg:text-lg font-bold text-blue-600">{formatSharesCount(ipo.marketLot.sHni?.shares)}</div>
                            <div className="text-xs font-medium text-blue-700 mb-1">S-HNI</div>
                            <div className="text-xs lg:text-sm font-semibold text-gray-700 break-words">{formatCurrencyValue(ipo.marketLot.sHni?.amount)}</div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-3 lg:p-4 rounded-xl border border-purple-200 h-full flex flex-col justify-center">
                          <div className="text-center">
                            <div className="text-sm lg:text-lg font-bold text-purple-600">{formatSharesCount(ipo.marketLot.bHni?.shares)}</div>
                            <div className="text-xs font-medium text-purple-700 mb-1">B-HNI</div>
                            <div className="text-xs lg:text-sm font-semibold text-gray-700 break-words">{formatCurrencyValue(ipo.marketLot.bHni?.amount)}</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingOutlined className="text-5xl text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg mb-2">Market lot details not available</p>
                      <p className="text-gray-400 text-sm">Lot size and investment details will be updated soon</p>
                    </div>
                  )}
                </Card>

                {/* Company Details */}
                <Card
                  title={
                    <div className="flex items-center">
                      <BuildOutlined className="mr-3 text-indigo-600 text-xl" />
                      <span className="text-lg lg:text-xl font-semibold text-gray-800">Company Information</span>
                    </div>
                  }
                  className="shadow-lg border-0 rounded-2xl"
                >
                  {ipo.companyDetails ? (
                    <div className="space-y-3 lg:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg gap-1 sm:gap-0">
                        <span className="text-gray-600 font-medium text-sm lg:text-base">Founded</span>
                        <span className="font-semibold text-gray-800 text-sm lg:text-base">{ipo.companyDetails.foundedYear || 'N/A'}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg gap-1 sm:gap-0">
                        <span className="text-gray-600 font-medium flex items-center text-sm lg:text-base">
                          <TeamOutlined className="mr-2" />
                          Employees
                        </span>
                        <span className="font-semibold text-gray-800 text-sm lg:text-base">{ipo.companyDetails.employees ? ipo.companyDetails.employees.toLocaleString() : 'N/A'}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between p-3 bg-gray-50 rounded-lg gap-1 sm:gap-2">
                        <span className="text-gray-600 font-medium flex items-center text-sm lg:text-base flex-shrink-0">
                          <EnvironmentOutlined className="mr-2" />
                          Headquarters
                        </span>
                        <span className="font-semibold text-gray-800 text-right text-sm lg:text-base break-words">{ipo.companyDetails.headquarters || 'N/A'}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg gap-1 sm:gap-0">
                        <span className="text-gray-600 font-medium flex items-center text-sm lg:text-base">
                          <LinkOutlined className="mr-2" />
                          Website
                        </span>
                        {ipo.companyDetails.website ? (
                          <a
                            href={ipo.companyDetails.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-blue-600 hover:text-blue-800 text-sm lg:text-base transition-colors duration-200"
                          >
                            Visit Website
                          </a>
                        ) : (
                          <span className="font-semibold text-gray-800 text-sm lg:text-base">N/A</span>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg gap-1 sm:gap-0">
                        <span className="text-gray-600 font-medium flex items-center text-sm lg:text-base">
                          <MailOutlined className="mr-2" />
                          Email
                        </span>
                        {ipo.companyDetails.email ? (
                          <a
                            href={`mailto:${ipo.companyDetails.email}`}
                            className="font-semibold text-blue-600 hover:text-blue-800 text-sm lg:text-base transition-colors duration-200 break-all"
                          >
                            {ipo.companyDetails.email}
                          </a>
                        ) : (
                          <span className="font-semibold text-gray-800 text-sm lg:text-base">N/A</span>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg gap-1 sm:gap-0">
                        <span className="text-gray-600 font-medium flex items-center text-sm lg:text-base">
                          <PhoneOutlined className="mr-2" />
                          Phone
                        </span>
                        {ipo.companyDetails.phone ? (
                          <a
                            href={`tel:${ipo.companyDetails.phone}`}
                            className="font-semibold text-blue-600 hover:text-blue-800 text-sm lg:text-base transition-colors duration-200"
                          >
                            {ipo.companyDetails.phone}
                          </a>
                        ) : (
                          <span className="font-semibold text-gray-800 text-sm lg:text-base">N/A</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BuildOutlined className="text-5xl text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg mb-2">Company information not available</p>
                      <p className="text-gray-400 text-sm">Detailed company information will be updated soon</p>
                    </div>
                  )}
                </Card>

                {/* Lead Managers & Registrar */}
                <Card
                  title={
                    <div className="flex items-center">
                      <BankOutlined className="mr-3 text-blue-600 text-xl" />
                      <span className="text-xl font-semibold text-gray-800">Issue Partners</span>
                    </div>
                  }
                  className="shadow-lg border-0"
                >
                  {(ipo.leadManagers && ipo.leadManagers.length > 0) || ipo.registrar ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        <div className="text-sm font-medium text-blue-700 mb-2">Registrar</div>
                        <div className="font-semibold text-gray-800">{ipo.registrar || 'N/A'}</div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="text-sm font-medium text-green-700 mb-2">Lead Managers</div>
                        <div className="space-y-2">
                          {ipo.leadManagers && ipo.leadManagers.length > 0 ? (
                            ipo.leadManagers.map((manager, index) => (
                              <div key={index} className="font-semibold text-gray-800 text-sm">
                                • {manager}
                              </div>
                            ))
                          ) : (
                            <div className="font-semibold text-gray-800 text-sm">N/A</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BankOutlined className="text-5xl text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg mb-2">Issue partners information not available</p>
                      <p className="text-gray-400 text-sm">Lead managers and registrar details will be updated soon</p>
                    </div>
                  )}
                </Card>
              </div>
            </Col>
          </Row>



          {/* Issue Breakdown */}
          <Row gutter={[32, 32]} className="mt-8">
            <Col xs={24} lg={12}>
              <Card
                title={
                  <div className="flex items-center">
                    <PieChartOutlined className="mr-3 text-blue-600 text-xl" />
                    <span className="text-xl font-semibold text-gray-800">Issue Breakdown</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                {(ipo.freshIssue || ipo.ofs) ? (
                  <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12}>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200 text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">Fresh Issue</div>
                        <div className="text-lg font-bold text-green-600">{ipo.freshIssue?.amount || 'N/A'}</div>
                        <div className="text-sm text-gray-600">{ipo.freshIssue?.shares ? `${ipo.freshIssue.shares.toLocaleString()} shares` : 'N/A'}</div>
                      </div>
                    </Col>
                    <Col xs={24} sm={12}>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl border border-blue-200 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-2">OFS</div>
                        <div className="text-lg font-bold text-blue-600">{ipo.ofs?.amount || 'N/A'}</div>
                        <div className="text-sm text-gray-600">{ipo.ofs?.shares ? `${ipo.ofs.shares.toLocaleString()} shares` : 'N/A'}</div>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <div className="text-center py-12">
                    <PieChartOutlined className="text-5xl text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg mb-2">Issue breakdown not available</p>
                    <p className="text-gray-400 text-sm">Fresh issue and OFS details will be updated soon</p>
                  </div>
                )}
              </Card>
            </Col>

            {/* Promoter Holdings */}
            <Col xs={24} lg={12}>
              <Card
                title={
                  <div className="flex items-center">
                    <TeamOutlined className="mr-3 text-indigo-600 text-xl" />
                    <span className="text-xl font-semibold text-gray-800">Promoter Holdings</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                {ipo.promoters ? (
                  <>
                    <Row gutter={[24, 24]} className="mb-6">
                      <Col xs={12}>
                        <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4 rounded-xl border border-blue-200">
                          <div className="text-2xl font-bold text-blue-600">{ipo.promoters.preIssueHolding}%</div>
                          <div className="text-sm font-medium text-blue-700">Pre-Issue</div>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="text-center bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border border-green-200">
                          <div className="text-2xl font-bold text-green-600">{ipo.promoters.postIssueHolding}%</div>
                          <div className="text-sm font-medium text-green-700">Post-Issue</div>
                        </div>
                      </Col>
                    </Row>
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <UserOutlined className="mr-2" />
                        Promoters:
                      </div>
                      <div className="space-y-2">
                        {ipo.promoters.names.map((name, index) => (
                          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                              <UserOutlined className="text-white text-sm" />
                            </div>
                            <span className="font-medium text-gray-800">{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <TeamOutlined className="text-5xl text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg mb-2">Promoter information not available</p>
                    <p className="text-gray-400 text-sm">Promoter holdings and details will be updated soon</p>
                  </div>
                )}
              </Card>
            </Col>
          </Row>

          {/* Issue Objectives & Analysis */}
          <Row gutter={[32, 32]} className="mt-8">
            {/* Issue Objectives */}
            <Col xs={24} lg={12}>
              <Card
                title={
                  <div className="flex items-center">
                    <FileTextOutlined className="mr-3 text-blue-600 text-xl" />
                    <span className="text-xl font-semibold text-gray-800">Issue Objectives</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                {ipo.issueObjectives && ipo.issueObjectives.length > 0 ? (
                  <div className="space-y-3">
                    {ipo.issueObjectives.map((objective, index) => (
                      <div key={index} className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-700 leading-relaxed">{objective}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileTextOutlined className="text-5xl text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg mb-2">Issue objectives not available</p>
                    <p className="text-gray-400 text-sm">Purpose and objectives of the IPO will be updated soon</p>
                  </div>
                )}
              </Card>
            </Col>

            {/* Strengths & Weaknesses */}
            <Col xs={24} lg={12}>
              <Card
                title={
                  <div className="flex items-center">
                    <SafetyOutlined className="mr-3 text-purple-600 text-xl" />
                    <span className="text-xl font-semibold text-gray-800">Investment Analysis</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                {(ipo.strengths && ipo.strengths.length > 0) || (ipo.weaknesses && ipo.weaknesses.length > 0) ? (
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                            <CheckCircleOutlined className="text-white text-sm" />
                          </div>
                          <span className="font-semibold text-green-700">Strengths</span>
                        </div>
                        <ul className="space-y-2">
                          {ipo.strengths && ipo.strengths.length > 0 ? (
                            ipo.strengths.map((strength, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                {strength}
                              </li>
                            ))
                          ) : (
                            <li className="text-sm text-gray-500 flex items-start">
                              <span className="text-gray-400 mr-2">•</span>
                              No strengths data available
                            </li>
                          )}
                        </ul>
                      </div>
                    </Col>
                    <Col xs={24} sm={12}>
                      <div className="bg-gradient-to-br from-red-50 to-pink-100 p-4 rounded-xl border border-red-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-2">
                            <ExclamationCircleOutlined className="text-white text-sm" />
                          </div>
                          <span className="font-semibold text-red-700">Concerns</span>
                        </div>
                        <ul className="space-y-2">
                          {ipo.weaknesses && ipo.weaknesses.length > 0 ? (
                            ipo.weaknesses.map((weakness, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                {weakness}
                              </li>
                            ))
                          ) : (
                            <li className="text-sm text-gray-500 flex items-start">
                              <span className="text-gray-400 mr-2">•</span>
                              No concerns data available
                            </li>
                          )}
                        </ul>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <div className="text-center py-12">
                    <SafetyOutlined className="text-5xl text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg mb-2">Investment analysis not available</p>
                    <p className="text-gray-400 text-sm">Strengths and concerns analysis will be updated soon</p>
                  </div>
                )}
              </Card>
            </Col>
          </Row>

          {/* Peer Comparison & Documents */}
          <Row gutter={[32, 32]} className="mt-8">
            {/* Peer Comparison */}
            <Col xs={24} lg={16}>
              <Card
                title={
                  <div className="flex items-center">
                    <BarChartOutlined className="mr-3 text-orange-600 text-xl" />
                    <span className="text-xl font-semibold text-gray-800">Peer Comparison</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                {ipo.peers && ipo.peers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table
                      dataSource={[
                        {
                          key: 'current',
                          name: ipo.name,
                          pbRatio: ipo.valuations?.priceToBook || '-',
                          peRatio: ipo.valuations?.pePreIpo || '-',
                          ronw: ipo.valuations?.roe || '-',
                          netWorth: ipo.financials?.[0]?.netWorth ? `₹${ipo.financials[0].netWorth}Cr` : '-',
                          isCurrentIPO: true
                        },
                        ...ipo.peers.map((peer, index) => ({
                          key: index,
                          name: peer.name,
                          pbRatio: peer.pbRatio || '-',
                          peRatio: peer.peRatio || '-',
                          ronw: peer.ronw || '-',
                          netWorth: peer.netWorth ? `₹${peer.netWorth}Cr` : '-',
                          isCurrentIPO: false
                        }))
                      ]}
                      pagination={false}
                      size="small"
                    >
                      <Table.Column
                        title="Company"
                        dataIndex="name"
                        key="name"
                        render={(text, record: any) => (
                          <span className={record.isCurrentIPO ? 'font-bold text-blue-600' : 'text-gray-800'}>
                            {text}
                            {record.isCurrentIPO && <Tag color="blue" className="ml-2">Current IPO</Tag>}
                          </span>
                        )}
                      />
                      <Table.Column title="P/B Ratio" dataIndex="pbRatio" key="pbRatio" />
                      <Table.Column title="P/E Ratio" dataIndex="peRatio" key="peRatio" />
                      <Table.Column title="RONW %" dataIndex="ronw" key="ronw" />
                      <Table.Column title="Net Worth" dataIndex="netWorth" key="netWorth" />
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChartOutlined className="text-5xl text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg mb-2">Peer comparison not available</p>
                    <p className="text-gray-400 text-sm">Comparative analysis with industry peers will be updated soon</p>
                  </div>
                )}
              </Card>
            </Col>

            {/* Documents & Links */}
            <Col xs={24} lg={8}>
              <div className="space-y-6">
                {/* Documents */}
                <Card
                  title={
                    <div className="flex items-center">
                      <FileTextOutlined className="mr-3 text-green-600 text-xl" />
                      <span className="text-xl font-semibold text-gray-800">Documents</span>
                    </div>
                  }
                      className="shadow-lg border-0"
                    >
                      {ipo.documents && (ipo.documents.drhp || ipo.documents.rhp || ipo.documents.anchor) ? (
                        <div className="space-y-3">
                          {ipo.documents.drhp && (
                          <a
                            href={ipo.documents.drhp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300 group"
                          >
                            <div className="flex items-center">
                              <FileTextOutlined className="text-blue-600 text-lg mr-3" />
                              <span className="font-medium text-gray-800">DRHP</span>
                            </div>
                            <LinkOutlined className="text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                          </a>
                        )}
                        {ipo.documents.rhp && (
                          <a
                            href={ipo.documents.rhp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300 group"
                          >
                            <div className="flex items-center">
                              <FileTextOutlined className="text-green-600 text-lg mr-3" />
                              <span className="font-medium text-gray-800">RHP</span>
                            </div>
                            <LinkOutlined className="text-green-600 group-hover:scale-110 transition-transform duration-300" />
                          </a>
                        )}
                        {ipo.documents.anchor && (
                          <a
                            href={ipo.documents.anchor}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300 group"
                          >
                            <div className="flex items-center">
                              <FileTextOutlined className="text-purple-600 text-lg mr-3" />
                              <span className="font-medium text-gray-800">Anchor Book</span>
                            </div>
                            <LinkOutlined className="text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                          </a>
                        )}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <FileTextOutlined className="text-4xl text-gray-400 mb-3" />
                          <p className="text-gray-500 text-base">No documents available</p>
                          <p className="text-gray-400 text-sm mt-2">IPO documents will be updated once available</p>
                        </div>
                      )}
                    </Card>

                  {/* Anchor Investors */}
                  <Card
                    title={
                      <div className="flex items-center">
                        <TrophyOutlined className="mr-3 text-yellow-600 text-xl" />
                        <span className="text-xl font-semibold text-gray-800">Anchor Investors</span>
                      </div>
                    }
                    className="shadow-lg border-0"
                  >
                    {ipo.anchorInvestors ? (
                      <>
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-4 rounded-xl border border-yellow-200 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600 mb-1">{ipo.anchorInvestors.totalAmount}</div>
                            <div className="text-sm font-medium text-yellow-700">Total Investment</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {ipo.anchorInvestors.investors.map((investor, index) => (
                            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                                <TrophyOutlined className="text-white text-sm" />
                              </div>
                              <span className="font-medium text-gray-800 text-sm">{investor}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <TrophyOutlined className="text-4xl text-gray-400 mb-3" />
                        <p className="text-gray-500 text-base">No anchor investors data</p>
                        <p className="text-gray-400 text-sm mt-2">Anchor investor information will be updated once available</p>
                      </div>
                    )}
                  </Card>
                </div>
              </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default IPODetailPage;
