import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

function Signup() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "" || null,
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFiles = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-xl p-4 my-10  bg-gray-500"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div>
            <Label>Full Name</Label>
            <Input
              className="my-2"
              type="text"
              placeholder="Enter full name"
              name="fullname"
              value={input.fullname}
              onChange={handleInput}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              className="my-2"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={handleInput}
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              className="my-2"
              type="tel"
              name="phoneNumber"
              placeholder="Enter Mobile number"
              value={input.phoneNumber}
              onChange={handleInput}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              className="my-2"
              type="password"
              name="password"
              placeholder="Enter full name"
              value={input.password}
              onChange={handleInput}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label>Role</Label>
            <RadioGroup className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={handleInput}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  className="cursor-pointer"
                  onChange={handleInput}
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center my-2">
              <Label>Profile </Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                name="file"
                onChange={handleFiles}
              />
            </div>
          </div>

          <Button type="submit" className="w-full gap-2">
            SignUp
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 ">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
