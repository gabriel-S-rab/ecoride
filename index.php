<!DOCTYPE html>
<html>
    <head>
       <meta charset="utf-8">
       <title>EcoRide <!--ajouter un icone--></title>
       <script src="router.js" defer></script>
       <link rel="stylesheet" href="/pages/style.css">
    </head>

    <body>
     <header>
        <div class="headerContainer">
            <h1>EcoRide</h1>
            <div class="hidden"></div>
           
            <select type="submit" id="select" name="choice" placeholder="Menu">
                <option value="menu" selected hidden>menu</option>
                <option class="acceuil" value="/acceuil">Accueil</option>
                <option class ="covoiturage" value="/covoiturage">Accés aux covoiturage</option>
                <option class="monProfil" value="/monProfil" hidden>Mon profil</option>
                <option class="connexion" value="/connexion">Connexion</option>
                <option class="inscription" value="/inscription">Inscription</option>
                <option class="contact" value="/contact">Contact</option>
                <option class="deconnexion" value="deconnexion" hidden>Deconnexion</option>
            </select>
            
        <div>
     </header>


    <div class="main"></div>
    
    <footer>

     <div class="infoEcoride">
      <p>Ecoride@gmail.com</p>
      <p><a href="/pages/essaie.php">information légale</a></p>
      <p>&copy; Ecoride 2025</p>
     </div>

    </footer>

    </body>
</html>