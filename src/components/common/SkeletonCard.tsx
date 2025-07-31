import React from 'react';
import { Card, Skeleton } from 'antd';

interface SkeletonCardProps {
  loading?: boolean;
  children?: React.ReactNode;
  avatar?: boolean;
  paragraph?: {
    rows?: number;
  };
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ 
  loading = true, 
  children, 
  avatar = true,
  paragraph = { rows: 4 }
}) => {
  if (!loading && children) {
    return <>{children}</>;
  }

  return (
    <Card className="card-hover">
      <Skeleton 
        loading={loading} 
        avatar={avatar} 
        active 
        paragraph={paragraph}
      >
        {children}
      </Skeleton>
    </Card>
  );
};

export default SkeletonCard;
