import userModel from "../models/userModels.js";
import passport from '../config/passport.js'

import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
  readAccessToken,
  readRefreshToken,
} from "../utils/utils.js";


export const initializeGoogleAuth =  [
  passport.authenticate("google", {
    scope:["profile",   "email"],
    session:false,
    prompt:"select_account"
  })
]

export const authApi =    [
  passport.authenticate("google", {
    session:false,
    failureRedirect:"/",

  }),
  async (req, res) => {
    const user = req.user;
    const email = req.user.emails[0].value;

    const isUserExist = await userModel.findOne({email});

    if(isUserExist){
      const accessToken = createAccessToken({userId:isUserExist._id, role:isUserExist.role})

      const refreshToken = createRefreshToken({userId:isUserExist._id, role:isUserExist.role})

      return res.status(200).json({
        message:"user login successfully",
        accessToken, refreshToken, isUserExist
      })
    }

    const newUser = await userModel.create({
      name:user.displayName,
      email,
      googleId:user.id,
    })

    const accessToken = createAccessToken({userId:newUser._id, role:newUser.role})
    const refreshToken = createRefreshToken({userId:newUser._id, role:newUser.role})


    return res.status(200).json({
      message:"user registered successfully",
      data:{
        newUser
      }
    })
  }
]


export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json({
      message: "refreshToken is not found",
    });
  }

  try {
    const decode = readRefreshToken(refreshToken);
    console.log("DECODE:", decode);
    const { userId, role } = decode;

    const user = await userModel.findById(userId);

    if (refreshToken != user.refreshToken) {
      return res.status(401).json({
        message: "refreshToken mismatched",
      });
    }

    const accessToken = createAccessToken({
      userId,
      role,
    });

    const newRefreshToken = createRefreshToken({
      userId,
      role,
    });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    res.status(200).json({
      message: "Token rotated successfully",
      data: {
        user: {
          email: user.email,
          name: user.email,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.log("error in refresh api", error);
  }
};

export const getMe = async (req, res) => {
  try {
    const { userId, role } = req.user;

    const user = await userModel.findById(userId);

    res.status(200).json({
      message: "User data fetched successfully",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
      },
    });
  } catch (error) {
    console.log("error in get api", error);
  }
};

export const logout = async (req,res) => {

  
  try {
    console.log("logout hitted");
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await userModel.findOneAndUpdate(
        { refreshToken },
        { refreshToken: null },
      );
    }

    res.clearCookie("refreshToken", { httpOnly: true });

    return res.status(200).json({
      message: "user loggedout successfully",
    });
  } catch (error) {
    console.log("error in logout api", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
