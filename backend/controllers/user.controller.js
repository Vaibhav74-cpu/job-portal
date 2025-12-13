import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      //if one from this field  is empty so return error
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    //check , is user already already ex ist by email so return error
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user is already exist",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//user login by email password and role
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log(email, password, role);

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    //check that, is user enter correct email or not
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "email is incorrect",
        success: false,
      });
    }

    //check password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "email or password is incorrect",
        success: false,
      });
    }

    //check role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }

    const tokendata = {
      userId: user._id,
    };

    const token = await jwt.sign(tokendata, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 2 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("error");
  }
};

//controller logout logic
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//updating profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    // console.log(fullname, email, phoneNumber, bio, skills);

    // cloudinary
    const file = req.file;
    const fileUri = getDataUri(file);
    const clouedResponse = await cloudinary.uploader.upload(fileUri.content, {
      folder: "resumes",
      resource_type: "auto",
      format: "pdf",
    });

    // if (!fullname || !email || !phoneNumber || !bio || !skills) { //if anyone of these field is empty so return error
    //   return res.status(400).json({
    //     message: "something is missing",
    //     success: false,
    //   });
    // }
    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(","); //convert sting skills into array format
    }
    const userId = req.id; //check authenticate through middleware
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    //updating data here
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    //resume setup here
    if (clouedResponse) {
      user.profile.resume = clouedResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "profile updated succesfully",
      user: userData,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
