import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
// import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function PostJob() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const selectHandler = (value) => {
    const selectCompany = companies.find(
      (company) => company?.name?.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex  items-center justify-center w-screen  mx-auto my-5">
        <form
          onSubmit={submitHandler}
          className="max-w-7xl border border-gray-200 shadow-lg rounded-md p-8"
        >
          <div className="grid grid-cols-2  gap-3 my-1">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                onChange={inputHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                onChange={inputHandler}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                onChange={inputHandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                onChange={inputHandler}
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                onChange={inputHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                onChange={inputHandler}
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                onChange={inputHandler}
              />
            </div>
            <div>
              <Label>No. of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2"
                onChange={inputHandler}
              />
            </div>
            <div>
              {companies.length > 0 && (
                <Select onValueChange={selectHandler}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem value={company?.name?.toLowerCase()}>
                          {company?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          {/* <Button className="mt-3 w-full">Post New Job</Button> */}
          {loading ? (
            <Button className="w-full">
              <Loader2 className="h-2 mr-2 w-full animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-3">
              Post New Job
            </Button>
          )}
          {companies.length <= 0 && (
            <span className="text-red-500 text-xs font-bold  text-center mt-3">
              *Please register company before posting a job
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostJob;
