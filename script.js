let apikey = "7xNyjoiN9JvraQB37IlKKde6eUKUGquU";

let search = "blue"
let topics = ["blue", "green", "yellow"]
for (let i in topics) {
    $(".buttons").append(`<button class = "topic">${topics[i]}</button>`);
}


$("#searchbtn").on("click", function () {
    let sterm = $("#searchinput").val();
    getgifs(sterm);
});

function getgifs(query) {
    if(query != "blue" && query != "green" && query != "yellow"){
        $(".buttons").append(`<button class = "topic">${query}</button>`)
    }

    $(".gifs").html("");
    let apiurl = `https://api.giphy.com/v1/gifs/search?q=${query}&limit=12&api_key=${apikey}`
    $.ajax({
        url: apiurl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (gif in response.data) {
            let thisgif = response.data[gif]
            console.log(thisgif);
            console.log(thisgif.url)

            let img = document.createElement("img");
            img.src = thisgif.images["480w_still"].url;
            img.width = 300;
            img.style.margin = "10px";
            img.setAttribute("gifurl", thisgif.images.original.url);
            img.setAttribute("stillurl", thisgif.images["480w_still"].url)
            img.setAttribute("class", "image")
            img.setAttribute("isMoving", false)
            $(".gifs").append(img);
            // $(".gifs").append(thisgif.url);
        }
    });
}
$(document).on("click",".topic",function(){
    console.log(this.textContent);
    getgifs(this.textContent);
})
$(document).on("click",".image", function(){
    console.log(this.getAttribute("isMoving"));
    this.src = this.getAttribute("gifurl");

    if( "true" == this.getAttribute("isMoving")){
        this.src = this.getAttribute("stillurl");
        console.log("gif is now still")
        this.setAttribute("isMoving", false)
    }
    else if("false" == this.getAttribute("isMoving")){
        this.src = this.getAttribute("gifurl");
        console.log("gif is now moving")
        this.setAttribute("isMoving", true);
    }
})