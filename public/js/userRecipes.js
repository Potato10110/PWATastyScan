import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
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

const userRecipe = document.getElementById("userRecipe");
const recipeDB = collection(db, "UserRecipes");

onSnapshot(recipeDB, (snapshot) => {
  let recipe = [];
  snapshot.docs.forEach((doc) => {
    recipe.push({ ...doc.data(), id: doc.id });
  });
  //console.table(recipe);
  renderRecipe(recipe);
});

function renderRecipe(recipes) {
  let recipeHTML = "";
  recipes.map((result) => {
    recipeHTML += `
    <div class="items">
        <img src="${result.imageUri}" alt="food" />
        
        <div class="box">
          <div class="flex-container">
            <h1>${result.recipeName}</h1>
            <a href="recipePage.html" class="view-btn" id="view-recipe-link" data-recipe-id="{{documentId}}" target="_self">View Recipe</a>
          </div>
          <p class="item-data user">${result.name}</p>
          <div class="flex-container">
            <p class="item-data">${result.mealType}</p>
            <p class="item-data">${result.cookingTime}</p>
            <p class="item-data">${result.servings} Servings</p>
          </div>

        </div>
      </div>
    `;
  });
  userRecipe.innerHTML = recipeHTML;
}

/*const viewRecipeLink = document.getElementById("view-recipe-link");
if(viewRecipeLink){
  viewRecipeLink.addEventListener("click", function() {
    const recipeId = this.getAttribute("data-recipe-id");
    this.href = `/recipePage.html?recipeId=${recipeId}`;
  });
}*/