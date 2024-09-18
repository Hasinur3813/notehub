import React from "react";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import SideBarProvider from "../context/SideBar";
import NotePage from "../pages/NotePage";

const App = () => {
  return (
    <div className="font-inter bg-primary dark:bg-dark-secondary">
      <SideBarProvider>
        <Layout>
          <NotePage />
        </Layout>
      </SideBarProvider>
    </div>
  );
};

export default App;
