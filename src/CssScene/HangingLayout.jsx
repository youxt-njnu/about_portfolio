import React from "react";
import { car } from "../assets/icons";

const HangingLayout = () => {
  const container = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    // width: "500px",
    // height: "500px",
    color: "white",
    "backgroundColor": "black",
    display: "flex",
    // "justify-content": "center",
    "alignItems": "center",
  };

  const image = {
    width: "50px",
    height: "50px",
    border: "red 1px solid",
    "marginRight": "10px",
  };

  const info = {
    // height: "100%",
    "overflowWrap": "anywhere",
  };
  return (
    <div style={container}>
      <img src={car} alt="" style={image} />
      <p style={info}>
        ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
      </p>
    </div>
  );
};

export default HangingLayout;
