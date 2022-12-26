const searchBtn = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "4c42e7f4";
const APP_key = "ef6382032d826f721fe47b89415450b0";
// console.log(container)
searchBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  if (searchQuery == "") {
    alert("Error empty text");
  } else {
    SearchRecipeAPI();
  }
});
let sessionResult = [];

async function SearchRecipeAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&random=true`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
}

$(document).ready(function () {
  console.log("document ready");
  if (sessionStorage.sessionResult) {
    console.log(sessionStorage.sessionResult);
    searchResultDiv.innerHTML = sessionStorage.sessionResult;
  }
  $(".health-labels").hide();
});
$(document).on("click", ".more-details.close", function () {
  var thisParent = jQuery(this).parents(".item").eq(0);
  console.log(thisParent);
  var thisParent_id = jQuery(thisParent).attr("id");
  console.log(thisParent_id);
  var healthLabels = $(thisParent).find(".health-labels").eq(0);
  jQuery(healthLabels).show();
  $(this).addClass("open");
  $(this).removeClass("close");
  $(this).text("See Less");
});
$(document).on("click", ".more-details.open", function () {
  var thisParent = jQuery(this).parents(".item").eq(0);
  console.log(thisParent);
  var thisParent_id = jQuery(thisParent).attr("id");
  console.log(thisParent_id);
  var healthLabels = $(thisParent).find(".health-labels").eq(0);
  jQuery(healthLabels).hide();
  $(this).addClass("close");
  $(this).removeClass("open");
  $(this).text("See More");
});

function generateHTML(results) {
  let generatedHTML = "";
  let recipe_id = 0;
  results.map((result) => {
    $(document).ready(function () {
      $(".health-labels").hide();
    });

    console.log(result);
    recipe_id++;
    generatedHTML += `
      <div class="item" id="recipe${recipe_id}">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_self" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data"><b>Meal Type:</b> ${result.recipe.mealType}</p>
        <p class="item-data"><b>Calories:</b> ${result.recipe.calories.toFixed(
          2
        )}</p>
        <p class="item-data"><b>Diet label:</b> ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <button class="more-details close">See more details</button>
        <p class="item-data health-labels"><b>Health labels:</b> ${
          result.recipe.healthLabels
        }</p>
      </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;

  sessionStorage.setItem("sessionResult", generatedHTML);
  console.log(sessionStorage.getItem("sessionResult"));
}
// total time to cook
//<p class="item-data"><b>Total time to cook:</b> ${result.recipe.totalTime}</p>
const filterResult = document.getElementById("filter-results");
const breakfastBtn = document.getElementById("breakfast-btn");
const lowSugarBtn = document.getElementById("low-sugar-btn");
const lunchBtn = document.getElementById("lunch-btn");
const dinnerBtn = document.getElementById("dinner-btn");
const snackBtn = document.getElementById("snack-btn");

lowSugarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  lowSugarAPI();
});

async function lowSugarAPI() {
  const baseURL = `https://api.edamam.com/search?q=""&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&health=low-sugar&random=true`;
  const response = await fetch(baseURL);
  const data = await response.json();
  lowSugarHTML(data.hits);
}

function lowSugarHTML(results) {
  let lowSugarHTML = "";
  let recipe_id = 0;
  results.map((result) => {
    $(document).ready(function () {
      $(".health-labels").hide();
    });
    recipe_id++;
    lowSugarHTML += `
      <div class="filter-box item" id="recipe${recipe_id}">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="filter-title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data"><b>Meal Type:</b> ${result.recipe.mealType}</p>
        <p class="item-data"><b>Calories:</b> ${result.recipe.calories.toFixed(
          2
        )}</p>
        <p class="item-data"><b>Diet label:</b> ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <button class="more-details close">See more details</button>
        <p class="item-data health-labels"><b>Health labels:</b> ${
          result.recipe.healthLabels
        }</p>
      </div>
    `;
  });
  filterResult.innerHTML = lowSugarHTML;
}

breakfastBtn.addEventListener("click", (e) => {
  e.preventDefault();
  BreakfastAPI();
});

async function BreakfastAPI() {
  const baseURL = `https://api.edamam.com/search?q=""&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=breakfast&random=true`;
  const response = await fetch(baseURL);
  const data = await response.json();
  breakfastHTML(data.hits);
}

function breakfastHTML(results) {
  let breakfastHTML = "";
  let recipe_id = 0;
  results.map((result) => {
    $(document).ready(function () {
      $(".health-labels").hide();
    });
    recipe_id++;
    breakfastHTML += `
      <div class="filter-box item" id="recipe${recipe_id}">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="filter-title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data"><b>Meal Type:</b> ${result.recipe.mealType}</p>
        <p class="item-data"><b>Calories:</b> ${result.recipe.calories.toFixed(
          2
        )}</p>
        <p class="item-data"><b>Diet label:</b> ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <button class="more-details close">See more details</button>
        <p class="item-data health-labels"><b>Health labels:</b> ${
          result.recipe.healthLabels
        }</p>
      </div>
    `;
  });
  filterResult.innerHTML = breakfastHTML;
}

lunchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  LunchAPI();
});

async function LunchAPI() {
  const baseURL = `https://api.edamam.com/search?q=""&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=lunch&random=true`;
  const response = await fetch(baseURL);
  const data = await response.json();
  lunchHTML(data.hits);
}

function lunchHTML(results) {
  let lunchHTML = "";
  let recipe_id = 0;
  results.map((result) => {
    $(document).ready(function () {
      $(".health-labels").hide();
    });
    recipe_id++;
    lunchHTML += `
      <div class="filter-box item" id="recipe${recipe_id}" >
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="filter-title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data"><b>Meal Type:</b> ${result.recipe.mealType}</p>
        <p class="item-data"><b>Calories:</b> ${result.recipe.calories.toFixed(
          2
        )}</p>
        <p class="item-data"><b>Diet label:</b> ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <button class="more-details close">See more details</button>
        <p class="item-data health-labels"><b>Health labels:</b> ${
          result.recipe.healthLabels
        }</p>
      </div>
    `;
  });
  filterResult.innerHTML = lunchHTML;
}

dinnerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  DinnerAPI();
});

async function DinnerAPI() {
  const baseURL = `https://api.edamam.com/search?q=""&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=dinner&random=true`;
  const response = await fetch(baseURL);
  const data = await response.json();
  DinnerHTML(data.hits);
}

function DinnerHTML(results) {
  let dinnerHTML = "";
  let recipe_id = 0;
  results.map((result) => {
    $(document).ready(function () {
      $(".health-labels").hide();
    });
    recipe_id++;
    dinnerHTML += `
      <div class="filter-box item" id="recipe${recipe_id}" >
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="filter-title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data"><b>Meal Type:</b> ${result.recipe.mealType}</p>
        <p class="item-data"><b>Calories:</b> ${result.recipe.calories.toFixed(
          2
        )}</p>
        <p class="item-data"><b>Diet label:</b> ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <button class="more-details close">See more details</button>
        <p class="item-data health-labels"><b>Health labels:</b> ${
          result.recipe.healthLabels
        }</p>
      </div>
    `;
  });
  filterResult.innerHTML = dinnerHTML;
}

snackBtn.addEventListener("click", (e) => {
  e.preventDefault();
  SnackAPI();
});

async function SnackAPI() {
  const baseURL = `https://api.edamam.com/search?q=""&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=snack&random=true`;
  const response = await fetch(baseURL);
  const data = await response.json();
  SnackHTML(data.hits);
}

function SnackHTML(results) {
  let snackHTML = "";
  let recipe_id = 0;
  results.map((result) => {
    $(document).ready(function () {
      $(".health-labels").hide();
    });
    recipe_id++;
    snackHTML += `
      <div class="filter-box item" id="recipe${recipe_id}" >
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="filter-title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data"><b>Meal Type:</b> ${result.recipe.mealType}</p>
        <p class="item-data"><b>Calories:</b> ${result.recipe.calories.toFixed(
          2
        )}</p>
        <p class="item-data"><b>Diet label:</b> ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <button class="more-details close">See more details</button>
        <p class="item-data health-labels"><b>Health labels:</b> ${
          result.recipe.healthLabels
        }</p>
      </div>
    `;
  });
  filterResult.innerHTML = snackHTML;
}
