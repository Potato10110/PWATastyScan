import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  doc
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

const recipePage = document.getElementById("recipeBox");
const recipeDB = collection(db, "UserRecipes");

// const select = await getDocs(collection(db, "UserRecipes"));
// let idTo;
// select.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   idTo = document.getElementById(`${doc.id}`)
//   // console.log(doc.id, " => ", doc.id);
// });

const q = query(collection(db, "UserRecipes"), where("recipeName", "==", "Roasted Garlic-Parmesan Cabbage"));

const querySnapshot = await getDocs(q);
let recipe = [];
  querySnapshot.forEach((doc) => {
    recipe.push({ ...doc.data(), id: doc.id });
    console.log(doc.id, " => ", doc.data());
  });

  renderRecipe(recipe);

// const firestore = firebase.firestore();

// onSnapshot(recipeDB, (snapshot) => {
//   let recipe = [];
//   // let count = 0;
//   snapshot.docs.forEach((doc) => {
//     // if (count >= 1) {
//     //   return;
//     // }
//     recipe.push({ ...doc.data(), id: doc.id });
//     // count++;
//   });
//   //console.table(recipe);
//   renderRecipe(recipe);
// });


function renderRecipe(recipes) {
  let recipeHTML = "";
  recipes.map((result) => {
    recipeHTML += `
      <img src="${result.imageUri}" />
      <div class="container">
      <h1 class="recipeTitle">${result.recipeName}</h1>
      <p class="User-name">By: ${result.name}</p>
      <div class="flex-container">
        <p>${result.mealType}</p>
        <p>${result.cookingTime}</p>
        <p>${result.servings} Serving/s</p>
      </div>
      <div class="ingredients-part">
        <h1 class="ingredients">Ingredients</h1>
        <p class="recipeDetails">
          ${result.ingredients}
        </p>
      </div>
      <div class="instructions-part">
        <h1 class="instructions">Instructions</h1>
        <p class="recipeDetails">
          ${result.instruction}
        </p>
      </div>
      </div>`;
  });
  recipePage.innerHTML = recipeHTML;
}
