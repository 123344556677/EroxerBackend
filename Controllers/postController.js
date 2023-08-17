import creatingPost from "../Schemas/Post.js";
// import multer from 'multer'

// const storage = multer.diskStorage({
//   destination:"posts",
//   filename:(req,file,cb)=>{
//     cb(null,file.originalname)
//   }

//   })
//   const post = multer({ Storage: storage }).single("postPic")
import Stripe from "stripe";
import registeringPostPayment from "../Schemas/postPayment.js";
const stripe = new Stripe(
  "sk_test_51MaOSqE6HtvcwmMAEFBEcSwTQIBNvQVzAXJc1cnrFoKIQbIH7i7KfcjxtB0DsRiRECgIaGb30vlq4fVSB6uaHsP400S1cZv15n"
);

export const createPost = async (req, res) => {
  try {
    console.log(req.body);

    //     await creatingPost.create({
    //         userId:req.body.userId,
    //         postPic:{
    //         data:req.body.postPic,
    //         contentType:"image/png"},
    //   postCheck:req.body.postCheck,
    //   commentsCheck:req.body.commentsCheck,
    //   price:req.body.price,
    //   postProfilePic:req.body.postProfilePic

    //     })
    //         .then((data)=>{
    //         if(data){

    //             res.json({ message: "post Generated"});
    //         }
    //         else{

    //            res.json({ message: "post not Generated"});
    //         }
    //         })
    await creatingPost.create(req.body).then((data) => {
      if (data) {
        res.json({ message: "post Generated", status: 200 });
        console.log(data);
      } else {
        res.json({ message: "post not Generated", status: 400 });
      }
    });
  } catch (err) {
    console.log("error in creating post", err);
    res.status(404).json({ message: "server error",status:500,error:err });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const data = await creatingPost.find({}).sort({ timestamp: -1 });
    res.json({ message: "Success", status: 200, data:data });
  } catch (err) {
    res.json({ message: "Server Error", status: 500,error:err });
  }
};
export const getPostsById = async (req, res) => {
  try {
    console.log(req.body);
    const  userId  = req.body.userId;

    await creatingPost.find({ userId: userId }).then((data) => {
      if (data) {
        res.json({ message: "success", data: data, status: 200 });
      } else {
        res.json({ message: "fail", data: data, status: 400 });
      }
    });
  } catch (err) {
    res.json({ message: "Server Error", status: 500,error:err });
  }
};
export const pollCounterIncrement = async (req, res) => {
  try {
    console.log(req.body);
    const { objectId, objectContainingCounterId, counterValue, userId } =
      req.body;
    console.log(objectId, objectContainingCounterId, counterValue, userId);

    await creatingPost
      .findOneAndUpdate(
        { _id: objectId, "options._id": objectContainingCounterId },
        {
          $inc: { "options.$.counter": 1 },
          $push: { userPollId: userId },
        },
        { new: true }
      )
      .then((updatedObject) => {
        console.log(updatedObject, "--------->object data");
      })
      .catch((error) => {
        // Handle the error
      });
  } catch (err) {
    console.log("error in creating post", err);
    res.status(404).json({ message: "sever error",error:err });
  }
};
export const updatePost = async (req, res) => {
  try {
    console.log(req.body, "--------->user");
    const id = req.body.postId;
    const payment = stripe.paymentIntents
      .create({
        amount: 100 * req.body.price,
        currency: "SEK",
        description: "testing",
        payment_method: req.body.paymentId,
        confirm: true,
      })
      .then((paymentIntents) => {
        console.log(paymentIntents);

        if (paymentIntents.status === "succeeded") {
          creatingPost
            .findOneAndUpdate(
              { _id: id },
              {
                $push: { payerId: req.body.payerId },
              },
              { new: true }
            )
            .then((data) => {
              if (data) {
                registeringPostPayment.create(req.body);
                res.json({ message: "post updated", status: 200 });

                console.log(data, "============>new data");
              } else {
                res.json({ message: "post does not exist", status: 400 });
              }
            });
        }
      });
  } catch (err) {
    res.json({ message: "Server Error", status: 500,error:err });
    console.log(err, "--------->error");
  }
};
