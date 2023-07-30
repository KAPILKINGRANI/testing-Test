/*
NEWS API FETCHES NEWS WHICH ARE MONTH OLD (THIS VERSION WHICH WE ARE USING I.E FREE VERSION)
NEWS API ALLOWS TO HANDLE 100 REQUEST PER DAY(FREE VERSION)
*/
//news catcher ka description ki sirf 30 days allow fir api key change
//news catcher mai monthly 50 calls hi allowed hai toh api change
//free version api mai problems hai news api local host pe chal sakti
const url = "https://api.newscatcherapi.com/v2/search?q="
// const cardsContainer = document.querySelector(".container");
//as soon as the window loads the fetch news function must be called
window.addEventListener("load",() => fetchNews("sports"));
const errContainer = document.querySelector(".errorContainer");
const cardsContainer = document.querySelector(".container");
async function fetchNews(query) {
    //the format in fetch is written as per newsAPI website docs
    //fetch returns promise therfore we are using await so that until result 
    //is not fetched no further action should occured
    const result = await fetch(`${url}${query}`,{
        headers:{
            'x-api-key': 'bWLQ5eZDXXqEWKORIjLbZFBXB9lNSgsPWH9GBw1N29c'
        } 
    });
    const data =   await result.json();
    console.log(data);
    try {
        if(data.total_pages!=0) {
            bindData(data.articles);
        }
        else {
            throw new Error("failed");
        }
    }
    catch(error) {
        displayErrorMsg("Something Went Wrong");
    }
    // console.log(data);
    //bind the data in our cards
    // console.log(data.articles);
    // if(data.totalResults===0) {
    //     alert("hello");
    //    const div = document.createElement("div");
    //    div.classList.add("text-center");
    //    div.innerHTML = "I guess something went wrong";
    //    cardsContainer.append(div);
    // }
    // else {
    //     bindData(data.articles);
    // }
  
}
function displayErrorMsg(msg) {
    cardsContainer.innerHTML ="";
    cardsContainer.innerHTML = 
    `<img src="noResultFound.png" class="img-fluid" alt="Not found image">`
}
function bindData(articles) {
    cardsContainer.classList.remove("invisible");
    const template = document.querySelector(".newsTemplateDiv");
   
    //to avoid overlapping of data
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.media) {
            return;
        }
        else {
            const cardClone = document.createElement("div");
            cardClone.innerHTML = 
            ` <div class="card newsTemplateDiv wow animate__bounceIn" style="width: 20rem; height:min-content   ;">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">News Title</h4>
                <p class="card-text">News Description</p>
                <a href=""target=_blank class="btn btn-primary">Read More</a>
            </div>`
            // const cardClone = template.cloneNode(true);
            // console.log(cardClone);
            cardsContainer.append(cardClone);
            // cardClone.classList.remove("invisible");
            fillDataInCard(cardClone,article);
            cardsContainer.appendChild(cardClone);
        }
       
    })
    console.log(cardsContainer);
}
function fillDataInCard(cardClone,article) {
    const newsImg = cardClone.querySelector(".card-img-top");
    const newsTitle = cardClone.querySelector(".card-title");
    const readMore = cardClone.querySelector(".btn");
    const newsDescription = cardClone.querySelector(".card-text");
    
    const date = new Date(article.published_date).toDateString()
    newsImg.src = article.media;
    newsTitle.innerHTML = article.title+"|"+date;
    readMore.href = article.link;
    newsDescription.innerHTML = article.summary;

    cardClone.addEventListener("click", () => {
        window.open(article.link,"_blank");
    })

}
const sportsBtn = document.getElementById("sports");
const technologyBtn = document.getElementById("technology");
const financeBtn = document.getElementById("finance");
const stockMarketBtn = document.getElementById("stockMarket");
const politicsBtn = document.getElementById("politics");
const entertainmentBtn = document.getElementById("entertainment");

sportsBtn.addEventListener("click",() => {onNavItemClick("sports")});
technologyBtn.addEventListener("click",() => {onNavItemClick("technology")});
financeBtn.addEventListener("click",() => {onNavItemClick("finance")});
stockMarketBtn.addEventListener("click",() => {onNavItemClick("stockMarket")});
politicsBtn.addEventListener("click",() => {onNavItemClick("politics")});
entertainmentBtn.addEventListener("click",() => {onNavItemClick("entertainment")});

let currentSelectedNav = null;
function onNavItemClick(id) {
    //to make sure there is something in input field
    if(!id == "") {
        fetchNews(id);
        const navItem = document.getElementById(id);
        currentSelectedNav?.classList.remove("link-primary");
        currentSelectedNav = navItem;
        currentSelectedNav.classList.add("link-primary");
    }
  
}
let searchF = document.getElementById("searchField");
let searchB = document.getElementById("searchBtn");

searchB.addEventListener("click",()=>{onNavItemClick(searchF.value)})
searchB.addEventListener("keypress",function(e) {
if(e.key === "Enter") {
         e.preventDefault();
         onNavItemClick(searchF.value);
    }
})



        

   
