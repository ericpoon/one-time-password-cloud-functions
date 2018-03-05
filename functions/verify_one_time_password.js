const admin = require('firebase-admin');

module.exports = function (req, res) {
  if (!req.body.email || !req.body.code) {
    return res.status(422).send({ error: 'Email and code must be provided' });
  }

  const email = req.body.email;
  const code = parseInt(req.body.code);

  return admin.auth().getUserByEmail(email)
    .then(userRecord => {
      const uid = userRecord.uid;
      const ref = admin.database().ref('users/' + uid);
      return ref.once('value')
        .then(snapshot => {
          const user = snapshot.val();
          if (user.code !== code || !user.isCodeValid) {
            console.log('invalid or expired code');
            return res.status(422).send({ error: 'Invalid or expired code' });
          }

          ref.update({ isCodeValid: false })
            .then(() => null)
            .catch(() => null);
          return admin.auth().createCustomToken(uid)
            .then(token => res.send({ token }));
        })
        .catch(err => res.status(422).send({ error: err }));
    })
    .catch(err => res.status(422).send({ error: err }));

};
