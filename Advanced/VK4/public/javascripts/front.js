if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}


function initializeCode() {

    let recipeName = document.getElementById("recipe-name");
    let r_ingredients = document.getElementById("ingredients");
    let r_instructions = document.getElementById("instructions");

    fetch("http://localhost:3000/recipe/", {
            method: "get"
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(dataj){
            console.log(dataj.name);
            recipeName.innerHTML = dataj.name;
            r_ingredients.innerHTML = dataj.ingredients;
            r_instructions.innerHTML = dataj.instructions;
        })

    const searchBar = document.getElementById("name-text");

    searchBar.addEventListener("keypress", function(event){
        let recipeName = document.getElementById("recipe-name");
        let r_ingredients = document.getElementById("ingredients");
        let r_instructions = document.getElementById("instructions");

        if (event.key === "Enter") {
            fetch("http://localhost:3000/recipe/" + searchBar.value, {
                method: "get"
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(dataj){
                console.log(dataj.name);
                recipeName.innerHTML = dataj.name;
                r_ingredients.innerHTML = dataj.ingredients;
                r_instructions.innerHTML = dataj.instructions;
            })
        }
    });

    let containerList = [];

    const addIngredientBtn = document.getElementById("add-ingredient");

    addIngredientBtn.addEventListener("click", function(){
        let inputIngredient = document.getElementById("ingredients-text");
        containerList.push(inputIngredient.value);
    });

    const addInstructionBtn = document.getElementById("add-instruction");

    addInstructionBtn.addEventListener("click", function(){
        let inputInstruction = document.getElementById("instructions-text");
        containerList.push(inputInstruction.value);
    });

    const submit = document.getElementById("submit");

    submit.addEventListener("click", function(){
        fetch("http://localhost:3000/recipe/", {
            method:"post",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "name": "' + searchBar.value + '", "ingredients": "' + containerList[0] + '", "instructions": "' + containerList[1] + '" }'
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(dataj){
            console.log(dataj.name);
            recipeName.innerHTML = dataj.name;
            r_ingredients.innerHTML = dataj.ingredients;
            r_instructions.innerHTML = dataj.instructions;
        })
    });

}
