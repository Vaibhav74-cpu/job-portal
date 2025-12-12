import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, icons, Mail, Pen } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Badge } from "@/components/ui/badge";
import AppliedJobTable from "./AppliedJobTable";

const skills = [];
const isResume = false;

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="pl-28 pr-28  bg-white  max-w-4xl mx-auto">
        <div className="border border-gray-300 rounded-lg">
          <div className="flex justify-between  ">
            <div className="flex gap-2">
              <div className="h-20 w-20 m-2">
                <Avatar>
                  <AvatarImage src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01104813/1268-768x591.png" />
                </Avatar>
              </div>
              <div className="my-4">
                <h1 className="font-bold text-xl">Full Name</h1>
                <p className="text-gray-500 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur, blanditiis!
                </p>
              </div>
            </div>
            <div className="m-2">
              <Button variant="outline">
                <Pen />
              </Button>
            </div>
          </div>
          <div className="m-4 mt-1">
            <div className="flex gap-4 my-2">
              <Mail />
              <Label className="text-sm">borkarv908@gmail.com</Label>
            </div>
            <div className="flex gap-4 my-3">
              <Contact />
              <Label className="text-sm">91-93591-48868</Label>
            </div>
          </div>
          <div className="m-4">
            <Label className="text-lg font-bold">Skills</Label>
            <div className="flex gap-2 mt-2">
              {skills.length !== 0 ? (
                skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              ) : (
                <span className="text-gray-500 text-sm">NA</span>
              )}
            </div>
          </div>
          <div className="m-4">
            <Label className="font-bold text-lg">Resume</Label>
            <div>
              {isResume ? (
                <a
                  href="http://google.con"
                  className="hover:underline text-blue-600 cursor-pointer w-full"
                  target="blank"
                >
                  vaibhav borkar
                </a>
              ) : (
                <span className="text-gray-500 text-sm">NA</span>
              )}
            </div>
          </div>
        </div>
        <div className="max-w-4xl bg-white mx-auto">
          <h1 className="m-3 text-lg font-bold">Applied Jobs</h1>
          {/* Applied jobs table */}
          <AppliedJobTable />
        </div>
      </div>
    </div>
  );
}

export default Profile;
