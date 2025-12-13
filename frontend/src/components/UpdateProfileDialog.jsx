// import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
// import { DialogFooter, DialogHeader } from "./ui/dialog";

import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { DialogTrigger } from "@/components/ui/dialog";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { data } from "react-router-dom";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { DialogDescription } from "@radix-ui/react-dialog";

function UpdateProfileDialog({ open, setOpen }) {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    number: user?.phoneNumber,
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const eventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullname", input.fullname);
    formdata.append("email", input.email);
    formdata.append("phoneNumber", input.phoneNumber);
    formdata.append("bio", input.bio);
    formdata.append("skills", input.skills);
    if (input.file) {
      formdata.append("file", input.file);
    }

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setOpen(false);
    console.log(input);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>Update your details</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-3">
              <div className="grid grid-cols-3 gap-4 items-center">
                <Label htmlFor="name" className="text-center ">
                  Name
                </Label>
                <Input
                  name="fullname"
                  value={input.fullname}
                  type="text"
                  id="name"
                  className="col-span-2"
                  onChange={eventHandler}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <Label htmlFor="email" className="text-center ">
                  Email
                </Label>
                <Input
                  value={input.email}
                  name="email"
                  type="email"
                  id="email"
                  className="col-span-2"
                  onChange={eventHandler}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <Label htmlFor="number" className="text-center ">
                  Number
                </Label>
                <Input
                  name="phoneNumber"
                  type="number"
                  value={input.phoneNumber}
                  id="number"
                  className="col-span-2"
                  onChange={eventHandler}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <Label htmlFor="name" className="text-center ">
                  Bio
                </Label>
                <Input
                  name="bio"
                  value={input.bio}
                  id="bio"
                  onChange={eventHandler}
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <Label htmlFor="skills" className="text-center ">
                  Skills
                </Label>
                <Input
                  name="skills"
                  type="text"
                  id="skills"
                  value={input.value}
                  className="col-span-2"
                  onChange={eventHandler}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <Label htmlFor="file" className="text-center ">
                  Resume
                </Label>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  className="col-span-2"
                  accept="application/pdf"
                  onChange={fileHandler}
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="w-full animate-spin">Please Wait</Loader2>
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
