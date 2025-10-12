function navigate(event,path,url){
  const fullUrl = url+path;
  window.history.pushState({pages : path},"",fullUrl);
}

const routes = { /* voir pour créer une class */
  "/acceuil" : "/pages/acceuil.php",
  "/covoiturage" : "/pages/covoiturage.php",
  "/presentation" : "/pages/presentation.php",
  "/carpoolingSearch": "/pages/carpoolingSearch.php",
   "/detail" : "/pages/detail.php"
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
   const reponse = await fetch("/carpooling-api/index.php")
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

                   let carpoolingSearch = document.querySelector(".carpoolingSearchBlock")

              let blockCentral = document.createElement("div")
              blockCentral.setAttribute("class","carpoolingSearch")
        
              let blockContainer1 = document.createElement("div")
              blockContainer1.setAttribute("class","blockContainer1")
        
        
              let blockContainer2 = document.createElement("div")
              blockContainer2.setAttribute("class","blockContainer2")
          
              let blockDepartureCity = document.createElement("p")
              blockDepartureCity.setAttribute("class","blockDepartureCity")
              blockDepartureCity.textContent ="ville de départ : "+element.lieu_depart
              
              let blockDestination = document.createElement("p")
              blockDestination.setAttribute("class","blockDestination")
              blockDestination.textContent = "ville de destination : "+element.lieu_arrivee
              
              let blockDateDeparture = document.createElement("p")
              blockDateDeparture.setAttribute("class","blockDateDeparture")
              blockDateDeparture.textContent = "date de départ : "+element.date_depart
             
              let blockDepartureHour = document.createElement("p")
              blockDepartureHour.setAttribute("class","blockDepartureHour")
              blockDepartureHour.textContent = "heure de départ : "+element.heure_depart
             
              let blockFinishHour = document.createElement("p")
              blockFinishHour.setAttribute("class","blockFinishHour")
              blockFinishHour.textContent = "heure d'arrivée : "+ element.heure_arrivee
             
              let blockNumberPassenger = document.createElement("p")
              blockNumberPassenger.setAttribute("class","blockNumberPassenger")
              blockNumberPassenger.textContent = "place disponible : "+element.nb_place
             
              let blockPrice = document.createElement("p")
              blockPrice.setAttribute("class","blockPrice")
              blockPrice.textContent = "prix du voyage : "+element.prix_personne+" €"
              
              let blockTravelType = document.createElement("p")
              blockTravelType.setAttribute("class","blockTravelType")
              blockTravelType.textContent = "voyage écologique : "+element.statut
             
              let blockImage = document.createElement("img")
              blockImage.setAttribute("class","blockImage")
              blockImage.setAttribute("src",`${element.photo}`)
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

              detail(btnDetail,element)
}

//function pour gérer au cas ou il n'y a pas d'élement correspondant




function detail(btnDetail,element){
  btnDetail.addEventListener("click", () => {
    path=routes['/detail']
    afficher(path).then( ok => {
    navigate(event,path,url)
    console.log(element)
    // ajouter l'affichage des éléments
    // function asynchrone pour récupérer les avis du conducteur
    // function asynchrone pour récupérer le modéle et la marque du véhicule
    // function asynchrone pour récupérer les préférence des conducteur

    const  carpoolingSearch = document.querySelector(".carpoolingDetailBlock")
    const elementblock = `
                          <P>${element.pseudo}</p>
                          <p>${element.avis}</p>
                          <p>${element.departureCity}</p>
                          <p>${element.departure}</p>
                          <p>${element.date_depart}</p>
                          <p>${element.pseudo}</p>
                          <p>${element.pseudo}</p>
                          <p>${element.pseudo}</p>
                          <p>${element.pseudo}</p>
                          <p>${element.pseudo}</p>
                          <p>${element.pseudo}</p>
                          ` // a compléter
   carpoolingSearch.innerHTML = elementblock
  
  console.log(carpoolingSearch)
  console.log(element.pseudo)

    }) //element .then
  })
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
        alert("Veuillez remplir tout les champs.")
      }else {
      path=routes["/carpoolingSearch"]
      navigate(event,path,url);
      await afficher(path)
      select.selectedIndex=0
      console.log(utilisateur)
      utilisateur.forEach(element => {
        if(departure===element.lieu_depart && destination===element.lieu_arrivee && dateDeparture===element.date_depart){    
          console.log(element)
          screenBlock(element)
              }
             })
              const filterInterval = setInterval(() => {
    
                const btnForm = document.querySelector(".btnForm")
                let travelEco = document.getElementById("travelEco")
                let travelPrice = document.getElementById("travelPrice")
                let travelDuration = document.getElementById("travelDuration")
                let driverNotation = document.getElementById("driverNotation")
                let  carpoolingSearch=document.querySelector(".carpoolingSearchBlock")
                
                console.log(carpoolingSearch)
                //modif condition
                
                if(btnForm!==null && travelEco!==null && travelPrice!==null && travelDuration!==null && driverNotation!==null && carpoolingSearch!==null){
              
                 clearInterval(filterInterval)
                btnForm.addEventListener("click", () => {
                //test
              let  blockContainer1=document.querySelector(".blockContainer1")
              let  blockContainer2=document.querySelector(".blockContainer2")
              let  blockCentral=document.querySelector(".carpoolingSearch")
              let  carpoolingSearch=document.querySelector(".carpoolingSearchBlock")
              let parseTravelPrice = parseInt(travelPrice.value)
              
              
              if(carpoolingSearch.innerHTML!==""){
                blockContainer1.innerHTML=""
                blockContainer2.innerHTML=""
                blockCentral.innerHTML="" 
                carpoolingSearch.innerHTML=""
              }
                travelEco.selectIndex=0
               
                utilisateur.forEach(element => {
                  if(travelEco.value==="" && travelPrice.value==="" && travelDuration.value==="" && driverNotation.value===""){
                    screenBlock(element)  
                  }if(element.statut===travelEco.value && travelPrice.value==="" && travelDuration.value==="" && driverNotation.value===""){
                  screenBlock(element)
                  }if(element.prix_personne<=parseTravelPrice && travelEco.value==="" && travelDuration.value==="" && driverNotation.value===""){
                    screenBlock(element)  
                  }if(element.travelDuration<=travelDuration.value && travelEco.value==="" && driverNotation.value==="" && travelPrice.value===""){
                    screenBlock(element)
                  }if(element.note >= driverNotation.value && travelDuration.value==="" && travelEco.value==="" && travelPrice.value===""){// gérer au cas ou aucune note ne correspond et voir si parse 
                    screenBlock(element)  
                  }if(element.note >= driverNotation.value && element.price<=parseTravelPrice && element.travelDuration<=travelDuration.value && element.travelType===travelEco.value){//gérer au cas ou aucune correspondance est trouvé
                    screenBlock(element)  
                  }if(element.price<=travelPrice.value && element.travelType===travelEco.value && travelDuration.value==="" && driverNotation.value===""){
                    screenBlock(element)
                  }if(element.travelType===travelEco.value && element.travelDuration<=travelDuration.value && travelPrice.value==="" &&  driverNotation.value===""){
                    screenBlock(element)  
                  }if(element.travelType===travelEco.value && element.note>=driverNotation.value && travelDuration.value==="" && travelPrice.value===""){
                    screenBlock(element)
                  }if(element.price<=travelPrice.value && element.travelDuration<=travelDuration.value && travelEco.value==="" && driverNotation.value===""){
                    screenBlock(element)  
                  }if(element.price<=travelPrice.value && element.note>=driverNotation.value && travelDuration.value==="" && travelEco.value===""){
                    screenBlock(element)  
                  }if(element.travelDuration<=travelDuration.value && element.note>=driverNotation.value && travelEco.value==="" && travelPrice.value===""){
                    screenBlock(element)  
                  }if(element.travelType===travelEco.value && element.price<=travelPrice.value && element.travelDuration<=travelDuration.value && driverNotation.value===""){
                    screenBlock(element)
                  }if(element.travelType===travelEco.value && element.price<=travelPrice.value && element.note>=driverNotation.value && travelDuration.value===""){
                    screenBlock(element)
                  }if(element.travelType===travelEco.value && element.travelDuration<=travelDuration.value && element.note>=driverNotation.value && travelPrice.value===""){
                    screenBlock(element)
                  }if(element.Price<=travelPrice.value && element.travelDuration<=travelDuration.value && element.note>=driverNotation.value && travelEco.value===""){
                    screenBlock(element)
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
    blockPrice.textContent = element.prix_personne
    let blockDate = document.createElement("p")
    blockDate.textContent = element.date_depart
    let blockPlace = document.createElement("p")
    blockPlace.textContent= element.nb_place
    let blockDepartureHour = document.createElement("p")
    blockDepartureHour.textContent = element.heure_depart
    let blockFinishHour = document.createElement("p")
    blockFinishHour.textContent = element.heure_arrivee
    let blocktravelType = document.createElement("p")
    blocktravelType.textContent = element.statut
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





  
 
       