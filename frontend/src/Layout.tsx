import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="bg-surface pt-24 min-h-screen flex flex-col">
        <Outlet /> {/* This is where the route content will be rendered */}
      </main>
    </>
  );
}

export default Layout;
