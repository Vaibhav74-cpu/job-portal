import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl">
        <form
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div>
            <Label>Full Name</Label>
            <Input className="my-2" type="text" placeholder="Enter full name" />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              className="my-2"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              className="my-2"
              type="number"
              placeholder="Enter Mobile number"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              className="my-2"
              type="password"
              placeholder="Enter full name"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <RadioGroup className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center">
              <Label>Profile</Label>
              <Input accept="image/*" type="file" className="cursor-pointer" />
            </div>
          </div>

          <Button type="submit" className="w-full">
            SignUp
          </Button>
          <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-600 ">Login</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
