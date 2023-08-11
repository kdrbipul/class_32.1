// alert();

const searchFood = () =>{
    const inputField = document.getElementById('searchInput');
    const inputValue = inputField.value
    // console.log(inputValue);
    inputField.value = "";

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
    // console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(data => displayFood(data.meals, inputValue))
}

const displayFood = (foods, inputValue) => {
    // console.log(foods);
    const errorArea=document.getElementById('error-area');
    // errorArea.textContent="";
    const span=document.getElementById('span');
    span.classList.add('danger');
    span.textContent="";
    // console.log(foods);
    const resultField = document.getElementById('search-result');
        resultField.textContent ="";
    if(foods==null){
        span.innerText=`
            The Food ${inputValue} is not Found
        `
        errorArea.appendChild(span);
    }else{
        
        foods.forEach(food => {
            console.log(food);
            const div = document.createElement('div');
            div.classList.add('col');
            // div.textContent="";
            div.innerHTML =`
                <div class="card h-100">
                    <img src=${food.strMealThumb} class="card-img-top" alt=${food.strMeal}>
                    <div class="card-body">
                    <h5 class="card-title">${food.strMeal}</h5>
                    <p class="card-text">${food.strInstructions.slice(0,150)+"<strong><i>  See More</i></strong>"}</p>
                    <button onclick="foodDetails(${food.idMeal})" class="btn btn-outline-dark w-100">See More Details</button>
                    </div>
                </div>
            `
            resultField.appendChild(div)
    })

    }
    
}


const foodDetails = (mealID) =>{
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    // console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => displaySingleFood(data.meals[0]))
}

const displaySingleFood = (food) =>{
     // console.log(food);
    const foodDetails = document.getElementById('food-details');
    foodDetails.textContent="";
    // console.log(foodDetails);
    const singleFoodContainer = document.createElement('div');
    singleFoodContainer.classList.add('card');
    singleFoodContainer.innerHTML =`
        <img src=${food.strMealThumb} class="card-img-top" alt=${food.strMeal}>
        <div class="card-body">
            <h5 class="card-title">${food.strMeal}</h5>
            <p class="card-text">${food.strInstructions}</p>
        </div>
    `
    foodDetails.appendChild(singleFoodContainer);
}

//  displaySingleFood();