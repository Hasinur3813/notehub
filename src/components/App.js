import React from "react";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";

const App = () => {
  return (
    <div className="font-inter bg-primary">
      <Layout>
        <HomePage />
      </Layout>
    </div>
  );
};

export default App;
