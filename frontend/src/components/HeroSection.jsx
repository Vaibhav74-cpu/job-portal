import React from "react";
import { Button } from "./ui/button";
import { SearchCheckIcon, SearchIcon } from "lucide-react";

function HeroSection() {
  return (
    <div className="items-center text-center">
      <div className="flex flex-col gap-5 my-10">
        <div>
          <span className=" text-red-500 bg-gray-200 rounded-full mx-auto h-2 px-4 py-2 font-medium">
            No. 1 JobHunt Website
          </span>
        </div>
        <h1 className="font-bold text-5xl mt-3 ">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-yellow-600"> Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dolore
          aspernatur dolorum sed consequatur similique cumque asperiores
        </p>
        <div className="flex w-[40%] items-center border border-grey rounded-full pl-3 gap-4 mx-auto shadow-lg mt-3">
          <input
            type="text"
            placeholder="Find your dream job"
            className="outline-none border-none w-full"
          />
          <Button className="rounded-r-full bg-yellow-600">
            <SearchIcon className="h-5 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
