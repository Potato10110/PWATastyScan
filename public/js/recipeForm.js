// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_k7nejkq1biMPTJqV2M45cnjvKywTcmQ",
  authDomain: "tastyscanpwa.firebaseapp.com",
  projectId: "tastyscanpwa",
  storageBucket: "tastyscanpwa.appspot.com",
  messagingSenderId: "154502883520",
  appId: "1:154502883520:web:73b324e34c9f7143e32525",
  measurementId: "G-99VH5W8E8K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

//db.settings({timestampsInSnapshots: true})

// firebase (read data) in documentation
/*const recipeSnapshot = await getDocs(collection(db, "UserRecipes"));
recipeSnapshot.forEach((snapshot) => {
  console.log(`${s.id} => ${doc.data()}`);
});*/

const recipeDB = collection(db, "UserRecipes");

getDocs(recipeDB)
  .then((snapshot) => {
    let recipe = [];
    snapshot.docs.forEach((doc) => {
      recipe.push({ ...doc.data(), id: doc.id });
    });
    console.table(recipe);
  })
  .catch((err) => {
    console.log(err.message);
  });

const addRecipe = document.querySelector(".recipeForm");
addRecipe.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(recipeDB, {
    added_at: Date(),
    name: $("#userName").val(),
    recipeName: $("#recipeName").val(),
    cookingTime: $("#cookingTime").val(),
    mealType: $("#MealType").val(),
    servings: $("#servings").val(),
    ingredients: $("#ingredients").val(),
    instruction: $("#instructions").val(),
  }).then(() => {
    addRecipe.reset();
    alert("Submit Succesfully");
  });
});

const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  window.location.assign("./profile.html");
});
