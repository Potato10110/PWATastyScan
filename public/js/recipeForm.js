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
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

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

/*getDocs(recipeDB)
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
*/
const addRecipe = document.querySelector("#recipeForm");
/*addRecipe.addEventListener("submit", () => {

});*/

const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  window.location.assign("./profile.html");
});

/*function validateForm() {
  // Get the values of the input fields
  var name = document.getElementById("userName").value;
  var recipeName = document.getElementById("recipeName").value;
  var time = document.getElementById("cookingTime").value;
  var mealtype = document.getElementById("MealType").value;
  var servings = document.getElementById("servings").value;
  var ingredient = document.getElementById("ingredients").value;
  var instruction = document.getElementById("instructions").value;

  // Set the error messages to an empty string
  document.getElementById("nameError").innerHTML = "";
  document.getElementById("recipeError").innerHTML = "";
  document.getElementById("timeError").innerHTML = "";
  document.getElementById("mealError").innerHTML = "";
  document.getElementById("servingError").innerHTML = "";
  document.getElementById("ingredientError").innerHTML = "";
  document.getElementById("instructionError").innerHTML = "";

  // Flag variable to track whether there are any errors
  var hasErrors = false;

  // Validate the name field
  if (name === "") {
    document.getElementById("nameError").innerHTML = "Please enter your name";
    hasErrors = true;
  }

  // Validate the email field
  if (recipeName === "") {
    document.getElementById("recipeError").innerHTML =
      "Please enter a recipe name";
    hasErrors = true;
  }

  if (time === "") {
    document.getElementById("timeError").innerHTML =
      "Please enter an estimate time of cooking";
    hasErrors = true;
  }

  if (mealtype === "") {
    document.getElementById("mealError").innerHTML = "Please pick a meal type";
    hasErrors = true;
  }

  if (servings === "") {
    document.getElementById("servingError").innerHTML =
      "Please enter an  estimate servings";
    hasErrors = true;
  }

  if (ingredient === "") {
    document.getElementById("ingredientError").innerHTML =
      "Please enter a list of ingredients";
    hasErrors = true;
  }

  if (instruction === "") {
    document.getElementById("instructionError").innerHTML =
      "Please enter instructions";
    hasErrors = true;
  }

  // Enable or disable the submit button based on whether there are any errors
  document.getElementById("submitBtn").disabled = hasErrors;

  // Return whether there were any errors
  return !hasErrors;
}
*/

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", (e) => {
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
    swal("Done!", "You submit the recipe!", "success");
  });

  var metadata = {
    contentType: "Images",
  };

  var file = document.querySelector("#Image").files[0];
  const storage = getStorage();
  const storageRef = ref(storage, "images/" + file.name);

  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);

        // Set the new data at the specified location
      });
    }
  );
});
