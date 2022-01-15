const router = require("express").Router();
const {
  create,
  generate_OTP,
  verify_OTP,
  get_OTP,
} = require("../controllers/users");

module.exports = (app) => {
  router.route("/").post(create);
  router.route("/getOTP").post(get_OTP);
  router.route("/generateOTP").post(generate_OTP);
  router.route("/verifyOTP").post(verify_OTP);
  app.use("/api/users", router);
};
