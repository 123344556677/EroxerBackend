import bcrypt from 'bcryptjs'
import registeringUser from '../Schemas/Auth.js';
import creatingPost from '../Schemas/Post.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import twilio from 'twilio';
import Nexmo from 'nexmo';

const accountSid = 'AC6b62d37081717e11a7fe91972f6156cf';
const authToken = '27ce37463b5d19cb81a087dd1ca45312';
const verifySid = "VA64052e1e4509ad257dbc95ac5f921eeb";
const client = twilio(accountSid, authToken);

const nexmo = new Nexmo({
  apiKey: '444b24c8',
  apiSecret: 'ElBUyII3QG05JOZJ',
});

export const register = async (req, res) => {
    try {
        
        
        const { firstName,lastName,email,password } = req.body;
    
        registeringUser.findOne({ email: email })
            .then((data)=>{
            if(data){
                console.log(req.body)
                res.json({ message: "Email already exist"});
            }
            else{
                var salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);
                const register = new registeringUser({ firstName,lastName, email, hashPassword});
                register.save();
                console.log(req.body);
                res.status(200).json({ message: "user registered", data: req.body });
            }
            })
        
        
    }
    catch (err) {
        console.log("error in registering data", err);
        res.status(404).json({message:"sever error"})
    }
}

export const login = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body
        registeringUser.findOne({ email: email })
            .then((data)=>{
            
            
             if (data) {
                 const pass = bcrypt.compareSync(password, data.hashPassword);
                 console.log(pass);
                if (pass) {
                    
                    res.json({ message: "Login Successfull",data:data })
                }
                else {
                    res.json({ message: "incorrect password" })
                }
            }
            else {
                res.json({ message: "user not registered" })
            }

        })

 }
    catch (err) {
        res.json({ message: "server error" })
        console.log("error in login", err)
    }
}
export const googleReg = async (req, res) => {
    console.log(req.body);
    
    try {
      
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`)


    // return response.data.email;
    console.log("email=====>", response )
  
 }
    catch (err) {
       console.log("email=====>", err )
    }
}

export const updateUser= async (req, res) => {
    try {
        console.log(req.body,"--------->user")
        const id=req.body.userId;
      await registeringUser.findOneAndUpdate({ _id: id }, { $set:req.body }, { new: true })
      .then((data)=>{
        if (data) {

            creatingPost.findOneAndUpdate({ userId: id },{ $set:{userData:data} })
                    
                    res.json({ message: "user updated" })
                    console.log(data,"============>new data")
                }
                else {
                    res.json({ message: "user does not exist" });
                }

      })

    }
    catch (err) {
        res.json({ message: "Server Error" });
        console.log(err,"--------->error")
    }

};
export const getUsersById = async (req, res) => {
    try{
        console.log(req.body)
    const id=req.body.userId;
    
    
await registeringUser.findOne({_id:id})
.then((data)=>{
if(data){
    res.json({ message: "User Exist", data: data })
}
else{
    res.json({ message: "User not  Exist", data: data })
}
    
})
    }
catch(err){
        res.json({ message: "Server Error" });
}
       
};
export const updatePassword = async (req, res) => {
    try {
        console.log(req.body)
       
        const salt = bcrypt.genSaltSync(10);
        await registeringUser.findOneAndUpdate({ email:req.body.email }, 
        {$set: { hashPassword: bcrypt.hashSync(req.body.password, salt) }}, {new:true})
        .then((data)=>{
            if (data) {
                console.log(data)
                res.json({ message: "password updated" })
            }
            else {
                res.json({ message: "user does not exist" })
            }
        })
    }
     catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const sendMobileCode = async (req,res) =>{
    console.log(req.body)
    // const to=req.body.phoneNumber

client.verify.services(verifySid)
  .verifications.create({ to: '+923351742065', channel: 'sms' })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question('Please enter the OTP:', (otpCode) => {
      client.verify.services(verifySid)
        .verificationChecks.create({ to: '+923234125359', code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close());
    });
  });

};
export const initiateVerification = async(req,res) => {
  return new Promise((resolve, reject) => {
    nexmo.verify.request(
      {
        number:"923234125359" ,
        brand: 'Your App Name',
      },
      (err, result) => {
        if (err) {
          reject(err);
          console.log(err)
        } else {
          const verifyRequestId = result.request_id;
          resolve(verifyRequestId);
           console.log(verifyRequestId)
        }
      }
    );
  });
};
