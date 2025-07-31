import React from 'react';
import { CheckCircleOutlined, ClockCircleOutlined, DollarCircleOutlined, CalendarOutlined, SearchOutlined, BankOutlined, TrophyOutlined } from '@ant-design/icons';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'current' | 'upcoming';
}

const timelineSteps: TimelineStep[] = [
  {
    id: 1,
    title: 'Apply for IPO',
    description: 'Submit your IPO application through your broker or UPI platform',
    icon: <DollarCircleOutlined />,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Mandate Confirmation',
    description: 'Confirm your UPI mandate or ensure sufficient funds in your account',
    icon: <CheckCircleOutlined />,
    status: 'completed'
  },
  {
    id: 3,
    title: 'Wait for IPO Closing',
    description: 'IPO subscription period ends and basis of allotment is prepared',
    icon: <ClockCircleOutlined />,
    status: 'completed'
  },
  {
    id: 4,
    title: 'Allotment Date Arrival',
    description: 'Company finalizes the allotment and publishes the results',
    icon: <CalendarOutlined />,
    status: 'current'
  },
  {
    id: 5,
    title: 'Check Allotment Status',
    description: 'Verify your allotment status on NSE or BSE official websites',
    icon: <SearchOutlined />,
    status: 'upcoming'
  },
  {
    id: 6,
    title: 'Refund/Share Credit',
    description: 'Receive refund for unallotted amount or shares in your demat account',
    icon: <BankOutlined />,
    status: 'upcoming'
  },
  {
    id: 7,
    title: 'Listing Day',
    description: 'Shares get listed on the stock exchange and trading begins',
    icon: <TrophyOutlined />,
    status: 'upcoming'
  }
];

const IPOProcessTimeline: React.FC = () => {
  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 border-green-600 bg-green-50';
      case 'current':
        return 'text-blue-600 border-blue-600 bg-blue-50';
      case 'upcoming':
        return 'text-gray-400 border-gray-300 bg-gray-50';
      default:
        return 'text-gray-400 border-gray-300 bg-gray-50';
    }
  };

  const getConnectorColor = (currentStatus: string) => {
    if (currentStatus === 'completed') {
      return 'bg-green-600';
    }
    if (currentStatus === 'current') {
      return 'bg-gradient-to-b from-blue-600 to-gray-300';
    }
    return 'bg-gray-300';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {timelineSteps.map((step, index) => (
          <div key={step.id} className="relative flex items-start mb-8 group">
            {/* Timeline Line */}
            {index < timelineSteps.length - 1 && (
              <div 
                className={`absolute left-6 top-12 w-0.5 h-16 ${getConnectorColor(
                  step.status
                )} transition-all duration-500`}
              />
            )}
            
            {/* Step Icon */}
            <div 
              className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 group-hover:scale-110 ${getStepColor(step.status)}`}
            >
              <span className="text-lg">
                {step.icon}
              </span>
            </div>
            
            {/* Step Content */}
            <div className="ml-6 flex-1">
              <div className={`p-4 rounded-lg border transition-all duration-300 group-hover:shadow-lg ${
                step.status === 'completed' 
                  ? 'bg-green-50 border-green-200' 
                  : step.status === 'current'
                  ? 'bg-blue-50 border-blue-200 shadow-md'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`font-semibold text-lg mb-2 ${
                  step.status === 'completed' 
                    ? 'text-green-800' 
                    : step.status === 'current'
                    ? 'text-blue-800'
                    : 'text-gray-600'
                }`}>
                  Step {step.id}: {step.title}
                </h3>
                <p className={`text-sm ${
                  step.status === 'completed' 
                    ? 'text-green-700' 
                    : step.status === 'current'
                    ? 'text-blue-700'
                    : 'text-gray-500'
                }`}>
                  {step.description}
                </p>
                
                {/* Status Badge */}
                <div className="mt-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    step.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : step.status === 'current'
                      ? 'bg-blue-100 text-blue-800 animate-pulse'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {step.status === 'completed' && '✓ Completed'}
                    {step.status === 'current' && '⏳ In Progress'}
                    {step.status === 'upcoming' && '⏸ Upcoming'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IPOProcessTimeline;
