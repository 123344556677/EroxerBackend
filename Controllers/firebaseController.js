import firebaseToken from "../Schemas/FirebaseTokens.js";
import {initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import registeringUser from "../Schemas/Auth.js";

process.env.GOOGLE_APPLICATION_CREDENTIALS;


initializeApp({
  credential: applicationDefault(),
  projectId: 'potion-for-creators',
});


export const Notification = async (req, res) => {
    console.log(req.body)
  const { title, body, callerId, recieverId, type } = req.body;

  if (!callerId) {
    return res.json({ status: 500, message: 'Caller ID is required' });
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

  try {
    // Find the user's token based on the callerId
    const userToken = await firebaseToken.findOne({ userId: recieverId });

    if (!userToken) {
      return res.json({ status: 500, message: 'User token not found' });
    }
   

    // Fetch caller data (assuming you have a schema/model named registeringUser)
    const callerData = await registeringUser.findOne({ _id: callerId });

    if (!callerData) {
      return res.json({ status: 500, message: 'Caller data not found' });
    }

    const data = {
      callerId: callerId,
      recieverId: recieverId,
      callerData: callerData,
      type: type,
    };

    payload.data.callerData = callerData;

    // Send the notification to the user's token
    getMessaging().sendToDevice(userToken.token, payload, options);

    res.json({ status: 200, message: 'Notification sent successfully', data: data });
  } catch (error) {
    res.json({ status: 500, message: 'Error: ' + error });
  }
};
