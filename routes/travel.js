import express from "express";
import travel from "../models/travel.js";

import matched from "../models/user.js";
import nodemailer from "nodemailer";
const router = express();

router.post("/post", async (req, res) => {
  const newPost = new travel(req.body);
  try {
    await newPost.save();
    res.status(200);
    res.send("information saved in the database");
  } catch (error) {
    console.log(error);
  }
});

router.post("/check", async (req, res) => {
  const user = await travel.findOne({ userid: req.body.userid });

  const des = await travel.find({
    Destination: req.body.Destination,
    date: req.body.date,
  });
  // res.send(des[1].fromTime);

  let length = des.length;
  for (let i = 0; i < length; i++) {
    if (
      req.body.userid != des[i].userid &&
      ((req.body.userid != des[i].userid &&
        req.body.fromTime >= des[i].fromTime &&
        req.body.fromTime <= des[i].toTime) ||
        (req.body.toTime >= des[i].fromTime &&
          req.body.toTime <= des[i].toTime) ||
        (des[i].fromTime >= req.body.fromTime &&
          des[i].fromTime <= req.body.toTime) ||
        (des[i].toTime >= req.body.fromTime &&
          des[i].toTime <= req.body.toTime))
    ) {
      const matched1 = new matched({
        userid: req.body.userid,
        uname: req.body.uname,
        date: req.body.date,
        fromTime: req.body.fromTime,
        toTime: req.body.toTime,
        no: req.body.no,
        Destination: req.body.Destination,
        matchedid: des[i].userid,
      });
      const matched2 = new matched({
        userid: des[i].userid,
        uname: des[i].uname,
        date: des[i].date,
        fromTime: des[i].fromTime,
        toTime: des[i].toTime,
        no: des[i].no,
        matchedid: req.body.userid,
        Destination: des[i].Destination,
      });
      const mid1 = req.body.userid;
      const mid2 = des[i].userid;
      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: false,
        auth: {
          user: "jadyn.rowe38@ethereal.email",
          pass: "cE8f68UfpxW4qmCmmv",
        },
      });
      // await transporter.sendMail({
      //   from: "tridecoms.noreply@gmail.com",
      //   to: `${mid1}`, // list of receivers
      //   subject: `You have found your travel  partner,emailid:${mid2} `, // Subject line
      //   text: "Tride Communications", // plain text body
      // });
      // await transporter.sendMail({
      //   from: "tridecoms.noreply@gmail.com",
      //   to: `${mid2}`, // list of receivers
      //   subject: `You have found your travel  partner ,emailid:${mid1} `, // Subject line
      //   text: "Tride Communications", // plain text body
      // });

      await matched1.save();
      await matched2.save();
      await des[i].deleteOne();
      await user.deleteOne();
      // const m1 = await matched.findOne({userid: req.body.userid});

      return res.send({ emailid: m2.userid, date: m2.date });
    }
  }

  return res.send("no_match");
});

router.get("/check", async (req, res) => {
  const m2 = await matched.findOne({ matchedid: req.body.userid });
  if (m2) {
  } else {
    res.send("0");
  }
});

export default router;
