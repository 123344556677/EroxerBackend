import registeringUser from "../Schemas/Auth.js";
import registeringCreator from "../Schemas/Creator.js";
import creatingTip from "../Schemas/Tip.js";
import creatingPayment from "../Schemas/payment.js";
import Stripe from "stripe";
import Pusher from "pusher";
import creatingPaymentRequest from "../Schemas/paymentRequest.js";
const stripe = new Stripe(
  "sk_test_51MaOSqE6HtvcwmMAEFBEcSwTQIBNvQVzAXJc1cnrFoKIQbIH7i7KfcjxtB0DsRiRECgIaGb30vlq4fVSB6uaHsP400S1cZv15n"
);
const pusher = new Pusher({
  appId: "1592572",
  key: "78bfd9bc497cd883c526",
  secret: "79859c470de2032589c1",
  cluster: "ap1",
});

export const createPayment = async (req, res) => {
  try {
    console.log(req.body);

    const payment = stripe.paymentIntents
      .create({
        amount: 100 * 100,
        currency: "SEK",
        description: "testing",
        payment_method: req.body.paymentId,
        confirm: true,
      })
      .then((paymentIntents) => {
        if (paymentIntents.status === "succeeded") {
          creatingPayment
            .create({
              userId: req.body.userId,
              paymentId: req.body.paymentId,
              name: req.body.name,
              email: req.body.email,
              state: req.body.state,
              postalCode: req.body.postalCode,
              paymentId: req.body.paymentId,
            })
            .then((data) => {
              if (data) {
                registeringUser
                  .findOneAndUpdate(
                    { _id: req.body.userId },
                    { $set: { eroxrFee: true } },
                    { upsert: true, new: true }
                  )
                  .then((datas) => {
                    if (datas) {
                      res.json({ message: "payment Successfull", status: 200 });
                    }
                  });
              } else {
                res.json({ message: "payment not Successfull", status: 400 });
              }
            });
        }
      });
  } catch (err) {
    console.log("error in creating ad", err);
    res.json({ message: "sever error", status:500,error:err });
  }
};
export const getAllPayment = async (req, res) => {
  try {
    const data = await creatingPayment.find({}).sort({ timestamp: -1 });
    res.json({ message: "Success", status: 200, data:data });
  } catch (err) {
    console.log("error in creating ad", err);
    res.json({ message: "sever error", status: 500,error:err });
  }
};
export const sendTip = async (req, res) => {
  console.log(req.body, "====>");
  try {
    const payment = stripe.paymentIntents
      .create({
        amount: 100 * req.body.tip,
        currency: "SEK",
        description: "testing",
        payment_method: req.body.paymentId,
        confirm: true,
      })
      .then((paymentIntents) => {
        console.log(paymentIntents);

        if (paymentIntents.status === "succeeded") {
          creatingTip.create(req.body).then((datas) => {
            if (datas) {
              res.json({ message: "payment Successfull", status: 200 });
            }

          }).catch((err)=>{
   
              res.json({ message: "payment not Successfull",status: 500,error:err });
            

          })
        }
      });
    // pusher.trigger("request" + req.body.recieverId, "request", {
    //   userId: req.body.senderId,
    //   message: "Sent a Request",
    //   name: req.body.name,
    // });
  } catch (err) {
    res.json({ message: "Server Error", status: 500,err:err });
  }
};
export const getAllTip = async (req, res) => {
  let subscribeUser;
  let sendingUser = [];
  try {
    await creatingTip
      .find({})
      .sort({ timestamp: -1 })
      .then((data) => {
        if (data) {
          subscribeUser = data;
        }
      });

    subscribeUser?.map(async (datas, index) => {
      await registeringUser
        .findOne({ _id: datas?.recieverId })
        .then((finalData) => {
          sendingUser.push({
            recieverData: finalData,
            paymentData: datas,
          });
          console.log(finalData, "SendingUser====>");
        });

      if (subscribeUser.length === sendingUser.length) {
        res.json({ message: "Success", status: 200, data:sendingUser });
        console.log(sendingUser, "=========>sending accpeted User");
      }
    });
  } catch (err) {
    console.log("error in creating ad", err);
    res.json({ message: "sever error", status: 500,error:err });
  }
};
export const CreatePaymentRequest = async (req, res) => {
  try {
    console.log(req.body);

    await creatingPaymentRequest.create(req.body).then((data) => {
      if (data) {
        res.json({ message: "request Generated", status: 200 });
        console.log(data);
      } else {
        res.json({ message: "request not Generated", status: 400 });
      }
    });
  } catch (err) {
    console.log("error in creating post", err);
    res.status(404).json({ message: "sever error", status: 500,error:err });
  }
};
export const getAllPaymentRequest = async (req, res) => {
  try {
    const data = await creatingPaymentRequest.find({}).sort({ timestamp: -1 });
    res.json({ message: "Success", status: 200, data:data });
  } catch (err) {
    console.log("error in creating ad", err);
    res.json({ message: "sever error", status: 500,error:err });
  }
};
export const updatePaymentRequestStatus = async (req, res) => {
  console.log(req.body, "==========>");
  try {
    console.log(req.body);
    creatingPaymentRequest
      .findOneAndUpdate(
        { _id: req.body.id },
        { $set: { status: req.body.status } },
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
    // .then((data)=>{
    // if(data){

    //     res.json({ message: "request Generated"});
    // }
    // else{

    //    res.json({ message: "request not Generated"});
    // }
    // })
    res.json({ message: "Server Error", status: 500,error:err });
  }
};
export const sendLiveTip = async (req, res) => {
  console.log(req.body, "====>");
  try {
    const senderId = req.body.senderData?._id;
    const roomId = req.body.recieverId;

    const payment = stripe.paymentIntents
      .create({
        amount: 100 * req.body.tip,
        currency: "SEK",
        description: "testing",
        payment_method: req.body.paymentId,
        confirm: true,
      })
      .then((paymentIntents) => {
        console.log(paymentIntents);

        if (paymentIntents.status === "succeeded") {
          pusher.trigger("tip" + roomId, "live-tip", {
            senderData: req.body.senderData,
            tip: req.body.tip,
          });

          creatingTip.create(req.body).then((datas) => {
            if (datas) {
              res.json({ message: "payment Successfull", status: 200 });
            } else {
              res.json({ message: "payment not Successfull", status: 400 });
            }
          });
        }
      });
    // pusher.trigger("request" + req.body.recieverId, "request", {
    //   userId: req.body.senderId,
    //   message: "Sent a Request",
    //   name: req.body.name,
    // });
  } catch (err) {
    res.json({ message: "Server Error", status: 500,error:err });
  }
};
export const updateTipNotiStatus = async (req, res) => {
  console.log(req.body, "==========>");
  try {
    console.log(req.body);
    creatingTip
      .updateMany(
        { recieverId: req.body.userId },
        { $set: { notiStatus: false } }
      )
      .then((data) => {
        console.log(data);
        res.json({ message: "updated", status: 200 });
      })
      .catch((error) => {
        console.error("status not updated:", error);
        res.json({ message: "status not updated", status: 400 });
      });
  } catch (err) {
    // .then((data)=>{
    // if(data){

    //     res.json({ message: "request Generated"});
    // }
    // else{

    //    res.json({ message: "request not Generated"});
    // }
    // })
    res.json({ message: "Server Error", status: 500,error:err });
  }
};
