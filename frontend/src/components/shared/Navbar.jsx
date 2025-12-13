import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LogOutIcon, User2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
// import { store } from "@/redux/store";

function Navbar() {
  // const user = false;
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const naviagate = useNavigate();

  const logoutHandler = async (e) => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        naviagate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
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
              <li>
                <Link to="/"> Home</Link>
              </li>
              <li>
                <Link to="/jobs">Jobs</Link>
              </li>
              <li>
                <Link to="/browse">Browse</Link>
              </li>
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
                      <User2Icon /> <Link to="/profile">View Profile</Link>
                    </Button>

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      {" "}
                      <Button
                        variant="link"
                        className="h-4 w-4"
                        onClick={logoutHandler}
                      >
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
