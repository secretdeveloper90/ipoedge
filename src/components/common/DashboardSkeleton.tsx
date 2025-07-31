import React from 'react';
import { Card } from 'antd';

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div className="space-y-8">
              {/* Badge Skeleton */}
              <div className="w-40 h-10 bg-white/20 rounded-full animate-pulse"></div>
              
              {/* Title Skeleton */}
              <div className="space-y-4">
                <div className="w-full h-16 bg-white/20 rounded-lg animate-pulse"></div>
                <div className="w-3/4 h-16 bg-white/20 rounded-lg animate-pulse"></div>
              </div>
              
              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="w-full h-4 bg-white/20 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-white/20 rounded animate-pulse"></div>
                <div className="w-4/6 h-4 bg-white/20 rounded animate-pulse"></div>
              </div>
              
              {/* Buttons Skeleton */}
              <div className="flex space-x-4">
                <div className="w-48 h-14 bg-white/20 rounded-xl animate-pulse"></div>
                <div className="w-40 h-14 bg-white/20 rounded-xl animate-pulse"></div>
              </div>
              
              {/* Stats Skeleton */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center space-y-2">
                    <div className="w-16 h-8 bg-white/20 rounded mx-auto animate-pulse"></div>
                    <div className="w-20 h-4 bg-white/20 rounded mx-auto animate-pulse"></div>
                    <div className="w-full h-1 bg-white/20 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dashboard Mockup Skeleton */}
            <div className="flex justify-center items-center">
              <div className="w-full max-w-lg">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                  <div className="w-full h-96 bg-white/20 rounded-2xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section Skeleton */}
        <section className="py-16 -mt-16 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="text-center border-0 shadow-lg">
                <div className="p-4 lg:p-6 space-y-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto animate-pulse"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
                  <div className="w-16 h-8 bg-gray-200 rounded mx-auto animate-pulse"></div>
                  <div className="w-full h-2 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured IPOs Section Skeleton */}
        <section className="py-16">
          <div className="text-center mb-12 space-y-4">
            <div className="w-64 h-10 bg-gray-200 rounded mx-auto animate-pulse"></div>
            <div className="w-96 h-6 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-lg">
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="flex justify-between">
                        <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1 h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="w-40 h-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
        </section>

        {/* App Download Section Skeleton */}
        <section className="py-16">
          <div className="bg-gradient-to-br from-green-500 via-blue-600 to-purple-600 rounded-3xl p-8 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="w-48 h-10 bg-white/20 rounded-full animate-pulse"></div>
                <div className="space-y-4">
                  <div className="w-full h-12 bg-white/20 rounded animate-pulse"></div>
                  <div className="w-3/4 h-12 bg-white/20 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-white/20 rounded animate-pulse"></div>
                  <div className="w-5/6 h-4 bg-white/20 rounded animate-pulse"></div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-40 h-14 bg-white/20 rounded-xl animate-pulse"></div>
                  <div className="w-40 h-14 bg-white/20 rounded-xl animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-96 bg-white/20 rounded-3xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Brokers Section Skeleton */}
        <section className="py-16">
          <div className="text-center mb-12 space-y-4">
            <div className="w-48 h-10 bg-gray-200 rounded mx-auto animate-pulse"></div>
            <div className="w-80 h-6 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="text-center border-0 shadow-lg">
                <div className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl mx-auto animate-pulse"></div>
                  <div className="w-24 h-6 bg-gray-200 rounded mx-auto animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="w-20 h-3 bg-gray-200 rounded mx-auto animate-pulse"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="w-20 h-3 bg-gray-200 rounded mx-auto animate-pulse"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="w-48 h-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
        </section>

        {/* Features Section Skeleton */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center mb-16 space-y-4">
            <div className="w-80 h-10 bg-gray-200 rounded mx-auto animate-pulse"></div>
            <div className="w-96 h-6 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-full border-0 shadow-lg">
                <div className="p-8 text-center space-y-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-3xl mx-auto animate-pulse"></div>
                  <div className="w-32 h-8 bg-gray-200 rounded mx-auto animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-4/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
