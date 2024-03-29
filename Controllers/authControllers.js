import bcrypt from "bcryptjs";
import registeringUser from "../Schemas/Auth.js";
import creatingPost from "../Schemas/Post.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import twilio from "twilio";
// import { Vonage } from '@vonage/server-sdk';
import nodemailer from "nodemailer";
import firebaseToken from "../Schemas/FirebaseTokens.js";


export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    registeringUser.findOne({ email: email }).then((data) => {
      if (data) {
        console.log(req.body);
        res.json({ message: "Email already exist", status: 400 });
      } else {
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const register = new registeringUser({
          firstName,
          lastName,
          email,
          hashPassword,
        });
        register.save().then((data) => {
          res
            .status(200)
            .json({ message: "user registered", data: data, status: 200 });
        });
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "hananabdul659@gmail.com",
            pass: "hvfvildfxggujcsi",
          },
        });

        var mailOptions = {
          from: "Eroxr@hybsoltech.com",
          to: email,
          subject: "Confirmation Mail",
          html:
            "<h3>Hello!</h3>" +
            `<p>This is to inform you that your eroxr account has been created on this email adress </p>  ` +
            "<p>Regards,</p>" +
            "<p>Eroxr</p>",
        };

        transporter
          .sendMail(mailOptions)
          .then((data) => {
            res.json({ message: "email sent", status: 200 });
            console.log(data);
          })
          .catch((err) => {
            res.json({ message: "email not sent", status: 400 });
            console.log(err);
          });
      }
    });
  } catch (err) {
    console.log("error in registering data", err);
    res.json({ message: "sever error", status: 500, error: err });
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    registeringUser.findOne({ email: email }).then(async(data) => {
      if (data) {
        const pass = bcrypt.compareSync(password, data.hashPassword);
        console.log(pass);
        if (pass) {
          res.json({ message: "Login Successfull", status: 200, data: data });
          const userId = data?._id;
          const token = req.body?.token;
         const existingToken = await firebaseToken.findOne({ userId: userId });

        if (existingToken) {
          // Update the existing token
          existingToken.token = token;
          await existingToken.save();
        } else {
          // Create and save a new token
          const newToken = new firebaseToken({
            userId,
            token,
          });
          await newToken.save();
        }
          
        } else {
          res.json({ message: "incorrect password", status: 400 });
        }
      } else {
        res.json({ message: "user not registered", status: 200 });
      }
    });
  } catch (err) {
    res.json({ message: "server error", status: 500, error: err });
    console.log("error in login", err);
  }
};
export const googleLogin = async (req, res) => {
  console.log(req.body);

  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`
    );

    // return response.data.email;

    const user = response?.data;
    const { email, given_name, family_name, picture } = user;

    registeringUser.findOne({ email: email }).then((data) => {
      console.log("email=====>", data);
      if (data) {
        console.log("registere-------->");

        res.json({ message: "Login Successfull", data: data, status: 200 });
      } else {
        res.json({ message: "user not registered", status: 400 });
      }
    });
  } catch (err) {
    console.log("email=====>", err);
    res.json({ message: "Server Error", status: 500, error: err });
  }
};
export const googleReg = async (req, res) => {
  console.log(req.body, "body------->");

  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`
    );

    // return response.data.email;
    console.log("email=====>", response?.data);
    const user = response?.data;
    const { email, given_name, family_name, picture } = user;
    registeringUser.findOne({ email: email }).then((data) => {
      if (data) {
        console.log(req.body);
        res.json({ message: "Email already exist", status: 200, data: data });
      } else {
        const firstName = given_name;
        const lastName = family_name;
        const profilePic = picture;

        const register = new registeringUser({
          firstName,
          lastName,
          email,
          profilePic,
        });
        register.save();
        console.log(req.body);
        res
          .status(200)
          .json({ message: "user registered", data: req.body, status: 200 });
      }
    });
  } catch (err) {
    console.log("email=====>", err);
    res.json({ message: "Server Error", status: 500, error: err });
  }
};
export const FacebookReg = async (req, res) => {
  console.log(req.body, "body------->");

  try {
    const facebookId = req.body.id;
    const firstName = req.body.name;
    registeringUser.findOne({ facebookId: facebookId }).then((data) => {
      if (data) {
        console.log(req.body);
        res.json({ message: "user registered", status: 200, data: data });
      } else {
        const register = new registeringUser({
          firstName,
          facebookId,
        });
        register.save().then((data) => {
          res
            .status(200)
            .json({ message: "user registered", data: data, status: 200 });
        });
        console.log(req.body);
      }
    });
  } catch (err) {
    console.log("email=====>", err);
    res.json({ message: "Server Error", status: 500, error: err });
  }
};

export const updateUser = async (req, res) => {
   console.log(req.body, "--------->user");
  try {
   
    const id = req.body.userId;
    await registeringUser
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            username: req.body.username,
            about: req.body.about,
            profilePic: req.body.profilePic,
            website: req.body.website,
            phoneNumber: req.body.phoneNumber,
            profilePrice: req.body.profilePrice,
            profileName: req.body.profileName,
          },
          $push: { profileWishlist: req.body.profileWishlist },
        },
        { new: true, upsert: true }
      )
      .then((data) => {
        if (data) {
          creatingPost.findOneAndUpdate(
            { userId: id },
            { $set: { userData: data } }
          );

          res.json({ message: "user updated", status: 200, data: data });
          console.log(data, "============>new data");
        } else {
          res.json({ message: "user does not exist", status: 400 });
        }
      });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
    console.log(err, "--------->error");
  }
};
export const updateUserCover = async (req, res) => {
  try {
    console.log(req.body, "--------->user");
    const id = req.body.userId;
    await registeringUser
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            backgroundImage: req.body.backgroundImage,
          },
        },
        { new: true, upsert: true }
      )
      .then((data) => {
        if (data) {
          res.json({ message: "user updated", status: 200, data: data });
          console.log(data, "============>new data");
        } else {
          res.json({ message: "user does not exist", status: 400 });
        }
      });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
    console.log(err, "--------->error");
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    console.log(req.body, "--------->user");
    const id = req.body.userId;
    await registeringUser
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            profilePic: req.body.profilePic,
          },
        },
        { new: true, upsert: true }
      )
      .then((data) => {
        if (data) {
          res.json({ message: "user updated", status: 200, data: data });
          console.log(data, "============>new data");
        } else {
          res.json({ message: "user does not exist", status: 400 });
        }
      });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
    console.log(err, "--------->error");
  }
};
export const getUsersById = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.userId;

    await registeringUser.findOne({ _id: id }).then((data) => {
      if (data) {
        res.json({ message: "User Exist", data: data, status: 200 });
      } else {
        res.json({ message: "User not  Exist", data: data, status: 400 });
      }
    });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
  }
};
export const updatePassword = async (req, res) => {
  try {
    console.log(req.body);

    const salt = bcrypt.genSaltSync(10);
    await registeringUser
      .findOneAndUpdate(
        { email: req.body.email },
        { $set: { hashPassword: bcrypt.hashSync(req.body.password, salt) } },
        { new: true }
      )
      .then((data) => {
        if (data) {
          console.log(data);
          res.json({ message: "password updated", status: 200 });
        } else {
          console.log("coming here");
          res.json({ message: "user does not exist", status: 400 });
        }
      });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
  }
};
// export const sendMobileCode = async (req,res) =>{
//     console.log(req.body)
//     // const to=req.body.phoneNumber

// client.verify.services(verifySid)
//   .verifications.create({ to: '+923351742065', channel: 'sms' })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require('readline').createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question('Please enter the OTP:', (otpCode) => {
//       client.verify.services(verifySid)
//         .verificationChecks.create({ to: '+923234125359', code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });

// };
const verification = {
  code: "",
  expirationTime: 0,
};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Store the generated code and its expiration time

export const initiateVerification = async (req, res) => {
  try {
    console.log(req.body);
    verification.code = generateVerificationCode();
    verification.expirationTime = Date.now() + 60000; // 1 minute from now
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hananabdul659@gmail.com",
        pass: "hvfvildfxggujcsi",
      },
    });
    let email = req.body.email;

    var mailOptions = {
      from: "Eroxr@hybsoltech.com",
      to: email,
      subject: "Verification code",
      html:
        "<h3>Hello!</h3>" +
        `<p>Your veification code is <span style="color:black;font-weight:600"> ${verification.code}</span> </p>  ` +
        "<a> The validity of this code is 60 seconds </a>" +
        "<p>If you did not request a vaeificatoin code, no further action is required.</p>" +
        "<p>Regards,</p>" +
        "<p>Eroxr</p>",
    };

    await transporter
      .sendMail(mailOptions)
      .then((data) => {
        res.json({ message: "email sent", status: 200 });
        console.log(data);
      })
      .catch((err) => {
        res.json({ message: "email not sent", status: 400 });
        console.log(err);
      });
    //    console.log(mail)

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //         res.json({ message: "Email not Sent" });
    //     } else {
    //         console.log("Email sent: " + info.response);
    //         res.json({ message: "Email Sent" });
    //     }
    // });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
  }
};
export const verifyCode = async (req, res) => {
  try {
    console.log(req.body.code);
    let code = req.body.code;
    console.log(verification.code, "code---->");
    if (code) {
      if (
        code == verification.code &&
        Date.now() <= verification.expirationTime
      ) {
        res.json({ message: "Verification successful", status: 200 });
        if (req.body.verification === "verify") {
          await registeringUser.findOneAndUpdate(
            { _id: req.body.userId },
            {
              $set: {
                verifyStatus: true,
              },
            },
            { new: true }
          );
        }
        // Handle the successful verification response here
      } else {
        res.json({ message: "Verification invalid", status: 400 });
        console.log("Verification code is invalid or has expired.");
        // Handle the invalid/expired verification response here
      }
    }
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
  }
};
export const updateVerifyStatus = async (req, res) => {
  try {
    console.log(req.body);
    registeringUser
      .findOneAndUpdate(
        { _id: req.body.userId },
        { $set: { verifyStatus: true } },
        { upsert: true, new: true }
      )
      .then(() => {
        console.log("status verified");
        res.json({ message: "verified", status: 200 });
      })
      .catch((error) => {
        console.error("status not updated:", error);
        res.json({ message: "status not updated", status: 400 });
      });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const data = await registeringUser.find({});
    res.json({ message: "Success", status: 200, data: data });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
  }
};
export const deleteAccount = async (req, res) => {
  try {
    console.log(req.body);
    registeringUser
      .deleteOne({ _id: req.body.userId })
      .then(() => {
        console.log("Account deleted successfully");
        res.json({ message: "Account deleted successfully", status: 200 });
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        res.json({ message: "Error deleting account", status: 400 });
      });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
  }
};
export const changeOnlineStatus = async (req, res) => {
  try {
    console.log(req.body);
    registeringUser
      .findOneAndUpdate(
        { _id: req.body.userId },
        { $set: { onlineStatus: req.body.onlineStatus } },
        { upsert: true, new: true }
      )
      .then(() => {
        console.log("status updated");
        res.json({ message: "updated", status: 200 });
      })
      .catch((error) => {
        console.error("status not updated:", error);
        res.json({ message: "status not updated", status: 400 });
      });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
  }
};
export const updateliveStreamStatus = async (req, res) => {
  try {
    console.log(req.body);
    registeringUser
      .findOneAndUpdate(
        { _id: req.body.userId },
        { $set: { liveStreamStatus: req.body.status } },
        { upsert: true, new: true }
      )
      .then(() => {
        console.log("status updated");
        res.json({ message: "updated", status: 200 });
      })
      .catch((error) => {
        console.error("status not updated:", error);
        res.json({ message: "status not updated", status: 400 });
      });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
  }
};
export const updateThumbPic = async (req, res) => {
  try {
    console.log(req.body);
    registeringUser
      .findOneAndUpdate(
        { _id: req.body.userId },
        { $set: { thumbPic: req.body.thumbPic } },
        { upsert: true, new: true }
      )
      .then(() => {
        console.log("status updated");
        res.json({ message: "updated", status: 200 });
      })
      .catch((error) => {
        console.error("status not updated:", error);
        res.json({ message: "status not updated", status: 400 });
      });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
  }
};
export const redirectToDashboard = async (req, res) => {
  try {
    console.log(req.body);
    const payload = {
      userId: req.body.userId,
    };
    const options = {
      expiresIn: "1h",
    };
    const secretKey = req.body.userId;

    registeringUser
      .findOne({ _id: req.body.userId })
      .then((data) => {
        console.log(data, "--------->");
        const token = jwt.sign(payload, secretKey, options);
        res.json({
          message: "success",
          userId: req.body.userId,
          token: token,
          status: 200,
        });
      })
      .catch((error) => {
        console.error("status not updated:", error);
        res.json({ message: "fail", status: 400 });
      });
  } catch (err) {
    res.json({ message: "Server Error", status: 500, error: err });
  }
};

