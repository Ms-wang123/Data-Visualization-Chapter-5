import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography, Button, theme } from 'antd';
import { motion } from 'framer-motion';
import {
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  DashboardOutlined,
  MenuOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

// 导入页面组件
import HomePage from './pages/HomePage';
import FixedSubplotsDemo from './pages/FixedSubplotsDemo';
import CustomSubplotsDemo from './pages/CustomSubplotsDemo';
import SharedAxesDemo from './pages/SharedAxesDemo';
import LayoutDemo from './pages/LayoutDemo';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const menuItems = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: <Link to="/">首页</Link>,
  },
  {
    key: '/fixed-subplots',
    icon: <BarChartOutlined />,
    label: <Link to="/fixed-subplots">固定区域子图</Link>,
  },
  {
    key: '/custom-subplots',
    icon: <PieChartOutlined />,
    label: <Link to="/custom-subplots">自定义区域子图</Link>,
  },
  {
    key: '/shared-axes',
    icon: <LineChartOutlined />,
    label: <Link to="/shared-axes">共享坐标轴</Link>,
  },
  {
    key: '/layout',
    icon: <DashboardOutlined />,
    label: <Link to="/layout">子图布局</Link>,
  },
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return '交互式Matplotlib可视化演示';
      case '/fixed-subplots':
        return '5.1 绘制固定区域的子图';
      case '/custom-subplots':
        return '5.2 绘制自定义区域的子图';
      case '/shared-axes':
        return '5.3 共享子图的坐标轴';
      case '/layout':
        return '5.4 子图的布局';
      default:
        return '交互式Matplotlib可视化演示';
    }
  };

  const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    background: colorBgContainer,
    boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
    zIndex: 1000,
  };

  const contentStyle = {
    marginLeft: isMobile ? 0 : (collapsed ? 80 : 200),
    padding: isMobile ? '10px' : '24px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    transition: 'margin-left 0.2s',
  };

  if (isMobile && !collapsed) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={siderStyle} width="100%">
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <Title level={4} style={{ color: '#1890ff', margin: 0 }}>
              Matplotlib Demo
            </Title>
          </div>
          <Menu
            theme="light"
            mode="vertical"
            defaultSelectedKeys={[location.pathname]}
            items={menuItems}
            style={{ border: 'none' }}
          />
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <Button 
              type="primary" 
              onClick={() => setCollapsed(true)}
              style={{ width: '100%' }}
            >
              返回内容
            </Button>
          </div>
        </Sider>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isMobile && (
        <Sider 
          style={siderStyle} 
          collapsible 
          collapsed={collapsed} 
          onCollapse={(value) => setCollapsed(value)}
          width={200}
          collapsedWidth={80}
        >
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <Title level={4} style={{ color: '#1890ff', margin: collapsed ? 0 : '' }}>
              {collapsed ? 'M' : 'Matplotlib'}
            </Title>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            items={menuItems}
            style={{ border: 'none' }}
          />
        </Sider>
      )}
      
      <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 200) }}>
        <Header 
          style={{ 
            padding: '0 24px', 
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            position: 'fixed',
            top: 0,
            right: 0,
            left: isMobile ? 0 : (collapsed ? 80 : 200),
            zIndex: 999
          }}
        >
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(false)}
              style={{ fontSize: '16px' }}
            />
          )}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
              {getPageTitle()}
            </Title>
          </motion.div>
          
          {location.pathname !== '/' && (
            <Link to="/">
              <Button 
                type="text" 
                icon={<ArrowLeftOutlined />}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                返回首页
              </Button>
            </Link>
          )}
        </Header>
        
        <Content style={{ ...contentStyle, marginTop: '64px' }}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/fixed-subplots" element={<FixedSubplotsDemo />} />
              <Route path="/custom-subplots" element={<CustomSubplotsDemo />} />
              <Route path="/shared-axes" element={<SharedAxesDemo />} />
              <Route path="/layout" element={<LayoutDemo />} />
            </Routes>
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;