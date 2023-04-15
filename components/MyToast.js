import React from "react";
import { ToastProvider, useToasts } from "react-hot-toast";

const MyToast = ({ type, message, duration }) => {
  const { addToast } = useToasts();

  const showToast = () => {
    addToast(message, {
      duration: duration || 3000, // Default duration is 3 seconds
      position: "top-center", // You can customize the toast position
      type: type || "success", // You can customize the toast type (success, error, loading)
    });
  };

  return (
    <button onClick={showToast} className={`toast-button ${type}`}>
      Show {type} Toast
    </button>
  );
};

export default MyToast;
