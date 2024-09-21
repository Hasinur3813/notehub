import React from "react";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import SideBarProvider from "../context/SideBar";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import CreateNote from "../pages/CreateNote";

const App = () => {
  return (
    <div className="font-inter bg-primary dark:bg-dark-secondary">
      <SideBarProvider>
        <Layout>
          <CreateNote />
        </Layout>
      </SideBarProvider>
    </div>
  );
};

export default App;
