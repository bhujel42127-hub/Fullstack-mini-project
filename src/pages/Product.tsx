import { Button, Form, Input, Modal, type FormProps } from "antd";
import { api } from "../components/Api";
import { useEffect, useState } from "react";
import type { Product, User } from "../Props";
import { Table, Tag } from "antd";

export default function ProductPage() {
  const [value, setValue] = useState({
    isModalOpen: false,
    isLoading: false,
  });
  const [product, setProduct] = useState<Product[]>();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get<Product[]>("/products");
      setProduct(res.data);
    };
    fetchProduct();
  }, []);

  const [form] = Form.useForm();

  // const data = await api.get("/products");

  const addProduct = () => {};
  const editProduct = () => {};

  const fetchProduct = async () => {};
  // const deleteProduct = () => {

  // };

  // const showAddModal = () => {
  //   setIsModalOpen((prev) => ({
  //     ...prev,
  //     addModalOpen: true,
  //   }));
  // };

  // const showEditModal = () => {
  //   setIsModalOpen((prev) => ({
  //     ...prev,
  //     editModalOpen: true,
  //   }));
  // };

  const showModal = () => {
    setValue((prev) => ({
      ...prev,
      isModalOpen: true,
    }));
  };

  const handleCancel = () => {
    form.resetFields();
    setValue((prev) => ({
      ...prev,
      isModalOpen: true,
    }));
  };

  const onFinish: FormProps<Product | User>["onFinish"] = async (values) => {
    console.log("reached");
    await api.post("/products", values);
    form.resetFields();
    setValue((prev) => ({
      ...prev,
      isModalOpen: true,
    }));
    console.log("Product added: ", values);
    const res = await api.get<Product[]>("/products");
    setProduct(res.data);
  };

  const { Column } = Table;

  const ProductTable = () => (
    <Table<Product> dataSource={product}>
      <Column title="Name" dataIndex="p_name" key="p_name" />
      <Column title="Price" dataIndex="price" key="price" />
      <Column title="Stock" dataIndex="stock" key="stock" />
      <Column title="Description" dataIndex="description" key="description" />
      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags: string[]) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        )}
      />
      <Column />
    </Table>
  );

  return (
    <div className="flex gap-4">
      <ProductTable />
      <Button type="primary" onClick={showModal}>
        Add Product
      </Button>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={value.isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ name: "Camera" }}
          onFinish={onFinish}
        >
          <Form.Item<Product>
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Product>
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<Product>
            label="Stock"
            name="stock"
            rules={[{ required: true, message: "Please input stock!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<Product>
            label="Description"
            name="description"
            rules={[{ required: true, message: "Provide product description" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
