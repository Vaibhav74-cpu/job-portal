import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

function Job() {
  const navigate = useNavigate();
  const jobId = "kahf";
  return (
    <div className="border border-gray-100 bg-white shadow-xl rounded-md">
      <div className="flex items-center justify-between m-2">
        <p className="text-sm text-gray-500">2 Days ago</p>
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
              <AvatarImage src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01104813/1268-768x591.png" />
            </Avatar>
          </Button>
          <div className=" ">
            <h1 className="font-medium text-lg">Company Name</h1>
            <p className="text-xs text-gray-600">India</p>
          </div>
        </div>
        <h1 className="font-bold text-lg">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
          nihil.
        </p>
      </div>
      <div className="flex gap-2 m-2">
        <Badge className="text-blue-600 font-bold" variant="ghost">
          12 Positions
        </Badge>
        <Badge className="text-yellow-600 font-bold" variant="ghost">
          Part Time
        </Badge>
        <Badge className="text-violet-600 font-bold" variant="ghost">
          24LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 m-2">
        <Button
          variant="outline"
          className="h-8"
          onClick={() => navigate(`/discription/${jobId}`)}
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
