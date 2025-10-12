<?php 


header("Content-Type: application/json"); 

$connexion= new PDO("mysql:host=localhost;dbname=Covoiturage_db;charset=UTF8","root",""); 
//gérer la récuparation de l'image BLOB
//$method = $_SERVER["REQUEST_METHOD"];


    if($_SERVER["REQUEST_METHOD"]==="GET"){

      $sql ="SELECT * FROM Utilisateur
             INNER JOIN covoiturage ON Utilisateur.utilisateur_id = covoiturage.covoiturage_id ";
            $request=$connexion->prepare($sql); 
            $request->execute(); 
            $result=$request->fetchAll(PDO::FETCH_ASSOC);
            $result_encode = json_encode($result);
            echo $result_encode;
           }else if ($_SERVER["REQUEST_METHOD"]==="POST"){

           }




