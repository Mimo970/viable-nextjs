import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Layout from "../../components/Layout";
import Link from "next/link";

const ProfileComponent = ({ name, email, shippingInfo, orders }) => {
  const { currentUser } = useContext(AuthContext);

  const [profileOrders, setProfileOrders] = useState([]);

  return (
    <Layout>
      <div className="py-36 pb-80 bg-[#15202b]">
        <div className=" max-w-md mx-auto bg-gray-700 rounded-lg shadow-md p-8">
          <h1 className="text-3xl text-white font-semibold mb-4">Profile</h1>
          <p className="mb-2">
            <strong className="font-medium text-[#8899Af]">Name:</strong> {name}
          </p>
          <p className="mb-2">
            <strong className="font-medium text-[#8899Af]">Email:</strong>
            {email}
          </p>
          <p className="mb-2">
            <strong className="font-medium text-[#8899Af]">
              Shipping Info:
            </strong>{" "}
            {shippingInfo}
          </p>

          <Link className=" text-2xl font-semibold my-4" href={"/orders"}>
            Orders
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileComponent;
