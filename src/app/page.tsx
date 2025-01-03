"use client";
import React from "react";
import Container from "./menu/Container";
import { Provider } from "react-redux";
import store from "../redux/store";

const HomePage: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="px-4 md:px-10 py-6">
        {/* <Header /> */}
        <Container />
      </div>
    </Provider>
  );
};

export default HomePage;
