function navigate(event,path,url){
  const fullUrl = url+path;
  window.history.pushState({pages : path},"",fullUrl);
}

const routes = { /* voir pour créer une class */
  "/acceuil" : "/pages/acceuil.php",
  "/covoiturage" : "/pages/covoiturage.php",
  "/presentation" : "/pages/presentation.php",
  "/carpoolingSearch": "/pages/carpoolingSearch.php",
   "/detail" : "/pages/detail.php", 
   "/connexion" : "/pages/connexion.php", 
   "/inscription" : "/pages/inscription.php",
   "/inscriptionVehicule" : "/pages/inscriptionVehicule.php",
   "/monProfil" : "/pages/monProfil.php", 
   "/changementVehicule" : "/pages/modifVehicule.php"
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
  const filter = new FormData()
  filter.append("data","globalFetch")
   const reponse = await fetch("/carpooling-api/index.php",{
   method : "POST",
   body : filter
   })
   utilisateur = await reponse.json().then(Response => {
    console.log(utilisateur)
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
function gestionAffichage(){
  if(sessionStorage.getItem("id")!== null){
  let inscription = document.querySelector(".inscription")
  let connexion = document.querySelector(".connexion")
  let monProfil = document.querySelector(".monProfil")
  let deconnexion = document.querySelector(".deconnexion")
  inscription.setAttribute("hidden","")
  connexion.setAttribute("hidden","")
  monProfil.removeAttribute("hidden")
  deconnexion.removeAttribute("hidden")
}
}
gestionAffichage()



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
                          <p>${element.lieu_depart}</p>
                          <p>${element.lieu_arrivee}</p>
                          <p>${element.date_depart}</p>
                          <p>${element.date_arrive}</p>
                          <p>${element.nb_place}</p>
                          <p>${element.prix_personne}</p>
                          <p>${element.statut}</p>
                          <p>${element.photo}</p>
                          <p>${element.note}</p>
                          <p>${element.commentaire}</p>
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
  
console.log(utilisateur)


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
path = routes["/connexion"]
navigate(event,path,url)
afficher(path)
let btnInterval = setInterval(() => {
let btnFormConnexion = document.querySelector(".btnFormConnexion")
if(btnFormConnexion!== null){
  clearInterval(btnInterval)
btnFormConnexion.addEventListener("click", async () => {
  let identifiant = document.querySelector(".identifiant").value
  let mdp = document.querySelector(".mdp").value
  const formdata = new FormData()
  formdata.append("data","connexion")
  formdata.append("identifiant",identifiant)
  formdata.append("mdp",mdp)
  console.log(formdata)
  const response = await fetch("/carpooling-api/index.php", 
    {
      method:"POST", 
      body : formdata
    }
  )
 console.log("ok")
 let control = await response.json()
  console.log(control)
 if(control.test==="ok connexion"){
  console.log("ok")
  console.log(control.id)
  if(control.id){
  sessionStorage.setItem("id",`${control.id}`)
   path=routes["/presentation"]
  navigate(event,path,url)
  afficher(path)
  alert("vous étes bien connecté !")
  let inscription = document.querySelector(".inscription")
  let connexion = document.querySelector(".connexion")
  inscription.setAttribute("hidden","")
  connexion.setAttribute("hidden","")
  gestionAffichage() 
  console.log(inscription)
  console.log(connexion)
 
  }
 }
 
  })}
},150)

  // a implémenter
break; 
case "/inscription" : 
path = routes["/inscription"]
navigate(event,path,url)
await afficher(path)
let interval = setInterval(()=>{
let prenom =  document.querySelector(".prenom")
let nom = document.querySelector(".nom")
let dateNaissance = document.querySelector(".dateNaissance")
let adresse = document.querySelector(".adresse")
let tel = document.querySelector(".tel")
let btnInscription = document.querySelector(".btnInscription")
let profilType = document.querySelector(".profilType")
let pseudo = document.querySelector(".pseudo")
let email = document.querySelector(".email") 
let mdp = document.querySelector(".inputmdp")
if(btnInscription){
  clearInterval(interval)
btnInscription.addEventListener('click', async () => {
  console.log(prenom.value,nom.value,dateNaissance.value,adresse.value,tel.value,profilType)
  const formData = new FormData()
  formData.append("data","inscription")
  formData.append("prenom",prenom.value)
  formData.append("nom",nom.value)
  formData.append("dateNaissance",dateNaissance.value)
  formData.append("adresse",adresse.value)
  formData.append("tel",tel.value)
  formData.append("pseudo",pseudo.value)
  formData.append("email",email.value)
  formData.append("mdp",mdp.value)
  formData.append("profilType",profilType.value)
  const response = await fetch("/carpooling-api/index.php", 
    {
    method : "POST", 
    body : formData
    })
     let control = await response.json() 
     if(control.id){
      console.log(control.id)
    //  sessionStorage.setItem("id",id)
     }
     
   if(profilType.value==="Covoitureur"){
     path=routes["/inscriptionVehicule"]
     navigate(event,path,url)
     afficher(path)
     const interval = setInterval( () => { 
     const marque = document.querySelector(".marque")
     const modele = document.querySelector(".modele")
     const dateMiseEnCirculation = document.querySelector(".dateMiseEnCirculation")
     const couleur = document.querySelector(".couleur")
     const immatriculation = document.querySelector(".immatriculation")
     const typeVehicule = document.querySelector(".typeVehicule")
     const btnInscription = document.querySelector(".btnInscription")
     if(btnInscription){
      console.log(marque,modele,dateMiseEnCirculation,couleur,immatriculation,typeVehicule,btnInscription)
      clearInterval(interval)
      btnInscription.addEventListener("click",async () => {
        const formData = new FormData()
        formData.append("data","inscriptionVehicule") 
        let id = control.id
        formData.append("id",id)
        formData.append("marque",marque.value)
        formData.append("modele",modele.value)
        formData.append("datemiseencirculation",dateMiseEnCirculation.value)
        formData.append("couleur",couleur.value)
        formData.append("immatriculation",immatriculation.value)
        formData.append("typeVehicule",typeVehicule.value)
        const response = await fetch("/carpooling-api/index.php",
          {
            method : "POST",
            body : formData
          })
          const confirm = await response.json() 
          if(confirm.confirmVehicule==="confirmok"){
            console.log("l'opération a réussi")
            alert("vous étes bien inscrit !")
            path=routes["/presentation"]
            navigate(event,path,url)
            afficher(path)
          }
      })
     }
     },100)
   }if(profilType.value==="Utilisateur") {
     if(control.inscription==="ok"){
    alert("inscription réussie ! vous pouvez vous connecter.")
   // location.replace("http://localhost/")
   navigate(event,path,url,)
   path = routes["/presentation"]
   afficher(path)
  }
  }
  })
}
},100)

  
  // a implémenter 
break; 
case "/monProfil" : 
path=routes["/monProfil"]
navigate(event,path,url)
afficher(path)
const id = sessionStorage.getItem("id")
const formData = new FormData()
formData.append("data","myProfil")
formData.append("id",id)
const response = await fetch("/carpooling-api/index.php", 
  {
    method : "POST",
    body : formData
  }
)
const infoProfil = await response.json()
if(infoProfil){
  // récupérer le id via session.storage
  const interval = setInterval(()=> {
    const element = document.querySelector(".element")
    if(element){
      console.log(element)
      clearInterval(interval)
      console.log(infoProfil)
  const email = infoProfil.email 
  const nom = infoProfil.nom 
  const prenom = infoProfil.prenom 
  const dateNaissance = infoProfil.date_naissance
  const adresse = infoProfil.adresse 
  const tel = infoProfil.telephone
  const pseudo = infoProfil.pseudo
  console.log(email,nom,prenom,dateNaissance,adresse,tel)
  // affichage pseudo
const pseudoProfil = document.createElement("p")
pseudoProfil.setAttribute("class","pseudo") 
pseudoProfil.textContent = `votre pseudo : ${pseudo}`
const modifPseudo = document.createElement("input")
modifPseudo.setAttribute("type","text")
modifPseudo.setAttribute("placeholder","modifier votre pseudo")
const btnModifPseudo = document.createElement("button")
btnModifPseudo.setAttribute("type","button")
btnModifPseudo.setAttribute("class","btnModifPseudo")
btnModifPseudo.textContent = "modifier"
element.append(pseudoProfil,modifPseudo,btnModifPseudo)
// affichage nom
const nomProfil = document.createElement("p")
nomProfil.textContent = `votre nom : ${nom}`
nomProfil.setAttribute("class","nom") 
const modifNom = document.createElement("input")
modifNom.setAttribute("type","text") 
modifNom.setAttribute("placeholder","modifier votre nom")
const btnModifNom = document.createElement("button")
btnModifNom.setAttribute("type","button")
btnModifNom.textContent = "modifier" 
element.append(nomProfil,modifNom,btnModifNom)
// affichage prenom
const prenomProfil = document.createElement("p")
prenomProfil.textContent = `votre prenom : ${prenom}`
prenomProfil.setAttribute("class","prenom") 
const modifPrenom = document.createElement("input")
modifPrenom.setAttribute("type","text") 
modifPrenom.setAttribute("placeholder","modifier votre prenom")
const btnModifprenom = document.createElement("button")
btnModifprenom.setAttribute("type","button")
btnModifprenom.textContent = "modifier" 
element.append(prenomProfil,modifPrenom,btnModifprenom)
// affichage de l'email
const emailProfil = document.createElement("p")
emailProfil.textContent = `votre email : ${email}`
emailProfil.setAttribute("class","email") 
const modifemail = document.createElement("input")
modifemail.setAttribute("type","text") 
modifemail.setAttribute("placeholder","modifier votre email")
const btnModifemail = document.createElement("button")
btnModifemail.setAttribute("type","button")
btnModifemail.textContent = "modifier" 
element.append(emailProfil,modifemail,btnModifemail)
// affichage adresse  
const adresseProfil = document.createElement("p")
adresseProfil.textContent = `votre adresse : ${adresse}`
adresseProfil.setAttribute("class","adresse") 
const modifadresse = document.createElement("input")
modifadresse.setAttribute("type","text") 
modifadresse.setAttribute("placeholder","modifier votre adresse")
const btnModifadresse = document.createElement("button")
btnModifadresse.setAttribute("type","button")
btnModifadresse.textContent = "modifier" 
element.append(adresseProfil,modifadresse,btnModifadresse)
// affichage telephone
const telProfil = document.createElement("p")
telProfil.textContent = `votre numéro de téléphone : ${tel}`
telProfil.setAttribute("class","telephone") 
const modiftel = document.createElement("input")
modiftel.setAttribute("type","text") 
modiftel.setAttribute("placeholder","modifier votre numéro de téléphone")
const btnModiftel = document.createElement("button")
btnModiftel.setAttribute("type","button")
btnModiftel.textContent = "modifier" 
element.append(telProfil,modiftel,btnModiftel)
// mot de passe 
const labelMdp = document.createElement("p")
labelMdp.textContent = "changer votre mot de passe :"
const mdp = document.createElement("input")
mdp.setAttribute("class","mdp")
mdp.setAttribute("type","text")
mdp.setAttribute("placeholder","entrez votre nouveau mot de passe")
const confirmMdp = document.createElement("input")
confirmMdp.setAttribute("class","confirmMdp")
confirmMdp.setAttribute("type","text")
confirmMdp.setAttribute("placeholder","entrez a nouveau votre mot de passe")
const btnValidatemdp = document.createElement("button")
btnValidatemdp.setAttribute("class","btnValidateMdp")
btnValidatemdp.setAttribute("type","button")
btnValidatemdp.textContent = "modifier"
element.append(labelMdp,mdp,confirmMdp,btnValidatemdp)
// ajout bouton pour changement véhicule 
const btnChangementVehicule = document.createElement("button")
btnChangementVehicule.setAttribute("class","btnChangementVehicule")
btnChangementVehicule.setAttribute("type","button") 
btnChangementVehicule.textContent = "modifier le véhicule" 
const affich = document.querySelector(".affich")
affich.append(btnChangementVehicule)
if(infoProfil.role!=="covoitureur"){
  btnChangementVehicule.setAttribute("hidden","")
}
btnModifPseudo.addEventListener("click", async () => {
  console.log(modifPseudo.value)
  const changePseudo = new FormData()
  let nouveauPseudo = modifPseudo.value
  let id = sessionStorage.getItem("id")
  changePseudo.append("data","changementPseudo")
  changePseudo.append("newPseudo",nouveauPseudo)
  changePseudo.append("id",id)
  const envoiNouveauPseudo = await fetch("/carpooling-api/index.php",
    {
      method : "POST", 
      body : changePseudo
    }
  )
  const responseEnvoiNouveauPseudo = await envoiNouveauPseudo.json()
  if(responseEnvoiNouveauPseudo.changementPseudo==="ok"){
    alert("le pseudo a bien était changer")
  }
})

btnModifNom.addEventListener("click", async () => {  // test avec selection direct de l'élément créer
  console.log(modifNom.value)
  const changeNom = new FormData()
  let nouveauNom = modifNom.value
  let id = sessionStorage.getItem("id")
  changeNom.append("data","changeNom")
  changeNom.append("newNom",nouveauNom)
  changeNom.append("id",id)
  const envoiNouveauNom = await fetch("/carpooling-api/index.php",{
    method : "POST",
    body : changeNom
  })
  const responseEnvoiNom = await envoiNouveauNom.json()
  if(responseEnvoiNom.confirmNewNom==="ok"){
    alert("le nom a bien été changer !")
  }
})
btnModifprenom.addEventListener("click", async () => {
  console.log(modifPrenom.value)
 const changePrenom = new FormData()
 let nouveauPrenom = modifPrenom.value
 let id = sessionStorage.getItem("id")
 console.log(id)
  changePrenom.append("data","changePrenom")
  changePrenom.append("changePrenom",nouveauPrenom)
  changePrenom.append("id",id)
  const envoiNouveauPrenom = await fetch("/carpooling-api/index.php",
    {
      method : "POST", 
      body : changePrenom
    }
  )
  const reponseEnvoiNouveauPrenom = await envoiNouveauPrenom.json()
  if(reponseEnvoiNouveauPrenom.confirmNewPrenom ==="ok"){
    alert("le prenom a bien était changé !")
  }
})
btnModifemail.addEventListener("click", async () => {
  console.log(modifemail.value)
  const changeEmail = new FormData()
  let nouveauEmail = modifemail.value 
  let id = sessionStorage.getItem("id")
  changeEmail.append("data","changeEmail")
  changeEmail.append("newEmail",nouveauEmail)
  changeEmail.append("id",id)
  const envoiNouveauEmail = await fetch("/carpooling-api/index.php",
    {
      method : "POST", 
      body : changeEmail
    }) 
const responseEnvoiNouveauEmail = await envoiNouveauEmail.json()
if(responseEnvoiNouveauEmail.confirmNewEmail==="ok"){
  alert("l'email a bien était changé !")
}
})
btnModifadresse.addEventListener("click", async () => {
  console.log(modifadresse.value)
  const  changeAdresse = new FormData()
  let nouvelleAdresse = modifadresse.value 
  let id = sessionStorage.getItem("id")
  changeAdresse.append("data","changeAdresse")
  changeAdresse.append("newAdresse",nouvelleAdresse)
  changeAdresse.append("id",id)
  const envoiNouvelleAdresse = await fetch("/carpooling-api/index.php",
    {
      method : "POST", 
      body : changeAdresse
    })
    const responseEnvoiNouvelleAdresse = await envoiNouvelleAdresse.json()
    if(responseEnvoiNouvelleAdresse.confirmNewAdresse ==="ok"){
      alert("l'adresse a bien était changé !")
    }
})
btnModiftel.addEventListener("click", async () => {
  console.log(modiftel.value)
  const changeTel = new FormData()
  let nouveauTel = modiftel.value 
  let id = sessionStorage.getItem("id")
  changeTel.append("data","changeTel")
  changeTel.append("newTel",nouveauTel)
  changeTel.append("id",id)
  const envoiNouveauTel = await fetch("/carpooling-api/index.php", 
    {
      method : "POST", 
      body : changeTel
    })
  const responseEnvoiNouveauTel = await envoiNouveauTel.json()
  if(responseEnvoiNouveauTel.confirmNewTel==="ok"){
    alert("le numéro de téléphone a bien était changé !")
  }
})
btnValidatemdp.addEventListener("click", async () => {
  if(mdp.value!=="" && confirmMdp.value!==""){
  console.log(mdp.value)
  const changeMdp = new FormData()
  let nouveauMdp = mdp.value 
  let confirmfinalMdp = confirmMdp.value
  let id = sessionStorage.getItem("id")
  changeMdp.append("data","changeMdp")
  changeMdp.append("newMdp",nouveauMdp)
  changeMdp.append("confirmMdp",confirmfinalMdp)
  changeMdp.append("id",id)
  const envoiNouveauMdp = await fetch("/carpooling-api/index.php", 
    {
      method : "POST", 
      body : changeMdp
    }
  )
  const responseEnvoiNouveauMdp = await envoiNouveauMdp.json()
  if(responseEnvoiNouveauMdp.confirmNewMdp ==="ok"){
    console.log("le mot de passe a bien était changé !")
  }else if(responseEnvoiNouveauMdp.erreur ==="ok"){
    alert("mot de passe saisi non identique ! veuillez recommencer.")
  }
}else{
  alert("veuillez compléter les deux case !")
}
})
btnChangementVehicule.addEventListener("click", async () => {
  console.log("changement de vehicule")
  path=routes["/changementVehicule"]
  navigate(event,path,url)
  afficher(path)
  const  actuelVehicule = new FormData()
  const id = sessionStorage.getItem("id")
  actuelVehicule.append("data","actuelVehicule")
  actuelVehicule.append("id",id)
  const recupActuelVehicule = await fetch("/carpooling-api/index.php",
    {
      method : "POST", 
      body : actuelVehicule
    })
  const resultActuelVehicule = await recupActuelVehicule.json() 
  console.log(resultActuelVehicule)
  let modifContainer = document.querySelector(".modifContainer")
  let couleur = resultActuelVehicule.couleur
  let dateImmatriculation = resultActuelVehicule.date_premiere_immatriculation
  let energie = resultActuelVehicule.energie 
  let immatriculation = resultActuelVehicule.immatriculation
  let modele = resultActuelVehicule.modele 
  let interval = setInterval(()=>{
  let modifContainer = document.querySelector(".modifContainer")
  if(modifContainer){
    clearInterval(interval)
      let labelMarque = document.createElement("p")
      labelMarque.textContent = `marque actuel : ${modele}`
      modifContainer.append(labelMarque)
  }
  },150)

  
})
    }
  },150) 
}

// implémenter
break;
case "deconnexion" : 
let deconnexion = document.querySelector(".deconnexion")// éventuellement a supprimer
sessionStorage.removeItem("id")
location.replace("http://localhost/")
alert("vous étes bien deconnecté !")
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





  
 
       