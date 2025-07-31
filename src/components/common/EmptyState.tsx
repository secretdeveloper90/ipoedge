import React from 'react';
import { Empty, Button } from 'antd';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  description?: string;
  image?: React.ReactNode;
  action?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  description = "There's nothing to show here yet.",
  image,
  action
}) => {
  const renderAction = () => {
    if (!action) return null;

    if (action.href) {
      return (
        <Link to={action.href}>
          <Button type="primary">{action.text}</Button>
        </Link>
      );
    }

    return (
      <Button type="primary" onClick={action.onClick}>
        {action.text}
      </Button>
    );
  };

  return (
    <div className="py-16 text-center">
      <Empty
        image={image || Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        }
      >
        {renderAction()}
      </Empty>
    </div>
  );
};

export default EmptyState;
