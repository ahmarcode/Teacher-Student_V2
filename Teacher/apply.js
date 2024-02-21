
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBy5nialtm6ZCVoVKFDlOiaxhq408kvUIk",
  authDomain: "authentication-trial-2f457.firebaseapp.com",
  databaseURL: "https://authentication-trial-2f457-default-rtdb.firebaseio.com",
  projectId: "authentication-trial-2f457",
  storageBucket: "authentication-trial-2f457.appspot.com",
  messagingSenderId: "998398509539",
  appId: "1:998398509539:web:dcd9b1305cc128994960d6"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.dataset();

// Get a reference to the database service
var database = firebase.database();

// Assuming you have a 'users' node in your database
var usersRef = database.ref('users');

// Fetching data
usersRef.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    console.log("Child Key: " + childKey + ", Child Data: ", childData);
  });
});
