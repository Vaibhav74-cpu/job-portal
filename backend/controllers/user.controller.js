import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    return res.status(400).cookie("token", "", { maxAge: 0 }).json({
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
    // const file= req.file;
    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const skillsArray = skills.split(","); //convert sting skills into array format
    const userId = req.id; //check authenticate through middleware
    let user = await user.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    //updating data here
    (user.fullname = fullname),
      (user.email = email),
      (user.phoneNumber = phoneNumber),
      (user.Profile.bio = bio),
      (user.profile.skills = skillsArray);

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "profile updated succesfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
