const admin = require('firebase-admin');
const mailgun = require('./libs/mailgun');

module.exports = function (req, res) {
  if (!req.body.email) {
    console.log('email not provided');
    return res.status(422).send({ error: 'Bad Input - must input an email address' });
  }

  const email = req.body.email; // formatting goes here

  return admin.auth().getUserByEmail(email)
    .then(userRecord => {
      // Generate the code here
      const code = Math.round(Math.random() * 8999 + 1000); // 1000 ~ 9999

      console.log('code generated', code);

      // Send the code
      return mailgun.send(
        email,
        'Verifying your account',
        'Your code is: ' + code,
        err => {
          if (err) {
            console.log('fail to send code', err);
            return res.status(422).send({ error: err });
          }

          // Save the code
          return admin.database().ref('users/' + userRecord.uid).set({ code: code, isCodeValid: true })
            .then(() => {
              console.log('code successfully sent');
              return res.send({ success: true });
            });
        });

    })
    .catch(err => {
      if (res)
        return res.status(422).send({ error: err });
    });

};
