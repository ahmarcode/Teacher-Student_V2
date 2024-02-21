import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy5nialtm6ZCVoVKFDlOiaxhq408kvUIk",
  authDomain: "authentication-trial-2f457.firebaseapp.com",
  databaseURL: "https://authentication-trial-2f457-default-rtdb.firebaseio.com",
  projectId: "authentication-trial-2f457",
  storageBucket: "authentication-trial-2f457.appspot.com",
  messagingSenderId: "998398509539",
  appId: "1:998398509539:web:dcd9b1305cc128994960d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app); // Get a reference to the Firebase Realtime Database


const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")

const qualificationInput = document.getElementById("qualification");
const experienceInput = document.getElementById("experience");
const nameInput = document.getElementById("name")
const signupEmailIn = document.getElementById("email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

createacctbtn.addEventListener("click", function () {
  var isVerified = true;

  var name = nameInput.value;
  var experience = experienceInput.value;
  var qualification = qualificationInput.value;


  signupEmail = signupEmailIn.value;

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signupPassword !== confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.")
    isVerified = false;
  }

  if (signupEmail === "" || signupPassword === "" || confirmSignUpPassword === "") {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  if (isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // Store user's email and username in the database
        writeUserData(user.uid, signupEmail, name, experience, qualification);
        window.alert("Success! Account created.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        window.alert("Error occurred. Try again.");
      });
  }
});

// Function to write user data to the database
function writeUserData(userId, email, name, experience, qualification) {
  set(ref(database, 'users/' + userId), {
    email: email,
    name: name,
    experience: experience,
    qualification: qualification,
    type: 'teacher'
  });
}

submitButton.addEventListener("click", function () {
  email = emailInput.value;
  password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
        const userId = user.uid;
      console.log("Success! Welcome back!");
      window.alert("Success! Welcome back!");
      // ...
      // Assuming userID is the variable holding the user's ID
      // Replace with the actual user ID
      window.location.href = `student-main.html`;

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error occurred. Try again.");
      window.alert("Error occurred. Try again.");
    });
});

signupButton.addEventListener("click", function () {
  main.style.display = "none";
  createacct.style.display = "block";
});

returnBtn.addEventListener("click", function () {
  main.style.display = "block";
  createacct.style.display = "none";
});
