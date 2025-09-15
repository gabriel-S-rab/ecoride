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

//nouveau test de fonction
function screenBlock(element){
console.log(`je suis bien entrer dans la condition est ma valeur est ${travelEco.value}`)
                   let carpoolingSearch = document.querySelector(".carpoolingSearchBlock")

              let blockCentral = document.createElement("div")
              blockCentral.setAttribute("class","carpoolingSearch")
        
              let blockContainer1 = document.createElement("div")
              blockContainer1.setAttribute("class","blockContainer1")
        
        
              let blockContainer2 = document.createElement("div")
              blockContainer2.setAttribute("class","blockContainer2")
          
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
              blockCentral.append(blockContainer1,blockContainer2)
              carpoolingSearch.append(blockCentral)
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
        

        if(departure===element.departureCity && destination===element.destination && dateDeparture===element.date){
              
          
          
              let carpoolingSearch = document.querySelector(".carpoolingSearchBlock")

              let blockCentral = document.createElement("div")
              blockCentral.setAttribute("class","carpoolingSearch")
        
              let blockContainer1 = document.createElement("div")
              blockContainer1.setAttribute("class","blockContainer1")
        
        
              let blockContainer2 = document.createElement("div")
              blockContainer2.setAttribute("class","blockContainer2")
          
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
              blockCentral.append(blockContainer1,blockContainer2)
              carpoolingSearch.append(blockCentral)
             
              // test  
               let  parseDepartureHour = parseInt(element.departureHour)
               let  parseFinishHour = parseInt(element.finishHour)
               let travelTime= parseFinishHour-parseDepartureHour
               console.log(travelTime)//temps de voyage
            
              }
             })
              
             //test
             
              const filterInterval = setInterval(() => {
    console.log("oks")
    console.log(path)
                const btnForm = document.querySelector(".btnForm")
                let travelEco = document.getElementById("travelEco")
                let travelPrice = document.getElementById("travelPrice")
                let travelDuration = document.getElementById("travelDuration")
                let driverNotation = document.getElementById("driverNotation")
                let  blockContainer1=document.querySelector(".blockContainer1")
                let  blockContainer2=document.querySelector(".blockContainer2")
                let  blockCentral=document.querySelector(".blockCentral")
                let  carpoolingSearch=document.querySelector(".carpoolingSearchBlock")
                
                console.log(carpoolingSearch)
                //modif condition
                
                if(btnForm!==null && travelEco!==null && travelPrice!==null && travelDuration!==null && driverNotation!==null && carpoolingSearch!==null){
              console.log("ok")
                 clearInterval(filterInterval)
                btnForm.addEventListener("click", () => {
                //test
              let  blockContainer1=document.querySelector(".blockContainer1")
              let  blockContainer2=document.querySelector(".blockContainer2")
              let  blockCentral=document.querySelector(".carpoolingSearch")
              let  carpoolingSearch=document.querySelector(".carpoolingSearchBlock")
              let parseTravelPrice = parseInt(travelPrice.value)

              console.log(blockContainer1)
              console.log(blockContainer2)
              console.log(blockCentral)
              console.log(carpoolingSearch)


                blockContainer1.innerHTML=""
                blockContainer2.innerHTML=""
                blockCentral.innerHTML="" 
                carpoolingSearch.innerHTML=""
                travelEco.selectIndex=0
                console.log(carpoolingSearch)
                console.log(travelEco.value)
                console.log(typeof parseTravelPrice)
                console.log(travelDuration)
                console.log(driverNotation)
                
                utilisateur.forEach(element => {
                  if(travelEco.value==="" && travelPrice.value==="" && travelDuration.value==="" && driverNotation.value===""){
                    screenBlock(element)
                    return
                  }
                  if(element.travelType===travelEco.value && travelPrice.value==="" && travelDuration.value==="" && driverNotation.value===""){
                  //code a tester ici
                  screenBlock(element)
                  return
                  }
                  if(element.price<=parseTravelPrice /*ajouter les autres conditions*/){
                    screenBlock(element)
                    return
                  }
                  
                })
                })
              }},150)
            }
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





  
 
       