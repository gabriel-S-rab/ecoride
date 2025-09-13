<h2 class="carpoolingTitle">je suis bien sur la page du covoiturage</h2>
<form class="filterForm">
    <label class="filterElement" for="travelEco">voyage écologique ?</label>
    <input class="filterElement  inputForm" id="travelEco" name="travelEco" type="checkbox" name="oui" value="oui">
    <label class="filterElement" for="travelPrice">prix du voyage maximum :</label>
    <input class="filterElement inputForm" type="number" min="0" name="travelPrice" id="travelPrice" placeholder="prix du voyage maximum">
    <label class="filterElement" for="travelDuration">durée du voyage :</label>
    <input class="filterElement inputForm" id="travelDuration" type="number" min="0" placeholder="durée du voyage">
    <label class="filterElement"for="driverNotation">note du chauffeur :</label>
    <input class="filterElement inputForm" type="number" min="0" id="driverNotation" placeholder="notation du chauffeur">
    <button class="filterElement btnForm" type="button">appliquer</button>
</form>

<div class="carpoolingContainer">
<div class="carpoolingSearch" ></div>
</div>