import registeringCreator from "../Schemas/Creator.js";
export const ApplyForCreator = async (req, res) => {
    try {
        console.log(req.body)
       
       await registeringCreator.create(req.body)
        .then((data)=>{
            if (data) {
                console.log(data)
                res.json({ message: "applied" })
            }
            else {
                res.json({ message: "not applied" })
            }
        })
    }
     catch (err) {
        res.json({ message: "Server Error" });
    }

};