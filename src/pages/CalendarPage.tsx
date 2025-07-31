import React, { useState, useEffect } from "react";
import {
  Calendar,
  Card,
  Typography,
  List,
  Tag,
  Row,
  Col,
  Tooltip,
  Divider,
  Button,
} from "antd";
import {
  CalendarOutlined,
  RocketOutlined,
  CloseCircleOutlined,
  TrophyOutlined,
  StarOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useIPOs } from "../hooks";
import "../styles/calendar.css";
import type { IPO } from "../types";

import type { Dayjs } from "dayjs";

const { Title, Text } = Typography;

const CalendarPage: React.FC = () => {
  const { ipos, loading } = useIPOs();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isVerySmall, setIsVerySmall] = useState(window.innerWidth < 425);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsVerySmall(window.innerWidth < 425);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate statistics
  const stats = {
    total: ipos.length,
    upcoming: ipos.filter((ipo) => ipo.status === "upcoming").length,
    current: ipos.filter((ipo) => ipo.status === "current").length,
    listed: ipos.filter((ipo) => ipo.status === "listed").length,
  };

  // Get events for a specific date
  const getEventsForDate = (date: Dayjs) => {
    const dateStr = date.format("YYYY-MM-DD");
    return ipos.filter((ipo) => {
      const startDate = ipo.offerDate.start;
      const endDate = ipo.offerDate.end;
      const listingDate = ipo.listingDate;

      return (
        startDate === dateStr || endDate === dateStr || listingDate === dateStr
      );
    });
  };

  // Get all events for the selected date
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  // Get event type and styling
  const getEventInfo = (ipo: IPO, dateStr: string) => {
    if (ipo.offerDate.start === dateStr) {
      return {
        type: "Opens",
        color: "#52c41a",
        bgColor: "rgba(82, 196, 26, 0.1)",
        icon: <RocketOutlined />,
        gradient: "linear-gradient(135deg, #52c41a 0%, #73d13d 100%)",
      };
    } else if (ipo.offerDate.end === dateStr) {
      return {
        type: "Closes",
        color: "#ff4d4f",
        bgColor: "rgba(255, 77, 79, 0.1)",
        icon: <CloseCircleOutlined />,
        gradient: "linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)",
      };
    } else if (ipo.listingDate === dateStr) {
      return {
        type: "Lists",
        color: "#1890ff",
        bgColor: "rgba(24, 144, 255, 0.1)",
        icon: <TrophyOutlined />,
        gradient: "linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)",
      };
    }
    return null;
  };

  // Enhanced responsive calendar cell renderer
  const dateCellRender = (value: Dayjs) => {
    const events = getEventsForDate(value);
    if (events.length === 0) return null;

    // Use the responsive state

    if (isMobile) {
      // Mobile: Show only count with color indicator
      const eventTypes = events
        .map((event) => {
          const dateStr = value.format("YYYY-MM-DD");
          return getEventInfo(event, dateStr);
        })
        .filter(Boolean);

      const primaryEvent = eventTypes[0];

      return (
        <Tooltip
          title={
            <div className="space-y-2">
              <div className="font-semibold">
                {events.length} IPO Event{events.length > 1 ? "s" : ""}
              </div>
              {events.map((ipo, idx) => {
                const info = getEventInfo(ipo, value.format("YYYY-MM-DD"));
                return info ? (
                  <div key={idx} className="text-xs">
                    <div className="font-medium">{ipo.name}</div>
                    <div className="opacity-75">{info.type}</div>
                  </div>
                ) : null;
              })}
            </div>
          }
          placement="top"
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer mx-auto"
            style={{
              backgroundColor: primaryEvent?.color || "#1890ff",
              fontSize: "10px",
            }}
          >
            {events.length}
          </div>
        </Tooltip>
      );
    }

    // Desktop: Show first IPO with details
    const firstEvent = events[0];
    const remainingCount = events.length - 1;
    const dateStr = value.format("YYYY-MM-DD");
    const eventInfo = getEventInfo(firstEvent, dateStr);

    if (!eventInfo) return null;

    return (
      <div className="h-full p-1 space-y-1">
        {/* First IPO Event */}
        <Tooltip
          title={
            <div className="space-y-1">
              <div className="font-semibold">{firstEvent.name}</div>
              <div className="text-xs">{eventInfo.type}</div>
              <div className="text-xs opacity-75">
                Price: ₹
                {typeof firstEvent.offerPrice === "number"
                  ? firstEvent.offerPrice
                  : `${firstEvent.offerPrice.min}-${firstEvent.offerPrice.max}`}
              </div>
            </div>
          }
          placement="top"
        >
          <div
            className="text-xs px-2 py-1 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 border shadow-sm"
            style={{
              backgroundColor: eventInfo.bgColor,
              borderColor: eventInfo.color,
              color: eventInfo.color,
            }}
          >
            <div className="font-medium truncate" style={{ maxWidth: "100px" }}>
              {firstEvent.name}
            </div>
            <div className="text-xs opacity-75 truncate">{eventInfo.type}</div>
          </div>
        </Tooltip>

        {/* More indicator */}
        {remainingCount > 0 && (
          <Tooltip
            title={
              <div className="space-y-2">
                <div className="font-semibold">
                  Additional Events ({remainingCount})
                </div>
                {events.slice(1).map((ipo, idx) => {
                  const info = getEventInfo(ipo, dateStr);
                  return info ? (
                    <div key={idx} className="text-xs">
                      <div className="font-medium">{ipo.name}</div>
                      <div className="opacity-75">{info.type}</div>
                    </div>
                  ) : null;
                })}
              </div>
            }
            placement="top"
          >
            <div className="text-xs px-2 py-1 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-all border border-gray-300 text-center font-medium">
              +{remainingCount} more
            </div>
          </Tooltip>
        )}
      </div>
    );
  };

  const onDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
  };

  // Loading skeleton component
  const CalendarSkeleton = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} className="calendar-skeleton h-16 rounded-lg"></div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      style={{
        position: "relative",
      }}
    >
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>

        {/* Large Blur Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 shadow-2xl backdrop-blur-sm border border-cyan-300/30"></div>
        </div>
        <div className="absolute top-40 right-20 animate-floatSlow">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-50 shadow-2xl backdrop-blur-sm border border-purple-300/30 animate-breathe"></div>
        </div>
        <div
          className="absolute bottom-32 left-1/4 animate-wiggle"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-70 shadow-xl backdrop-blur-sm border border-emerald-300/30"></div>
        </div>
        <div
          className="absolute top-1/3 left-8 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <div className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-65 shadow-lg backdrop-blur-sm border border-yellow-300/30"></div>
        </div>
        <div
          className="absolute bottom-1/3 right-12 animate-breathe"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-blue-600 rounded-full opacity-55 shadow-2xl backdrop-blur-sm border border-indigo-300/30"></div>
        </div>
        <div
          className="absolute top-2/3 right-1/4 animate-floatSlow"
          style={{ animationDelay: "3s" }}
        >
          <div className="w-4 h-4 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full opacity-75 shadow-md backdrop-blur-sm border border-rose-300/30"></div>
        </div>
        <div
          className="absolute top-1/2 left-16 animate-float"
          style={{ animationDelay: "4s" }}
        >
          <div className="w-3 h-3 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full opacity-80 shadow-lg backdrop-blur-sm"></div>
        </div>
        <div
          className="absolute bottom-1/4 right-8 animate-breathe"
          style={{ animationDelay: "2.5s" }}
        >
          <div className="w-7 h-7 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full opacity-60 shadow-xl backdrop-blur-sm border border-sky-300/30"></div>
        </div>
        <div
          className="absolute top-16 right-1/3 animate-float"
          style={{ animationDelay: "1.8s" }}
        >
          <div className="w-9 h-9 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-45 shadow-xl backdrop-blur-sm border border-green-300/30"></div>
        </div>
        <div
          className="absolute bottom-16 left-1/3 animate-breathe"
          style={{ animationDelay: "3.2s" }}
        >
          <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full opacity-70 shadow-lg backdrop-blur-sm border border-amber-300/30"></div>
        </div>
      </div>

      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8 relative z-10">
        {/* Enhanced Page Header */}
        <div className="mb-6 md:mb-16 text-center px-2 md:px-4">
          {/* Hero Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20 group cursor-pointer relative overflow-hidden">
            <CalendarOutlined className="text-3xl md:text-5xl text-white transform group-hover:scale-110 transition-all duration-500 relative z-10" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-full animate-ping bg-white/10"></div>
          </div>

          {/* Title */}
          <Title
            level={1}
            className={`mb-4 text-white ${
              isVerySmall ? "text-2xl" : "text-3xl md:text-6xl"
            } font-bold tracking-tight`}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              {isVerySmall ? "IPO Calendar" : "IPO Event Calendar"}
            </span>
          </Title>

          {/* Description */}
          <Text
            className={`text-white/90 ${
              isVerySmall ? "text-sm" : "text-base md:text-xl"
            } block max-w-4xl mx-auto leading-relaxed ${
              isVerySmall ? "mb-6" : "mb-8 md:mb-16"
            }`}
          >
            {isVerySmall
              ? "Track IPO dates and never miss opportunities."
              : "Track important IPO dates including opening, closing, and listing dates. Never miss an investment opportunity with our comprehensive calendar view."}
          </Text>

          {/* Stats Cards - Modern Design */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 ${
              isVerySmall ? "gap-2" : "gap-3 md:gap-6"
            } max-w-7xl mx-auto`}
          >
            {/* Total IPOs */}
            <div className="group">
              <Card className="bg-white/10 border-0 backdrop-blur-md hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div
                  className={`text-center relative z-10 ${
                    isVerySmall ? "py-1" : "py-2 md:py-4"
                  }`}
                >
                  <div
                    className={`${
                      isVerySmall ? "text-lg" : "text-2xl md:text-4xl"
                    } font-bold text-white ${
                      isVerySmall ? "mb-0" : "mb-1 md:mb-2"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stats.total}
                  </div>
                  <div
                    className={`${
                      isVerySmall ? "text-xs" : "text-xs md:text-base"
                    } text-white/90 font-medium`}
                  >
                    {isVerySmall ? "Total" : "Total IPOs"}
                  </div>
                </div>
              </Card>
            </div>

            {/* Current IPOs */}
            <div className="group">
              <Card className="bg-white/10 border-0 backdrop-blur-md hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div
                  className={`text-center relative z-10 ${
                    isVerySmall ? "py-1" : "py-2 md:py-4"
                  }`}
                >
                  <div
                    className={`${
                      isVerySmall ? "text-lg" : "text-2xl md:text-4xl"
                    } font-bold text-white ${
                      isVerySmall ? "mb-0" : "mb-1 md:mb-2"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stats.current}
                  </div>
                  <div
                    className={`${
                      isVerySmall ? "text-xs" : "text-xs md:text-base"
                    } text-white/90 font-medium`}
                  >
                    Current
                  </div>
                </div>
              </Card>
            </div>

            {/* Upcoming IPOs */}
            <div className="group">
              <Card className="bg-white/10 border-0 backdrop-blur-md hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div
                  className={`text-center relative z-10 ${
                    isVerySmall ? "py-1" : "py-2 md:py-4"
                  }`}
                >
                  <div
                    className={`${
                      isVerySmall ? "text-lg" : "text-2xl md:text-4xl"
                    } font-bold text-white ${
                      isVerySmall ? "mb-0" : "mb-1 md:mb-2"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stats.upcoming}
                  </div>
                  <div
                    className={`${
                      isVerySmall ? "text-xs" : "text-xs md:text-base"
                    } text-white/90 font-medium`}
                  >
                    Upcoming
                  </div>
                </div>
              </Card>
            </div>

            {/* Listed IPOs */}
            <div className="group">
              <Card className="bg-white/10 border-0 backdrop-blur-md hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div
                  className={`text-center relative z-10 ${
                    isVerySmall ? "py-1" : "py-2 md:py-4"
                  }`}
                >
                  <div
                    className={`${
                      isVerySmall ? "text-lg" : "text-2xl md:text-4xl"
                    } font-bold text-white ${
                      isVerySmall ? "mb-0" : "mb-1 md:mb-2"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stats.listed}
                  </div>
                  <div
                    className={`${
                      isVerySmall ? "text-xs" : "text-xs md:text-base"
                    } text-white/90 font-medium`}
                  >
                    Listed
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className={`${isVerySmall ? "px-1" : "px-1 md:px-4"}`}>
          <Row
            gutter={[isMobile ? 4 : 8, isMobile ? 8 : 12]}
            className={`${isMobile ? "min-h-[500px]" : "min-h-[600px]"}`}
          >
            {/* Enhanced Calendar */}
            <Col xs={24} lg={16}>
              <Card
                className="shadow-2xl border-0 overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.98)",
                  backdropFilter: "blur(20px)",
                  borderRadius: isVerySmall
                    ? "12px"
                    : isMobile
                    ? "16px"
                    : "24px",
                  minHeight: isVerySmall
                    ? "450px"
                    : isMobile
                    ? "500px"
                    : "870px",
                  height: isMobile ? "auto" : "600px",
                }}
                title={
                  <div
                    className={`flex items-center ${
                      isVerySmall
                        ? "space-x-2 py-1"
                        : "space-x-2 md:space-x-4 py-2 md:py-3"
                    }`}
                  >
                    <div
                      className={`${
                        isVerySmall ? "w-6 h-6" : "w-8 h-8 md:w-12 md:h-12"
                      } bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <CalendarOutlined
                        className={`text-white ${
                          isVerySmall ? "text-xs" : "text-sm md:text-xl"
                        }`}
                      />
                    </div>
                    <div>
                      <div
                        className={`${
                          isVerySmall ? "text-sm" : "text-lg md:text-2xl"
                        } font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
                      >
                        IPO Calendar
                      </div>
                      <div
                        className={`${
                          isVerySmall ? "text-xs" : "text-xs md:text-sm"
                        } text-gray-500`}
                      >
                        {isVerySmall
                          ? "Track IPO dates"
                          : "Track important IPO dates • Click dates to view details"}
                      </div>
                    </div>
                  </div>
                }
                loading={loading}
                styles={{
                  body: {
                    height: isMobile ? "auto" : "calc(100% - 100px)",
                    overflow: isMobile ? "visible" : "hidden",
                    padding: isVerySmall ? "8px" : isMobile ? "12px" : "16px",
                    minHeight: isVerySmall
                      ? "400px"
                      : isMobile
                      ? "450px"
                      : "auto",
                  },
                }}
              >
                <div
                  className={`calendar-container ${
                    isMobile ? "h-auto overflow-visible" : "!h-full"
                  }`}
                >
                  {loading ? (
                    <CalendarSkeleton />
                  ) : (
                    <Calendar
                      cellRender={dateCellRender}
                      onSelect={onDateSelect}
                      className={`enhanced-ipo-calendar compact-calendar ${
                        isMobile ? "mobile-calendar" : ""
                      }`}
                      style={{
                        background: "transparent",
                        height: isMobile ? "auto" : "100%",
                        minHeight: isVerySmall
                          ? "350px"
                          : isMobile
                          ? "400px"
                          : "auto",
                        width: "100%",
                        overflow: isMobile ? "visible" : "hidden",
                        fontSize: isVerySmall ? "11px" : "inherit",
                      }}
                    />
                  )}
                </div>
              </Card>
            </Col>

            {/* Enhanced Events for Selected Date */}
            <Col xs={24} lg={8} className="flex flex-col">
              <Card
                className="shadow-2xl border-0 mb-4 md:mb-6 flex-1 events-card"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  borderRadius: isMobile ? "16px" : "20px",
                  height: isMobile ? "600px" : "400px",
                  maxHeight: isMobile ? "600px" : "400px",
                  minHeight: isMobile ? "400px" : "400px",
                  display: "flex",
                  flexDirection: "column",
                }}
                title={
                  <div className="flex items-center space-x-2 md:space-x-3 py-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <StarOutlined className="text-white text-sm md:text-lg" />
                    </div>
                    <div>
                      <div className="text-sm md:text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        {selectedDate
                          ? `Events on ${selectedDate.format("MMM DD, YYYY")}`
                          : "Select a date to view events"}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500">
                        {selectedDate && selectedDateEvents.length > 0
                          ? `${selectedDateEvents.length} event${
                              selectedDateEvents.length > 1 ? "s" : ""
                            } found`
                          : "Click on calendar dates"}
                      </div>
                    </div>
                  </div>
                }
                styles={{
                  body: {
                    height: "calc(100% - 80px)",
                    overflow: "hidden",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  },
                }}
              >
                <div
                  className="events-scroll-container"
                  style={{
                    height: "100%",
                    overflow: "auto",
                    flex: 1,
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {selectedDate && selectedDateEvents.length > 0 ? (
                    <List
                      dataSource={selectedDateEvents}
                      split={false}
                      style={{
                        height: "100%",
                      }}
                      renderItem={(ipo) => {
                        const dateStr = selectedDate.format("YYYY-MM-DD");
                        const eventInfo = getEventInfo(ipo, dateStr);

                        if (!eventInfo) return null;

                        return (
                          <List.Item
                            className="border-0 px-0"
                            style={{
                              padding: "0 0 12px 0",
                              border: "none",
                            }}
                          >
                            <div
                              className="event-item w-full p-4 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg"
                              style={{
                                background: eventInfo.bgColor,
                                border: `1px solid ${eventInfo.color}20`,
                              }}
                            >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center space-x-3">
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                                  style={{ background: eventInfo.gradient }}
                                >
                                  {eventInfo.icon}
                                </div>
                                <div>
                                  <Text strong className="text-lg block">
                                    {ipo.name}
                                  </Text>
                                  <Text className="text-sm text-gray-600">
                                    {ipo.exchange}
                                  </Text>
                                </div>
                              </div>
                              <Tag
                                style={{
                                  background: eventInfo.gradient,
                                  border: "none",
                                  color: "white",
                                  fontWeight: "bold",
                                  borderRadius: "20px",
                                  padding: "4px 12px",
                                }}
                              >
                                {eventInfo.type}
                              </Tag>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <DollarOutlined className="text-green-600" />
                                <span className="text-gray-700">
                                  ₹
                                  {typeof ipo.offerPrice === "number"
                                    ? ipo.offerPrice.toLocaleString()
                                    : `${ipo.offerPrice.min}-${ipo.offerPrice.max}`}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <TrophyOutlined className="text-purple-600" />
                                <span className="text-gray-700">
                                  {ipo.exchange}
                                </span>
                              </div>
                            </div>
                          </div>
                        </List.Item>
                      );
                    }}
                  />
                  ) : selectedDate ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalendarOutlined className="text-2xl text-gray-400" />
                      </div>
                      <Text className="text-gray-500 text-lg">
                        No IPO events on this date
                      </Text>
                      <Text className="text-gray-400 text-sm block mt-2">
                        Try selecting another date
                      </Text>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalendarOutlined className="text-2xl text-blue-500" />
                      </div>
                      <Text className="text-gray-600 text-lg">
                        Click on a date to view events
                      </Text>
                      <Text className="text-gray-400 text-sm block mt-2">
                        Select any date on the calendar above
                      </Text>
                    </div>
                  )}
                </div>
              </Card>

              {/* Enhanced Legend */}
              <Card
                className="shadow-2xl border-0"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  height: "450px",
                }}
                title={
                  <div className="flex items-center space-x-3 py-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <StarOutlined className="text-white text-lg" />
                    </div>
                    <div>
                      <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Event Legend
                      </div>
                      <div className="text-sm text-gray-500">
                        Event types and meanings
                      </div>
                    </div>
                  </div>
                }
                styles={{
                  body: {
                    height: "calc(100% - 80px)",
                    overflow: "hidden",
                    padding: "16px",
                  },
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                      <RocketOutlined className="text-white text-sm" />
                    </div>
                    <div>
                      <Text className="font-semibold text-green-800">
                        IPO Opens
                      </Text>
                      <Text className="text-green-600 text-sm block">
                        Subscription starts
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-3">
                      <CloseCircleOutlined className="text-white text-sm" />
                    </div>
                    <div>
                      <Text className="font-semibold text-red-800">
                        IPO Closes
                      </Text>
                      <Text className="text-red-600 text-sm block">
                        Last day to apply
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                      <TrophyOutlined className="text-white text-sm" />
                    </div>
                    <div>
                      <Text className="font-semibold text-blue-800">
                        Listing Date
                      </Text>
                      <Text className="text-blue-600 text-sm block">
                        Trading begins
                      </Text>
                    </div>
                  </div>
                </div>

                <Divider />

                <div className="text-center">
                  <Button
                    type="primary"
                    size="large"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 rounded-full px-8 font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                      boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                    }}
                    onClick={() => (window.location.href = "/ipo")}
                  >
                    View All IPOs
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
