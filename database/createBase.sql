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
    date_premiere_immatriculation DATE NOT NULL, 
    FOREIGN KEY(voiture_id) REFERENCES Utilisateur(utilisateur_id)
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
    prix_personne DECIMAL NOT NULL, 
    FOREIGN KEY (covoiturage_id) REFERENCES Voiture(voiture_id)
); 

CREATE TABLE marque ( 
    marque_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    libelle VARCHAR(50) NOT NULL, 
    FOREIGN KEY(marque_id) REFERENCES Voiture(voiture_id)
); 

CREATE TABLE Configuration (
    id_configuration INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    FOREIGN KEY (id_configuration) REFERENCES Utilisateur(utilisateur_id)
); 

CREATE TABLE Parametre (
    parametre_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    propriete VARCHAR(50) NOT NULL, 
    valeur VARCHAR(50) NOT NULL,
    FOREIGN KEY (parametre_id) REFERENCES Configuration(id_configuration)
);

CREATE TABLE Role_utilisateur (
    role_utilisateur_id INT, 
    role_role_id INT, 
    PRIMARY KEY(role_utilisateur_id,role_role_id), 
    FOREIGN KEY (role_utilisateur_id) REFERENCES Utilisateur(utilisateur_id), 
    FOREIGN KEY (role_role_id) REFERENCES Role(role_id)
);

CREATE TABLE Avis_utilisateur (
    avis_utilisateur_id INT,
    avis_avis_id INT, 
    PRIMARY KEY (avis_utilisateur_id,avis_avis_id), 
    FOREIGN KEY (avis_utilisateur_id) REFERENCES Utilisateur(utilisateur_id), 
    FOREIGN KEY (avis_avis_id) REFERENCES Avis(avis_id)
); 

CREATE TABLE Covoiturage_utilisateur (
    covoiturage_utilisateur_id INT, 
    covoiturage_covoiturage_id INT, 
    PRIMARY KEY (covoiturage_utilisateur_id,covoiturage_covoiturage_id), 
    FOREIGN KEY (covoiturage_utilisateur_id) REFERENCES Utilisateur(utilisateur_id), 
    FOREIGN KEY (covoiturage_covoiturage_id) REFERENCES Covoiturage(covoiturage_id)
);




