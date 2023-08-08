import creatingAd from "../Schemas/Ad.js";
export const createAd = async (req, res) => {
  try {
    console.log(req.body);

    await creatingAd.create(req.body).then((data) => {
      if (data) {
        res.json({ message: "ad Generated", status: 200 });
      } else {
        res.json({ message: "ad not Generated", status: 400 });
      }
    });
  } catch (err) {
    console.log("error in creating ad", err);
    res.json({ message: "sever error", status: 500 });
  }
};
export const getAllAds = async (req, res) => {
  try {
    const data = await creatingAd.find({});
    res.json(data);
  } catch (err) {
    res.json({ message: "Server Error", status: 500 });
  }
};
export const getAdsById = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;

    await creatingAd.findOne({ _id: id }).then((data) => {
      if (data) {
        res.json({ message: "Ad Exist", data: data, status: 200 });
      } else {
        res.json({ message: "Ad not Exist", data: data, status: 400 });
      }
    });
  } catch (err) {
    res.json({ message: "Server Error", status: 500 });
  }
};
export const AdCounterIncrement = async (req, res) => {
  try {
    console.log(req.body, "-------->id");
    // const newId = new mongoose.Types.ObjectId(req.body.id);
    await creatingAd
      .findOneAndUpdate(
        { _id: req.body.id },
        { $inc: { counter: 1 } }, // Increment the 'age' field by 1
        { upsert: true, new: true } // Return the updated document
      )
      .then((data) => {
        console.log(data);
        res.json({ message: "incremented", status: 200 });
      })
      .catch((error) => {
        console.error({ message: "not incremented", err: error, status: 400 });
      });
  } catch (err) {
    res.json({ message: "Server Error", status: 500 });
  }
};
