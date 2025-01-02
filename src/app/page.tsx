"use client";
import React from "react";
import { Heading } from "./components/head/Heading";
import Mainbody from "./components/mainbody/Mainbody";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const HomePage: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="px-4 md:px-10 py-6">
        <Heading />
        <Mainbody />
      </div>
    </Provider>
  );
};

export default HomePage;
