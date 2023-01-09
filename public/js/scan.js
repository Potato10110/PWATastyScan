$(document).ready(function () {
    init();
  });
  // More API functions here:
  // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

  // the link to your model provided by Teachable Machine export panel
  const URL = "https://teachablemachine.withgoogle.com/models/gN2nJVO7g/";

  let model, webcam, labelContainer, maxPredictions;

  // Load the image model and setup the webcam
  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(390, 390, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  let classPredictions = [];
  // run the webcam image through the image model
  async function predict() {
    // predict can take in an image, video or canvas html element
    const predictions = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
      if (predictions[i].probability > 0.9) {
        const classPrediction = predictions[i].className;
        classPredictions.push(classPrediction);
        labelContainer.childNodes[i].innerHTML = classPrediction;
      }
      /*const classPrediction =
        prediction[i].className +
        ": " +
        prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;*/
    }
  }
  const APP_ID = "4c42e7f4";
  const APP_key = "ef6382032d826f721fe47b89415450b0";
  const searchResult = document.querySelector("#searchResult");
  const searchRecipe = document.getElementById("searchRecipe");
  searchRecipe.addEventListener("click", (e) => {
    e.preventDefault();
    searchQuery = classPredictions;
    SearchRecipeAPI()
  });

  let fromSearch = 0;
  let toSearch = 5;
  async function SearchRecipeAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=${fromSearch}&to=${toSearch}&random=true`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    fromSearch += 6;
    toSearch += 6;
  }
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
    searchResult.innerHTML = generatedHTML;
}