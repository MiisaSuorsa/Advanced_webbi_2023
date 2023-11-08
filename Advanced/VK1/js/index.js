if(document.readyState !== "loading"){
    console.log("Document is ready");
    create();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        create();
    })
}


async function create(){
  //container div
  const div = document.createElement("div");
  div.setAttribute("class", "container");

    for (let x = 0; x < 5; x++){
        //div
        const div1 = document.createElement("div");
        div1.setAttribute("class", "wiki-item");
        //h1
        const h1 = document.createElement("h1");
        h1.setAttribute("class", "wiki-header");
        h1.textContent = "Breed name";
        //div
        const div2 = document.createElement("div");
        div2.setAttribute("class", "wiki-content");
        //p
        const p = document.createElement("p");
        p.setAttribute("class", "wiki-text");
        const text = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/coton_de_tulear');
        const dogText = await text.json();
        p.innerHTML = dogText.extract;
        //div
        const div3 = document.createElement("div");
        div3.setAttribute("class", "img-container");
        //img
        let response = await fetch('https://dog.ceo/api/breed/hound/images/random');
        let dogImage = await response.json();

        const img = document.createElement("img");
        img.setAttribute("class", "wiki-img");
        //img.setAttribute("src", imageJson.message);
        img.src = dogImage.message;

        div3.appendChild(img);
        div2.appendChild(div3);
        div2.appendChild(p);
        div1.appendChild(h1);
        div1.appendChild(div2);

        div.appendChild(div1);
    }

  document.body.appendChild(div);
}

/*
async function getImages(){
  let response = await fetch('https://dog.ceo/api/breed/hound/images/random');
  let dogImage = await response.json();

  //const text = JSON.stringify(dogImage.message);

  const img1 = document.createElement("img");
  img1.setAttribute("class", "wiki-img");
  //img1.setAttribute("src", dogImage.message());
  img1.src = dogImage.message;

  //const container = document.getElementsByClassName("img-container");
  //container.appendChild(img1);
  document.body.append(img1);

  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  await Promise.reject(new Error("Picture not found."));

  return dogImage.message;
}
*/

/*
<div class="wiki-item">  DIV1
  <h1 class="wiki-header">Breed X</h1>
  <div class="wiki-content">    DIV2
     <p class="wiki-text">
       Some text about this breed.
     </p>
     <div class="img-container">    DIV3
       <img class="wiki-img" src="">
     </div>
  </div>
</div>

link for the images randomizer https://dog.ceo/api/breed/hound/images/random
link for the wikipedia https://en.wikipedia.org/api/rest_v1/
*/