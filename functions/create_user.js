const admin = require('firebase-admin');

module.exports = function(req, res) {
  // Verify the user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({error: 'Bad Input'});
  }

  // Format the phone number (might be number or string, so make it a string first) to remove dashes and parens
  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  // Create a new user account using that phone number
  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user)) // Respond to the user request, saying the account was created
    .catch(err => res.status(422).send({ error: err }));
}

/* a weakness of using Google Clound Functions is the test cycle, 
   we always have to deploy all changes before testing */