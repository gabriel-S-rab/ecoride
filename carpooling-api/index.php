<?php 
// prévoir un systéme d'authentification exemple type "JWT authentification"

header("Content-Type: application/json"); 

$connexion= new PDO("mysql:host=localhost;dbname=Covoiturage_db;charset=UTF8","root",""); 
//gérer la récuparation de l'image BLOB
//$method = $_SERVER["REQUEST_METHOD"];


    
if($_SERVER["REQUEST_METHOD"]==="POST"){
      if($_POST["data"]==="globalFetch"){
      $sql ="SELECT * FROM Utilisateur
             INNER JOIN covoiturage ON Utilisateur.utilisateur_id = covoiturage.covoiturage_id ";
            $request=$connexion->prepare($sql); 
            $request->execute(); 
            $result=$request->fetchAll(PDO::FETCH_ASSOC);
            $result_encode = json_encode($result);
            echo $result_encode;
            exit();
           }
     
           if($_POST["data"]==="connexion"){
            if(isset($_POST["id"])){
             if(isset($_POST["mdp"])){
                  $id= htmlspecialchars($_POST["id"]);
                  $mdp = htmlspecialchars($_POST["mdp"]);
            $request=$connexion->prepare('SELECT email,password FROM Utilisateur WHERE email = :email AND password= :password'); 
            $request->bindParam(":email",$id,PDO::PARAM_STR);
            $request->bindParam(":password",$mdp,PDO::PARAM_STR);
            $request->execute();
            $result = $request->fetch(PDO::FETCH_ASSOC);
            if(count($result)>0){
             if($id===$result["email"] && $mdp===$result["password"]){
                 
                  echo json_encode(["test"=>"ok connexion","id"=>$id]);
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
              echo json_encode(["inscription"=>"ok",]);// verifier le probléme des echo 
              if($_POST["data"]="inscriptionVehicule"){
                echo json_encode(["ok"=>"ok"]);
              }
              exit();
            }
          }




