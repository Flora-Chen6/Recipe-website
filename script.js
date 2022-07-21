const searchBtn =document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const searchResult = document.querySelector('.search-result');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// console.log(mealDetailsContent);
// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
} );

// get meal list that matches with search
function getMealList(){
    let searchInputText = document.getElementById('search-input').value.trim();
    let html = `<h2 class="display-result-title">Your Search Results: </h2>`;
    // console.log(searchInputText.length);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then (response => response.json())
    .then ( data => { 
        // console.log(data); 
        // let html = `<h2 class="display-result-title">Your Search Results: </h2>`;
        searchResult.classList.add("showResultTitle");
        if (data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class="meal-item" data-id = "${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food-img">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal} </h3>
                            <a href="#" class = 'recipe-btn'>Get Recipe</a>
                        </div>
                    </div>
                `;
            });
        }
        else {
            html = "Sorry, we didn't find any meal for your ingredients";
            mealList.classList.add('notFound');
        }
        // mealList.innerHTML = html;

        return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`);
    })
        .then (response => response.json())
        .then ( data => {
            if (data.meals){
                data.meals.forEach(meal => {
                    html += `
                    <div class="meal-item" data-id = "${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food-img">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class = 'recipe-btn'>Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
        }
        mealList.innerHTML = html;
    })
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        // if(e.target.classList.contains('test-btn')){
        //     let mealItem = e.target.parentElement;

        let mealItem = e.target.parentElement.parentElement;
        // console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
        // .then (console.log(mealItem.dataset));
    }
}

function mealRecipeModal(meal){
    // console.log(meal[0]);
    meal = meal[0];
    let html = `
    <h2 class="recipe-title"> ${meal.strMeal}</h2>
                    <p class="recipe-category">${meal.strCategory}</p>
                    <div class="recipe-instruct">
                        <h3 class="instructions">Instruction: </h3>
                        <p> ${meal.strInstructions} </p>
                    </div>
                    <div class="recipe-meal-img">
                        <img src="${meal.strMealThumb}" alt="food photo">
                    </div>
                    <div class="recipe-link">
                        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                    </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

