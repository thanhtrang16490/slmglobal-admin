'use client'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import Link from 'next/link';
const items1: MenuProps['items'] = [
    {
        label:
            <Link href='/slmglobal'>SLM GLOBAL</Link>,
        key: 'slmglobal',
    },
    {
        label:
            <Link href='/slmglobal'>ALIBABA</Link>,
        key: 'Alibaba',
    },

]

const { Header, Content, Sider } = Layout;
export default function HeaderModule() {


    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                // defaultSelectedKeys={['2']}
                items={items1}
                style={{ flex: 1, minWidth: 0 }}
            />
        </Header>
    )
}
