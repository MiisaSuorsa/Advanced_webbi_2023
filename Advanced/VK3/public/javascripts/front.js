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
    const addButton = document.getElementById("submit-data")
    const textField = document.getElementById("messageField")

    addButton.addEventListener("click", function() {
        const input_name = document.getElementById("input-name");
        const input_todo = document.getElementById("input-task");

        fetch("http://localhost:3000/todo", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "name": "' + input_name.value + '", "todos": "' + input_todo.value + '" }'
           })
           .then(function(res){
            return res.json()
           })
           .then(function(dataj){
            console.log(dataj.res);
            //tähän väliin lisää näkyviin sivulle
            textField.innerText = dataj.res;
           })
    })

    const searchButton = document.getElementById("search")

    searchButton.addEventListener("click", function() {
        const input_search = document.getElementById("search-name");

        fetch("http://localhost:3000/user/" + input_search.value, {
            method: "get",
            headers: {
                "Content-type": "application/json"
            },
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(dataj){
            console.log(dataj.res);
            textField.innerText = dataj.res;
        })
    })

    const deleteButton = document.getElementById("delete-user");

    deleteButton.addEventListener("click", function(){
        const delete_input = document.getElementById("search-name");
        fetch("http://localhost:3000/user/" + delete_input.value, {
            method: "delete",
            headers: {
                "Content-type": "application/json"
            },
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(dataj){
            console.log(dataj.res);
            textField.innerText = dataj.res;
        })
    })
}