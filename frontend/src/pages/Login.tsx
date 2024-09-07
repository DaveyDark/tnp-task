import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Login = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
    }
  });

  async function handleSubmit() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          username: username.current!.value,
          password: password.current!.value,
        },
        {
          headers: {
            Accept: "application/json",
          },
        },
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password");
      } else {
        console.error(err);
      }
    }
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 grid place-items-center mx-2 pointer-events-none">
      <div className="bg-white p-8 rounded-lg max-w-96 pointer-events-auto">
        <h2 className="text-2xl font-semibold -ml-2 mb-4">Admin Login</h2>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          ref={username}
          className="mt-1 p-2 border border-gray-300 block w-full rounded-md"
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          ref={password}
          className="mt-1 p-2 border border-gray-300 block w-full rounded-md"
        />
        <p className="text-red-500 text-sm mt-2 italic">{error}</p>
        <button
          className="mt-4 bg-primary text-white p-2 w-full rounded"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
