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
    let object = {};

    fetch("http://localhost:3000/recipe/pitsa", {
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

    const navSearch = document.getElementById("nav-search");

    navSearch.addEventListener("keypress", function(event){
        let recipeName = document.getElementById("recipe-name");
        let r_ingredients = document.getElementById("ingredients");
        let r_instructions = document.getElementById("instructions");

        if (event.key === "Enter") {
            fetch("http://localhost:3000/recipe/" + navSearch.value, {
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
    })

    const searchBar = document.getElementById("search-text");


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


    let ingredientList = [];
    let instructionList = [];

    const addIngredientBtn = document.getElementById("add-ingredient");

    addIngredientBtn.addEventListener("click", function(){
        let inputIngredient = document.getElementById("ingredients-text");
        ingredientList.push(inputIngredient.value);
    });

    const addInstructionBtn = document.getElementById("add-instruction");

    addInstructionBtn.addEventListener("click", function(){
        let inputInstruction = document.getElementById("instructions-text");
        instructionList.push(inputInstruction.value);
    });

    const submit = document.getElementById("submit");

    submit.addEventListener("click", function(){
        const inputName = document.getElementById("name-text");
        const inputGlutenFree = document.getElementById("gluten-free");
        const inputVegan = document.getElementById("vegan");
        const inputOvo = document.getElementById("ovo");
        console.log(inputName.value);
        object.name = inputName.value;
        object.ingredients = ingredientList;
        object.instructions = instructionList;
        object.glutenFree = inputGlutenFree.checked;
        object.vegan = inputVegan.checked;
        object.ovo = inputOvo.checked;
        console.log(inputVegan.checked);
        fetch("http://localhost:3000/recipe/", {
            method:"post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(object)
            //'{ "name": "' + searchBar.value + '", "ingredients": ' + ingredientList + ', "instructions": ' + instructionList + ' }'
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(dataj){
            console.log(dataj.name);
            recipeName.innerHTML = dataj.name;
            r_ingredients.innerHTML = dataj.ingredients;
            r_instructions.innerHTML = dataj.instructions;
            ingredientList = [];
            instructionList = [];
        })

        const imageFile = document.getElementById("image-input");
        const formData = new FormData();
        //data.append('name', 'Image Upload');
        formData.append('file_attachment', imageFile);

        fetch("http://localhost:3000/images/", {
            method: "post",
            body: formData,
        })
        .then(function(res) {
            return res.text();
        })
        .then(function(data){
            console.log("done");
        })
    });

}

/*
, function(){
        if ( imageFile != null ) {
            const data = new FormData();
            data.append('name', 'Image Upload');
            data.append('file_attachment', imageFile);
            fetch("http://localhost:3000/images/", {
                method: "post",
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data; ',
                }
            })
            let responseJson = res.json();
            if (responseJson.status == 1) {
                alert('Upload Successful');
            }
        }
         else {
        //if no file selected the show alert
            alert('Please Select File first');
        }
    }
*/