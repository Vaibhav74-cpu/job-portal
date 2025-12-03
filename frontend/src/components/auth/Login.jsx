import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Link } from "react-router-dom";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";

function Login() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl">
        <form action="" className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
        <h1 className="font-bold text-xl mb-5">Login </h1>
          <div>
            <Label>Email</Label>
            <Input type="text" placeholder="Enter email" />
          
          </div>
          <div>
            <Label>Password</Label>
            <Input type="number" placeholder="Enter password" />
          </div>
          <div>
            <Label>Role</Label>
            <RadioGroup className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
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
