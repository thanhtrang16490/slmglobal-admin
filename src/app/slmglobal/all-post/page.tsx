"use client"
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;



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

const BlogPage: React.FC = () => {

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

  const [listPosts, setListPosts] = useState<Customer[]>([]);
  const columns: ColumnType[] = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Name',
    },
    {
      title: 'Category',
      dataIndex: 'Category',
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
    fetch('https://api.slmglobal.vn/api/blogs')
      .then(response => response.json())
      .then(data => {
        const posts = data.data.map((item: any) => ({
          key: item.id.toString(),
          ...item.attributes
        }));
        setListPosts(posts);
      })
      .catch(error => console.error('Error:', error)); // Log any errors that occur
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add Post</Button>
        <Modal title="Add Customer" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} okText="Save">
          <Form form={form} layout="vertical">
            <Form.Item label="Title" name="title">
              <Input placeholder="Enter title of post" />
            </Form.Item>
            <Form.Item label="Category" name="category">
              <TextArea placeholder="Select category" />
            </Form.Item>


          </Form>

        </Modal>
      </div>
      <Table dataSource={listPosts} columns={columns} />
    </>
  );
}

export default BlogPage;