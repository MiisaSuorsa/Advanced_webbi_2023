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

    const authToken = localStorage.getItem("auth_token");
    console.log(authToken);

    if(!authToken){
        document.getElementById("user-content").hidden = true;
    } else{

        fetch("/secret", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + authToken
            }
        })
        .then(function(res){
            res.json();
        })
        .then(function(data){
            //document.getElementById("content").innerHTML = page;
            const content = 
            document.getElementById("content").hidden = true;
            const div = document.getElementById("user-content");
            const logout_btn = document.createElement("button")
            logout_btn.setAttribute("id", "logout");
            div.appendChild(logout_btn)
            const user = document.createElement("p")
            div.appendChild(user);
            user.innerText = data.email;
            //document.getElementById("user").innerText = data.user;
        })
        .catch((e) => {
            console.log("error" + e);
        })

        //LOGOUT
        //const logout_btn = document.getElementById("logout");

        logout_btn.addEventListener("click", function(){
            localStorage.removeItem("auth_token");
            window.location.href = "/index.html";
        })
    }

}
