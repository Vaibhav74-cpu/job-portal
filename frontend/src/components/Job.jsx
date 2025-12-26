import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function Job({ job }) {
  const navigate = useNavigate();
  // const jobId = "kahf";

  const dayAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="border border-gray-100 bg-white shadow-xl rounded-md">
      <div className="flex items-center justify-between m-2">
        <p className="text-sm text-gray-500">
          {dayAgo(job?.createdAt) === 0
            ? "Today"
            : `${dayAgo(job?.createdAt)} days ago`}
        </p>
        <Button
          className="rounded-full border-white"
          variant="outline"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      <div className="m-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="p-0 border-white">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <div className=" ">
            <h1 className="font-medium text-lg">{job?.company?.name}</h1>
            <p className="text-xs text-gray-600">India</p>
          </div>
        </div>
        <h1 className="font-bold text-lg">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex gap-2 m-2">
        <Badge className="text-blue-600 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-yellow-600 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-violet-600 font-bold" variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 m-2">
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variant="outline"
          className="h-8"
          onClick={() => navigate(`/discription/${job?._id}`)}
        >
          Details
        </Button>
        <Button className="bg-violet-600 text-sm px-3 py-1 h-8">
          Save for later
        </Button>
      </div>
    </div>
  );
}

export default Job;
