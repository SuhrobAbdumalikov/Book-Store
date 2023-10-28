import PropTypes from "prop-types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";

import { instance } from "../utils/useRequest";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setIsLogged }) {
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const data = await instance.post("/login", formData);
      if (data?.data?.user) {
        localStorage.setItem("access_token", data.data?.user);
        setIsLogged(true);
        navigate("/");
        return;
      }
      throw Error();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setFormData({
        userEmail: "",
        userPassword: "",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex gap-8 flex-col w-1/2 mx-auto bg-green-500 p-10 rounded-md">
        <h1 className="text-center text-2xl font-medium text-white">Login</h1>
        <Input
          name="userEmail"
          placeholder={"Email"}
          type="email"
          value={formData.userEmail}
          onChange={handleChange}
          className="shadow-md shadow-gray-600"
        />
        <Input
          name="userPassword"
          placeholder={"Password"}
          type="password"
          value={formData.userPassword}
          onChange={handleChange}
          className="shadow-md shadow-gray-600"
        />
        <Button
          onClick={onLogin}
          disabled={isLoading}
          className="shadow-md shadow-gray-500"
        >
          Login
        </Button>
        <Link to={"/signUp"} className="text-center text-white">
          Sign up
        </Link>
      </div>
    </div>
  );
}
export default Login;

Login.propTypes = {
  setIsLogged: PropTypes.func,
};
