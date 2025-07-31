import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Typography,
  Space,
  Select,
  Input,
  Pagination,
  Breadcrumb,
  Card,
} from "antd";
import {
  SearchOutlined,
  SortAscendingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useIPOs, useSEO } from "../hooks";
import type { IPOFilters } from "../types";
import { ROUTES } from "../constants";
import { SkeletonCard, EmptyState } from "../components/common";
import { IPOCard } from "../components/ipo";
import { getIPOListPageSEO } from "../utils/seoUtils";

const { Title, Text } = Typography;
const { Option } = Select;

const IPOListPage: React.FC = () => {
  const location = useLocation();

  // Determine page type from URL
  const getPageType = () => {
    const path = location.pathname;
    if (path.includes("current-ipo")) return "current";
    if (path.includes("upcoming-ipo")) return "upcoming";
    if (path.includes("listed-ipo")) return "listed";
    if (path.includes("sme-ipo")) return "sme";
    return "all";
  };

  const pageType = getPageType();

  // SEO optimization
  useSEO(getIPOListPageSEO(pageType));

  // State for filters and search
  const [filters, setFilters] = useState<IPOFilters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Set initial filters based on page type
  useEffect(() => {
    const initialFilters: IPOFilters = {};

    if (pageType === "current") {
      initialFilters.status = ["current"];
    } else if (pageType === "upcoming") {
      initialFilters.status = ["upcoming"];
    } else if (pageType === "listed") {
      initialFilters.status = ["listed"];
    } else if (pageType === "sme") {
      initialFilters.category = ["sme"];
    }

    setFilters(initialFilters);
  }, [pageType]);

  // Fetch IPOs with current filters
  const { ipos, loading, pagination } = useIPOs({
    page: currentPage,
    limit: pageSize,
    filters,
    search: searchQuery,
    sortBy,
    sortOrder,
  });

  // Get page title
  const getPageTitle = () => {
    switch (pageType) {
      case "current":
        return "Current IPOs";
      case "upcoming":
        return "Upcoming IPOs";
      case "listed":
        return "Listed IPOs";
      case "sme":
        return "SME IPOs";
      default:
        return "All IPOs";
    }
  };

  // Handle filter changes
  const handleFilterChange = (
    key: keyof IPOFilters,
    value: string[] | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
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
          <Breadcrumb.Item>IPO</Breadcrumb.Item>
          <Breadcrumb.Item>{getPageTitle()}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-8">
          <Title level={1} className="mb-2">
            {getPageTitle()}
          </Title>
          <Text className="text-gray-600">
            Discover and track the latest IPO opportunities in the Indian stock
            market
          </Text>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <Row gutter={[16, 16]} align="middle">
            {/* Search Input - Full width on mobile */}
            <Col xs={24} sm={24} md={8} lg={8}>
              <Input
                placeholder="Search IPOs..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
                size="middle"
                className="mobile-input"
              />
            </Col>

            {/* Status Filter - Full width on mobile, half on tablet */}
            <Col xs={24} sm={12} md={4} lg={4}>
              <Select
                placeholder="Status"
                style={{ width: "100%" }}
                value={filters.status}
                onChange={(value) => handleFilterChange("status", value)}
                mode="multiple"
                allowClear
                size="middle"
                maxTagCount="responsive"
                className="mobile-select"
              >
                <Option value="current">Current</Option>
                <Option value="upcoming">Upcoming</Option>
                <Option value="listed">Listed</Option>
                <Option value="closed">Closed</Option>
              </Select>
            </Col>

            {/* Category Filter - Full width on mobile, half on tablet */}
            <Col xs={24} sm={12} md={4} lg={4}>
              <Select
                placeholder="Category"
                style={{ width: "100%" }}
                value={filters.category}
                onChange={(value) => handleFilterChange("category", value)}
                mode="multiple"
                allowClear
                size="middle"
                maxTagCount="responsive"
                className="mobile-select"
              >
                <Option value="mainboard">Mainboard</Option>
                <Option value="sme">SME</Option>
              </Select>
            </Col>

            {/* Sort Buttons - Full width on mobile, responsive layout */}
            <Col xs={24} sm={12} md={4} lg={4}>
              <Space
                direction="horizontal"
                size="small"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                <Button
                  icon={<SortAscendingOutlined />}
                  onClick={() => handleSortChange("date")}
                  type={sortBy === "date" ? "primary" : "default"}
                  size="middle"
                  className="mobile-button"
                  style={{ minWidth: "70px" }}
                >
                  Date
                </Button>
                <Button
                  icon={<SortAscendingOutlined />}
                  onClick={() => handleSortChange("subscription")}
                  type={sortBy === "subscription" ? "primary" : "default"}
                  size="middle"
                  className="mobile-button"
                  style={{ minWidth: "100px" }}
                >
                  Subscription
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* IPO Grid */}
        {loading ? (
          <Row gutter={[24, 24]} className="mb-8">
            {Array.from({ length: pageSize }, (_, index) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={index}>
                <SkeletonCard loading={true} />
              </Col>
            ))}
          </Row>
        ) : ipos.length === 0 ? (
          <EmptyState
            title="No IPOs found"
            description="Try adjusting your filters or search criteria to find IPOs."
            action={{
              text: "View All IPOs",
              href: "/ipo",
            }}
          />
        ) : (
          <>
            <Row gutter={[24, 24]} className="mb-8">
              {ipos.map((ipo) => (
                <Col xs={24} sm={12} lg={8} xl={6} key={ipo.id}>
                  <IPOCard ipo={ipo} />
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8">
                {/* Desktop Pagination */}
                <div className="hidden md:flex justify-center">
                  <Pagination
                    current={currentPage}
                    total={pagination.total}
                    pageSize={pageSize}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} of ${total} IPOs`
                    }
                    onChange={handlePageChange}
                    pageSizeOptions={["12", "24", "48"]}
                    className="pagination-center"
                  />
                </div>

                {/* Mobile Pagination */}
                <div className="md:hidden">
                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mb-3">
                    <Button
                      type="default"
                      size="small"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="mobile-nav-btn"
                    >
                      ← Previous
                    </Button>

                    <div className="flex items-center px-3 py-1 bg-blue-50 border border-blue-200 rounded-md">
                      <span className="text-xs font-medium text-blue-700">
                        {currentPage} / {pagination.totalPages}
                      </span>
                    </div>

                    <Button
                      type="default"
                      size="small"
                      disabled={currentPage === pagination.totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="mobile-nav-btn"
                    >
                      Next →
                    </Button>
                  </div>

                  {/* Page Size and Total Count */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span>Items per page:</span>
                      <Select
                        value={pageSize}
                        onChange={(value) => handlePageChange(1, value)}
                        size="small"
                        className="w-16"
                      >
                        <Option value={12}>12</Option>
                        <Option value={24}>24</Option>
                        <Option value={48}>48</Option>
                      </Select>
                    </div>

                    <span>
                      {(currentPage - 1) * pageSize + 1}-
                      {Math.min(currentPage * pageSize, pagination.total)} of{" "}
                      {pagination.total} IPOs
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IPOListPage;
