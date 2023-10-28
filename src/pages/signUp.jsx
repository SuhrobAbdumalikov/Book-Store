import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import { instance } from "../utils/useRequest";

function SignUp() {
  const [postUser, setPostUser] = useState({
    newUserName: "",
    newUserEmail: "",
    newUserPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = (e) => {
    const { value, name } = e.target;
    setPostUser((prev) => ({ ...prev, [name]: value }));
  };

  const SignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await instance.post("/signup", postUser);
      if (data?.status === "ok") {
        toast({
          // className: "bg-green-500",
          title: "Successfully done!",
          description: "New user created successfully",
        });
        navigate("/login");
      }
      throw Error();
    } catch (err) {
      // toast({
      //   variant: "destructive",
      //   title: "Uh oh! Something went wrong.",
      //   description: "There was a problem with your request.",
      // });
      setPostUser({
        newUserName: "",
        newUserEmail: "",
        newUserPassword: "",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form
        onSubmit={SignUp}
        className="flex gap-8 flex-col w-1/2 mx-auto bg-green-500 p-10 rounded-md"
      >
        <h1 className="text-center text-2xl font-medium text-white">Sign Up</h1>
        <Input
          name="newUserName"
          placeholder={"UserName"}
          type="text"
          value={postUser.newUserName}
          onChange={handleSignUp}
          className="shadow-md shadow-gray-500"
        />
        <Input
          name="newUserEmail"
          placeholder={"Email"}
          type="email"
          value={postUser.newUserEmail}
          onChange={handleSignUp}
          className="shadow-md shadow-gray-500"
        />
        <Input
          name="newUserPassword"
          placeholder={"Password"}
          type="password"
          value={postUser.newUserPassword}
          onChange={handleSignUp}
          className="shadow-md shadow-gray-500"
        />
        <Button className="shadow-md shadow-gray-500" disabled={isLoading}>
          Sign Up
        </Button>
        <Link to={"/login"} className="text-center text-white">
          Login
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
SignUp.propTypes = {
  setIsLogged: PropTypes.func,
};
