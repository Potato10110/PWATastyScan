import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_k7nejkq1biMPTJqV2M45cnjvKywTcmQ",
  authDomain: "tastyscanpwa.firebaseapp.com",
  projectId: "tastyscanpwa",
  storageBucket: "tastyscanpwa.appspot.com",
  messagingSenderId: "154502883520",
  appId: "1:154502883520:web:73b324e34c9f7143e32525",
  measurementId: "G-99VH5W8E8K",
};

const app = initializeApp(firebaseConfig);

const logOutBtn = document.getElementById("logOutBtn");
const Lauth = getAuth();

logOutBtn.addEventListener("click", (e) => {
  signOut(Lauth)
    .then(() => {
      // Sign-out successful.
      window.location.assign("./index.html");
    })
    .catch((error) => {
      // An error happened.
      console.log("Error has occured");
    });
});

const auth = getAuth();
const profilePic = document.getElementById("profilePic");
const userName = document.getElementById("userName");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    userName.innerHTML = user.displayName
    profilePic.setAttribute('src', user.photoURL)
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const submitRecipeBtn = document.getElementById("submitRecipe");

submitRecipeBtn.addEventListener('click', () => {
  window.location.assign("./recipeForm.html");
})

const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  window.location.assign("./homepage.html");
});