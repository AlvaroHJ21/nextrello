/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `boards` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cards` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `list_id` bigint unsigned DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `list_id` (`list_id`),
  CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `lists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `lists` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `board_id` bigint unsigned DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `board_id` (`board_id`),
  CONSTRAINT `lists_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `boards` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `boards` (`id`, `name`) VALUES
(1, 'Main');


INSERT INTO `cards` (`id`, `title`, `description`, `list_id`) VALUES
(1, 'hola', NULL, 27);
INSERT INTO `cards` (`id`, `title`, `description`, `list_id`) VALUES
(2, 'asdasd', NULL, 26);
INSERT INTO `cards` (`id`, `title`, `description`, `list_id`) VALUES
(3, 'asdasd', NULL, 25);
INSERT INTO `cards` (`id`, `title`, `description`, `list_id`) VALUES
(4, 'asdasd', NULL, 25),
(6, 'xd', NULL, 35);

INSERT INTO `lists` (`id`, `title`, `board_id`) VALUES
(25, 'To do', 1);
INSERT INTO `lists` (`id`, `title`, `board_id`) VALUES
(26, 'Pending', 1);
INSERT INTO `lists` (`id`, `title`, `board_id`) VALUES
(27, 'Done', 1);
INSERT INTO `lists` (`id`, `title`, `board_id`) VALUES
(35, 'Nuevo', 1);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;