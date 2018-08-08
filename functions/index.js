const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.createProfile = functions.auth.user().onCreate((userRecord, context) => {
  return admin.database().ref(`/userProfile/${userRecord.uid}`).set({
    displayName: userRecord.displayName,
    email: userRecord.email,
    photoURL: userRecord.photoURL,
    provider: 'Google'
  });
});
