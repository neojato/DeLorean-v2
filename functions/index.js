const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.createProfile = functions.auth.user().onCreate(event => {
  return admin.database().ref(`/userProfile/${event.data.uid}`).set({
    displayName: event.data.displayName,
    email: event.data.email,
    photoURL: event.data.photoURL,
    provider: 'Google'
  });
});
