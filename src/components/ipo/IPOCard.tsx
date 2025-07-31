import React from "react";
import { Card, Button, Typography } from "antd";
import { EyeOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { IPO } from "../../types";
import { StatusIndicator, ResponsiveImage } from "../common";
import { formatDate, ipoNameToSlug } from "../../utils";
import { favoriteIPOsStorage } from "../../services/storage";

const { Title, Text } = Typography;

interface IPOCardProps {
  ipo: IPO;
  showActions?: boolean;
  compact?: boolean;
}

const IPOCard: React.FC<IPOCardProps> = ({
  ipo,
  showActions = true,
  compact = false,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(
    favoriteIPOsStorage.isFavorite(ipo.id)
  );

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = favoriteIPOsStorage.toggle(ipo.id);
    setIsFavorite(newStatus);
  };

  const getOfferPriceText = () => {
    if (typeof ipo.offerPrice === "number") {
      return `₹${ipo.offerPrice.toLocaleString()}`;
    }
    return `₹${ipo.offerPrice.min.toLocaleString()}-${ipo.offerPrice.max.toLocaleString()}`;
  };

  const getButtonText = () => {
    switch (ipo.status) {
      case "current":
        return "Apply Now";
      case "upcoming":
        return "Coming Soon";
      case "listed":
        return "View Results";
      case "closed":
        return "View Results";
      default:
        return "View Details";
    }
  };

  const getButtonType = () => {
    switch (ipo.status) {
      case "current":
        return "primary";
      case "upcoming":
        return "default";
      case "listed":
        return "default";
      case "closed":
        return "default";
      default:
        return "default";
    }
  };

  const cardActions = showActions
    ? [
        <Link to={`/ipo/${ipoNameToSlug(ipo.name)}`} key="view">
          <Button
            type="link"
            icon={<EyeOutlined />}
            size="small"
            className="ipo-view-button"
          >
            View Details
          </Button>
        </Link>,
        <Button
          key="apply"
          type={getButtonType()}
          size="small"
          disabled={ipo.status === "upcoming"}
          className={`ipo-apply-button ${
            ipo.status === "current"
              ? "ipo-apply-active"
              : ipo.status === "upcoming"
              ? "ipo-apply-upcoming"
              : ipo.status === "listed"
              ? "ipo-apply-closed"
              : "ipo-apply-closed"
          }`}
        >
          {getButtonText()}
        </Button>,
      ]
    : undefined;

  return (
    <Card
      className="ipo-card-container h-full animate-fadeIn shadow-xl"
      cover={
        <div className="p-4 bg-gray-50 relative">
          <div className="flex items-center space-x-3">
            <ResponsiveImage
              src={ipo.logo || "https://media.ipoji.com/ipo/images/ipo.png"}
              alt={ipo.name}
              className="w-12 h-12 rounded-lg !object-fill flex-shrink-0"
              fallbackSrc="https://media.ipoji.com/ipo/images/ipo.png"
            />
            <div className="flex-1 min-w-0">
              <Title level={5} className="mb-1 line-clamp-1">
                {ipo.name}
              </Title>
              <Text className="text-gray-500 text-sm">
                {formatDate(ipo.offerDate.start)} -{" "}
                {formatDate(ipo.offerDate.end)}
              </Text>
            </div>
            <Button
              type="text"
              icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
              onClick={handleFavoriteToggle}
              className={`absolute top-2 right-2 ${
                isFavorite ? "text-red-500" : "text-gray-400"
              }`}
              size="small"
            />
          </div>
        </div>
      }
      actions={cardActions}
    >
      <div className="ipo-card-content">
        <div className="ipo-card-details">
          <div className="flex justify-between items-center">
            <Text strong>Status:</Text>
            <StatusIndicator status={ipo.status} showDot />
          </div>

          <div className="flex justify-between">
            <Text strong>Exchange:</Text>
            <Text className="text-right">{ipo.exchange}</Text>
          </div>

          <div className="flex justify-between">
            <Text strong>Price:</Text>
            <Text className="text-right font-medium">
              {getOfferPriceText()}
            </Text>
          </div>

          <div className="flex justify-between">
            <Text strong>Lot Size:</Text>
            <Text className="text-right">{ipo.lotSize.toLocaleString()}</Text>
          </div>

          <div className="flex justify-between">
            <Text strong>Subscription:</Text>
            <Text className="font-semibold text-green-600 text-right">
              {ipo.subscription?.times != null
                ? `${ipo.subscription.times}x`
                : "-"}
            </Text>
          </div>

          <div className="flex justify-between">
            <Text strong>Exp. Premium:</Text>
            <Text className="text-blue-600 text-right font-medium">
              {ipo.gmp?.premium != null && ipo.gmp?.percentage != null
                ? `₹${ipo.gmp.premium} (${ipo.gmp.percentage}%)`
                : "-"}{" "}
            </Text>
          </div>

          {!compact && (
            <div className="flex justify-between">
              <Text strong>Sector:</Text>
              <Text className="text-right text-gray-600 line-clamp-1">
                {ipo.sector || "-"}
              </Text>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default IPOCard;
