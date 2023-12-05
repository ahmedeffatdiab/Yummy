let displayContainer=document.getElementById("display");
let showSearchIcon=document.getElementById("showSearch")

let submitbtn;
let nameInputTouched;
let emailInputTouched;
let phoneInputTouched;
let ageInputTouched;
let passwordInputTouched;
let repasswordInptTouched;

$(document).ready(()=>{
    searchByName("").then(()=>{
        $(".loading-Screen").fadeOut(500)
        $(".inner-loading-screen").fadeOut(500);
    })
})
function openNavside(){
    $(".side-nav-menu").animate({left:0},500);
    $(".open-close-icon").css({display:"none"})
    $(".xIcon").css({display:"block"})
    for(let i=0;i<5;i++){
        $(".links li").eq(i).animate({top:0},(i+5)*100)
    }
}
function closeNavSide(){
    const sidenavMenu= $(".nav-tab").outerWidth()
    $(".side-nav-menu").animate({left:-sidenavMenu},500);
    $(".open-close-icon").css({display:"block"},500)
    $(".xIcon").css({display:"none"},500)
        $(".links li").animate({top:300},500)
}
closeNavSide();
$(".side-nav-menu #open-close-icon").click(()=>{
    if($(".side-nav-menu").css("left")=="0px"){
        closeNavSide()
    }else{
        openNavside()
    }
})

function displayMeals(arr){
    let container="";
    for(let i=0;i<arr.length;i++){
        container+=`
        <div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal overflow-hidden position-relative rounded-2 cursor-pointer">
            <img class="w-100" src="${arr[i].strMealThumb}"/>
            <div class="meal-layer position-absolute d-flex justify-content-center align-items-center">
                <h2>${arr[i].strMeal}</h2>
            </div>
        </div>
    </div>  
        `
    }
    displayContainer.innerHTML=container
}

async function getCategpry(){
    $(".inner-loading-screen").fadeIn(500);
    let res=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    res=await res.json();
    displayCategory(res.categories)
    showSearchIcon.innerHTML=""
    $(".inner-loading-screen").fadeOut(500);

}
getCategpry()
function displayCategory(arr){
    let container="";
    for(let i=0;i<arr.length;i++){
        container+=`
        <div class="col-md-3">
        <div class="meal overflow-hidden position-relative rounded-2 cursor-pointer" onclick="getCategoryMeals('${arr[i].strCategory}')">
            <img class="w-100" src="${arr[i].strCategoryThumb}"/>
            <div class="meal-layer position-absolute text-center text-black-50 align-items-center">
                <h2>${arr[i].strCategory}</h2>
                <p class="text-wrap">${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>  
        `
    }
    displayContainer.innerHTML=container
}

async function getArea(){
    $(".inner-loading-screen").fadeIn(500);
    let res=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    res=await res.json();
    displayArea(res.meals)
    showSearchIcon.innerHTML=""
    $(".inner-loading-screen").fadeOut(500);

}

function displayArea(arr){
    let container="";
    for(let i=0;i<arr.length;i++){
        container+=`
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="col-md-3 cursor-pointer rounded-2 text-center">
                <i class="fa-sharp fa-solid fa-house-laptop fa-4x text-danger" id="AreaIcon"></i>
                <h2 class="text-info">${arr[i].strArea}</h2>
    </div>  
        `
    }
    displayContainer.innerHTML=container
}

async function getIngredient(){
    $(".inner-loading-screen").fadeIn(500);
    let res=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    res=await res.json();
    displayIngredient(res.meals.slice(0,20))
    showSearchIcon.innerHTML=""
    $(".inner-loading-screen").fadeOut(500);
}

function displayIngredient(arr){
    let container="";
    for(let i=0;i<arr.length;i++){
        container+=`
        <div class="col-md-3 rounded-2 text-center Ingradient" onclick="getIngredientMeals('${arr[i].strIngredient}')"  >
                <i class="fa-solid fa-bowl-food fa-4x text-danger" id="AreaIcon"></i>
                <h2 class="text-info">${arr[i].strIngredient}</h2>
                <p>${arr[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
                </div>  
        `
    }
    displayContainer.innerHTML=container
}

async function getCategoryMeals(category){
    $(".inner-loading-screen").fadeIn(500);
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    res=await res.json();
    displayMeals(res.meals.slice(0,20))
    showSearchIcon.innerHTML=""
    $(".inner-loading-screen").fadeOut(500);

}

async function getAreaMeals(category){
    $(".inner-loading-screen").fadeIn(500);
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`);
    res=await res.json();
    displayMeals(res.meals.slice(0,20))
    showSearchIcon.innerHTML=""
    $(".inner-loading-screen").fadeOut(500);

}

async function getIngredientMeals(ingredient){
    $(".inner-loading-screen").fadeIn(500);
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    res=await res.json();
    displayMeals(res.meals.slice(0,20))
    showSearchIcon.innerHTML=""
    $(".inner-loading-screen").fadeOut(500);

}

function showSearch(){
    showSearchIcon.innerHTML=`
    <div class="container">
        <div class="row py-5">
            <div class="col-md-6">
                <input type="text" onkeyup="searchByName(this.value)" placeholder="Search by Name" class="form-control bg-transparent text-white ">
            </div>
            <div class="col-md-6">
                <input type="text" maxlength="1" onkeyup="searchByFirstLitter(this.value)" placeholder="Search by first Litter" class="form-control bg-transparent text-white">
            </div>
        </div>
    </div>
    `
    displayContainer.innerHTML=""

}
async function searchByName(category){
    $(".inner-loading-screen").fadeIn(500);
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`)
    res=await res.json();
    res.meals ? displayMeals(res.meals):  displayMeals([])
    $(".inner-loading-screen").fadeOut(500);

}

async function searchByFirstLitter(category){
    $(".inner-loading-screen").fadeIn(500);
    category==""?category="a":""
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${category}`)
    res=await res.json();
    res.meals ? displayMeals(res.meals):  displayMeals([])
    $(".inner-loading-screen").fadeOut(500);


}
async function getMealDetails(mealId){
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    res=await res.json();
    displayMealDetails(res.meals[0]);
}
function displayMealDetails(meal){
    let Ingradients='';
    for (let i=1;i<20;i++){
        if(meal[`strIngredient${i}`]){
            Ingradients+=`<li class="alert alert-info d-inline-block">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tage=meal.strTags.split(",");
    let tages='';
    for(let i=0;i<tage.length;i++){
        tages+=`<li class="alert alert-danger d-inline-block">${tage[i]}</li>`
    }
    let cartoona=`
    <div class="col-md-4">
                <img src="${meal.strMealThumb}" class="rounded-3 w-100"/>
                <h3 class="my-2">${meal.strMeal}</h3>
            </div>
            <div class="col-md-8">
                <h2>Instruction</h2>
                <p>${meal.strInstructions}</p>
                <h6><span class="fw-bold">Area : </span>${meal.strArea}</h6>
                <h6><span class="fw-bold">Category : </span>${meal.strCategory}</h6>
                <h3>Recipes : </h3>
                <ul class="list-unstyled">
                ${Ingradients}
                </ul>
                <h3>Tages : <span style="font-size:18px">${meal.strTags} </span></h3>
                <ul class="list-unstyled">
                ${tages}
                </ul>
                <div>
                    <a href="${meal.strSource}" class="btn btn-success">Source</a>
                    <a href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>
            </div>
        </div>
    `
    displayContainer.innerHTML=cartoona;
}

function showContactUs(){
    displayContainer.innerHTML=`
    <div class="contact min-vh-100 text-center d-flex justify-content-center align-items-center">
                <div class="container w-75 my-5">
                    <div class="row g-4 ">
                        <div class="col-md-6">
                            <input autocomplete="false" onkeyup="InputsVAlidation()"  id="nameInput" type="text" placeholder="Enter your Name" class="form-control bg-transparent text-white">
                            <div id="nameAlert" class="alert alert-danger w-100 d-none" style="font-size:15px">special character and number not allowed</div>
                        </div>
                        <div class="col-md-6">
                            <input autocomplete="false" onkeyup="InputsVAlidation()" id="emailInput" type="email" placeholder="Enter your Email" class="form-control bg-transparent text-white">
                            <div id="emailAlert" class="alert alert-danger w-100 d-none" style="font-size:15px">email not match "example@gmail.com"</div>
                        </div>
                        <div class="col-md-6">
                            <input autocomplete="false" onkeyup="InputsVAlidation()" type="text" id="phoneInput" placeholder="Enter your Phone" class="form-control bg-transparent text-white">
                            <div id="phoneAlert" class="alert alert-danger w-100 d-none" style="font-size:15px">Enter valid phone</div>
                        </div>
                        <div class="col-md-6">
                            <input autocomplete="false" onkeyup="InputsVAlidation()" onkeyup="ageValidation()" id="ageInput" type="data" placeholder="Enter your Age" class="form-control bg-transparent text-white">
                            <div id="ageAlert" class="alert alert-danger w-100 d-none" style="font-size:15px">Enter valid Age</div>
                        </div>
                        <div class="col-md-6">
                            <input autocomplete="false" onkeyup="InputsVAlidation()" id="passwordInput" type="password" placeholder="Enter your password" class="form-control bg-transparent text-white">
                            <div id="passwordAlert" class="alert alert-danger w-100 d-none" style="font-size:15px">Enter valid password contain "Minmum 8 charcter & litter and small character"</div>
                        </div>
                        <div class="col-md-6">
                            <input autocomplete="false" onkeyup="InputsVAlidation()" id="repasswordInput" type="password" placeholder="Enter your confirm password" class="form-control bg-transparent text-white">
                            <div id="repasswordAlert" class="alert alert-danger w-100 d-none" style="font-size:15px">Enter valid rpassword</div>
                        </div>
                    </div>
                    <button id="submit" disabled class="my-3 ">submit</button>
                </div>
            </div>
    `
    showSearchIcon.innerHTML=""

    submitbtn=document.getElementById("submit");

    nameInputTouched=false;
    emailInputTouched=false;
    phoneInputTouched=false;
    ageInputTouched=false;
    passwordInputTouched=false;
    repasswordInptTouched=false;
    document.getElementById("nameInput").addEventListener("focus",()=>{
        nameInputTouched=true
    });
    document.getElementById("emailInput").addEventListener("focus",()=>{
        emailInputTouched=true
    });
    document.getElementById("phoneInput").addEventListener("focus",()=>{
        phoneInputTouched=true
    });
    document.getElementById("ageInput").addEventListener("focus",()=>{
        ageInputTouched=true
    });
    document.getElementById("passwordInput").addEventListener("focus",()=>{
        passwordInputTouched=true
    });
    document.getElementById("repasswordInput").addEventListener("focus",()=>{
        repasswordInptTouched=true
    });
}


function InputsVAlidation(){
    if(nameInputTouched){
        if(nameValidation()){
            document.getElementById("nameAlert").classList.replace("d-block","d-none")
            document.getElementById("nameInput").classList.replace("is-invalid","is-valid")
        }else{
            document.getElementById("nameAlert").classList.replace("d-none","d-block")
            document.getElementById("nameInput").classList.replace("is-valid","is-invalid")
        }
    }
    if(emailInputTouched){
        if(emailValidation()){
            document.getElementById("emailAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("emailAlert").classList.replace("d-none","d-block")
        }
    }
    
    if(phoneInputTouched){
        if(phoneNumValidation()){
            document.getElementById("phoneAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("phoneAlert").classList.replace("d-none","d-block")
        }
    }
    if(ageInputTouched){
        if(ageValidation()){
            document.getElementById("ageAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("ageAlert").classList.replace("d-none","d-block")
        }
    }
    if(passwordInputTouched){
        if(passwordValidation()){
            document.getElementById("passwordAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("passwordAlert").classList.replace("d-none","d-block")
        }
    }
    if(repasswordInptTouched){
        if(repasswordValidation()){
            document.getElementById("repasswordAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("repasswordAlert").classList.replace("d-none","d-block")
        }
    }
    if(nameValidation()&&
    emailValidation()&&
    phoneNumValidation()&&
    ageValidation()&&
    passwordValidation()&&
    repasswordValidation()){
        submitbtn.removeAttribute("disabled")
    }
}

function nameValidation(){
    return (/^[a-zA-Z ]{1,15}$/.test(document.getElementById("nameInput").value))
}

function emailValidation(){
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneNumValidation(){
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation(){
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
