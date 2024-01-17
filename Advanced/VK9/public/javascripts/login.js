if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

function initializeCode(){



    let object = {};
    //const login = document.getElementsByName("submit_btn");
    const login = document.getElementById("login-form");

    login.addEventListener("submit", function(event){
        event.preventDefault();
        const input_email = document.getElementsByName("email")[0];
        const input_password = document.getElementsByName("password")[0];
        object.email = input_email.value;
        object.password = input_password.value;
        console.log(object);

        fetch("/login", {
            method: "POST",
            headers: {"content-type": "application/json" },
            body: JSON.stringify(object)
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(dataj){
            if(dataj.token){
                console.log(dataj.token);
                localStorage.setItem("auth_token", dataj.token);
                console.log("redirecting to index");
                window.location.href="/";
            } else {
                console.log("not working")
            }
        })
    })

}