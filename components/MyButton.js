import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import MyToast from "./MyToast";
import { ToastContainer } from "react-bootstrap";

const MyButton = ({ bg, title, message, position }) => {
  const [showToast, setShowToast] = useState(false);

  const handleButtonClick = () => {
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleButtonClick}>
        Show Toast
      </Button>
      {showToast && (
        <ToastContainer position={position}>
          <MyToast
            bg="success"
            title="Success"
            message="This is a success toast!"
            position="top-right"
            onClose={handleToastClose}
            autohide
          />
        </ToastContainer>
      )}
    </div>
  );
};

export default MyButton;
