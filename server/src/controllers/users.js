const db = require("../models");
const { generate_otp, otp_expiration, isAfter } = require("../utils/otp");
const User = db.users;

exports.create = (req, res) => {
  const { name, phone_number } = req.body;
  if (!name) {
    res.status(400).send({
      message: "name can not be empty!",
    });
  }
  if (!phone_number) {
    res.status(400).send({
      message: "phone_number can not be empty!",
    });
  }
  User.findOne({ where: { phone_number } })
    .then((user) => {
      if (user)
        res.status(400).send({
          message: "Phone number already exists!",
        });
      else {
        User.create({ name, phone_number })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User.",
            });
          });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: err.message || "Some error occurred while finding User.",
      });
    });
};

exports.get_OTP = (req, res) => {
  let { id } = req.body;
  if (!id) res.status(400).send({ message: "User id needed!" });
  User.findOne({ where: { id } })
    .then((user) => {
      if (user) {
        res.send(user.otp);
      } else {
        res.status(404).send({
          message: `Cannot find User for id ${id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while finding user for id ${id}!`,
      });
    });
};

exports.generate_OTP = (req, res) => {
  let { phone_number } = req.body;
  if (!phone_number)
    res.status(400).send({ message: "phone_number field should not empty!" });
  User.findOne({ where: { phone_number } })
    .then((user) => {
      if (user) {
        user
          .update({
            otp: generate_otp(),
            otp_expiration_date: otp_expiration(),
          })
          .then((user) => {
            res.send({ user_id: JSON.stringify(user.id) });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                `Error while generating OTP for ${phone_number} phone number!`,
            });
          });
      } else {
        res.status(404).send({
          message: `Cannot find User for ${phone_number} phone number!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error while finding user for ${phone_number} phone number!`,
      });
    });
};

exports.verify_OTP = (req, res) => {
  const { id, otp } = req.body;
  if (!id) res.status(400).send({ message: "User id required!" });
  if (!otp) res.status(400).send({ message: "OTP code required!" });
  User.findOne({ where: { id } })
    .then((data) => {
      if (data) {
        if (data.otp === otp) {
          if (isAfter(data.otp_expiration_date))
            res.status(400).send({
              message: `OTP expired!`,
            });
          else res.send(data);
        } else {
          res.status(400).send({
            message: `OTP not matched!`,
          });
        }
      } else {
        res.status(404).send({
          message: `Cannot find User with id ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving User with id ${id}`,
      });
    });
};
