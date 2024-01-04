'use client'
import React, { useState } from 'react';
import {
  ShopOutlined,
  FileTextOutlined,
  UserOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Divider, Menu, Switch, Layout } from 'antd';
import type { MenuProps, MenuTheme } from 'antd/es/menu';
import Link from 'next/link';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [

  getItem('Dashboard', 'dashboard', <DashboardOutlined />, [

  ]),


  getItem('Post', 'post', <FileTextOutlined />, [
    getItem(<Link href='/slmglobal/all-post'>All Post</Link>, 'all-post'),
    getItem('Category', 'post-category'),
    getItem('Add New Post', 'post-add-new-post'),
    getItem('Tags', 'post-tags'),
  ]),

  getItem('Products', 'products', <ShopOutlined />, [
    getItem('All Products', 'all-products'),
    getItem('Add New', 'product-add-new'),
    getItem('Category', 'product-category'),
  ]),

  getItem('User', 'user', <UserOutlined />, [
    getItem('All Users', 'all-user'),
    getItem('Add User', 'add-user'),
    getItem('Profile', 'profile'),
  ]),



];

const NavbarModule: React.FC = () => {
  return (
    <>
      <Sider width={256} >

        <Menu
          defaultSelectedKeys={['dashboard']}
          defaultOpenKeys={['post']}
          mode={'inline'} //'vertical' | 'inline'
          theme={'light'} //'dark' | 'light'
          items={items}
        /></Sider>
    </>
  );
};

export default NavbarModule;
