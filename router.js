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
const select = document.getElementById("select")
let newUrl="";
let path="";
let utilisateur =""
let valeur = "";
let erreur; 



async function recovery(){
   const reponse = await fetch("/pages/test.json",{cache : "no-store"}) 
   utilisateur = await reponse.json().then(Response => {
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
   if(btnSubmit){
    clearInterval(interval)
   resolve(btnSubmit) // attention 
   
    btnSubmit.addEventListener("click", async (event) => { 
      event.preventDefault()
     
      let departure = document.querySelector(".departure").value; 
      let destination = document.querySelector(".destination").value; 
      let dateDeparture = document.querySelector(".dateDeparture").value;
      if(departure==="" || destination==="" || dateDeparture===""){
        console.log("erreur")  //implémenter un élément pour gérer des champs vide ou mal rempli
      }else {
      path=routes["/carpoolingSearch"]
      navigate(event,path,url);
      await afficher(path)
      select.selectedIndex=0
      utilisateur.forEach(element => {
        
        let blockContainer1 = document.createElement("div")
        blockContainer1.setAttribute("class","blockContainer1")
        
        
      let blockContainer2 = document.createElement("div")
        blockContainer2.setAttribute("class","blockContainer2")
        const carpoolingSearch = document.querySelector(".carpoolingSearch")
        if(departure===element.departureCity && destination===element.destination && dateDeparture===element.date){
              let blockDepartureCity = document.createElement("p")
              blockDepartureCity.setAttribute("class","blockDepartureCity")
              blockDepartureCity.textContent ="ville de départ : "+element.departureCity
              
              let blockDestination = document.createElement("p")
              blockDestination.setAttribute("class","blockDestination")
              blockDestination.textContent = "ville de destination : "+element.destination
              
              let blockDateDeparture = document.createElement("p")
              blockDateDeparture.setAttribute("class","blockDateDeparture")
              blockDateDeparture.textContent = "date de départ : "+element.date
             
              let blockDepartureHour = document.createElement("p")
              blockDepartureHour.setAttribute("class","blockDepartureHour")
              blockDepartureHour.textContent = "heure de départ : "+element.departureHour
             
              let blockFinishHour = document.createElement("p")
              blockFinishHour.setAttribute("class","blockFinishHour")
              blockFinishHour.textContent = "heure d'arrivée : "+ element.finishHour
             
              let blockNumberPassenger = document.createElement("p")
              blockNumberPassenger.setAttribute("class","blockNumberPassenger")
              blockNumberPassenger.textContent = "place disponible : "+element.place
             
              let blockPrice = document.createElement("p")
              blockPrice.setAttribute("class","blockPrice")
              blockPrice.textContent = "prix du voyage : "+element.price+" €"
              
              let blockTravelType = document.createElement("p")
              blockTravelType.setAttribute("class","blockTravelType")
              blockTravelType.textContent = "voyage écologique : "+element.travelType
             
              let blockImage = document.createElement("img")
              blockImage.setAttribute("class","blockImage")
              blockImage.setAttribute("src",`${element.profilImage}`)
              blockImage.setAttribute("height","100px")
              blockImage.setAttribute("width","100px")
             
             
              let blockPseudo = document.createElement("p")
              blockPseudo.setAttribute("class","blockPseudo")
              blockPseudo.textContent = "pseudo : "+element.pseudo
              
              let blockNote = document.createElement("blockNote")
              blockNote.setAttribute("class","blockNote")
              blockNote.textContent = "note du chauffeur : "+element.note

              let btnDetail = document.createElement("button")
              btnDetail.setAttribute("class","btnDetail")
              btnDetail.textContent = "détail"

              blockContainer1.append(blockDepartureCity,blockDestination,blockDateDeparture,blockDepartureHour,blockFinishHour,blockNumberPassenger,blockPrice,blockTravelType,btnDetail)
              blockContainer2.append(blockPseudo,blockNote,blockImage)
              carpoolingSearch.append(blockContainer1,blockContainer2)
              }
             })}
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





  
 
       