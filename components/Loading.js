import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div>
      <ReactLoading
        type="spinningBubbles"
        color="#009BF9"
        // color="#141d26"
        height={400}
        width={100}
      />
    </div>
  );
}
