"use client"
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';




interface Customer {
  key: string;
  Name: string;
  Email: string;
  Phone: string | null;
  createdAt: string;
  updatedAt: string;
}

type ColumnType = {
  title: string;
  dataIndex?: string;
  key: string;
  align?: 'left' | 'right' | 'center';
  render?: () => JSX.Element;
};

const CustomerPage: React.FC = () => {

  const [form] = Form.useForm();

  // Add model
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Add table

  const [listCustomers, setListCustomers] = useState<Customer[]>([]);
  const columns: ColumnType[] = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: () => (<>
        <Button style={{ marginRight: '1rem' }} >Edit</Button>
        <Button danger>Delete</Button>


      </>
      ),
    },
  ];

  useEffect(() => {
    fetch('https://api.slmglobal.vn/api/customers')
      .then(response => response.json())
      .then(data => {
        const customers = data.data.map((item: any) => ({
          key: item.id.toString(),
          ...item.attributes
        }));
        setListCustomers(customers);
      })
      .catch(error => console.error('Error:', error)); // Log any errors that occur
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add Customer</Button>
        <Modal title="Add Customer" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} okText="Save">
          <Form form={form} layout="vertical">
            <Form.Item label="Name" name="name">
              <Input placeholder="Enter customer's name" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="Enter customer's email" />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input placeholder="Enter customer's phone number" />
            </Form.Item>

          </Form>

        </Modal>
      </div>
      <Table dataSource={listCustomers} columns={columns} />
    </>
  );
}

export default CustomerPage;