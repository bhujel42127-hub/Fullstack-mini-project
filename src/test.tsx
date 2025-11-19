import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "./Props";

export default function Test() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {data.map((user, index) => {
        return (
          <div key={index}>
            <li>{user.name}</li>
            <li>{user.email}</li>
          </div>
        );
      })}
    </div>
  );
}
