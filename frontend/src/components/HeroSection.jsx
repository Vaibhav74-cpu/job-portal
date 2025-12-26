import React, { useState } from "react";
import { Button } from "./ui/button";
import { SearchCheckIcon, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

function HeroSection() {
  useGetAllJobs()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, searchText] = useState("");
  const searchHandler = () => {
    dispatch(setSearchText(text));
    navigate("/browse");
  };
  
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
            name="text"
            value={text}
            placeholder="Find your dream job"
            className="outline-none border-none w-full"
            onChange={(e) => searchText(e.target.value)}
          />
          <Button
            className="rounded-r-full bg-yellow-600"
            onClick={searchHandler}
          >
            <SearchIcon className="h-5 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
