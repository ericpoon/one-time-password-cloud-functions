const admin = require('firebase-admin');

module.exports = function (req, res) {
  // Verify the user provided a phone
  if (!req.body.email) {
    return res.status(422).send({ error: 'Bad Input - must input an email address' });
  }

  // Format the email here
  const email = String(req.body.email);

  // Create a new user account using that phone number
  return admin.auth().createUser({ email: email })
    .then(user => res.send(user)) // Respond to the user request, saying the account was created
    .catch(err => res.status(422).send({ error: err }));
};
