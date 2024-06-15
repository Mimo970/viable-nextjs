import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Layout from "../../components/Layout";
import Link from "next/link";
import Cookies from "js-cookie";

const ProfileComponent = () => {
  const { currentUser } = useContext(AuthContext);
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    const address = Cookies.get("shippingAddress");
    if (address) {
      setShippingAddress(JSON.parse(address));
    }
  }, []);

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-lg mx-auto bg-gray-100 rounded-lg shadow-md p-12">
          <h1 className="text-4xl text-gray-800 font-semibold mb-6">Profile</h1>
          <p className="mb-4 text-xl">
            <strong className="font-medium text-gray-800">Name:</strong>{" "}
            {currentUser.displayName}
          </p>
          <p className="mb-4 text-xl">
            <strong className="font-medium text-gray-800">Email:</strong>{" "}
            {currentUser.email}
          </p>
          <div className="mb-4 text-xl">
            <strong className="font-medium text-gray-800">
              Shipping Info:
            </strong>
            {shippingAddress && (
              <div className="my-2">
                <p>
                  <strong>Name:</strong> {shippingAddress.name}
                </p>
                <p>
                  <strong>Address:</strong> {shippingAddress.address}
                </p>
                <p>
                  <strong>City:</strong> {shippingAddress.city}
                </p>
                <p>
                  <strong>State:</strong> {shippingAddress.state}
                </p>
                <p>
                  <strong>Zip:</strong> {shippingAddress.zip}
                </p>
              </div>
            )}
          </div>
          <Link
            className="text-2xl font-semibold text-blue-500 hover:underline"
            href={"/orders"}
          >
            Orders
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileComponent;
