var searchInput = document.getElementById("search");
var suggestionBox = document.querySelector(".suggestion");
let movieContainer=document.querySelector(".movie-container");
let fav=document.querySelector(".btnf");
let mainp=document.querySelector(".main");
let searchContainer=document.querySelector(".search-container");
var favContainer;

const apiKey = "a23e21b3";
var favorite=[];
function display(movies){
    movieContainer.innerHTML="";
    movieContainer.classList.remove("hide"); 
    movies.forEach(element => {
        var poster=document.createElement("div");
        var image=document.createElement("img");
        var add=document.createElement("button");
        add.innerText="Add to Favorite";
        add.id="fav-btn";
        add.setAttribute("data-info", JSON.stringify({ title: element.Title, poster: element.Poster }));
        image.classList.add("img");
        image.src=element.Poster;
        poster.appendChild(image);
         poster.appendChild(add);
        movieContainer.appendChild(poster);
        movieContainer.classList.add("movie-container");
        poster.classList.add("poster");
        add.addEventListener("click",function(){
            console.log(this);
            const movieTitle =JSON.parse(this.getAttribute("data-info"));
            favorite.push(movieTitle);
            console.log(favorite)
        })

        
    });
}
function displayFav(movies){

    
    movies.forEach(element => {
        
        favContainer=document.createElement("div");
        var poster=document.createElement("div");
        var image=document.createElement("img");
        var remove=document.createElement("button");
        remove.innerText="Remove";
        //remove.setAttribute("data-title", element.Title);
        image.classList.add("img");
        image.src=element.poster;
        poster.appendChild(image);
         poster.appendChild(remove);
        favContainer.appendChild(poster);
        mainp.appendChild(favContainer);
        favContainer.classList.add("fav-container");
        poster.classList.add("poster");
        remove.addEventListener("click",function(){
            console.log(this);
            
            const movieTitle = this.getAttribute("data-title");
            favorite.pop(movieTitle);
            console.log(favorite)
        })

        
    });
}

fav.addEventListener("click",function(){
    var back=document.createElement("button");
    back.innerText="Back";
    mainp.appendChild(back);
    back.addEventListener("click",function(){
        searchContainer.classList.remove("hide");
        suggestionBox.classList.remove("hide");
        movieContainer.classList.remove("hide");
        back.classList.add("hide");
        document.querySelectorAll(".fav-container").forEach(function(element) {
            element.classList.add("hide");
        });
        
    })
    searchContainer.classList.add("hide");
    suggestionBox.classList.add("hide");
    movieContainer.classList.add("hide");
    displayFav(favorite);
    
});
async function loadFirst() {
    const movieList = [
        "The Shawshank Redemption",
        "The Godfather",
        "The Dark Knight",
        "Pulp Fiction",
        "Forrest Gump",
        "Inception",
        "Fight Club",
        "The Matrix",
        "The Lord of the Rings: The Return of the King",
        "Interstellar",
        "Gladiator",
        "The Prestige",
        "Titanic",
        "Saving Private Ryan",
        "The Green Mile",
        "Avengers: Endgame",
        "The Lion King",
        "Whiplash",
        "Se7en",
        "The Silence of the Lambs"
    ];
    var random=Math.floor(Math.random()*20);
    const res= await fetch(`http://www.omdbapi.com/?&apikey=${apiKey}&s=${movieList[random]}`);
    const data=await res.json();
    
   
    display(data.Search);
    

}
loadFirst();
async function suggestion(query){
    
    const res= await fetch(`http://www.omdbapi.com/?&apikey=${apiKey}&s=${query}`);
    const data=await res.json();
    suggestionBox.innerHTML = ""; 
    if(data.Search){
        data.Search.forEach(a =>{
            const div=document.createElement("div");
            div.innerText=`${a.Title}`;
            div.classList.add("bc");
            suggestionBox.appendChild
            (div);
            div.addEventListener("click",function(){
                console.log(this);
                 searchInput.value=this.innerText;
                 search(searchInput.value);

               
                
               
               
               
    suggestionBox.classList.add("hide");

    
            })
        });
        
       

    }else{
        const div=document.createElement("div");
        div.innerText="No result";
        div.classList.add("bc");
        suggestionBox.appendChild(div);

    
    }

}

async function search(query){
    const res= await fetch(`http://www.omdbapi.com/?&apikey=${apiKey}&s=${query}`);
    const data=await res.json();
    console.log(data.Search)
   
    display(data.Search);
    
    
    
    

}
searchInput.addEventListener("input",function(){
    var movie=searchInput.value;
    
    suggestionBox.classList.remove("hide");
    movieContainer.classList.add("hide");
    
    if (movie.length > 2) {  
        suggestion(movie);
        
        
    }
    else{
        suggestionBox.innerHTML = ""; 
    }



});


