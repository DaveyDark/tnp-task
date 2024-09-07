import { useNavigate } from "react-router-dom";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  return children;
};

export default Auth;
