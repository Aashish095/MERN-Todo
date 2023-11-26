import { useEffect, useState } from "react";
import axios from "axios";
import CreateApp from "../components/create";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: number;
} | null;

const HomeApp = () => {
  const [data, setData] = useState<User[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/all");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  const updateHandler = (id: number | null | undefined) => {
    console.log("Update user with id:", id);
    const userToUpdate = data.find((user) => user?.id == id);
    console.log(userToUpdate);
    if (userToUpdate) {
      setUserData(userToUpdate);
      setShowCreateForm(true);
    }
    // Add your update logic here, e.g., navigate to an update page
  };

  const deleteHandler = async (id: number | null | undefined) => {
    console.log("Delete user with id:", id);
    try {
      const data = await axios.post(`http://localhost:8081/api/delete/${id}`);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // Add your delete logic here, e.g., send delete request to the server
  };

  const createHandler = () => {
    console.log("Create new user");
    setShowCreateForm(true);
    // Add your create logic here, e.g., navigate to a create page
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-8 rounded h-4/5 w-4/5 p-8 bg-gray-100">
        <div className="flex justify-center mb-4">
          <h2 className="text-3xl font-bold">My CRUD App</h2>
        </div>
        <p className="mb-4">
          This is a CRUD app where you can add, create, update, and delete data.
        </p>
        <div className="pb-4">
          <button
            className="w-24 h-7 bg-green-500 rounded-lg"
            onClick={createHandler}
          >
            ADD +
          </button>
        </div>
        <table className="w-full border border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Number</th>
              <th className="border p-2"></th>
              <th className="border p-2"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((ele) => (
              <tr key={ele?.id} className="hover:bg-gray-100">
                <td className="border p-2">{ele?.name}</td>
                <td className="border p-2">{ele?.email}</td>
                <td className="border p-2">{ele?.phone}</td>
                <td className="border p-2">
                  <button
                    className="rounded-md w-24 h-7 bg-blue-500"
                    onClick={() => updateHandler(ele?.id)}
                  >
                    Update
                  </button>
                </td>
                <td className="border p-2">
                  <button
                    className="rounded-md w-24 h-7  p-1 bg-red-500"
                    onClick={() => deleteHandler(ele?.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showCreateForm && (
        <CreateApp
          setShowCreateForm={setShowCreateForm}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </div>
  );
};

export default HomeApp;
