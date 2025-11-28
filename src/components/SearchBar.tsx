import Search from "antd/es/input/Search";
import { useState } from "react";
import { api } from "../utlis/Api";

export const SearchBar = ({ setProduct }) => {
  const [search, setSearch] = useState("");

  const onSearch = async () => {
    const searchItem = search;
    console.log("Search item:", searchItem);
    const res = await api.get(`products/?search=${searchItem}&limit=${5}`);
    console.log("Res: ", res);
    setProduct(res.data?.searchedProducts   );
  };
  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onChange={(e) => setSearch(e.target.value)}
        onSearch={onSearch}
      />
    </div>
  );
};
