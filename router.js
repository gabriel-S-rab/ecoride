function navigate(event,path,url){
  const fullUrl = url+path;
  window.history.pushState({pages : path},"",fullUrl);
}

const routes = {
  "/acceuil" : "/pages/acceuil.php",
  "/covoiturage" : "/pages/covoiturage.php",
  "/presentation" : "/pages/presentation.php",
}

const url = window.location.origin; 
const urlBase = url;
let main = document.querySelector(".main");
console.log(main)
const select = document.getElementById("select")
let newUrl="";
let path="";
let utilisateur =""

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


if(window.location.href===url+'/'){
  path=routes["/presentation"]; 
  afficher(path);
}
  


select.addEventListener("change", async (event) => {
 event.preventDefault();
 const valeur = event.target.value
switch(valeur){
case "/acceuil" : 
  path = routes["/presentation"];
  navigate(event,path,url);
  await afficher(path)
break; 
case "/covoiturage" : 
  path = routes["/covoiturage"];
navigate(event,path,url);
await afficher(path)


if(document.readyState==="complete"){
  console.log(utilisateur)
  utilisateur.forEach(element  => {
    let globalBlock = document.createElement("div")
    globalBlock.setAttribute("class","globalBlock")
    let yzb = document.getElementById("yzb")
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
    yzb.append(globalBlock)
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

/*
    navigate(event,path,url); 
    newUrl = window.location.href;
    if(newUrl===urlBase+path){
         afficher(path);
         }
       */
      }
     )
      



// voir les possibilité avec popstate ou window pour gérer le rechargement (go-1)
window.addEventListener("popstate", (event) => {
  event.preventDefault();
    console.log(path);
  if(event.state!==null){
    let currentpath = event.state.pages;
  afficher(currentpath);
  }else{
    window.location = url;
  }
})



 
       