import "./App.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import CrudStoreContextProvider from "../store/Store";



function App() {
  //display the conetnts and route
  

  return (
    <CrudStoreContextProvider
      
    >
      <Header />
      <div className="app">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </CrudStoreContextProvider>
  );
}

export default App;
