import React from "react";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import SideBarProvider from "../context/SideBar";
import Signup from "../pages/Signup";

const App = () => {
  return (
    <div className="font-inter bg-primary dark:bg-dark-secondary">
      <SideBarProvider>
        <Layout>
          <Signup />
        </Layout>
      </SideBarProvider>
    </div>
  );
};

export default App;
