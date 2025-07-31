import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, Avatar, Dropdown } from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  StockOutlined,
  BankOutlined,
  CalendarOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ROUTES } from '../../constants';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isLoggedIn = false; // This would come from your auth context

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: MenuProps['items'] = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to={ROUTES.HOME}>Home</Link>,
    },
    {
      key: 'ipo',
      icon: <StockOutlined />,
      label: 'IPO',
      children: [
        {
          key: 'current-ipo',
          label: <Link to={ROUTES.CURRENT_IPO}>Current IPO</Link>,
        },
        {
          key: 'upcoming-ipo',
          label: <Link to={ROUTES.UPCOMING_IPO}>Upcoming IPO</Link>,
        },
        {
          key: 'listed-ipo',
          label: <Link to={ROUTES.LISTED_IPO}>Listed IPO</Link>,
        },
        {
          type: 'divider',
        },
        {
          key: 'current-sme-ipo',
          label: <Link to={ROUTES.CURRENT_SME_IPO}>Current SME IPO</Link>,
        },
        {
          key: 'upcoming-sme-ipo',
          label: <Link to={ROUTES.UPCOMING_SME_IPO}>Upcoming SME IPO</Link>,
        },
        {
          key: 'listed-sme-ipo',
          label: <Link to={ROUTES.LISTED_SME_IPO}>Listed SME IPO</Link>,
        },
      ],
    },
    // {
    //   key: 'buyback',
    //   icon: <SwapOutlined />,
    //   label: 'Buyback',
    //   children: [
    //     {
    //       key: 'current-buyback',
    //       label: <Link to={ROUTES.CURRENT_BUYBACK}>Current</Link>,
    //     },
    //     {
    //       key: 'upcoming-buyback',
    //       label: <Link to={ROUTES.UPCOMING_BUYBACK}>Upcoming</Link>,
    //     },
    //     {
    //       key: 'closed-buyback',
    //       label: <Link to={ROUTES.CLOSED_BUYBACK}>Closed</Link>,
    //     },
    //   ],
    // },
    {
      key: 'brokers',
      icon: <BankOutlined />,
      label: <Link to={ROUTES.BROKERS}>Brokers</Link>,
    },
    // {
    //   key: 'bids',
    //   icon: <FileTextOutlined />,
    //   label: <Link to={ROUTES.BIDS}>Orders/Bids</Link>,
    // },
    {
      key: 'allotment',
      icon: <ProfileOutlined />,
      label: <Link to={ROUTES.ALLOTMENT}>Allotment</Link>,
    },
    {
      key: 'calendar',
      icon: <CalendarOutlined />,
      label: <Link to={ROUTES.CALENDAR}>IPO Event Calendar</Link>,
    },
    {
      key: 'about',
      icon: <UserOutlined />,
      label: <Link to={ROUTES.ABOUT}>About Us</Link>,
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to={ROUTES.PROFILE}>My Profile</Link>,
    },
    {
      key: 'orders',
      icon: <FileTextOutlined />,
      label: <Link to={ROUTES.BIDS}>Orders/Bids</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Log Out',
      onClick: () => {
        // Handle logout
        console.log('Logout clicked');
      },
    },
  ];

  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path === ROUTES.HOME) return ['home'];
    if (path === ROUTES.ALLOTMENT || path.startsWith('/ipo-allotment-status')) return ['allotment'];
    if (path === ROUTES.CALENDAR) return ['calendar'];
    if (path === ROUTES.ABOUT) return ['about'];
    if (path.startsWith('/ipo')) return ['ipo'];
    if (path.startsWith('/buyback')) return ['buyback'];
    if (path === ROUTES.BROKERS) return ['brokers'];
    if (path === ROUTES.BIDS) return ['bids'];
    return [];
  };

  return (
    <AntHeader className={`bg-white border-b px-0 h-16 leading-16 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'scrolled shadow-lg' : 'shadow-sm'
    }`}>
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center group no-underline">
            <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-500 hover:via-purple-500 hover:to-blue-700 transition-all duration-300 hover:scale-105">
              IPO Edge
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center">
            <Menu
              mode="horizontal"
              items={menuItems}
              selectedKeys={getSelectedKeys()}
              className="border-none bg-transparent flex-1 justify-center"
              style={{ lineHeight: '64px' }}
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Avatar
                  size="default"
                  icon={<UserOutlined />}
                  className="cursor-pointer hover:bg-blue-50"
                />
              </Dropdown>
            ) : (
              <div className="hidden md:flex space-x-3">
                <Link to={ROUTES.LOGIN}>
                  <Button
                    type="default"
                    icon={<LoginOutlined />}
                    size="large"
                    className="h-10 px-6 rounded-full border-2 border-gray-200 hover:!border-gray-300 hover:!text-gray-700 hover:!bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md font-medium bg-white/80 backdrop-blur-sm"
                  >
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button
                    type="primary"
                    size="large"
                    className="h-10 px-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 border-none hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-white relative overflow-hidden group"
                  >
                    <span className="relative z-10">Register</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuVisible(true)}
              className="lg:hidden"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="text-xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            IPO Edge
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={280}
      >
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={getSelectedKeys()}
          className="border-none"
          onClick={() => setMobileMenuVisible(false)}
        />
        
        {!isLoggedIn && (
          <div className="mt-8 px-4 space-y-6">
            <Link to={ROUTES.LOGIN}>
              <Button
                type="default"
                block
                icon={<LoginOutlined />}
                size="large"
                className="h-12 rounded-xl border-2 border-gray-200 hover:!border-gray-300 hover:!text-gray-700 hover:!bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md font-medium bg-white/90 mb-4 sm:mb-0"
              >
                Login
              </Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button
                type="primary"
                block
                size="large"
                className="h-12 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 border-none hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl font-medium text-white relative overflow-hidden group"
              >
                <span className="relative z-10">Register</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
        )}
      </Drawer>
    </AntHeader>
  );
};

export default Header;
