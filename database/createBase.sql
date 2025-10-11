CREATE DATABASE Covoiturage_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci; 
USE Covoiturage_db;

CREATE TABLE Utilisateur ( 
    utilisateur_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL, 
    password VARCHAR(50) NOT NULL, 
    telephone VARCHAR(50) NOT NULL,
    adresse VARCHAR(50) NOT NULL, 
    date_naissance VARCHAR(50) NOT NULL, 
    photo BLOB NOT NULL, 
    pseudo VARCHAR(50) NOT NULL
); 

CREATE TABLE Voiture (
    voiture_id INT AUTO_INCREMENT NOT NULL,
    modele VARCHAR(50) NOT NULL,
    immatriculation VARCHAR(50) NOT NULL, 
    energie VARCHAR(50) NOT NULL, 
    couleur VARCHAR(50) NOT NULL, 
    date_premiere_immatriculation DATE NOT NULL 
); 

CREATE TABLE Role (
    role_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    libelle VARCHAR(50) NOT NULL
); 

CREATE TABLE Avis (
    avis_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    commentaire VARCHAR(50), /*a voir si not null */
    note INT NOT NULL
); 

CREATE TABLE Covoiturage (
    covoiturage_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    date_depart DATE NOT NULL, 
    date_arrive DATE NOT NULL,
    lieu_depart VARCHAR(50) NOT NULL, 
    lieu_arrivee VARCHAR(50) NOT NULL,
    heure_depart TIME NOT NULL, 
    heure_arrivee TIME NOT NULL, 
    statut VARCHAR(50), /*a voir si not null ? */
    nb_place INT NOT NULL, 
    prix_personne DECIMAL NOT NULL
); 

CREATE TABLE marque ( 
    marque_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    libelle VARCHAR(50) NOT NULL
); 

CREATE TABLE Configuration (
    id_configuration INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
); 

CREATE TABLE Parametre (
    parametre_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    propriete VARCHAR(50) NOT NULL, 
    valeur VARCHAR(50) NOT NULL
);

/* creer toutes les table assiociative */

