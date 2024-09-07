import { LogIn, LogOut, Plus } from "react-feather";
import logo from "../assets/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  async function logout() {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      localStorage.removeItem("token");
      if (window.location.pathname !== "/") navigate("/");
      else window.location.reload();
    } catch (err: any) {
      if (err.response && err.response.status == 401) {
        localStorage.removeItem("token");
        window.location.reload();
      } else console.error(err);
    }
  }

  return (
    <nav className="flex w-full fixed top-0 h-20 bg-primary py-3 px-6">
      <div className="flex gap-2 items-center justify-between w-full">
        <Link className="flex gap-2 h-full items-center" to="/">
          <img src={logo} className="h-full rounded-full" />
          <p className="sm:block hidden text-white font-semibold">
            Training & Placement Cell
          </p>
          <p className="block sm:hidden text-white font-semibold">T&P Cell</p>
        </Link>
        {localStorage.getItem("token") ? (
          <div className="flex gap-2">
            <Link
              to="/create-post"
              className="text-white px-4 py-2 rounded-3xl flex items-center
              hover:bg-white/15 transition duration-300 ease-in-out 
              bg-white/10 sm:bg-transparent
              "
            >
              <Plus />
              <p className="hidden sm:block uppercase font-semibold pl-2">
                Create Post
              </p>
            </Link>
            <button
              className="text-white px-4 py-2 rounded-3xl flex items-center
              hover:bg-white/15 transition duration-300 ease-in-out cursor-pointer
              bg-white/10 sm:bg-transparent
              "
              onClick={logout}
            >
              <LogOut />
              <p className="hidden sm:block uppercase font-semibold pl-2">
                Logout
              </p>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-white px-4 py-2 rounded-3xl flex items-center
              hover:bg-white/15 transition duration-300 ease-in-out
              bg-white/10 sm:bg-transparent
          "
          >
            <LogIn />
            <p className="sm:block hidden uppercase font-semibold pl-2">
              Login
            </p>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
