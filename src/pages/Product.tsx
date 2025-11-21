import { Button, Form, Input, Modal, Space, type FormProps } from "antd";
import { api } from "../components/Api";
import { useEffect, useState } from "react";
import type { Product, User } from "../Props";
import { Table } from "antd";

type Value = {
  isModalOpen: boolean;
  isLoading: boolean;
  defaultValues: Product;
};

const defaultProduct = {
  name: "",
  price: 0,
  stock: 0,
  description: "",
};

export default function ProductPage() {
  const [value, setValue] = useState<Value>({
    isModalOpen: false,
    isLoading: false,
    defaultValues: defaultProduct,
  });
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get<Product[]>("/products/");
      setProduct(res.data);
    };
    fetchProduct();
  }, []);

  const [form] = Form.useForm();

  // const data = await api.get("/products");

  const addProduct = () => {};
  const editProduct = () => {};

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

  const handleCancel = () => {
    form.resetFields();
    setValue((prev) => ({
      ...prev,
      isModalOpen: false,
    }));
  };

  const onFinish: FormProps<Product | User>["onFinish"] = async (values) => {
    console.log("reached");
    await api.post("/products", values);
    form.resetFields();
    setValue((prev) => ({
      ...prev,
      isModalOpen: false,
    }));
    console.log("Product added: ", values);
    const res = await api.get<Product[]>("/products");
    await localStorage.setItem("product", JSON.stringify(values));
    setProduct(res.data);
  };

  const { Column } = Table;

  const handleDelete = async (id: number) => {
    console.log("reached");

    await api.delete(`http://localhost:3000/products/${id}`);
    console.log("reached");

    window.location.reload();
  };

  useEffect(() => {
    form.setFields(
      Object.entries(value.defaultValues).map(([key, value]) => ({
        name: key,
        value: value,
      }))
    );
  }, [value.defaultValues]);

  const ProductTable = () => (
    <Table<Product> dataSource={product}>
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Price" dataIndex="price" key="price" />
      <Column title="Stock" dataIndex="stock" key="stock" />
      <Column title="Description" dataIndex="description" key="description" />
      <Column
        title="Action"
        key="action"
        render={(_: any, record: Product) => (
          <Space size="middle">
            <Button
              onClick={() => {
                setValue({
                  ...value,
                  defaultValues: record,
                  isModalOpen: true,
                });
              }}
            >
              Edit
            </Button>
            <Button
              danger
              onClick={() => {
                handleDelete(record.id as number);
              }}
            >
              Delete
            </Button>
          </Space>
        )}
      />
    </Table>
  );

  return (
    <div className="flex gap-4">
      <ProductTable />
      <Button
        type="primary"
        onClick={() => {
          setValue({ ...value, defaultValues: defaultProduct, isModalOpen: true });
        }}
      >
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
          initialValues={value.defaultValues}
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
