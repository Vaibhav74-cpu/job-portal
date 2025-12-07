import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { data, Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
// import { store } from "@/redux/store";
import { Loader2 } from "lucide-react";

function Login() {
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_ENDPOINT}/login`,
        input,
        // {
        //   email: input.email,
        //   password: input.password,
        //   role: input.role,
        // },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl">
        <form
          onSubmit={handleSubmit}
          className="w-1/3 border border-gray-200 rounded-xl p-4 my-10  bg-gray-500"
        >
          <h1 className="font-bold text-xl mb-5">Login </h1>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter email"
              className="my-2"
              name="email"
              value={input.email}
              onChange={handleInput}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              className="my-2"
              value={input.password}
              onChange={handleInput}
            />
          </div>
          <div>
            <Label>Role</Label>
            <RadioGroup className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  checked={input.role === "student"}
                  className="cursor-pointer"
                  onChange={handleInput}
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={handleInput}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full">
              <Loader2 className="h-2 mr-2 w-full animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
