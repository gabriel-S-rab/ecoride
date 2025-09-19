<?php 


header("Content-Type: application/json"); 

$connexion= new PDO("mysql:host=localhost;dbname=Covoiturage_db;charset=UTF8","root",""); 
//gérer la récuparation de l'image BLOB
//$method = $_SERVER["REQUEST_METHOD"];
$method = "GET";


    if($method==="GET"){

      $sql ="";
            $request=$connexion->prepare($sql); 
            $request->execute(); 
            $result=$request->fetchAll(PDO::FETCH_ASSOC);
            $result_encode = json_encode($result);
            echo $result_encode;
           }




