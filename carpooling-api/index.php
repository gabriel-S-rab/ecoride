<?php 
// prévoir un systéme d'authentification exemple type "JWT authentification"

header("Content-Type: application/json"); 

$connexion= new PDO("mysql:host=localhost;dbname=Covoiturage_db;charset=UTF8","root",""); 
//gérer la récuparation de l'image BLOB
//$method = $_SERVER["REQUEST_METHOD"];


    
if($_SERVER["REQUEST_METHOD"]==="POST"){
      if($_POST["data"]==="globalFetch"){
      $sql ="SELECT * FROM covoiturage";
            $request=$connexion->prepare($sql); 
            $request->execute(); 
            $result=$request->fetchAll(PDO::FETCH_ASSOC);
            $result_encode = json_encode($result);
            echo $result_encode;
            exit(); // a voir
           }
     
           if($_POST["data"]==="connexion"){
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
            if($_POST["data"]==="inscription"){
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
              if($_POST["data"]==="inscriptionVehicule"){
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
              
            if($_POST["data"]==="myProfil"){
              
              $RecupInfoProfil = $connexion->prepare('SELECT * FROM utilisateur WHERE email="robert@gmail.com"'); 
            //  $RecupInfoProfil->bindParam(":id",$id,PDO::PARAM_INT);
              $RecupInfoProfil->execute();
              $infoProfil= $RecupInfoProfil->fetch(PDO::FETCH_ASSOC); 
              
             
              echo json_encode($infoProfil);
              exit();
            }
            }
          




