-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 30 avr. 2023 à 16:11
-- Version du serveur : 5.7.41
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `asimov`
--

CREATE DATABASE IF NOT EXISTS asimov;

use asimov;

-- --------------------------------------------------------

--
-- Structure de la table `classe`
--

DROP TABLE IF EXISTS `classe`;
CREATE TABLE IF NOT EXISTS `classe` (
  `id_classe` int(11) NOT NULL AUTO_INCREMENT,
  `nom_classe` varchar(30) NOT NULL,
  PRIMARY KEY (`id_classe`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `classe`
--

INSERT INTO `classe` (`id_classe`, `nom_classe`) VALUES
(1, '6ème'),
(2, '5ème'),
(3, '4ème'),
(4, '3ème'),
(5, 'Première'),
(6, 'Seconde'),
(7, 'Terminale');

-- --------------------------------------------------------

--
-- Structure de la table `eleve`
--

DROP TABLE IF EXISTS `eleve`;
CREATE TABLE IF NOT EXISTS `eleve` (
  `id_eleve` int(11) NOT NULL AUTO_INCREMENT,
  `nom_eleve` varchar(30) NOT NULL,
  `prenom_eleve` varchar(30) NOT NULL,
  `mdp` varchar(30) NOT NULL,
  `role` int(11) NOT NULL DEFAULT '1',
  `id_classe` int(11) NOT NULL,
  PRIMARY KEY (`id_eleve`),
  KEY `FK_classe_el` (`id_classe`)
) ENGINE=MyISAM AUTO_INCREMENT=102 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `eleve`
--

INSERT INTO `eleve` (`id_eleve`, `nom_eleve`, `prenom_eleve`, `mdp`, `role`, `id_classe`) VALUES
(1, 'sam', 'sam', 'root', 1, 5),
(2, 'Dupont', 'Jean', 'root', 1, 1),
(3, 'Martin', 'Pierre', 'root', 1, 3),
(4, 'Durand', 'Marie', 'root', 1, 7),
(5, 'Bernard', 'Luc', 'root', 1, 2),
(6, 'Petit', 'Anne', 'root', 1, 5),
(7, 'Moreau', 'Sophie', 'root', 1, 6),
(8, 'Lefebvre', 'Julie', 'root', 1, 1),
(9, 'Dubois', 'Isabelle', 'root', 1, 4),
(10, 'Roux', 'Emilie', 'root', 1, 3),
(11, 'Fournier', 'Alice', 'root', 1, 7),
(12, 'Girard', 'Julien', 'root', 1, 2),
(13, 'Andre', 'Nicolas', 'root', 1, 5),
(14, 'Mercier', 'Laure', 'root', 1, 6),
(15, 'Herve', 'Maxime', 'root', 1, 1),
(16, 'Bourgeois', 'Sylvie', 'root', 1, 4),
(17, 'Renaud', 'Christophe', 'root', 1, 3),
(18, 'Blanchard', 'Celine', 'root', 1, 7),
(19, 'Gautier', 'Caroline', 'root', 1, 2),
(20, 'Dubois', 'Alexandre', 'root', 1, 5),
(21, 'Barbier', 'Cyril', 'root', 1, 6),
(22, 'Perrin', 'Julien', 'root', 1, 1),
(23, 'Deschamps', 'Olivier', 'root', 1, 4),
(24, 'Henry', 'Guillaume', 'root', 1, 3),
(25, 'Lemaire', 'Sophie', 'root', 1, 7),
(26, 'Dumont', 'Marie', 'root', 1, 2),
(27, 'Garnier', 'Lucas', 'root', 1, 5),
(28, 'Chevalier', 'Julie', 'root', 1, 6),
(29, 'Dufour', 'Nathalie', 'root', 1, 1),
(30, 'Roussel', 'Etienne', 'root', 1, 4),
(31, 'Benoit', 'Manon', 'root', 1, 3),
(32, 'Picard', 'Stephane', 'root', 1, 7),
(33, 'Vincent', 'Emilie', 'root', 1, 2),
(34, 'Lacroix', 'Sophie', 'root', 1, 5),
(35, 'Hubert', 'Olivier', 'root', 1, 6),
(36, 'Leroy', 'Pierre', 'root', 1, 1),
(37, 'Giraud', 'Julie', 'root', 1, 4),
(38, 'Leclerc', 'Emilie', 'root', 1, 3),
(39, 'Charpentier', 'Celine', 'root', 1, 7),
(40, 'Benali', 'Karim', 'root', 1, 6),
(41, 'Emir', 'Farah', 'root', 1, 1),
(42, 'richard', 'Julien', 'root', 1, 4),
(43, 'Leclerc', 'Jeremy', 'root', 1, 3),
(44, 'Charpentier', 'Caroline', 'root', 1, 7),
(45, 'Deschamps', 'Axel', 'root', 1, 4),
(46, 'Henry', 'Hugo', 'root', 1, 3),
(47, 'Lemaire', 'Sarah', 'root', 1, 7),
(48, 'Dumor', 'Marion', 'root', 1, 2),
(49, 'Garn', 'Lucien', 'root', 1, 5),
(50, 'Chevalier', 'Lancelot', 'root', 1, 6),
(51, 'Li', 'Zhang', 'root', 1, 2),
(52, 'Wang', 'Wei', 'root', 1, 3),
(53, 'Kumar', 'Rahul', 'root', 1, 1),
(54, 'Kim', 'Min-Jae', 'root', 1, 6),
(55, 'Rahman', 'Mohammed', 'root', 1, 7),
(56, 'Nguyen', 'Anh', 'root', 1, 4),
(57, 'Araujo', 'Gabriela', 'root', 1, 2),
(58, 'Kaur', 'Harpreet', 'root', 1, 4),
(59, 'Sato', 'Rina', 'root', 1, 5),
(60, 'Lee', 'Seung-Hyeon', 'root', 1, 6),
(61, 'Ahmed', 'Aisha', 'root', 1, 3),
(62, 'Abdelhakim', 'Fatima', 'root', 1, 1),
(63, 'Gonzalez', 'Juan', 'root', 1, 7),
(64, 'Bhatti', 'Aman', 'root', 1, 4),
(65, 'Chen', 'Yue', 'root', 1, 5),
(66, 'Mandal', 'Sagar', 'root', 1, 2),
(67, 'Singh', 'Jaspreet', 'root', 1, 1),
(68, 'Kobayashi', 'Hiroki', 'root', 1, 3),
(69, 'Kwak', 'Hae-Ri', 'root', 1, 7),
(70, 'Tran', 'Hieu', 'root', 1, 6),
(71, 'El-Sayed', 'Nadia', 'root', 1, 4),
(72, 'Kim', 'Ji-Won', 'root', 1, 2),
(73, 'Tajima', 'Satoshi', 'root', 1, 5),
(74, 'Nguyen', 'Trung', 'root', 1, 1),
(75, 'Santos', 'Lucas', 'root', 1, 7),
(76, 'Garcia', 'Maria', 'root', 1, 3),
(77, 'Kim', 'Hyun-Jin', 'root', 1, 6),
(78, 'Das', 'Aniruddha', 'root', 1, 4),
(79, 'Al-Balushi', 'Noura', 'root', 1, 2),
(80, 'Choi', 'Soo-Hyun', 'root', 1, 5),
(81, 'Garcia', 'Julio', 'root', 1, 1),
(82, 'Velasquez', 'Elena', 'root', 1, 1),
(83, 'Rodriguez', 'Hector', 'root', 1, 2),
(84, 'Fernandez', 'Miguel', 'root', 1, 2),
(85, 'Gutierrez', 'Carmen', 'root', 1, 3),
(86, 'Santos', 'Diego', 'root', 1, 3),
(87, 'Lopez', 'Maria', 'root', 1, 4),
(88, 'Silva', 'Manuel', 'root', 1, 4),
(89, 'Molina', 'Ana', 'root', 1, 5),
(90, 'Sanchez', 'Pablo', 'root', 1, 5),
(91, 'Cruz', 'Jorge', 'root', 1, 6),
(92, 'Gomez', 'Isabella', 'root', 1, 6),
(93, 'Gonzalez', 'Federico', 'root', 1, 7),
(94, 'Hernandez', 'Luisa', 'root', 1, 7),
(95, 'Alvarez', 'Antonio', 'root', 1, 1),
(96, 'Romero', 'Beatriz', 'root', 1, 2),
(97, 'Reyes', 'Carlos', 'root', 1, 3),
(98, 'Sosa', 'Diana', 'root', 1, 4),
(99, 'Ruiz', 'Eduardo', 'root', 1, 5),
(100, 'Navarro', 'Flor', 'root', 1, 6);

-- --------------------------------------------------------

--
-- Structure de la table `matiere`
--

DROP TABLE IF EXISTS `matiere`;
CREATE TABLE IF NOT EXISTS `matiere` (
  `id_matiere` int(11) NOT NULL AUTO_INCREMENT,
  `nom_matiere` varchar(30) NOT NULL,
  `idProfesseur_matiere` int(11) NOT NULL,
  PRIMARY KEY (`id_matiere`),
  KEY `FK_matiere_Pro` (`idProfesseur_matiere`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `matiere`
--

INSERT INTO `matiere` (`id_matiere`, `nom_matiere`, `idProfesseur_matiere`) VALUES
(1, 'SVT', 1),
(2, 'Physique Chimie', 3),
(3, 'Français ', 4),
(4, 'Mathématique', 5),
(5, 'réseau', 6),
(6, 'developement ', 7),
(7, 'Anglais', 8),
(8, 'Espagnol', 9),
(9, 'Histoire Geo', 1),
(10, 'Technologie', 6),
(11, 'sport', 10);

-- --------------------------------------------------------

--
-- Structure de la table `note`
--

DROP TABLE IF EXISTS `note`;
CREATE TABLE IF NOT EXISTS `note` (
  `id_note` int(11) NOT NULL AUTO_INCREMENT,
  `idEleve_note` int(11) NOT NULL,
  `note` int(11) NOT NULL,
  `id_matiere` int(11) NOT NULL,
  `date_att` date NOT NULL,
  PRIMARY KEY (`id_note`),
  KEY `FK_note_el` (`idEleve_note`),
  KEY `FK_note_ma` (`id_matiere`)
) ENGINE=MyISAM AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `note`
--

INSERT INTO note (id_note, idEleve_note, note, id_matiere, date_att) 
VALUES 
    (NULL, 7, 12, 5, '2022-01-02'),
    (NULL, 12, 16, 3, '2022-02-14'),
    (NULL, 3, 14, 2, '2022-03-10'),
    (NULL, 8, 10, 1, '2022-04-22'),
    (NULL, 9, 18, 10, '2022-05-05'),
    (NULL, 6, 11, 2, '2022-06-30'),
    (NULL, 5, 19, 1, '2022-07-12'),
    (NULL, 4, 17, 3, '2022-08-04'),
    (NULL, 10, 15, 6, '2022-09-20'),
    (NULL, 2, 13, 1, '2022-10-31'),
    (NULL, 1, 9, 3, '2022-11-23'),
    (NULL, 11, 20, 2, '2022-12-17'),
    (NULL, 12, 8, 1, '2023-01-08'),
    (NULL, 10, 12, 3, '2023-02-12'),
    (NULL, 6, 18, 2, '2023-03-17'),
    (NULL, 1, 11, 1, '2023-04-25'),
    (NULL, 5, 14, 9, '2023-05-18'),
    (NULL, 7, 16, 2, '2023-06-30'),
    (NULL, 8, 13, 7, '2023-07-11'),
    (NULL, 9, 19, 3, '2023-08-22'),
    (NULL, 3, 17, 2, '2023-09-10'),
    (NULL, 4, 11, 1, '2023-10-21'),
    (NULL, 2, 9, 3, '2023-11-13'),
    (NULL, 11, 20, 10, '2023-12-25'),
    (NULL, 8, 12, 8, '2024-01-16'),
    (NULL, 7, 14, 3, '2024-02-29'),
    (NULL, 12, 18, 2, '2024-03-20'),
    (NULL, 1, 11, 1, '2024-04-28'),
    (NULL, 5, 9, 3, '2024-05-21'),
    (NULL, 6, 16, 2, '2024-06-15'),
    (NULL, 10, 15, 1, '2024-07-07'),
    (NULL, 9, 20, 3, '2024-08-19'),
    (NULL, 3, 13, 2, '2024-09-25');

-- --------------------------------------------------------

--
-- Structure de la table `personnel`
--

DROP TABLE IF EXISTS `personnel`;
CREATE TABLE IF NOT EXISTS `personnel` (
  `id_perso` int(11) NOT NULL AUTO_INCREMENT,
  `nom_perso` varchar(30) NOT NULL,
  `prenom_perso` varchar(30) NOT NULL,
  `mdp` varchar(30) NOT NULL,
  `role` int(11) NOT NULL,
  PRIMARY KEY (`id_perso`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `personnel`
--

INSERT INTO `personnel` (`id_perso`, `nom_perso`, `prenom_perso`, `mdp`, `role`) VALUES
(1, 'Alfardous', 'Rhizlene', 'root', 2),
(2, 'dupont', 'jean', 'root', 3),
(3, 'Porcu', 'Lorenzo', 'root', 2),
(4, 'Leho', 'Arthur', 'root', 2),
(5, 'Gondre', 'Maceo', 'root', 2),
(6, 'Covarel', 'Dylan', 'root', 2),
(7, 'Roumanet', 'David', 'root', 2),
(8, 'Murphy', 'Cillian', 'root', 2),
(9, 'Pascal', 'Pedro', 'root', 2),
(10, 'Zidi', 'Kamil', 'root', 2);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id_role` int(11) NOT NULL AUTO_INCREMENT,
  `nom_role` varchar(30) NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id_role`, `nom_role`) VALUES
(1, 'Eleve'),
(2, 'Professeur'),
(3, 'Proviseur');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
