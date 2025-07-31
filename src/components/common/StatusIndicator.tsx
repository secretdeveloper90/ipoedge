import React from 'react';
import { Tag } from 'antd';

interface StatusIndicatorProps {
  status: 'current' | 'upcoming' | 'listed' | 'closed';
  showDot?: boolean;
  size?: 'small' | 'default';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  showDot = false, 
  size = 'default' 
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'current':
        return { color: 'green', text: 'Live', dotClass: 'current' };
      case 'upcoming':
        return { color: 'blue', text: 'Upcoming', dotClass: 'upcoming' };
      case 'listed':
        return { color: 'purple', text: 'Listed', dotClass: 'listed' };
      case 'closed':
        return { color: 'orange', text: 'Closed', dotClass: 'closed' };
      default:
        return { color: 'default', text: status, dotClass: 'closed' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Tag color={config.color} className={size === 'small' ? 'text-xs' : ''}>
      {showDot && <span className={`status-dot ${config.dotClass}`} />}
      {config.text}
    </Tag>
  );
};

export default StatusIndicator;
