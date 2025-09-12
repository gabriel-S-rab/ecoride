
async function recovery(){
  const reponse = await fetch("/pages/test.json") 
  const utilisateur = await reponse.json()
  utilisateur.forEach(element => {
    const travel = document.createElement("div")
    travel.textContent = element.pseudo 
    main.append(travel)
    console.log(element.pseudo)
 });
 }
 recovery()