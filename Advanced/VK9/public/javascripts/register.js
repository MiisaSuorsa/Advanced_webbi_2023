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


    const object = {};

    const register = document.getElementById("register-form");

    register.addEventListener("submit", function(event){
        event.preventDefault();
        const input_email = document.getElementsByName("email")[0];
        const input_password = document.getElementsByName("password")[0];
        //const input_email = document.getElementsById("email");
        //const input_password = document.getElementsById("password");
        object.email = input_email.value;
        object.password = input_password.value;
        console.log(object);

        fetch("/register", {
            method: "POST",
            headers: {"content-type": "application/json" },
            body: JSON.stringify(object)
        })
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            if(data.msg == "ok"){
                window.location.href="/login.html";
            } else{
                console.log(data.msg);
            }
        })
    })

}
