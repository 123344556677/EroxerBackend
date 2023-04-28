import bcrypt from 'bcryptjs'
import registeringUser from '../Schemas/Auth.js';
import creatingPost from '../Schemas/Post.js';







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
