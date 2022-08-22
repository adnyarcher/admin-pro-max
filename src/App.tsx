import { Layout, Menu } from 'antd';
import React, {useState} from 'react';

import './App.css';
import {
    Routes,
    Route,
    Link, Navigate, useLocation
} from "react-router-dom";
import Login from "./Components/Auth/Login";
import Dailies from "./Components/Dailies/Dailies";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import Companies from "./Components/Companies/Companies";
import { Company } from "./Components/Companies/Company/Company";
const { Header, Sider, Content } = Layout;
const App: React.FC = () => {
    const isAuthenticated = localStorage.getItem('token') as string;
    const [authorized, setAuthorized] = useState<string | null>(isAuthenticated);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const queryClient = new QueryClient()
    let location: any = useLocation();
    console.log(location)
  return (
      <QueryClientProvider client={queryClient}><div className="App">
            {!authorized && location.pathname !== '/login' && <Navigate
                to={{
                    pathname: '/login',
                }}
            />}
            {authorized && location.pathname === '/login' && <Navigate
                to={{
                    pathname: '/dailies',
                }}
            />}
          {authorized && location.pathname === '/' && <Navigate
              to={{
                  pathname: '/dailies',
              }}
          />}
            {authorized ? <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{height: '100vh'}}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[(location.pathname.includes('/dailies') && '/dailies') || (location.pathname.includes('/companies') && '/companies')]}
                    >
                        <Menu.Item key={'/dailies'}>
                            <Link to="/dailies" className="nav-text">Dailies</Link>
                        </Menu.Item>
                        <Menu.Item key={'/companies'}>
                            <Link to="/companies" className="nav-text">Companies</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Routes>
                            <Route path="/dailies" element={<Dailies />} />
                            <Route path="/companies" element={<Companies />} />
                            <Route path="/companies/:id" element={<Company />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout> : <></>}
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
      </div></QueryClientProvider>
  );
}

export default App;
