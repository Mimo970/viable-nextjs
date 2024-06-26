import React from "react";
import ReactLoading from "react-loading";
import Layout from "../../components/Layout";

export default function Loading() {
  return (
    // <Layout>
    <div className="bg-[#f8fafc]">
      <h2>Loading in ReactJs - GeeksforGeeks</h2>
      <ReactLoading type="balls" color="#0000FF" height={100} width={50} />
      <ReactLoading type="bars" color="#0000FF" height={100} width={50} />
      <ReactLoading type="bubbles" color="#0000FF" height={100} width={50} />
      <ReactLoading type="cubes" color="#0000FF" height={100} width={50} />
      <ReactLoading type="cylon" color="#0000FF" height={100} width={50} />
      <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
      <ReactLoading type="spokes" color="#0000FF" height={100} width={50} />
      <ReactLoading
        type="spinningBubbles"
        color="#0000FF"
        height={400}
        width={200}
      />
    </div>
    //</Layout>
  );
}
