import React from "react";
import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  SendOutlined,
  MailOutlined,
  PhoneOutlined,
  MessageOutlined
} from "@ant-design/icons";
import { ROUTES } from "../../constants";

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-800 text-white mt-auto relative overflow-hidden z-0">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full translate-x-40 translate-y-40 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full animate-pulse delay-2000"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto sm:px-6 lg:px-8 py-10 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="text-3xl font-bold text-white drop-shadow-lg">
                  IPO Edge
                </div>
              </div>
              <Text className="text-blue-100 leading-relaxed text-base">
                Your comprehensive platform for IPO tracking, analysis, and
                investment opportunities. Stay updated with the latest IPO
                launches, subscription status, and market insights.
              </Text>
            </div>
          </div>

          {/* Products */}
          <div>
            <Title level={4} className="!text-white mb-6 text-xl font-semibold">
              Products
            </Title>
            <div className="space-y-4">
              <div>
                <Link
                  to={ROUTES.IPO}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-cyan-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-cyan-200"></span>
                  IPO Tracking
                </Link>
              </div>
              <div>
                <Link
                  to={ROUTES.BUYBACK}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-cyan-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-cyan-200"></span>
                  Buyback Information
                </Link>
              </div>
              <div>
                <Link
                  to={ROUTES.BROKERS}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-cyan-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-cyan-200"></span>
                  Broker Comparison
                </Link>
              </div>
              <div>
                <Link
                  to={ROUTES.CALENDAR}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-cyan-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-cyan-200"></span>
                  IPO Calendar
                </Link>
              </div>
              <div>
                <Link
                  to={ROUTES.ALLOTMENT}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-cyan-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-cyan-200"></span>
                  Allotment Status
                </Link>
              </div>
            </div>
          </div>

          {/* IPO Categories */}
          <div>
            <Title level={4} className="!text-white mb-6 text-xl font-semibold">
              IPO Categories
            </Title>
            <div className="space-y-4">
              <div>
                <Link
                  to={ROUTES.CURRENT_IPO}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-emerald-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-emerald-200"></span>
                  Current IPOs
                </Link>
              </div>
              <div>
                <Link
                  to={ROUTES.UPCOMING_IPO}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-emerald-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-emerald-200"></span>
                  Upcoming IPOs
                </Link>
              </div>
              <div>
                <Link
                  to={ROUTES.LISTED_IPO}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-emerald-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-emerald-200"></span>
                  Listed IPOs
                </Link>
              </div>
              <div>
                <Link
                  to={ROUTES.CURRENT_SME_IPO}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-emerald-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-emerald-200"></span>
                  SME IPOs
                </Link>
              </div>
            </div>
          </div>

          {/* Support & Legal */}
          <div>
            <Title level={4} className="!text-white mb-6 text-xl font-semibold">
              Support & Legal
            </Title>
            <div className="space-y-4">
              <div>
                <Link
                  to={ROUTES.FAQS}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-pink-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-pink-200"></span>
                  FAQs
                </Link>
              </div>
              <div>
                <Link
                  to={ROUTES.HELP_CENTER}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-pink-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-pink-200"></span>
                  Help Center
                </Link>
              </div>
              <div>
                <Link
                  to={ROUTES.CONTACT}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-pink-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-pink-200"></span>
                  Contact Us
                </Link>
              </div>
              <div>
                <Link
                  to={ROUTES.PRIVACY_POLICY}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-pink-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-pink-200"></span>
                  Privacy Policy
                </Link>
              </div>
              <div>
                <Link
                  to={ROUTES.TERMS_CONDITIONS}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-pink-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-pink-200"></span>
                  Terms & Conditions
                </Link>
              </div>
              <div>
                <Link
                  to={ROUTES.DISCLAIMER}
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-pink-300 rounded-full mr-3 group-hover:w-2 transition-all duration-200 group-hover:bg-pink-200"></span>
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <Title level={4} className="!text-white mb-6 text-xl font-semibold">
              Contact Information
            </Title>
            <div className="space-y-3">
              <a
                href="mailto:ipoedge@gmail.com"
                className="flex items-center space-x-3 p-2.5 bg-white/15 rounded-lg hover:bg-white/20 transition-all duration-200 cursor-pointer"
              >
                <div className="w-7 h-7 bg-blue-500 rounded-md flex items-center justify-center">
                  <MailOutlined className="text-xs text-white" />
                </div>
                <Text className="text-white text-sm">ipoedge@gmail.com</Text>
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center space-x-3 p-2.5 bg-white/15 rounded-lg hover:bg-white/20 transition-all duration-200 cursor-pointer"
              >
                <div className="w-7 h-7 bg-green-500 rounded-md flex items-center justify-center">
                  <PhoneOutlined className="text-xs text-white" />
                </div>
                <Text className="text-white text-sm">+91 12345 67890</Text>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap m-4 justify-center gap-2 sm:gap-3">
          {/* Facebook */}
          <div className="group relative">
            <a
              href="https://facebook.com/ipoedge"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/25"
            >
              <FacebookOutlined className="text-sm sm:text-lg text-white group-hover:scale-110 transition-transform duration-200" />
            </a>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
          </div>

          {/* Twitter */}
          <div className="group relative">
            <a
              href="https://twitter.com/ipoedge"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-sky-500/25"
            >
              <TwitterOutlined className="text-sm sm:text-lg text-white group-hover:scale-110 transition-transform duration-200" />
            </a>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-sky-300 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
          </div>

          {/* YouTube */}
          <div className="group relative">
            <a
              href="https://youtube.com/@ipoedge"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-red-500/25"
            >
              <YoutubeOutlined className="text-sm sm:text-lg text-white group-hover:scale-110 transition-transform duration-200" />
            </a>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
          </div>

          {/* Instagram */}
          <div className="group relative">
            <a
              href="https://instagram.com/ipo.edge"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 hover:from-pink-400 hover:via-red-400 hover:to-yellow-400 rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-pink-500/25"
            >
              <InstagramOutlined className="text-sm sm:text-lg text-white group-hover:scale-110 transition-transform duration-200" />
            </a>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
          </div>

          {/* Telegram */}
          <div className="group relative">
            <a
              href="https://t.me/IPOEdgeApp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/25"
            >
              <SendOutlined className="text-sm sm:text-lg text-white group-hover:scale-110 transition-transform duration-200" />
            </a>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
          </div>

          {/* Instagram Threads */}
          <div className="group relative">
            <a
              href="https://www.threads.net/@ipo.edge"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-black to-gray-800 hover:from-gray-900 hover:to-black rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-gray-500/25"
            >
              <MessageOutlined className="text-sm sm:text-lg text-white group-hover:scale-110 transition-transform duration-200" />
            </a>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-14 pt-8">
          {/* Copyright */}
          <div className="text-center mb-8">
            <Text className="text-blue-100 text-base">
              © {currentYear} IPO Edge. All rights reserved.
            </Text>
          </div>

          {/* Disclaimer */}
          <div className="pt-8 border-t border-white/10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <Text className="text-blue-100 text-xs sm:text-sm leading-relaxed text-center sm:text-left">
                <strong className="text-yellow-300">Disclaimer:</strong> IPO
                Edge is an information platform and does not provide investment
                advice. All information is for educational purposes only. Please
                consult with qualified financial advisors before making
                investment decisions. We are not SEBI registered analysts.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
