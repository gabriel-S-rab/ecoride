INSERT INTO Utilisateur(nom,prenom,email,password,telephone,adresse,date_naissance,photo,pseudo)/*Utilisateur*/
VALUES (":nom",":prenom","email",":password",":telephone",":adresse",":date",":dateNaissance",":photo",":pseudo");

INSERT INTO Marque(libelle) VALUES (":marque"); /*marque du vehicule*/

INSERT INTO Role(libelle) VALUES (":role");/*role*/



