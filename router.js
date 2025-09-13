function navigate(event,path,url){
  const fullUrl = url+path;
  window.history.pushState({pages : path},"",fullUrl);
}

const routes = {
  "/acceuil" : "/pages/acceuil.php",
  "/covoiturage" : "/pages/covoiturage.php",
  "/presentation" : "/pages/presentation.php",
  "/carpoolingSearch": "/pages/carpoolingSearch.php"
}

const url = window.location.origin; 
const urlBase = url;
let main = document.querySelector(".main");
console.log(main)
const select = document.getElementById("select")
let newUrl="";
let path="";
let utilisateur =""
let valeur = "";



async function recovery(){
  const reponse = await fetch("/pages/test.json",{cache : "no-store"}) 
   utilisateur = await reponse.json().then(Response => {
  console.log("ok") 
 console.log(Response)
 return utilisateur =  Response
 })
}

recovery()



async function afficher(a){
const reponse = await fetch(a)
const repAffich = await reponse.text(); 
main.innerHTML = repAffich;
}


async function btnSearch(){
  return new Promise((resolve) => {
   const interval = setInterval(() => {
   const btnSubmit = document.querySelector(".btnSubmit")
   console.log(btnSubmit)
   if(btnSubmit){
    clearInterval(interval)
   // resolve(btnSubmit)
   
    btnSubmit.addEventListener("click", async (event) => { 
      event.preventDefault()
     // valeur=0?? gestion probléme retour a l'accueil
      let departure = document.querySelector(".departure").value; console.log(departure)
      let destination = document.querySelector(".destination").value; console.log(destination)
      let dateDeparture = document.querySelector(".dateDeparture").value; console.log(dateDeparture)
      let numberPassenger = document.querySelector(".numberPassenger").value; console.log(numberPassenger)
      path=routes["/carpoolingSearch"]
      navigate(event,path,url);
      await afficher(path)
      select.selectedIndex=0
      utilisateur.forEach(element => {
        let blockContainer1 = document.createElement("div")
        blockContainer1.setAttribute("class","blockContainer")
        let blockContainer2 = document.createElement("div")
        const carpoolingSearch = document.querySelector(".carpoolingSearch")
        if(departure===element.departureCity && destination===element.destination && dateDeparture===element.date && numberPassenger==element.place){
              let blockDepartureCity = document.createElement("p")
              blockDepartureCity.setAttribute("class","blockDepartureCity")
              blockDepartureCity.textContent ="ville de départ : "+element.departureCity
              let blockDestination = document.createElement("p")
              blockDestination.setAttribute("class","blockDestination")
              blockDestination.textContent = "ville de destination : "+element.destination
              let blockDateDeparture = document.createElement("p")
              blockDateDeparture.setAttribute("class","blockDateDeparture")
              blockDateDeparture.textContent = "date de départ : "+element.date
              let blockNumberPassenger = document.createElement("p")
              blockNumberPassenger.setAttribute("class","blockNumberPassenger")
              blockNumberPassenger.textContent = "place disponible : "+element.place
              let blockImage = document.createElement("img")
              blockImage.setAttribute("class","blockImage")
              blockImage.setAttribute("src",`${element.profilImage}`)
              blockImage.setAttribute("height","200px")
              blockImage.setAttribute("width","150px")
              blockContainer1.append(blockDepartureCity,blockDestination,blockDateDeparture,blockNumberPassenger,blockImage)
              blockContainer2.append()
              carpoolingSearch.append(blockContainer1)
           }else{

           }
           
        });  
      });  
    }
  }, 150);
})};
  






if(window.location.href===url+'/'){
  path=routes["/presentation"]; 
  afficher(path);
}
  



select.addEventListener("change", async (event) => {
 event.preventDefault();
 valeur = event.target.value
 select.selectedIndex=0
switch(valeur){
case "/acceuil" : 
  path = routes["/presentation"];
  navigate(event,path,url);
  await afficher(path)
  btnSearch()
  
break; 
case "/covoiturage" : 
  path = routes["/covoiturage"];
navigate(event,path,url);
await afficher(path)


if(document.readyState==="complete"){
  utilisateur.forEach(element  => {
    let globalBlock = document.createElement("div")
    globalBlock.setAttribute("class","globalBlock")
    let carpoolingGlobal = document.getElementById("carpoolingGlobal")
    let blockNote = document.createElement("p")
    blockNote.textContent = element.note
    let blockPseudo = document.createElement("p")
    blockPseudo.textContent = element.pseudo
    let blockPrice = document.createElement("p")
    blockPrice.textContent = element.price 
    let blockDate = document.createElement("p")
    blockDate.textContent = element.date
    let blockPlace = document.createElement("p")
    blockPlace.textContent= element.place
    let blockDepartureHour = document.createElement("p")
    blockDepartureHour.textContent = element.departureHour
    let blockFinishHour = document.createElement("p")
    blockFinishHour.textContent = element.finishHour
    let blocktravelType = document.createElement("p")
    blocktravelType.textContent = element.travelType
    globalBlock.append(blockPseudo)
    globalBlock.append(blockNote)
    globalBlock.append(blockPlace)
    globalBlock.append(blockPrice)
    globalBlock.append(blockDate)
    globalBlock.append(blockDepartureHour)
    globalBlock.append(blockFinishHour)
    globalBlock.append(blocktravelType)
    carpoolingGlobal.append(globalBlock)
  })
}

break; 
case "/connexion" : 
  // a implémenter
break; 
case "value4" : 
  // a implémenter 
break; 
default : 
  console.log("pas de valeur entré"); 
  // a implémenter
break;
 }
 })
      



// voir les possibilité avec popstate ou window pour gérer le rechargement (go-1)
window.addEventListener("popstate", (event) => {
  event.preventDefault();
      if(event.state!==null){
    let currentpath = event.state.pages;
  afficher(currentpath);
  }else{
    window.location = url;
  }
})


if(window.location.href==="http://localhost/"){
btnSearch()
valeur = "";
}





  
 
       