<?php 
// prévoir un systéme d'authentification exemple type "JWT authentification"

header("Content-Type: application/json"); 

$connexion= new PDO("mysql:host=localhost;dbname=Covoiturage_db;charset=UTF8","root",""); 
//gérer la récuparation de l'image BLOB
//$method = $_SERVER["REQUEST_METHOD"];


    
if($_SERVER["REQUEST_METHOD"]==="POST"){
      if(htmlspecialchars($_POST["data"])==="globalFetch"){
      $sql ="SELECT * FROM covoiturage";
            $request=$connexion->prepare($sql); 
            $request->execute(); 
            $result=$request->fetchAll(PDO::FETCH_ASSOC);
            $result_encode = json_encode($result);
            echo $result_encode;
            exit(); // a voir
           }
     
           if(htmlspecialchars($_POST["data"])==="connexion"){
            if(isset($_POST["identifiant"])){
             if(isset($_POST["mdp"])){
                  $identifiant= htmlspecialchars($_POST["identifiant"]);
                  $mdp = htmlspecialchars($_POST["mdp"]);
            $request=$connexion->prepare('SELECT email,password,utilisateur_id FROM Utilisateur WHERE email = :email AND password= :password'); 
            $request->bindParam(":email",$identifiant,PDO::PARAM_STR);
            $request->bindParam(":password",$mdp,PDO::PARAM_STR);
            $request->execute();
            $result = $request->fetch(PDO::FETCH_ASSOC);
            if(count($result)>0){
             if($identifiant===$result["email"] && $mdp===$result["password"]){
                 
                  echo json_encode(["test"=>"ok connexion","id"=>$result["utilisateur_id"]]);
                  exit();
             }
             }
             }
            }}    
            if(htmlspecialchars($_POST["data"])==="inscription"){
              $prenom = htmlspecialchars($_POST["prenom"]);
              $nom = htmlspecialchars($_POST["nom"]); 
              $datenaissance = htmlspecialchars($_POST["dateNaissance"]); 
              $pseudo = htmlspecialchars($_POST["pseudo"]); 
              $email = htmlspecialchars($_POST["email"]); 
              $mdp = htmlspecialchars($_POST["mdp"]);
             // $confirmdp = htmlspecialchars($_POST["confirmmdp"]);
             // $profilType = htmlspecialchars($_POST["profilType"]); 
              $tel = htmlspecialchars($_POST["tel"]); 
              $adresse = htmlspecialchars($_POST["adresse"]);
              /* a finir d'implémenter */
              $requete=$connexion->prepare("INSERT INTO Utilisateur(nom,prenom,email,password,telephone,adresse,date_naissance,pseudo)
               VALUES (:nom,:prenom,:email,:password,:telephone,:adresse,:date_naissance,:pseudo)");
              $requete->bindParam(":nom",$nom,PDO::PARAM_STR); 
              $requete->bindParam(":prenom",$prenom,PDO::PARAM_STR); 
              $requete->bindParam(":email",$email,PDO::PARAM_STR); 
              $requete->bindParam(":password",$mdp,PDO::PARAM_STR); 
              $requete->bindParam(":telephone",$tel,PDO::PARAM_INT); 
              $requete->bindParam(":adresse",$adresse,PDO::PARAM_STR); 
              $requete->bindParam(":date_naissance",$datenaissance); 
              $requete->bindParam(":pseudo",$pseudo,PDO::PARAM_STR); 
              $requete->execute();
              $id=$connexion->lastInsertId();
              echo json_encode(["inscription"=>"ok","id"=>$id]);// verifier le probléme des echo 
            }
              if(htmlspecialchars($_POST["data"])==="inscriptionVehicule"){
                $id=htmlspecialchars($_POST["id"]);
                $marque=htmlspecialchars($_POST["marque"]);
                $modele=htmlspecialchars($_POST["modele"]);
                $datemiseencirculation=htmlspecialchars($_POST["datemiseencirculation"]);
                $couleur = htmlspecialchars($_POST["couleur"]);
                $immatriculation = htmlspecialchars($_POST["immatriculation"]);
                $typeVehicule = htmlspecialchars($_POST["typeVehicule"]);
                
                $ajoutVehicule=$connexion->prepare("INSERT INTO voiture(voiture_id,modele,immatriculation,energie,couleur,date_premiere_immatriculation)
                                                    VALUES (:voiture_id,:modele,:immatriculation,:energie,:couleur,:date_premiere_immatriculation)");
                $ajoutVehicule->bindParam(":voiture_id",$id,PDO::PARAM_INT);                                 
                $ajoutVehicule->bindParam(":modele",$modele,PDO::PARAM_STR);
                $ajoutVehicule->bindParam(":immatriculation",$immatriculation,PDO::PARAM_STR); 
                $ajoutVehicule->bindParam(":energie",$typeVehicule,PDO::PARAM_STR); 
                $ajoutVehicule->bindParam(":couleur",$couleur,PDO::PARAM_STR); 
                $ajoutVehicule->bindParam(":date_premiere_immatriculation",$datemiseencirculation); 
                $ajoutVehicule->execute();
                
                  echo json_encode(["confirmVehicule"=>"confirmok"]);
                exit();
              }
              
            if(htmlspecialchars($_POST["data"])==="myProfil"){
              $id = htmlspecialchars($_POST["id"]);
              $RecupInfoProfil = $connexion->prepare("SELECT * FROM utilisateur WHERE utilisateur_id=:id"); 
              $RecupInfoProfil->bindParam(":id",$id,PDO::PARAM_INT);
              $RecupInfoProfil->execute();
              $infoProfil= $RecupInfoProfil->fetch(PDO::FETCH_ASSOC); 
              
             
              echo json_encode($infoProfil);
              exit();
            }
            if(htmlspecialchars($_POST["data"])==="changementPseudo"){
              $newPseudo = htmlspecialchars($_POST["newPseudo"]);
              $id = htmlspecialchars($_POST["id"]);
              $requeteModifPseudo = $connexion->prepare("UPDATE utilisateur SET pseudo=:pseudo WHERE utilisateur_id=:id");
              $requeteModifPseudo->bindParam(":pseudo",$newPseudo,PDO::PARAM_STR);
              $requeteModifPseudo->bindParam(":id",$id,PDO::PARAM_STR);
              $requeteModifPseudo->execute();
              // creer une gestion d'erreur avec (http_response_code)
              if(http_response_code()===200){
                echo json_encode(["changementPseudo"=>"ok"]);
                exit();
              }
              // gestion changementpseudo
            }
            if(htmlspecialchars($_POST["data"])==="changeNom"){
              $newNom = htmlspecialchars($_POST["newNom"]);
              $id = htmlspecialchars($_POST["id"]);
              $requeteModifNom = $connexion->prepare("UPDATE utilisateur SET nom=:nom WHERE utilisateur_id=:id");
              $requeteModifNom->bindParam(":nom",$newNom,PDO::PARAM_STR); 
              $requeteModifNom->bindParam(":id",$id,PDO::PARAM_STR); 
              $requeteModifNom->execute();
                  if(http_response_code()===200){
                echo json_encode(["confirmNewNom"=>"ok"]);
                exit();
              }         
              // gestion changement nom
            }
            if(htmlspecialchars($_POST["data"])==="changePrenom"){
              $newPrenom = htmlspecialchars($_POST["changePrenom"]);
              $id = htmlspecialchars($_POST["id"]);
              $requeteModifPrenom = $connexion->prepare("UPDATE utilisateur SET prenom=:prenom WHERE utilisateur_id=:id");
              $requeteModifPrenom->bindParam(":prenom",$newPrenom,PDO::PARAM_STR); 
              $requeteModifPrenom->bindParam(":id",$id,PDO::PARAM_STR);
              $requeteModifPrenom->execute();
              //création http_response_code
              if(http_response_code()===200){
                echo json_encode(["confirmNewPrenom"=>"ok"]);
                exit();
              }
              // gestion du changement de prenom
            }
            if(htmlspecialchars($_POST["data"])==="changeEmail"){
              $newEmail = htmlspecialchars($_POST["newEmail"]); 
              $id = htmlspecialchars($_POST["id"]); 
              $requeteModifEmail = $connexion -> prepare("UPDATE utilisateur SET email=:email WHERE utilisateur_id=:id");
              $requeteModifEmail->bindParam(":email",$newEmail,PDO::PARAM_STR); 
              $requeteModifEmail->bindParam(":id",$id,PDO::PARAM_STR); 
              $requeteModifEmail->execute();
              //ajout http_response_code
              if(http_response_code()===200){
                echo json_encode(["confirmNewEmail"=>"ok"]);
                exit();
              }
              // gestion du changement de l'email
            }
            if(htmlspecialchars($_POST["data"])==="changeAdresse"){
              $newAdresse = htmlspecialchars($_POST["newAdresse"]);
              $id = htmlspecialchars($_POST["id"]); 
              $requeteModifAdresse = $connexion->prepare("UPDATE utilisateur SET adresse=:adresse WHERE utilisateur_id=:id");
              $requeteModifAdresse->bindParam(":adresse",$newAdresse,PDO::PARAM_STR); 
              $requeteModifAdresse->bindParam(":id",$id,PDO::PARAM_STR);
              $requeteModifAdresse->execute();
              //ajout http_response_code
              if(http_response_code()===200){
                echo json_encode(["confirmNewAdresse"=>"ok"]);
                exit();
              }
              // gestion du changement d'adresse
            }
            if(htmlspecialchars($_POST["data"])==="changeTel"){
              $newTel = htmlspecialchars($_POST["newTel"]);
              $id = htmlspecialchars($_POST["id"]); 
              $requeteModifTel=$connexion->prepare("UPDATE utilisateur SET telephone=:tel WHERE utilisateur_id=:id");
              $requeteModifTel->bindParam(":tel",$newTel,PDO::PARAM_STR); 
              $requeteModifTel->bindParam(":id",$id,PDO::PARAM_STR);
              $requeteModifTel->execute();
              //ajout http_response_code
              if(http_response_code()===200){
                echo json_encode(["confirmNewTel"=>"ok"]);
                exit();
              }   
            }
            if(htmlspecialchars($_POST["data"])==="changeMdp"){
              $newMdp = htmlspecialchars($_POST["newMdp"]);
              $confirmNewMdp = htmlspecialchars($_POST["confirmMdp"]);
              $id = htmlspecialchars($_POST["id"]); 
              if($newMdp===$confirmNewMdp){
              $requeteModifMdp=$connexion->prepare("UPDATE utilisateur SET password=:password WHERE utilisateur_id=:id");
              $requeteModifMdp->bindParam(":password",$newMdp,PDO::PARAM_STR);
              $requeteModifMdp->bindParam(":id",$id,PDO::PARAM_STR);
              $requeteModifMdp->execute();
              if(http_response_code()===200){
                echo json_encode(["confirmNewMdp"=>"ok"]);
                exit();
              }
              }else{
                   echo json_encode(["erreur"=>"ok"]);
                   exit();
              }
            }
            }
          

// prévoir csrf token du coté javascript newTel


