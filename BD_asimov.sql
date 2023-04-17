CREATE DATABASE IF NOT EXISTS asimov;

use asimov;

CREATE TABLE personnel (
    id_perso int AUTO_INCREMENT not null,
    nom_perso varchar(30) not null,
    prenom_perso varchar(30) not null,
    mdp varchar(30) not null,
    matiere boolean not null,
    role_perso int not null,
    primary key (id_perso)
);

CREATE TABLE eleve (
    id_eleve int AUTO_INCREMENT not null,
    nom_eleve varchar(30) not null,
    prenom_eleve varchar(30) not null,
    age_eleve VARCHAR(2) NOT NULL,
    id_classe varchar(30) not null,
    primary key (id_eleve)
);

CREATE TABLE role (
    id_role int AUTO_INCREMENT not null,
    nom_role varchar(30) not null,
    primary key (id_role)
);

CREATE TABLE classe (
    id_classe int AUTO_INCREMENT not null,
    nom_classe VARCHAR(30) NOT NULL,
    capacite int(2) not null,
    primary key (id_classe)
);

CREATE TABLE matiere (
    id_matiere int AUTO_INCREMENT not null,
    nom_matiere varchar(30) not null,
    idProfesseur_matiere int not null,
    primary key (id_matiere)
);

CREATE TABLE note (
    id_note int AUTO_INCREMENT not null,
    idEleve_note int not null,
    note int not null,
    id_matiere int not null,
    date_att date not null,
    description varchar(233) not null,
    primary key (id_note)
);


ALTER TABLE note

ADD CONSTRAINT FK_note_el
FOREIGN KEY(idEleve_note) REFERENCES eleve(id_eleve),

ADD CONSTRAINT FK_note_ma
FOREIGN KEY(id_matiere) REFERENCES matiere(id_matiere);

ALTER TABLE eleve 

ADD CONSTRAINT FK_classe_el
FOREIGN KEY(id_classe) REFERENCES classe(id_classe);

ALTER TABLE matiere

ADD CONSTRAINT FK_matiere_Pro
FOREIGN KEY(idProfesseur_matiere) REFERENCES personnel(id_perso);
