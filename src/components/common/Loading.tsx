import React from 'react';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface LoadingProps {
  size?: 'small' | 'default' | 'large';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'default', 
  text = 'Loading...', 
  fullScreen = false,
  className = ''
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size === 'large' ? 48 : size === 'small' ? 16 : 24 }} spin />;

  if (fullScreen) {
    return (
      <div className={`fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 ${className}`}>
        <div className="text-center">
          <Spin indicator={antIcon} size={size} />
          {text && (
            <div className="mt-4">
              <Text className="text-gray-600">{text}</Text>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <Spin indicator={antIcon} size={size} />
      {text && (
        <div className="mt-4">
          <Text className="text-gray-600">{text}</Text>
        </div>
      )}
    </div>
  );
};

export default Loading;
