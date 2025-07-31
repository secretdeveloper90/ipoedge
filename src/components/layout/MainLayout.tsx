import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';
import { BackToTop } from '../common';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <Header />

      <Content className="flex-1 bg-gray-50 pt-16">
        <Outlet />
      </Content>

      <Footer />
      <BackToTop />
    </Layout>
  );
};

export default MainLayout;
