import creatingContact from "../Schemas/Contact.js";
import registeringUser from "../Schemas/Auth.js";
import mongoose from "mongoose";

export const createContact = async (req, res) => {
  try {
    const contactDetails = req.body; // Assuming req.body contains the contact details

    // Check if a contact with the same details already exists
    const existingContact = await creatingContact.findOne(contactDetails);

    if (existingContact) {
      res.json({ message: "Contact already exists in the inbox", status: 200 });
    } else {
      // If contact doesn't exist, create it
      await creatingContact.create(contactDetails);
      res.json({ message: "Contact added to the inbox", status: 200 });
    }
  } catch (err) {
    console.log("Error in creating contact", err);
    res.status(500).json({ message: "Server error", status: 500, error: err });
  }
};

export const getContactById = async (req, res) => {
  try {
    const subscribeUser = await creatingContact
      .find({
        $or: [
          { contactorId: req.body.userId },
          { recieverId: req.body.userId },
        ],
      })
      .sort({ timestamp: -1 });
    console.log(subscribeUser, "=========> accepted User");

    const sendingUserPromises = subscribeUser.map(async (data) => {
      let userId;
      let newId;
      if (data.contactorId === req.body.userId) {
        userId = data.recieverId;
        newId = new mongoose.Types.ObjectId(userId);
      } else if (data.recieverId === req.body.userId) {
        userId = data.contactorId;
        newId = new mongoose.Types.ObjectId(userId);
      }
      console.log(userId);

      try {
        const finalData = await registeringUser.findOne({ _id: userId });
        console.log(finalData, "=========> sending accepted User");
        return finalData;
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
    console.log(sendingUserPromises, "=========> sending accepted User");

    const sendingUser = await Promise.all(sendingUserPromises);
    console.log(sendingUser);

    res.json({ message: "Success", status: 200, data:sendingUser });
  } catch (err) {
    res.json({ message: "Server Error", status: 500 ,error:err});
  }
};
