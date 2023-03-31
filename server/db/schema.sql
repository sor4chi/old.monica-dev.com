/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blogs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'blog id',
  `title` varchar(255) NOT NULL COMMENT 'blog title',
  `description` varchar(255) NOT NULL COMMENT 'blog description',
  `slug` varchar(255) NOT NULL COMMENT 'blog slug',
  `content` text NOT NULL COMMENT 'blog content',
  `created_at` datetime NOT NULL COMMENT 'blog created at',
  `updated_at` datetime NOT NULL COMMENT 'blog updated at',
  `published_at` datetime DEFAULT NULL COMMENT 'blog published at, null if not published',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_blogs_slug_published_at` (`slug`,`published_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `blogs_tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs_tags` (
  `blog_id` int NOT NULL COMMENT 'blog id',
  `tag_id` int NOT NULL COMMENT 'tag id',
  PRIMARY KEY (`blog_id`,`tag_id`),
  KEY `idx_blog_id_tag_id` (`blog_id`,`tag_id`),
  KEY `fk_blogs_tags_tag_id` (`tag_id`),
  CONSTRAINT `fk_blogs_tags_blog_id` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_blogs_tags_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `blogs_tags_view`
--

SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `blogs_tags_view` AS SELECT
 1 AS `id`,
 1 AS `title`,
 1 AS `slug`,
 1 AS `description`,
 1 AS `content`,
 1 AS `created_at`,
 1 AS `updated_at`,
 1 AS `published_at`,
 1 AS `tag_id`,
 1 AS `tag_slug`,
 1 AS `tag_name`,
 1 AS `tag_created_at`,
 1 AS `tag_updated_at`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `schema_migrations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(128) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'tag id',
  `name` varchar(255) NOT NULL COMMENT 'tag name',
  `slug` varchar(255) NOT NULL COMMENT 'tag slug',
  `created_at` datetime NOT NULL COMMENT 'tag created at',
  `updated_at` datetime NOT NULL COMMENT 'tag updated at',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_tags_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'portfolio'
--

--
-- Final view structure for view `blogs_tags_view`
--

/*!50001 DROP VIEW IF EXISTS `blogs_tags_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`monica`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `blogs_tags_view` AS select `b`.`id` AS `id`,`b`.`title` AS `title`,`b`.`slug` AS `slug`,`b`.`description` AS `description`,`b`.`content` AS `content`,`b`.`created_at` AS `created_at`,`b`.`updated_at` AS `updated_at`,`b`.`published_at` AS `published_at`,`t`.`id` AS `tag_id`,`t`.`slug` AS `tag_slug`,`t`.`name` AS `tag_name`,`t`.`created_at` AS `tag_created_at`,`t`.`updated_at` AS `tag_updated_at` from ((`blogs` `b` join `blogs_tags` `bt` on((`b`.`id` = `bt`.`blog_id`))) join `tags` `t` on((`bt`.`tag_id` = `t`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed

--
-- Dbmate schema migrations
--

LOCK TABLES `schema_migrations` WRITE;
INSERT INTO `schema_migrations` (version) VALUES
  ('20230331001102'),
  ('20230331001115'),
  ('20230331001134'),
  ('20230331130913');
UNLOCK TABLES;
