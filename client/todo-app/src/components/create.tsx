import axios from "axios";
import React, { useState } from "react";
import { User } from "../pages/home";

const CreateApp = ({
  setShowCreateForm,
  userData,
  setUserData,
}: {
  setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
  userData?: User | null;
  setUserData?: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const [formData, setFormData] = useState({
    name: "" || userData?.name,
    email: "" || userData?.email,
    phone: "" || userData?.phone,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Add your submission logic here, for example, make an API request
    console.log("Form submitted with data:", formData);
    // Reset the form data
    // setFormData({ name: "", email: "", phone: "" });
    // Close the modal
    if (!userData) {
      try {
        const data = await axios.post(
          "http://localhost:8081/api/create",
          formData
        );
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      try {
        const data = await axios.post(
          `http://localhost:8081/api/update/${userData.id}`,
          formData
        );
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    setUserData?.(null);
    setShowCreateForm(false);
  };

  return (
    <div className="fixed w-full h-full flex items-center justify-center z-30">
      <div className="bg-white p-8 rounded shadow-md w-[90vh] h-[70vh] ">
        <div className="flex justify-center mb-4">
          <h2 className="text-3xl font-bold">
            {userData ? "Update User Data" : "Create User"}
          </h2>
        </div>
        <p className="mb-4">Please enter your details</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className={`text-white p-2 rounded-md ${
                userData ? "bg-yellow-300" : "bg-green-500"
              }`}
            >
              {userData ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white p-2 rounded-md"
              onClick={() => {
                setUserData?.(null);
                setShowCreateForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateApp;
