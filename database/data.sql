CREATE DATABASE IF NOT EXISTS covoiturage_db;
USE covoiturage_db; 

CREATE TABLE Utilisateur (
    utilisateur_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50), 
    email VARCHAR(50) UNIQUE, 
    password VARCHAR(255),
    telephone VARCHAR(50), 
    adresse VARCHAR(100), 
    date_naissance DATE,
    photo BLOB,
    pseudo VARCHAR(50)
);   

CREATE TABLE Role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    libelle VARCHAR(50)
); 

CREATE TABLE Avis ( 
    avis_id INT AUTO_INCREMENT PRIMARY KEY,
    commentaire VARCHAR(50), 
    note FLOAT,
    statut VARCHAR(50)
); 

CREATE TABLE Marque (
    marque_id INT AUTO_INCREMENT PRIMARY KEY, 
    libelle VARCHAR(50)
);

CREATE TABLE Voiture ( 
    voiture_id INT AUTO_INCREMENT PRIMARY KEY, 
    modele VARCHAR(50),
    immatriculation VARCHAR(50),
    energie VARCHAR(20),
    couleur VARCHAR(50),
    date_premiére_immatriculation DATE,
    marque_id INT, 
    FOREIGN KEY (marque_id) REFERENCES Marque(marque_id)
); 

CREATE TABLE Covoiturage ( 
    covoiturage_id INT AUTO_INCREMENT PRIMARY KEY,
    date_depart DATE, 
    heure_depart TIME, 
    lieu_depart VARCHAR(50), 
    date_arrive DATE, 
    heure_arrivee TIME, 
    lieu_arrivee VARCHAR(50),
    statut VARCHAR(50),
    nb_place INT,
    prix_personne FLOAT, 
    voiture_id INT, 
    FOREIGN KEY (voiture_id) REFERENCES Voiture(voiture_id)
);

CREATE TABLE Parametre ( 
    parametre_id INT AUTO_INCREMENT PRIMARY KEY, 
    propriete VARCHAR(50), 
    valeur VARCHAR(50)
); 

CREATE TABLE Configuration( 
    id_configuration INT AUTO_INCREMENT PRIMARY KEY
); 

CREATE TABLE Dispose(
    id_configuration INT, 
    parametre_id INT, 
    PRIMARY KEY (id_configuration, parametre_id),
    FOREIGN KEY (id_configuration) REFERENCES configuration(id_configuration),
    FOREIGN KEY (parametre_id) REFERENCES Parametre(parametre_id)
); 

CREATE TABLE Gere (
    utilisateur_id INT, 
    voiture_id INT,
    PRIMARY KEY (utilisateur_id,voiture_id), 
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(utilisateur_id),
    FOREIGN KEY (voiture_id) REFERENCES Voiture(voiture_id)
); 

CREATE TABLE Participe(
    utilisateur_id INT,
    covoiturage_id INT,
    PRIMARY KEY (utilisateur_id, covoiturage_id), 
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(utilisateur_id),
    FOREIGN KEY (covoiturage_id) REFERENCES Covoiturage(covoiturage_id)
); 

CREATE TABLE Possede(
    utilisateur_id INT, 
    role_id INT, 
    PRIMARY KEY (utilisateur_id,role_id),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(utilisateur_id), 
    FOREIGN KEY (role_id) REFERENCES Role(role_id)
); 

CREATE TABLE Depose(
    utilisateur_id INT, 
    avis_id INT,
    PRIMARY KEY (utilisateur_id,avis_id),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(utilisateur_id), 
    FOREIGN KEY (avis_id) REFERENCES Avis(avis_id)
); 

CREATE TABLE Cree(
    utilisateur_id INT, 
    covoiturage_id INT, 
    PRIMARY KEY(utilisateur_id,covoiturage_id),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(utilisateur_id), 
    FOREIGN KEY (covoiturage_id) REFERENCES Covoiturage(covoiturage_id)
);



