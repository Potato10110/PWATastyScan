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


const recipeDB = collection(db, "UserRecipes");


const addRecipe = document.querySelector("#recipeForm");
/*addRecipe.addEventListener("submit", () => {

});*/

const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  window.location.assign("./profile.html");
});



const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  var userName = $("#userName").val()
  var recipeName = $("#recipeName").val()
  var cookingTime = $("#cookingTime").val()
  var MealType = $("#MealType").val()
  var servings = $("#servings").val()
  var ingredients = $("#ingredients").val()
  var instructions = $("#instructions").val()

  if(userName == "") {
    alert("Name is Required") 
  } else if(recipeName == "") {
    alert("Recipe Name is required")
  } else if(cookingTime == "") {
    alert("Cooking Time is required")
  }else if(MealType == "") {
    alert("Mealtype is required")
  }else if(servings == "") {
    alert("Servings is required")
  } else if(ingredients == "") {
    alert("Ingredients is Required")
  } else if(instructions == "") {
    alert("Instructons is required")
  }else {
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
  }
});
