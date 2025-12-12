import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

function JobDescription() {
  const isApplied = false;
  return (
    <div>
      <div className="max-w-7xl mx-auto pl-28 pr-28 my-10">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-xl">Frontend Developer</h1>
            <div className="flex gap-4 mt-3">
              <Badge variant="ghost" className="text-blue-600 font-bold">
                12 Positions
              </Badge>
              <Badge variant="ghost" className="text-yellow-600 font-bold">
                Full time
              </Badge>
              <Badge variant="ghost" className="text-violet-600 font-bold">
                12 LPA
              </Badge>
            </div>
          </div>
          <div>
            <Button
              disabled={isApplied}
              className={`rounded-lg  ${
                isApplied
                  ? "bg-gray-500 hover: cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-800"
              }`}
            >
              {isApplied ? "Already Apllied" : "Apply now"}
            </Button>
          </div>
        </div>

        <h1 className="font-bold pb-4 my-4 border-b-2 border-b-gray-400 ">
          Job Description
        </h1>
        <div className="mt-4">
          <h1 className="font-bold">
            Role :{" "}
            <span className="text-gray-800 font-normal pl-3">
              Frontend Developer
            </span>{" "}
          </h1>
          <h1 className="font-bold ">
            Location :{" "}
            <span className="text-gray-800 font-normal pl-3">Nagpur</span>
          </h1>
          <h1 className="font-bold">
            Description :{" "}
            <span className="text-gray-800 font-normal pl-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Veritatis porro odio quae quasi mollitia.
            </span>
          </h1>
          <h1 className="font-bold ">
            Experience :{" "}
            <span className="text-gray-800 font-normal pl-3">2 years</span>
          </h1>
          <h1 className="font-bold ">
            Salary :{" "}
            <span className="text-gray-800 font-normal pl-3">20000</span>
          </h1>
          <h1 className="font-bold ">
            Total Application :
            <span className="text-gray-800 font-normal pl-3">4</span>
          </h1>
          <h1 className="font-bold ">
            Posted Date :{" "}
            <span className="text-gray-800 font-normal pl-3">07/07/2003</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
