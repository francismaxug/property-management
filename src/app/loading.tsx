"use client";
import React from "react";
import { ClipLoader } from "react-spinners";

const overide = {
  display: "block",
  margin: "100px auto",
};
const loading = () => {
  return (
    <ClipLoader
      color="#36d7b7"
      loading
      size={80}
      cssOverride={overide}
      speedMultiplier={0.8}
    />
  );
};

export default loading;
