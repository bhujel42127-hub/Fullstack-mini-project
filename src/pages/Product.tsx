import { Button, Form, Input, Modal, Space, type FormProps } from "antd";
import { api } from "../utlis/Api";
import { useEffect, useState } from "react";
import type { Product } from "../Props";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { openNotification } from "../utlis/openNotification";
import { SearchBar } from "../components/SearchBar";

type Value = {
  isModalOpen: boolean;
  isLoading: boolean;
  // defaultValues: Product;
  isEdit: boolean;
  total: number;
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
    total: 0,
  });
  const [page, setPage] = useState(1);
  const columns: ColumnsType<Product> = [
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
      render: (_: unknown, record: Product) => (
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
              handleDelete(record._id as string);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const [product, setProduct] = useState<Product[]>([]);

  const fetchProduct = async (page = 1) => {
    const res = await api.get(`/products?page=${page}`);
    console.log("product fetched");
    console.log(res.data);

    setProduct(res.data.products);
    setValue({
      ...value,
      total: res.data.total,
    });
    setPage(res.data.page);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const [form] = Form.useForm();

  // const data = await api.get("/products");

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

      await api.put(`/products/${values._id}`, values);
      await fetchProduct();
      form.resetFields();
      setValue((prev) => ({
        ...prev,
        isModalOpen: false,
      }));
      openNotification("success", "Product Edit", `Product edited`);
    } else {
      console.log("reached");

      await api.post("/products", values);
      await fetchProduct();
      form.resetFields();
      setValue((prev) => ({
        ...prev,
        isModalOpen: false,
      }));
      openNotification("success", "Product Added", `Product added`);
      // const timeStamp = new Date().toISOString();

      // const newProduct = [{
      //   ...values,
      //   createdAt: timeStamp
      // }]
    }

    console.log("Product added: ", values);
    // const res = await api.get<Product[]>("/products");
    // setProduct(res.data);
  };

  const handleDelete = async (id: string) => {
    console.log("reached");

    await api.delete(`/products/${id}`);
    await fetchProduct();
    openNotification("success", "Product Deleted", `Product deleted`);
    console.log("reached");
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
      rowKey={"_id"}
      columns={columns}
      pagination={{
        current: page,
        pageSize: 5,
        total: value.total,
        onChange: (page) => {
          fetchProduct(page);
        },
      }}
    ></Table>
  );

  console.log("Page: ", page);

  return (
    <div className="flex flex-col gap-4">
      <SearchBar setProduct={setProduct} />
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
          <Form.Item<Product> label="Product ID" name="_id" hidden>
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
