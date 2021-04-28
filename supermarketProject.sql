CREATE DATABASE  IF NOT EXISTS `supermarketProject` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `supermarketProject`;
-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: supermarketProject
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Category_Id` int NOT NULL,
  `Price` int NOT NULL,
  `Image_URL` varchar(120) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Category_Id_idx` (`Category_Id`),
  CONSTRAINT `Category_Id` FOREIGN KEY (`Category_Id`) REFERENCES `ProductsCategories` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'Tomato',2,5,'tomato.png'),(2,'Cucumber',2,2,'cucumber.png'),(3,'White Bread',5,3,'bread.png'),(4,'Eggs',1,6,'eggs.png'),(5,'Salmon Fish',3,29,'salmon.png'),(6,'Meat',3,33,'meat.png'),(7,'Coke',4,4,'coke.png'),(8,'Sprite',4,3,'sprite.png'),(19,'Milk',1,3,'milk.png'),(20,'Cheese',1,6,'cheese.png'),(21,'Butter',1,5,'butter.png'),(22,'Mango',2,4,'mango.png'),(23,'Soy Beans',2,7,'soyBeans.png'),(24,'Hummus Beans',2,5,'navyBeans.png'),(25,'Chicken Shin',3,10,'chickenShin.png'),(26,'Chicken Breast',3,12,'chickenBreast.png'),(27,'Wine',4,16,'wine.png'),(28,'Whiskey',4,22,'whiskey.png'),(29,'Croissant',5,4,'croissant.png'),(30,'Whole Bread',5,6,'wholeBread.png'),(31,'Pita',5,5,'pita.png');
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductsCategories`
--

DROP TABLE IF EXISTS `ProductsCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductsCategories` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductsCategories`
--

LOCK TABLES `ProductsCategories` WRITE;
/*!40000 ALTER TABLE `ProductsCategories` DISABLE KEYS */;
INSERT INTO `ProductsCategories` VALUES (1,'Milk & Eggs'),(2,'Vegetables & Fruits'),(3,'Meat & Fish'),(4,'Wine & Drinks'),(5,'Bread & Carbs');
/*!40000 ALTER TABLE `ProductsCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservations`
--

DROP TABLE IF EXISTS `Reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reservations` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `User_Id` int NOT NULL,
  `Cart_Id` int NOT NULL,
  `Final_Price` int NOT NULL,
  `City` varchar(45) NOT NULL,
  `Street` varchar(45) NOT NULL,
  `Reservation_Date` date NOT NULL,
  `Delivery_Date` date NOT NULL,
  `Payment` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservations`
--

LOCK TABLES `Reservations` WRITE;
/*!40000 ALTER TABLE `Reservations` DISABLE KEYS */;
INSERT INTO `Reservations` VALUES (10,13,55,28,'Jerusalem','Natur','2021-02-19','2021-02-22','654366543665'),(11,13,55,28,'Jerusalem','Natur','2021-02-19','2021-02-24','654366543665'),(12,13,55,28,'Jerusalem','Natur','2021-02-19','2021-02-20','654366543665'),(13,13,55,28,'Jerusalem','Natur','2021-02-19','2021-02-23','654366543665'),(14,13,55,28,'Jerusalem','Natur','2021-02-19','2021-02-26','654366543665'),(15,13,55,28,'Jerusalem','Natur','2021-02-19','2021-02-23','654366543665'),(16,13,58,34,'Jerusalem','Natur','2021-02-20','2021-02-26','654366543665'),(17,13,58,34,'Jerusalem','Natur','2021-02-20','2021-02-23','654366543665'),(18,13,59,75,'Jerusalem','Natur','2021-02-20','2021-02-24','654366543665'),(19,13,60,4,'Jerusalem','Natur','2021-02-21','2021-02-24','654366543665'),(20,13,61,3,'Jerusalem','Natur','2021-02-21','2021-02-27','654366543665'),(21,13,62,2,'Jerusalem','Natur','2021-02-21','2021-03-19','654366543665'),(22,13,63,218,'Jerusalem','Natur','2021-02-21','2021-03-15','654366543665'),(36,13,88,87,'Jerusalem','Natur','2021-03-08','2021-03-12','654366543665'),(37,13,89,31,'Jerusalem','Natur','2021-03-08','2021-03-12','654366543665'),(38,13,92,29,'Jerusalem','Natur','2021-03-08','2021-03-24','654366543663');
/*!40000 ALTER TABLE `Reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShoppingCarts`
--

DROP TABLE IF EXISTS `ShoppingCarts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShoppingCarts` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `User_Id` int NOT NULL,
  `Creation_Date` date NOT NULL,
  `Is_Active` tinyint NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `User_Id_idx` (`User_Id`),
  CONSTRAINT `User_Id` FOREIGN KEY (`User_Id`) REFERENCES `Users` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShoppingCarts`
--

LOCK TABLES `ShoppingCarts` WRITE;
/*!40000 ALTER TABLE `ShoppingCarts` DISABLE KEYS */;
INSERT INTO `ShoppingCarts` VALUES (1,12,'2020-01-20',0),(2,4,'2021-02-08',0),(28,8,'2021-02-08',0),(33,5,'2021-02-08',0),(34,5,'2021-02-08',0),(35,11,'2021-02-08',0),(58,13,'2021-02-20',0),(59,13,'2021-02-20',0),(60,13,'2021-02-21',0),(61,13,'2021-02-21',0),(62,13,'2021-02-21',0),(63,13,'2021-02-21',0),(64,13,'2021-02-21',0),(65,13,'2021-02-21',0),(70,13,'2021-02-22',0),(71,13,'2021-02-22',0),(73,13,'2021-02-24',0),(74,13,'2021-02-25',0),(75,13,'2021-02-28',0),(76,13,'2021-03-01',0),(82,13,'2021-03-07',0),(83,13,'2021-03-08',0),(84,13,'2021-03-08',0),(85,13,'2021-03-08',0),(86,13,'2021-03-08',0),(88,13,'2021-03-08',0),(89,13,'2021-03-08',0),(92,13,'2021-03-08',0);
/*!40000 ALTER TABLE `ShoppingCarts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShoppingCartsProducts`
--

DROP TABLE IF EXISTS `ShoppingCartsProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShoppingCartsProducts` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Product_Id` int NOT NULL,
  `Amount` int NOT NULL,
  `Total_Price` int NOT NULL,
  `Cart_Id` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Product_Id_idx` (`Product_Id`),
  KEY `Cart_Id_idx` (`Cart_Id`),
  CONSTRAINT `Cart_Id` FOREIGN KEY (`Cart_Id`) REFERENCES `ShoppingCarts` (`Id`),
  CONSTRAINT `Product_Id` FOREIGN KEY (`Product_Id`) REFERENCES `Products` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=315 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShoppingCartsProducts`
--

LOCK TABLES `ShoppingCartsProducts` WRITE;
/*!40000 ALTER TABLE `ShoppingCartsProducts` DISABLE KEYS */;
INSERT INTO `ShoppingCartsProducts` VALUES (1,2,3,3,1),(2,5,3,15,1),(5,3,3,45,1),(6,3,3,45,1),(7,1,2,2,1),(8,4,4,20,1),(9,5,6,174,1),(10,7,2,8,1),(44,1,5,7,1),(45,1,5,7,1),(196,1,2,2,58),(197,3,1,3,58),(198,5,1,29,58),(199,2,3,3,59),(200,3,2,6,59),(201,6,2,66,59),(202,1,2,2,60),(203,2,2,2,60),(204,2,3,3,61),(205,2,2,2,62),(206,5,4,116,63),(207,6,3,99,63),(208,2,3,3,63),(209,8,2,8,64),(210,4,3,15,64),(211,3,2,6,64),(212,3,3,9,65),(213,4,3,15,65),(214,5,2,58,65),(234,8,2,8,70),(235,3,2,6,70),(236,8,2,8,71),(237,1,2,2,71),(238,2,2,2,71),(239,1,2,2,71),(243,2,1,1,73),(244,3,2,6,73),(245,4,1,5,73),(246,5,4,116,73),(247,6,2,66,73),(248,7,2,8,73),(254,2,2,4,74),(255,3,2,6,74),(256,8,2,8,74),(257,4,1,6,74),(258,5,3,87,74),(259,6,4,132,74),(260,7,2,8,74),(265,2,2,4,75),(266,7,5,20,75),(267,4,2,12,75),(268,2,2,4,76),(269,3,2,6,76),(280,8,2,8,82),(283,6,2,66,83),(284,7,3,12,83),(285,2,2,4,84),(286,2,2,4,85),(287,1,4,20,85),(288,2,3,6,86),(289,7,2,8,86),(303,5,3,87,88),(304,1,2,10,89),(305,2,3,6,89),(306,1,3,15,89),(313,3,3,9,92),(314,21,4,20,92);
/*!40000 ALTER TABLE `ShoppingCartsProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `First_Name` varchar(45) NOT NULL,
  `Last_Name` varchar(45) NOT NULL,
  `User_Name` varchar(45) NOT NULL,
  `User_Id` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `City` varchar(45) DEFAULT NULL,
  `Street` varchar(45) DEFAULT NULL,
  `User_Type` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`,`User_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (3,'Hana','Cohen','hana@gmail.com','42344567','ed9ebdd14671e1538f79455ca733ee5f','Tel Aviv','Levinsky','Client'),(4,'Ben','Levi','thegirl@gmail.com','42454567','ed9ebdd14671e1538f79455ca733ee5f','Tel Aviv','Levinsky','Client'),(5,'Guy','Izhaki','theboy@gmail.com','42342445','ed9ebdd14671e1538f79455ca733ee5f','Tel Aviv','Levinsky','Client'),(8,'Ori','Malka','ori@gmail.com','64365434','ed9ebdd14671e1538f79455ca733ee5f','Tel Aviv','Levinsky','Client'),(10,'Roni','Ilan','roni@gmail.com','556786587','165a1b5007fd238947be3fb4267fcb68','Jerusalem','Levinsky','Client'),(11,'Rotem','Jay','rotem@gmail.com','123456789','165a1b5007fd238947be3fb4267fcb68','Jerusalem','Ben Gurion 4','Client'),(12,'Admin','Hi','admin@gmail.com','123456788','165a1b5007fd238947be3fb4267fcb68','Jerusalem','Ben Gurion 4','Admin'),(13,'Client','Hi','client@gmail.com','123456777','165a1b5007fd238947be3fb4267fcb68','Jerusalem','Natur','Client');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-08 23:33:28
