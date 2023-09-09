import firebaseToken from "../Schemas/FirebaseTokens.js";
import {initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import registeringUser from "../Schemas/Auth.js";

process.env.GOOGLE_APPLICATION_CREDENTIALS;


initializeApp({
  credential: applicationDefault(),
  projectId: 'potion-for-creators',
});
const admin = getMessaging();

export const Notification = async (req, res) => {
  const { title, body, callerId,recieverId,type } = req.body;

  if (!callerId) {
    return res.json({status:500,message:'Caller ID is required'});
  }

  // Define notification payload
 const payload = {
    notification: {
      title,
      body,
    },
    data: {
      callerId,
      recieverId,
      type,
    },
  };

  // Define FCM options with high priority
  const options = {
    priority: 'high',
  };

  // Find the user's token based on the callerId
  firebaseToken.findOne({ userId:recieverId})
    .then((userToken) => {
      if (!userToken) {
        return res.json({status:500,message:'User token not found'});
      }
      const callerData=registeringUser.findOne({_id:callerId});
      const data={
          callerId:callerId,
          recieverId:recieverId,
          callerData:callerData,
          type:type
      }
        payload.data.callerData = callerData;
        


      // Send the notification to the user's token
      admin.messaging().sendToDevice(userToken.token, payload, options)
        .then(() => res.json({status:200,message:'Notification sent successfully',data:data}))
        .catch((error) => res.json({status:500,message:'Error sending notification: ' + error}));
    })
    .catch((error) => res.status(500).send('Error fetching user token: ' + error));
};