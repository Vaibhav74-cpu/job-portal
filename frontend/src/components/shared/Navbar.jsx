import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { LogOutIcon, User2Icon } from "lucide-react";

function Navbar() {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-28">
        <div>
          {" "}
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#f83002]">Hunt</span>
          </h1>
        </div>
        <div>
          <div className="flex gap-5">
            <ul className="flex items-center gap-5 font-medium ">
              <li>Home</li>
              <li>Jobs</li>
              <li>Browse</li>
            </ul>
            {!user ? (
              <div className="flex gap-3">
                <Button variant="outline" className="">
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  variant="outline"
                  className="bg-yellow-600 hover:bg-yellow-800"
                >
                  <Link to="/signup">SignUp</Link>
                </Button>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer rounded-full border">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>VB</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-64 rounded-xl shadow-md p-4"
                >
                  <div className="flex items-center gap-3 pb-3 border-b">
                    <Avatar className="h-11 w-11 rounded-full border">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">vaibhav borkar</h3>
                      <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 text-gray-400">
                    <Button variant="link" className="gap-2">
                      <User2Icon /> View Profile
                    </Button>

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      {" "}
                      <Button variant="link" className="h-4 w-4">
                        <LogOutIcon /> Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
