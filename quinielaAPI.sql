-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: quiniela
-- ------------------------------------------------------
-- Server version	5.7.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(45) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_by` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `title` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcador`
--

DROP TABLE IF EXISTS `marcador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcador` (
  `id_marcador` int(11) NOT NULL AUTO_INCREMENT,
  `status_marcador` int(11) DEFAULT '1',
  `marcador1_marcador` int(11) DEFAULT NULL,
  `marcador2_marcador` int(11) DEFAULT NULL,
  `quiniela_id_marcador` int(11) DEFAULT NULL,
  `partido_id_marcador` int(11) DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_marcador`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcador`
--

LOCK TABLES `marcador` WRITE;
/*!40000 ALTER TABLE `marcador` DISABLE KEYS */;
INSERT INTO `marcador` VALUES (1,1,1,1,1,1,NULL),(2,1,2,1,1,2,NULL),(3,1,1,1,2,1,NULL),(4,1,2,1,2,2,NULL),(5,1,1,1,5,1,NULL),(6,1,2,0,5,2,NULL),(7,1,1,1,4,1,NULL),(8,1,2,0,4,2,NULL),(9,1,0,2,1,3,NULL),(10,1,0,2,4,3,NULL),(11,1,1,0,1,4,NULL),(12,1,1,0,2,4,NULL),(13,1,2,0,1,5,NULL),(14,1,0,1,2,5,NULL),(15,1,2,0,4,5,NULL),(16,1,1,1,2,3,NULL),(17,1,3,3,1,6,NULL),(18,1,3,3,4,6,NULL),(19,1,3,1,2,6,NULL);
/*!40000 ALTER TABLE `marcador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partido`
--

DROP TABLE IF EXISTS `partido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partido` (
  `id_partido` int(11) NOT NULL,
  `titulo_partido` varchar(30) DEFAULT NULL,
  `horario_partido` varchar(8) NOT NULL,
  `fecha_partido` date NOT NULL,
  `equipo1_partido` varchar(14) NOT NULL,
  `equipo2_partido` varchar(14) NOT NULL,
  `estadio_partido` varchar(100) NOT NULL,
  `marcador1_partido` bit(1) NOT NULL,
  `marcador2_partido` bit(1) NOT NULL,
  `status_partido` tinyint(1) DEFAULT '1',
  `grupo_partido` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id_partido`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partido`
--

LOCK TABLES `partido` WRITE;
/*!40000 ALTER TABLE `partido` DISABLE KEYS */;
INSERT INTO `partido` VALUES (1,NULL,'12:00','2022-11-20','Catar','Ecuador','Estadio Al Bayt',_binary '\0',_binary '\0',1,'A'),(2,NULL,'09:00','2022-11-21','Inglaterra','Irán','Estadio Khalifa',_binary '\0',_binary '\0',1,'B'),(3,NULL,'12:00','2022-11-21','Senegal','Países Bajos','Estadio Al Thumama',_binary '\0',_binary '\0',1,'A'),(4,NULL,'15:00','2022-11-21','Estados Unidos','Gales','Estadio Ahmad Bin Ali',_binary '\0',_binary '\0',1,'B'),(5,NULL,'06:00','2022-11-22','Argentina','Arabia Saudita','Estadio Lusail',_binary '\0',_binary '\0',1,'C'),(6,NULL,'09:00','2022-11-22','Dinamarca','Túnez','Estadio Ciudad de la Educación',_binary '\0',_binary '\0',1,'D'),(7,NULL,'12:00','2022-11-22','México','Polonia','Estadio 974',_binary '\0',_binary '\0',1,'C'),(8,NULL,'15:00','2022-11-22','Francia','Australia','Estadio Al Janoub',_binary '\0',_binary '\0',1,'D'),(9,NULL,'06:00','2022-11-23','Marruecos','Croacia','Estadio Al Bayt',_binary '\0',_binary '\0',1,'F'),(10,NULL,'09:00','2022-11-23','Alemania','Japón','Estadio Khalifa',_binary '\0',_binary '\0',1,'E'),(11,NULL,'12:00','2022-11-23','España','Costa Rica','Estadio al Thumama',_binary '\0',_binary '\0',1,'E'),(12,NULL,'15:00','2022-11-23','Bélgica','Canadá','Estadio Ahmad Bin Ali',_binary '\0',_binary '\0',1,'F'),(13,NULL,'06:00','2022-11-24','Suiza','Camerún','Estadio Al Janoub',_binary '\0',_binary '\0',1,'G'),(14,NULL,'09:00','2022-11-24','Uruguay','Corea del Sur','Ciudad de la Educación',_binary '\0',_binary '\0',1,'H'),(15,NULL,'12:00','2022-11-24','Portugal','Ghana','Estadio 974',_binary '\0',_binary '\0',1,'H'),(16,NULL,'15:00','2022-11-24','Brasil','Serbia','Estadio Lusail',_binary '\0',_binary '\0',1,'G'),(17,NULL,'06:00','2022-11-25','Gales','Irán','Estadio Ahmad Bin Ali',_binary '\0',_binary '\0',1,'B'),(18,NULL,'09:00','2022-11-25','Catar','Senegal','Estadio Al Thumama',_binary '\0',_binary '\0',1,'A'),(19,NULL,'12:00','2022-11-25','Países Bajos','Ecuador','Estadio Khalifa',_binary '\0',_binary '\0',1,'A'),(20,NULL,'15:00','2022-11-25','Inglaterra','Estados Unidos','Estadio Al Bayt',_binary '\0',_binary '\0',1,'B'),(21,NULL,'06:00','2022-11-26','Túnez','Australia','Estadio Ahmad Bin Ali',_binary '\0',_binary '\0',1,'D'),(22,NULL,'09:00','2022-11-26','Polonia','Arabia Saudita','Estadio Ciudad de la Educación',_binary '\0',_binary '\0',1,'C'),(23,NULL,'12:00','2022-11-26','Francia','Dinamarca','Estadio 974',_binary '\0',_binary '\0',1,'D'),(24,NULL,'15:00','2022-11-26','Argentina','México','Estadio Lusail',_binary '\0',_binary '\0',1,'C'),(25,NULL,'06:00','2022-11-27','Japón','Costa Rica','Estadio Ahmad Bin Ali',_binary '\0',_binary '\0',1,'E'),(26,NULL,'09:00','2022-11-27','Bélgica','Marruecos','Estadio Al Thumama',_binary '\0',_binary '\0',1,'F'),(27,NULL,'12:00','2022-11-27','Croacia','Canadá','Estadio Khalifa',_binary '\0',_binary '\0',1,'F'),(28,NULL,'15:00','2022-11-27','España','Alemania','Estadio Al Bayt',_binary '\0',_binary '\0',1,'E'),(29,NULL,'06:00','2022-11-28','Camerún','Serbia','Estadio Al Janoub',_binary '\0',_binary '\0',1,'G'),(30,NULL,'09:00','2022-11-28','Corea del Sur','Ghana','Estadio Ciudad de la Educación',_binary '\0',_binary '\0',1,'H'),(31,NULL,'12:00','2022-11-28','Brasil','Suiza','Estadio 974',_binary '\0',_binary '\0',1,'G'),(32,NULL,'15:00','2022-11-28','Portugal','Uruguay','Estadio Lusail',_binary '\0',_binary '\0',1,'H'),(33,NULL,'11:00','2022-11-29','Ecuador','Senegal','Estadio Khalifa',_binary '\0',_binary '\0',1,'A'),(34,NULL,'11:00','2022-11-29','Países Bajos','Catar','Estadio Al Bayt',_binary '\0',_binary '\0',1,'A'),(35,NULL,'15:00','2022-11-29','Irán','Estados Unidos','Estadio Al Thumama',_binary '\0',_binary '\0',1,'B'),(36,NULL,'15:00','2022-11-29','Gales','Inglaterra','Estadio Bin Ali',_binary '\0',_binary '\0',1,'B'),(37,NULL,'11:00','2022-11-30','Túnez','Francia','Estadio Ciudad de la Educación',_binary '\0',_binary '\0',1,'D'),(38,NULL,'11:00','2022-11-30','Australia','Dinamarca','Estadio Al Janoub',_binary '\0',_binary '\0',1,'D'),(39,NULL,'15:00','2022-11-30','Polonia','Argentina','Estadio 974',_binary '\0',_binary '\0',1,'C'),(40,NULL,'15:00','2022-11-30','Arabia Saudita','México','Estadio Lusail',_binary '\0',_binary '\0',1,'C'),(41,NULL,'11:00','2022-12-01','Croacia','Bélgica','Estadio Ahmad Bin Ali',_binary '\0',_binary '\0',1,'F'),(42,NULL,'11:00','2022-12-01','Canadá','Marruecos','Estadio Al Thumama',_binary '\0',_binary '\0',1,'F'),(43,NULL,'15:00','2022-12-01','Japón','España','Estadio Khalifa',_binary '\0',_binary '\0',1,'E'),(44,NULL,'15:00','2022-12-01','Costa Rica','Alemania','Estadio Al Bayt',_binary '\0',_binary '\0',1,'E'),(45,NULL,'11:00','2022-12-02','Corea del Sur','Portugal','Estadio Ciudad de la Educación',_binary '\0',_binary '\0',1,'H'),(46,NULL,'11:00','2022-12-02','Ghana','Uruguay','Estadio Al Janoub',_binary '\0',_binary '\0',1,'H'),(47,NULL,'15:00','2022-12-02','Serbia','Suiza','Estadio 974',_binary '\0',_binary '\0',1,'G'),(48,NULL,'15:00','2022-12-02','Camerún','Brasil','Estadio Lusail',_binary '\0',_binary '\0',1,'G');
/*!40000 ALTER TABLE `partido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiniela`
--

DROP TABLE IF EXISTS `quiniela`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiniela` (
  `id_quiniela` int(11) NOT NULL AUTO_INCREMENT,
  `user_id_quiniela` int(11) DEFAULT NULL,
  `status_quiniela` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_quiniela`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiniela`
--

LOCK TABLES `quiniela` WRITE;
/*!40000 ALTER TABLE `quiniela` DISABLE KEYS */;
INSERT INTO `quiniela` VALUES (1,1,1),(2,2,1),(4,4,1),(5,5,1);
/*!40000 ALTER TABLE `quiniela` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `lastname` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `username` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `password` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin','admin','21232f297a57a5a743894a0e4a801fc3',NULL,1),(2,'guillermo','garcia','guilleglad','70e5dc44b83c4bad2bb1b476f378d2dc',NULL,1),(4,'belkis','hernandez','xiomy','70e5dc44b83c4bad2bb1b476f378d2dc',NULL,1),(5,'test','test','test','098f6bcd4621d373cade4e832627b4f6',NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-04 15:59:39
