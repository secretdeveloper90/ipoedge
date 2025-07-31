import React from "react";
import { Row, Col, Card, Button, Typography, Badge, Progress } from "antd";
import {
  LineChartOutlined,
  CalendarOutlined,
  BankOutlined,
  RiseOutlined,
  PlayCircleOutlined,
  DashboardOutlined,
  MobileOutlined,
  StockOutlined,
  TrophyOutlined,
  FireOutlined,
  ThunderboltOutlined,
  StarOutlined,
  CrownOutlined,
  RocketOutlined,
  ArrowUpOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import {
  FaGooglePlay,
  FaAppStore,
  FaCoins,
  FaArrowTrendUp,
  FaRocket,
  FaFire,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants";
import { useIPOsByStatus, useBrokers, useSEO } from "../hooks";
import { SkeletonCard, DashboardSkeleton } from "../components/common";
import { IPOCard } from "../components/ipo";
import { getHomePageSEO } from "../utils/seoUtils";
import "../styles/dashboard-animations.css";
import "../styles/dashboard-enhancements.css";

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  // SEO optimization
  useSEO(getHomePageSEO());

  // Fetch current IPOs and brokers data
  const { ipos: currentIPOs, loading: iposLoading } =
    useIPOsByStatus("current");
  const { brokers, loading: brokersLoading } = useBrokers();

  // Get featured IPOs (first 3 current IPOs)
  const featuredIPOs = currentIPOs.slice(0, 3);

  // Show loading skeleton while data is being fetched
  if (iposLoading && brokersLoading) {
    return <DashboardSkeleton />;
  }

  const stats = [
    {
      title: "Active IPOs",
      value: 12,
      icon: <FireOutlined />,
      color: "#ff4d4f",
      bgColor: "from-red-500 to-pink-500",
      trend: "+15%",
      description: "Currently Open",
    },
    {
      title: "Upcoming IPOs",
      value: 25,
      icon: <RocketOutlined />,
      color: "#1890ff",
      bgColor: "from-blue-500 to-cyan-500",
      trend: "+8%",
      description: "This Month",
    },
    {
      title: "Listed This Month",
      value: 8,
      icon: <TrophyOutlined />,
      color: "#52c41a",
      bgColor: "from-green-500 to-emerald-500",
      trend: "+22%",
      description: "Success Rate 85%",
    },
    {
      title: "Total Brokers",
      value: 15,
      icon: <CrownOutlined />,
      color: "#722ed1",
      bgColor: "from-purple-500 to-violet-500",
      trend: "+5%",
      description: "Premium Partners",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        {/* Animated Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/10 to-blue-300/10 rounded-full -translate-x-48 -translate-y-48 animate-float"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-br from-purple-300/10 to-pink-300/10 rounded-full translate-x-40 animate-float delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-br from-cyan-300/10 to-blue-300/10 rounded-full translate-y-32 animate-float delay-2000"></div>

          {/* Floating particles */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400/30 rounded-full animate-bounce-gentle"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-green-400/30 rounded-full animate-bounce-gentle delay-500"></div>
          <div className="absolute bottom-32 left-16 w-2 h-2 bg-pink-400/30 rounded-full animate-bounce-gentle delay-1000"></div>
          <div className="absolute top-60 left-1/2 w-5 h-5 bg-cyan-400/30 rounded-full animate-bounce-gentle delay-1500"></div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 48 }, (_, i) => (
                <div
                  key={i}
                  className="border border-white/20 animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Row align="middle" gutter={[48, 48]} className="min-h-[600px]">
            <Col xs={24} lg={12} className="flex flex-col justify-center">
              <div className="space-y-8 animate-fadeIn">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 shadow-lg">
                    <div className="relative mr-3">
                      <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
                    </div>
                    <span className="text-white/90">Live IPO Tracking</span>
                    <Badge count="NEW" size="small" className="ml-2" />
                  </div>

                  <div className="space-y-4">
                    <Title
                      level={1}
                      className="!text-white !mb-0 text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
                    >
                      <span className="block animate-fadeIn">
                        India's Premier Ipo Platform
                      </span>
                
                    </Title>

                    <div className="flex items-center space-x-4 animate-fadeIn delay-500">
                      <div className="flex items-center space-x-2">
                        <StarOutlined className="text-yellow-400 animate-pulse" />
                        <span className="text-yellow-400 font-semibold">
                          4.8 Rating
                        </span>
                      </div>
                      <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                      <div className="flex items-center space-x-2">
                        <TrophyOutlined className="text-green-400 animate-bounce-gentle" />
                        <span className="text-white font-semibold">
                          #1 IPO App
                        </span>
                      </div>
                      <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                      <div className="flex items-center space-x-2">
                        <SafetyOutlined className="text-blue-400 animate-pulse" />
                        <span className="text-white font-semibold">
                          Trusted
                        </span>
                      </div>
                    </div>
                  </div>

                  <Paragraph className="text-lg sm:text-xl text-blue-100 !mb-0 leading-relaxed max-w-2xl animate-fadeIn delay-700">
                    Track, analyze, and apply for IPOs with real-time data,
                    subscription status, and expert insights. Your gateway to
                    investment opportunities.
                    <span className="block mt-2 text-cyan-200 font-medium">
                      Join 2M+ investors already using IPO Edge
                    </span>
                  </Paragraph>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fadeIn delay-1000">
                  <Link to={ROUTES.CURRENT_IPO}>
                    <Button
                      type="primary"
                      size="large"
                      icon={
                        <RocketOutlined className="animate-bounce-gentle" />
                      }
                      className="w-full sm:w-auto bg-gradient-to-r from-white to-gray-100 text-blue-600 border-0 hover:from-blue-50 hover:to-white font-bold px-8 py-6 h-auto shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 rounded-xl enhanced-button ripple"
                    >
                      <span className="flex items-center space-x-2">
                        <span>Explore Current IPOs</span>
                        <FaRocket className="text-sm animate-pulse" />
                      </span>
                    </Button>
                  </Link>
                  <Button
                    type="default"
                    size="large"
                    icon={<PlayCircleOutlined className="animate-pulse" />}
                    className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white hover:text-blue-600 hover:border-white font-bold px-8 py-6 h-auto backdrop-blur-md bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 rounded-xl shadow-lg hover:shadow-xl enhanced-button ripple"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Watch Demo</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </span>
                  </Button>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8 animate-fadeIn delay-1200">
                  <div className="text-center group">
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                        12+
                      </div>
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-sm text-blue-200 group-hover:text-white transition-colors duration-300">
                      Active IPOs
                    </div>
                    <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-shimmer"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                        25+
                      </div>
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                    </div>
                    <div className="text-sm text-blue-200 group-hover:text-white transition-colors duration-300">
                      Upcoming IPOs
                    </div>
                    <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-shimmer"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                        15+
                      </div>
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-600"></div>
                    </div>
                    <div className="text-sm text-blue-200 group-hover:text-white transition-colors duration-300">
                      Top Brokers
                    </div>
                    <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-shimmer"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12} className="flex justify-center items-center">
              <div className="relative w-full max-w-lg animate-slideInRight">
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>

                {/* Enhanced Animated Dashboard Container */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">
                  <div className="w-full h-96 rounded-2xl shadow-2xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 flex flex-col justify-between relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full translate-y-12 -translate-x-12 animate-pulse delay-1000"></div>

                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <DashboardOutlined className="text-lg text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <div>
                          <span className="text-lg font-bold text-gray-800">
                            IPO Edge
                          </span>
                          <div className="text-xs text-gray-500">
                            Live Dashboard
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge count={3} size="small">
                          <div className="w-8 h-8 bg-white/80 rounded-lg flex items-center justify-center shadow-sm">
                            <ThunderboltOutlined className="text-yellow-500 animate-pulse" />
                          </div>
                        </Badge>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-500"></div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Animated Chart Area */}
                    <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-xl p-4 relative overflow-hidden shadow-inner border border-white/50">
                      {/* Chart Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <ArrowUpOutlined className="text-green-500 animate-pulse" />
                          <span className="text-sm font-semibold text-gray-700">
                            Market Performance
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600 font-medium">
                            +12.5%
                          </span>
                        </div>
                      </div>

                      {/* Animated Chart Bars */}
                      <div className="flex items-end justify-between h-24 space-x-1 mb-2">
                        {[
                          { height: 50, color: "from-blue-200 to-blue-300" },
                          { height: 60, color: "from-blue-200 to-blue-300" },
                          { height: 70, color: "from-blue-200 to-blue-300" },
                          { height: 80, color: "from-blue-200 to-blue-300" },
                          { height: 90, color: "from-blue-200 to-blue-300" },
                          { height: 95, color: "from-blue-200 to-blue-300" },
                          { height: 100, color: "from-blue-200 to-blue-300" },
                        ].map((bar, index) => (
                          <div
                            key={index}
                            className={`bg-gradient-to-t ${bar.color} rounded-t-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
                            style={{
                              height: `${bar.height}%`,
                              width: "12%",
                              animation: `slideUp 1.5s ease-out ${
                                index * 150
                              }ms both`,
                            }}
                          ></div>
                        ))}
                      </div>

                      Chart Labels
                      <div className="flex justify-between text-xs text-gray-500">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day, index) => (
                            <span
                              key={index}
                              className="text-center"
                              style={{ width: "12%" }}
                            >
                              {day}
                            </span>
                          )
                        )}
                      </div>

                

                      {/* Animated Grid Lines */}
                      <div className="absolute inset-4 pointer-events-none">
                        {[25, 50, 75].map((position, index) => (
                          <div
                            key={index}
                            className="absolute left-0 right-0 border-t border-gray-200/50"
                            style={{ top: `${position}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Dashboard Stats */}
                    <div className="grid grid-cols-3 gap-3 mt-4 relative z-10">
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
                        <div className="relative mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mx-auto shadow-md">
                            <FaArrowTrendUp className="text-white text-sm animate-bounce" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">
                              !
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          Active IPOs
                        </div>
                        <div className="text-sm font-bold text-green-600">
                          12+
                        </div>
                        <Progress
                          percent={75}
                          size="small"
                          strokeColor="#10b981"
                          showInfo={false}
                          className="mt-1"
                        />
                      </div>

                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
                        <div className="relative mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto shadow-md">
                            <FaCoins
                              className="text-white text-sm animate-spin"
                              style={{ animationDuration: "3s" }}
                            />
                          </div>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          Total Value
                        </div>
                        <div className="text-sm font-bold text-yellow-600">
                          ₹25K Cr
                        </div>
                        <Progress
                          percent={85}
                          size="small"
                          strokeColor="#f59e0b"
                          showInfo={false}
                          className="mt-1"
                        />
                      </div>

                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
                        <div className="relative mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-violet-500 rounded-lg flex items-center justify-center mx-auto shadow-md">
                            <StockOutlined className="text-white text-sm animate-pulse" />
                          </div>
                          <div className="absolute -top-1 -right-1">
                            <StarOutlined className="text-yellow-400 text-xs animate-pulse" />
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          Success Rate
                        </div>
                        <div className="text-sm font-bold text-purple-600">
                          85%
                        </div>
                        <Progress
                          percent={85}
                          size="small"
                          strokeColor="#8b5cf6"
                          showInfo={false}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Floating cards */}
                  <div className="absolute -top-6 -right-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-3 shadow-xl animate-bounce border border-white/20">
                    <div className="flex items-center space-x-2">
                      <ArrowUpOutlined className="text-sm animate-pulse" />
                      <div>
                        <div className="text-xs opacity-90">Live Updates</div>
                        <div className="text-sm font-bold">+12.5%</div>
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-3 shadow-xl animate-bounce delay-500 border border-white/20">
                    <div className="flex items-center space-x-2">
                      <RocketOutlined className="text-sm animate-pulse" />
                      <div>
                        <div className="text-xs opacity-90">New IPO</div>
                        <div className="text-sm font-bold">Opening Soon</div>
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping delay-300"></div>
                  </div>

                  <div className="absolute top-1/2 -left-8 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-2 shadow-xl animate-pulse">
                    <div className="flex items-center space-x-1">
                      <FaFire className="text-xs" />
                      <div className="text-xs font-bold">Hot!</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Stats Section */}
        <section className="py-16 -mt-16 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 items-stretch">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white overflow-hidden group relative interactive-card magnetic-element h-full flex flex-col"
              >
                {/* Animated Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="p-4 lg:p-6 relative z-10 flex-1 flex flex-col justify-between min-h-[280px]">
                  <div className="flex flex-col h-full">
                    {/* Icon with enhanced styling */}
                    <div className="relative mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                      >
                        <div className="text-2xl text-white">{stat.icon}</div>
                      </div>
                      {/* Floating trend indicator */}
                      <div className="absolute -top-2 -right-2 bg-white rounded-full px-2 py-1 shadow-md border border-gray-100">
                        <span className="text-xs font-bold text-green-600">
                          {stat.trend}
                        </span>
                      </div>
                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
                      ></div>
                    </div>

                    {/* Title and Value - flex-grow to take available space */}
                    <div className="space-y-2 flex-grow flex flex-col justify-center">
                      <h3 className="text-gray-700 text-sm lg:text-base font-semibold group-hover:text-gray-900 transition-colors duration-300">
                        {stat.title}
                      </h3>
                      <div
                        className="text-2xl lg:text-3xl font-bold group-hover:scale-105 transition-transform duration-300"
                        style={{ color: stat.color }}
                      >
                        {stat.value}+
                      </div>
                      <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        {stat.description}
                      </p>
                    </div>

                    {/* Progress indicator - always at bottom */}
                    <div className="mt-4">
                      <Progress
                        percent={75 + index * 5}
                        size="small"
                        strokeColor={stat.color}
                        showInfo={false}
                        className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500"></div>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured IPOs Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <Title
              level={2}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            >
              Current IPOs
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the latest IPO opportunities with real-time subscription
              data and expert analysis
            </Paragraph>
          </div>

          {iposLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3].map((key) => (
                <SkeletonCard key={key} loading={true} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
              {featuredIPOs.map((ipo) => (
                <div key={ipo.id} className="animate-fadeIn">
                  <IPOCard ipo={ipo} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to={ROUTES.CURRENT_IPO}>
              <Button
                type="primary"
                size="large"
                className="px-8 py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View All IPOs
              </Button>
            </Link>
          </div>
        </section>

        {/* App Download Section */}
        <section className="py-16">
          <div className="bg-gradient-to-br from-green-500 via-blue-600 to-purple-600 rounded-3xl overflow-hidden relative">
            {/* Background decorations */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40"></div>
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
            </div>

            <div className="relative z-10 p-8 lg:p-16">
              <Row align="middle" gutter={[48, 48]}>
                <Col xs={24} lg={12} className="flex flex-col justify-center">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        20,00,000+ Downloads
                      </div>
                      <Title
                        level={2}
                        className="!text-white !mb-0 text-3xl lg:text-5xl font-bold"
                      >
                        Download Our
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                          Mobile App
                        </span>
                      </Title>
                      <Paragraph className="text-green-100 text-lg lg:text-xl !mb-0 leading-relaxed max-w-lg">
                        India's most downloaded IPO App. Get real-time
                        notifications, apply for IPOs, and track your
                        investments on the go.
                      </Paragraph>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="default"
                        size="middle"
                        className="w-full sm:w-auto bg-white text-gray-900 border-white hover:bg-gray-50 hover:border-gray-50 font-semibold px-6 py-4 sm:px-8 sm:py-6 h-auto flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 mobile-button"
                      >
                        <FaGooglePlay
                          className="mr-3 text-green-600"
                          size={20}
                        />
                        <div className="text-left">
                          <div className="text-xs text-gray-600">Get it on</div>
                          <div className="text-sm font-bold">Google Play</div>
                        </div>
                      </Button>
                      <Button
                        type="default"
                        size="middle"
                        className="w-full sm:w-auto bg-white text-gray-900 border-white hover:bg-gray-50 hover:border-gray-50 font-semibold px-6 py-4 sm:px-8 sm:py-6 h-auto flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 mobile-button"
                      >
                        <FaAppStore className="mr-3 text-blue-600" size={20} />
                        <div className="text-left">
                          <div className="text-xs text-gray-600">
                            Download on the
                          </div>
                          <div className="text-sm font-bold">App Store</div>
                        </div>
                      </Button>
                    </div>

                    {/* App features */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="flex items-center space-x-3 text-white">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-sm">📱</span>
                        </div>
                        <span className="text-sm">Real-time Updates</span>
                      </div>
                      <div className="flex items-center space-x-3 text-white">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-sm">🔔</span>
                        </div>
                        <span className="text-sm">Push Notifications</span>
                      </div>
                      <div className="flex items-center space-x-3 text-white">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-sm">📊</span>
                        </div>
                        <span className="text-sm">Portfolio Tracking</span>
                      </div>
                      <div className="flex items-center space-x-3 text-white">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-sm">⚡</span>
                        </div>
                        <span className="text-sm">Quick Apply</span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  lg={12}
                  className="flex justify-center items-center"
                >
                  <div className="relative w-full max-w-sm mx-auto">
                    {/* Phone mockup */}
                    <div className="relative">
                      {/* Floating elements */}
                      <div className="absolute -top-8 -left-8 w-16 h-16 bg-yellow-400 rounded-2xl opacity-20 animate-pulse"></div>
                      <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-green-400 rounded-full opacity-20 animate-pulse delay-1000"></div>

                      {/* Animated Phone Container */}
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-[3rem] p-4 border border-white/20">
                        <div className="w-full h-96 rounded-[2.5rem] shadow-2xl bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
                          {/* Phone Screen */}
                          <div className="absolute inset-4 bg-white rounded-[2rem] overflow-hidden">
                            {/* Status Bar */}
                            <div className="bg-blue-600 text-white p-2 flex justify-between items-center text-xs">
                              <span className="font-bold">IPO Edge</span>
                              <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                                <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
                                <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
                              </div>
                            </div>

                            {/* App Content */}
                            <div className="p-4 space-y-3">
                              {/* Header */}
                              <div className="flex items-center justify-between">
                                <MobileOutlined className="text-2xl text-blue-600 animate-pulse" />
                                <div className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full animate-bounce">
                                  Live
                                </div>
                              </div>

                              {/* IPO Cards */}
                              {[1, 2, 3].map((item, index) => (
                                <div
                                  key={item}
                                  className="bg-gray-50 rounded-lg p-3 animate-pulse"
                                  style={{ animationDelay: `${index * 300}ms` }}
                                >
                                  <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-blue-200 rounded-lg animate-pulse"></div>
                                    <div className="flex-1">
                                      <div className="h-2 bg-gray-200 rounded animate-pulse mb-1"></div>
                                      <div className="h-1.5 bg-gray-100 rounded animate-pulse w-2/3"></div>
                                    </div>
                                    <div className="text-xs text-green-600 font-bold animate-bounce">
                                      {index === 0
                                        ? "+15%"
                                        : index === 1
                                        ? "+8%"
                                        : "+22%"}
                                    </div>
                                  </div>
                                </div>
                              ))}

                              {/* Action Buttons */}
                              <div className="grid grid-cols-2 gap-2 mt-4">
                                <div className="bg-blue-500 text-white text-xs py-2 px-3 rounded-lg text-center animate-pulse">
                                  Apply Now
                                </div>
                                <div className="bg-gray-200 text-gray-600 text-xs py-2 px-3 rounded-lg text-center animate-pulse delay-300">
                                  View Details
                                </div>
                              </div>
                            </div>

                            {/* Bottom Navigation */}
                            <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-2">
                              <div className="flex justify-around">
                                {[
                                  BankOutlined,
                                  LineChartOutlined,
                                  CalendarOutlined,
                                  RiseOutlined,
                                ].map((Icon, index) => (
                                  <Icon
                                    key={index}
                                    className={`text-lg ${
                                      index === 0
                                        ? "text-blue-600"
                                        : "text-gray-400"
                                    } animate-pulse`}
                                    style={{
                                      animationDelay: `${index * 200}ms`,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Phone Notch */}
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
                        </div>

                        {/* Floating notification */}
                        <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg animate-bounce">
                          <div className="text-xs text-gray-600">
                            New IPO Alert!
                          </div>
                          <div className="text-sm font-bold text-green-600">
                            Apply Now
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </section>

        {/* Top Brokers Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <Title
              level={2}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            >
              Top Brokers
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Compare and choose from India's leading brokers with competitive
              pricing and excellent service
            </Paragraph>
          </div>

          {brokersLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[1, 2, 3, 4].map((key) => (
                <SkeletonCard key={key} loading={true} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
              {brokers.slice(0, 4).map((broker) => (
                <Card
                  key={broker.id}
                  className="text-center card-hover border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="p-6">
                    <div className="relative mb-6">
                      <img
                        src={broker.logo}
                        alt={broker.name}
                        className="w-16 h-16 mx-auto rounded-xl object-cover shadow-md"
                      />
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        ★ {broker.rating}
                      </div>
                    </div>

                    <Title level={4} className="mb-4 text-gray-900">
                      {broker.name}
                    </Title>

                    <div className="space-y-3 text-sm mb-6">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-600 mb-1">
                          Account Opening
                        </div>
                        <div className="font-bold text-gray-900">
                          {broker.accountOpening === "Free"
                            ? "Free"
                            : `₹${broker.accountOpening}`}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-600 mb-1">
                          Equity Delivery
                        </div>
                        <div className="font-bold text-gray-900">
                          {broker.equityDelivery === "Zero"
                            ? "Zero"
                            : typeof broker.equityDelivery === "number"
                            ? `₹${broker.equityDelivery}`
                            : broker.equityDelivery}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="primary"
                      block
                      size="middle"
                      className="font-semibold shadow-md hover:shadow-lg transition-all duration-300 mobile-button"
                    >
                      Open Account
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to={ROUTES.BROKERS}>
              <Button
                type="primary"
                size="middle"
                className="px-6 py-4 sm:px-8 sm:py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mobile-button"
              >
                View All Brokers
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center mb-16">
            <Title
              level={2}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
            >
              Everything Under One Roof
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive IPO platform with all the tools you need for
              successful investing
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Track All IPOs */}
            <div className="group">
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-gradient-to-br from-blue-50 to-white">
                <div className="p-8 text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <LineChartOutlined className="text-4xl text-white" />
                    </div>
                    <div className="absolute inset-0 bg-blue-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
                  </div>
                  <Title
                    level={3}
                    className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300"
                  >
                    Track All IPOs
                  </Title>
                  <Paragraph className="text-gray-600 leading-relaxed text-base">
                    Track all ongoing IPOs, upcoming IPOs, and recently listed
                    IPOs in one place. Never miss upcoming IPOs with real-time
                    updates and notifications.
                  </Paragraph>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Real-time Data
                      </span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Live Updates
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Apply Online Easily */}
            <div className="group">
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-gradient-to-br from-green-50 to-white">
                <div className="p-8 text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <PlayCircleOutlined className="text-4xl text-white" />
                    </div>
                    <div className="absolute inset-0 bg-green-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
                  </div>
                  <Title
                    level={3}
                    className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300"
                  >
                    Apply Online Easily
                  </Title>
                  <Paragraph className="text-gray-600 leading-relaxed text-base">
                    Cut the clutter! Use IPO Edge's integrated platform to apply
                    for IPOs online easily. Know the expected premium and plan
                    your investment strategy.
                  </Paragraph>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Easy Apply
                      </span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        GMP Analysis
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stay Updated */}
            <div className="group">
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-gradient-to-br from-purple-50 to-white">
                <div className="p-8 text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <CalendarOutlined className="text-4xl text-white" />
                    </div>
                    <div className="absolute inset-0 bg-purple-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
                  </div>
                  <Title
                    level={3}
                    className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300"
                  >
                    Stay Updated
                  </Title>
                  <Paragraph className="text-gray-600 leading-relaxed text-base">
                    Stay updated with all upcoming Mainboard IPOs and SME IPOs
                    in India. Get detailed insights into draft papers and
                    subscription status.
                  </Paragraph>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Notifications
                      </span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Alerts
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
