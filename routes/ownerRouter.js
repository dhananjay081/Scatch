const express = require("express")

const router = express.Router();
const ownerModel = require("../models/owner_model")


router.get("/",function(req,res){
    res.send("hey it's working owner model");
});

// console.log(process.env.NODE_ENV); //$env:NODE_ENV="development"; Terminal pr set karoge tab hi aayega nahi to nahi aayega
if(process.env.NODE_ENV === "development"){
     
try {
    router.post("/create",async function(req,res){
      let owner = await ownerModel.find()
      if(owner.length>0){
        return res.send(503).send("You don't have permssion to create a new owner")
      }
      let {fullname ,email, password} = req.body;

      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password
      })
      res.status(201).send(createdOwner);
    });
    }
   catch (error) {
     res.send(error.message)
   }
  }
  
   


module.exports = router;