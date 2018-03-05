const Mailgun = require('mailgun').Mailgun;
const API_KEY = 'key-76bb6b882a804d9179bda4c6eeab2f4b';
const FROM_EMAIL = 'postmaster@sandbox1a2c6cf09ae54d26adf1d40cdd993e79.mailgun.org';
const mg = new Mailgun(API_KEY);

module.exports = {
  send: function (to, title, body, callback) {
    mg.sendText(FROM_EMAIL, to, title, body, callback);
  },
};
