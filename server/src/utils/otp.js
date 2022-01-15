const moment = require("moment");
exports.generate_otp = () =>
  (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
exports.otp_expiration = () => moment(new Date()).add(5, "minutes").toString();
exports.isAfter = (otp_expiration_date) =>
  moment(new Date()).isAfter(otp_expiration_date);

// Math.random() generate a number between 0-1 * 10000 => to form 4 digit number
// here we can get any number between 0000-9999 but the issue is 0012 will
// consider 12 instead of 0012 for that we adding  10000 => 10012
// then converting to string and with substring(1) we remove the first character
// mean 1 so we will get 0012.
