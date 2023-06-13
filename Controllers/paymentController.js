import registeringUser from '../Schemas/Auth.js';
import registeringCreator from '../Schemas/Creator.js';
import creatingPayment from '../Schemas/payment.js';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MaOSqE6HtvcwmMAEFBEcSwTQIBNvQVzAXJc1cnrFoKIQbIH7i7KfcjxtB0DsRiRECgIaGb30vlq4fVSB6uaHsP400S1cZv15n');


export const createPayment = async (req, res) => {
    try {
        
        
        console.log(req.body)
        

        const payment =  stripe.paymentIntents.create({
          amount:100*100,
          currency: "SEK",
          description: "testing",
          payment_method:req.body.paymentId,
          confirm: true
      })
      .then((paymentIntents)=>{
        console.log(paymentIntents)

      
        if(paymentIntents.status==="succeeded"){
             creatingPayment.create({
            userId:req.body.userId,
            paymentId:req.body.paymentId,
            name:req.body.name,
            email:req.body.email,
            state:req.body.state,
            postalCode:req.body.postalCode,
            paymentId:req.body.paymentId

        })
            .then((data)=>{
            if(data){
                registeringCreator.findOneAndUpdate(
        { _id: req.body.userId },
        {$set:{ status:"creator"}},
        { upsert:true, new: true } 
        )
        registering.findOneAndUpdate(
        { _id: req.body.userId },
        {$set:{ creator:true}},
        { upsert:true, new: true } 
        )
        

                
                res.json({ message: "payment Successfull"})
                 
            }
            else{
               
               res.json({ message: "payment not Successfull"});
            }
            })
        }
    
    
    })
    
       
        
        
        
    }
    catch (err) {
        console.log("error in creating ad", err);
        res.json({message:"sever error"})
    }
}