import { Button, Form, Input, Modal, Space, type FormProps } from "antd";
import { api } from "../utlis/Api";
import { useEffect, useState } from "react";
import type { Product } from "../Props";
import { Table } from "antd";

type Value = {
  isModalOpen: boolean;
  isLoading: boolean;
  // defaultValues: Product;
  isEdit: boolean;
};

// const defaultProduct = {
//   id: undefined,
//   name: "",
//   price: 0,
//   stock: 0,
//   description: "",
// };

export default function ProductPage() {
  const [value, setValue] = useState<Value>({
    isModalOpen: false,
    isLoading: false,
    isEdit: false,
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Desciption",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button
            onClick={() => {
              console.log("Record: ", record);
              form.setFieldsValue(record);
              setValue({
                ...value,
                isEdit: true,
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
      ),
    },
  ];
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

  const onFinish: FormProps<Product>["onFinish"] = async (values) => {
    // console.log("reached");
    // console.log("Form data:", values);

    if (value.isEdit) {
      console.log("reached");

      await api.patch(`/products/${values.id}`, values);

      window.location.reload();
    } else {
      console.log("reached");

      await api.post("/products", values);
      form.resetFields();
      setValue((prev) => ({
        ...prev,
        isModalOpen: false,
      }));
      // const timeStamp = new Date().toISOString();

      // const newProduct = [{
      //   ...values,
      //   createdAt: timeStamp
      // }]
      setProduct([{ ...product[0], ...values }]);
    }

    console.log("Product added: ", values);
    // const res = await api.get<Product[]>("/products");
    await localStorage.setItem("product", JSON.stringify(values));
    // setProduct(res.data);
  };

  const { Column } = Table;

  const handleDelete = async (id: number) => {
    console.log("reached");

    await api.delete(`products/${id}`);
    console.log("reached");

    window.location.reload();
  };

  // useEffect(() => {
  //   form.setFields(
  //     Object.entries(value.defaultValues).map(([key, value]) => ({
  //       name: key,
  //       value: value,
  //     }))
  //   );
  // }, [value.defaultValues]);

  const ProductTable = () => (
    <Table<Product>
      dataSource={product}
      rowKey={"id"}
      columns={columns}
    ></Table>
  );

  return (
    <div className="flex flex-col gap-4">
      <ProductTable />
      <Button
        type="primary"
        onClick={() => {
          form.resetFields();
          setValue({
            ...value,
            isEdit: false,
            isModalOpen: true,
          });
        }}
        style={{ alignSelf: "flex-start" }}
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
          onFinish={onFinish}
        >
          <Form.Item<Product> label="Product ID" name="id" hidden>
            <Input />
          </Form.Item>
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
