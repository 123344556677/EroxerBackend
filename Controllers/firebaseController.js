import firebaseToken from "../Schemas/FirebaseTokens.js";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import registeringUser from "../Schemas/Auth.js";
import admin from "firebase-admin";

process.env.GOOGLE_APPLICATION_CREDENTIALS;
// import serviceAccount from "file:///D:/react/react%20course/eroxr/backend/contact-data-6e109-firebase-adminsdk-dx9uw-179b5365ff.json" assert { type: "json" };

initializeApp({
  credential: applicationDefault(),
  projectId: "erroxrapp",
});

export const Notification = async (req, res) => {
  console.log(req.body);
  const { title, body, callerId, recieverId, type } = req.body;

  if (!callerId) {
    return res.json({ status: 500, message: "Caller ID is required" });
  }

  // Define notification payload

  // Define FCM options with high priority
  const options = {
    priority: "high",
  };

  try {
    // Find the user's token based on the callerId
    const userToken = await firebaseToken.findOne({ userId: recieverId });

    if (!userToken) {
      return res.json({ status: 500, message: "User token not found" });
    }

    // Fetch caller data (assuming you have a schema/model named registeringUser)
    const callerData = await registeringUser.findOne({ _id: callerId });

    if (!callerData) {
      return res.json({ status: 500, message: "Caller data not found" });
    }

    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: {
        callerId: callerId,
        recieverId: recieverId,
        type: type,
      },
      token: userToken.token, // Set the user's FCM token here
    };

    // Send the notification to the user's token
    getMessaging().send(message);

    res.json({ status: 200, message: "Notification sent successfully", data:message});
  } catch (error) {
    res.json({ status: 500, message: "Error: " + error });
  }
};
