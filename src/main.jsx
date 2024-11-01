import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import SideBarProvider from "./context/SideBar";
import { AuthProvider } from "./context/authContext";
import NotesProvider from "./context/notesContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NotesProvider>
        <SideBarProvider>
          <App />
        </SideBarProvider>
      </NotesProvider>
    </AuthProvider>
  </StrictMode>
);
