const admin = require('firebase-admin');
const serviceAccount = require('./service_account.json');
const functions = require('firebase-functions');
const createUser = require('./create_user');
const requestOneTimePassword = require('./request_one_time_password');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://one-time-password-efa31.firebaseio.com',
});

/* a weakness of using Google Clound Functions is the test cycle,
   we always have to deploy all changes before testing */

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
