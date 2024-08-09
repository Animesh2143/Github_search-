const modeButton= document.querySelector(".mode-btn");
const wrapper= document.querySelector(".wrapper");
const light= document.querySelector(".light");
const dark= document.querySelector(".dark");
const notFound= document.querySelector(".not-found");

let currentMode="light";
light.classList.add("active");
searchGithub("Animesh2143");

modeButton.addEventListener("click", () => {
    changeMode();
});

function changeMode(){
    if(currentMode=="light"){
        currentMode="dark";
        wrapper.classList.add("inverted-colors");
        light.classList.remove("active");
        dark.classList.add("active");
    }
    else{
        currentMode="light";
        wrapper.classList.remove("inverted-colors");
        dark.classList.remove("active");
        light.classList.add("active");
    }
}

const searchButton= document.querySelector(".search-btn");
const searchFeild= document.querySelector(".search-feild");
const searchBar= document.querySelector(".search-bar");

searchBar.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(searchFeild.value==""){
        return;
    }
    else{
        searchGithub(searchFeild.value);
    }
})



async function searchGithub(naam){
    try{
        const response= await fetch(`https://api.github.com/users/${naam}`);
        const data = await response.json();
        
        if(data?.message == "Not Found"){
            throw new Error("Error");
        }

        renderInfo(data);
    }
    catch(err){
        notFound.classList.add("active");
        setTimeout(() => {
            notFound.classList.remove("active");
        }, 3000);
    }
}

function renderInfo(data){
    let photu= document.querySelector(".photu");
    let pName= document.querySelector(".name");
    let userName= document.querySelector(".user-id");
    let doj =document.querySelector(".date-of-join");
    let bio= document.querySelector(".bio");
    let repo= document.querySelector("#rep");
    let follower= document.querySelector("#follower");
    let following= document.querySelector("#following");
    let location= document.querySelector("#location");
    let link= document.querySelector("#link");
    let twitter= document.querySelector("#twitter");
    let organistaion= document.querySelector("#organisation");

    photu.src= data?.avatar_url ;
    pName.innerText = data?.name ;
    userName.innerText = data?.login ;
    userName.href = data?.html_url;
    bio.innerText= data?.bio ;
    repo.innerText= data?.public_repos;
    follower.innerText= data?.followers;
    following.innerText= data?.following;
    location.innerText= data?.location;
    link.innerText= data?.email;
    twitter.innerText= data?.twitter_username;
    organistaion.innerText= data?.company;


    const isoDate = `${data?.created_at}`;
    const formattedDate = convertDateFormat(isoDate);
    doj.innerText= `Joined ${formattedDate}`;


    if(data?.bio == null){
        bio.innerText= "This profile has no Bio.";
    }
    if(data?.location == null){
        location.innerText= "Not Available";
    }
    if(data?.email == null){
        link.innerText= "Not Available";
    }
    if(data?.twitter_username == null){
        twitter.innerText= "Not Available";
    }
    if(data?.company == null){
        organistaion.innerText= "Not Available";
    }
}



function convertDateFormat(isoDate) {
    const date = new Date(isoDate);
  
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  }

  