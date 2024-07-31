const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const {generaterToken} = require("../utils/generaterToken")


module.exports.registerUser = async function (req, res) {
    try {
      let {email, fullname, password } = req.body;

      let user = await userModel.findOne({email:email});
      if(user) return res.status(401).send("you alredy have account, please login")
  
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) return res.send(err.message);
          else {
            let user = await userModel.create({
              email,
              password:hash,
              fullname,
            });
            let token = generaterToken(user)
             res.cookie("token",token)
             res.status(200).redirect("/shop");
          }
        });
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  
module.exports.loginUser = async function(req, res) {
  let {email, password } = req.body;

  try {
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).send("Email incorrect");
    }

    bcrypt.compare(password,user.password, function(err, result) {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("Internal server error");
      }
      if (result) {
        let token = generaterToken(user)
        res.cookie("token",token)
        res.redirect("/shop");

      } else {
        res.send("password incorrect");
      }
    });
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.logout = function(){
  res.cookie("token","");
  res.redirect("/");
}