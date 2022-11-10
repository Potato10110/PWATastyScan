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
    fetchAPI();
  }
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.table(data);
}

function generateHTML(results) {
  let generatedHTML = "";
  results.map((result) => {
    $(document).ready(function () {
      $(".health-labels").hide();
      $(".more-details").click(function () {
        $(".health-labels").show();
      });
    });

    generatedHTML += `
      <div class="item">
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
        <button class="more-details">See more details</button>
        <p class="item-data health-labels"><b>Health labels:</b> ${
          result.recipe.healthLabels
        }</p>
      </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
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
  const baseURL = `https://api.edamam.com/search?q=""&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&health=low-sugar`;
  const response = await fetch(baseURL);
  const data = await response.json();
  lowSugarHTML(data.hits);
  console.table(data);
}

function lowSugarHTML(results) {
  let lowSugarHTML = "";
  results.map((result) => {
    $(document).ready(function () {
      $(".health-labels").hide();
      $(".more-details").click(function () {
        $(".health-labels").show();
      });
    });

    lowSugarHTML += `
      <div class="filter-box">
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
        <button class="more-details">See more details</button>
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
  const baseURL = `https://api.edamam.com/search?q=""&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=breakfast`;
  const response = await fetch(baseURL);
  const data = await response.json();
  breakfastHTML(data.hits);
  console.table(data);
}

function breakfastHTML(results) {
  let breakfastHTML = "";
  results.map((result) => {
    $(document).ready(function () {
      $(".health-labels").hide();
      $(".more-details").click(function () {
        $(".health-labels").show();
      });
    });

    breakfastHTML += `
      <div class="filter-box">
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
        <button class="more-details">See more details</button>
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
  const baseURL = `https://api.edamam.com/search?q=""&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=lunch`;
  const response = await fetch(baseURL);
  const data = await response.json();
  lunchHTML(data.hits);
  console.table(data);
}

function lunchHTML(results) {
  let lunchHTML = "";
  results.map((result) => {
    $(document).ready(function () {
      $(".health-labels").hide();
      $(".more-details").click(function () {
        $(".health-labels").show();
      });
    });

    lunchHTML += `
      <div class="filter-box">
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
        <button class="more-details">See more details</button>
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
  const baseURL = `https://api.edamam.com/search?q=""&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=lunch`;
  const response = await fetch(baseURL);
  const data = await response.json();
  DinnerHTML(data.hits);
  console.table(data);
}

function DinnerHTML(results) {
  let dinnerHTML = "";
  results.map((result) => {
    $(document).ready(function () {
      $(".health-labels").hide();
      $(".more-details").click(function () {
        $(".health-labels").show();
      });
    });

    dinnerHTML += `
      <div class="filter-box">
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
        <button class="more-details">See more details</button>
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
  const baseURL = `https://api.edamam.com/search?q=""&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=snack`;
  const response = await fetch(baseURL);
  const data = await response.json();
  SnackHTML(data.hits);
  console.table(data);
}

function SnackHTML(results) {
  let snackHTML = "";
  results.map((result) => {
    $(document).ready(function () {
      $(".health-labels").hide();
      $(".more-details").click(function () {
        $(".health-labels").show();
      });
    });

    snackHTML += `
      <div class="filter-box">
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
        <button class="more-details">See more details</button>
        <p class="item-data health-labels"><b>Health labels:</b> ${
          result.recipe.healthLabels
        }</p>
      </div>
    `;
  });
  filterResult.innerHTML = snackHTML;
}
