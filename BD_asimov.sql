-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 26 avr. 2023 à 09:46
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

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
  `capacite` int(2) NOT NULL,
  PRIMARY KEY (`id_classe`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
   `role` int(11) NOT NULL DEFAULT 1,
  `age_eleve` varchar(2) NOT NULL,
  `id_classe` int(11) NOT NULL,
  PRIMARY KEY (`id_eleve`),
  KEY `FK_classe_el` (`id_classe`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
  `description` varchar(233) NOT NULL,
  PRIMARY KEY (`id_note`),
  KEY `FK_note_el` (`idEleve_note`),
  KEY `FK_note_ma` (`id_matiere`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
  `matiere` tinyint(1) NOT NULL,
  `role` int(11) NOT NULL,
  PRIMARY KEY (`id_perso`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `personnel`
--

INSERT INTO `personnel` (`id_perso`, `nom_perso`, `prenom_perso`, `mdp`, `matiere`, `role`) VALUES
(1, 'Alfardous', 'Rhizlene', 'root', 1, 2),
(2, 'dupont', 'jean', 'root', 5, 3);

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
