const express = require('express');
const {auth}= require('../middleware/auth.middleware')
const {access} = require('../middleware/access.middleware');
const {UserModel}=require('../models/user.model')
const listRouter = express.Router();

listRouter.get( "/all",auth,access(["Admin", "User"]),
    async (req, res) => {
      try {
        const user = await UserModel.find(req.query);
        res.status(200).json({ users_list: user });
      } catch (err) {
        res.json({ error: err });
        console.log(err);
      }
    }
  );

//patch
listRouter.patch("/update/:id",auth,
    access(["Admin"]),
    async (req, res) => {
      const { id } = req.params;
      const payload = req.body;
      try {
        await UserModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).json({ msg: "the user has been updated" });
      } catch (err) {
        res.json({ msg: "err" });
        console.log(err);
      }
    }
  );

//delete
listRouter.delete("/delete/:id",
    auth,
    access(["Admin"]),
    async (req, res) => {
      const { id } = req.params;
      try {
        await UserModel.findByIdAndDelete({ _id: id });
  
        res.status(200).json({ msg: "user deleted" });
      } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
      }
    }
  );



module.exports={
    listRouter,
}