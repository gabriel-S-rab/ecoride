<?php 


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
           }
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
             }
             }
             }
            }     
            if($_POST["data"]==="inscription"){
              echo json_encode(["test"=>"ok inscription"]);
            }
      }
           




