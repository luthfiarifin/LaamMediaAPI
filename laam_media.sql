/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE IF NOT EXISTS `laam_media` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `laam_media`;

CREATE TABLE IF NOT EXISTS `admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT IGNORE INTO `admin` (`id`, `name`, `email`, `password`) VALUES
	(3, 'Muhammad Luthfi Arifin', 'admin@admin.com', 'admin'),
	(4, 'Laam Miim', 'laamdev@admin.com', 'admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `dirrect_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `destination_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_dirrect_message_user` (`user_id`),
  KEY `FK_dirrect_message_user_2` (`destination_id`),
  CONSTRAINT `FK_dirrect_message_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_dirrect_message_user_2` FOREIGN KEY (`destination_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `dirrect_message` DISABLE KEYS */;
INSERT IGNORE INTO `dirrect_message` (`id`, `destination_id`, `user_id`, `content`, `created_at`) VALUES
	(35, 2, 3, 'wow, I like your photo men', '2019-10-20 09:39:44'),
	(36, 3, 2, 'owww, thanks men', '2019-10-20 09:40:13'),
	(37, 2, 3, 'you\'re welcome', '2019-10-20 09:40:33'),
	(38, 2, 3, 'I have like all you\'ve post men', '2019-10-20 09:41:54'),
	(39, 3, 2, 'thanks very much men', '2019-10-20 09:42:09'),
	(40, 1, 2, 'hello arifin', '2019-10-20 09:44:02'),
	(41, 1, 2, 'how are you today?', '2019-10-20 09:44:15'),
	(42, 3, 2, 'hei', '2019-10-22 21:23:41'),
	(43, 3, 2, 'heii', '2019-10-22 21:24:41'),
	(44, 2, 3, 'knp? ', '2019-10-22 21:25:00'),
	(45, 3, 2, 'nggak pp', '2019-10-22 21:25:05'),
	(46, 3, 5, 'hai arifin', '2019-10-22 22:05:08'),
	(47, 5, 3, 'hi laam', '2019-10-22 22:05:21'),
	(48, 5, 3, 'how are you today? ', '2019-10-22 22:05:36'),
	(49, 3, 5, 'i\'m fine thx', '2019-10-22 22:05:51'),
	(50, 3, 5, 'i very like your photo. men', '2019-10-22 22:06:06'),
	(51, 5, 3, 'owww thankss', '2019-10-22 22:06:22'),
	(52, 5, 3, 'i like your photo too men', '2019-10-22 22:06:34'),
	(53, 3, 5, 'thankss men', '2019-10-22 22:06:43'),
	(54, 3, 7, 'heii luthfi', '2019-10-22 22:30:31'),
	(55, 7, 3, 'heii laamm', '2019-10-22 22:30:46'),
	(56, 3, 7, 'what are you today?', '2019-10-22 22:31:09'),
	(57, 7, 3, 'i\'m fine thx', '2019-10-22 22:31:21');
/*!40000 ALTER TABLE `dirrect_message` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `following_map` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `following_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_following_map_user` (`user_id`),
  KEY `FK_following_map_user_2` (`following_id`),
  CONSTRAINT `FK_following_map_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_following_map_user_2` FOREIGN KEY (`following_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `following_map` DISABLE KEYS */;
INSERT IGNORE INTO `following_map` (`id`, `user_id`, `following_id`, `created_at`) VALUES
	(1, 2, 1, '2019-10-20 07:36:19'),
	(2, 1, 2, '2019-10-20 07:36:31'),
	(3, 3, 2, '2019-10-20 09:27:18'),
	(5, 2, 3, '2019-10-20 09:40:42'),
	(6, 3, 1, '2019-10-20 09:43:21'),
	(7, 5, 3, '2019-10-22 22:03:12'),
	(8, 3, 5, '2019-10-22 22:04:56'),
	(9, 5, 2, '2019-10-22 22:08:59'),
	(11, 7, 3, '2019-10-22 22:28:33'),
	(12, 3, 7, '2019-10-22 22:30:19');
/*!40000 ALTER TABLE `following_map` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `job_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `active` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `job_category` DISABLE KEYS */;
INSERT IGNORE INTO `job_category` (`id`, `name`, `active`) VALUES
	(1, 'Accounting', '1'),
	(2, 'Admin & Clerical', '1'),
	(3, 'Automotive', '1'),
	(4, 'Banking', '1'),
	(5, 'Biotech', '1'),
	(6, 'Broadcast  Journalism', '1'),
	(7, 'Business Development', '1'),
	(8, 'Construction', '1'),
	(9, 'Consultant', '1'),
	(10, 'Customer Service', '1'),
	(11, 'Design', '1'),
	(12, 'Distribution  Shipping', '1'),
	(13, 'Education  Teaching', '1'),
	(14, 'Engineering', '1'),
	(15, 'Entry Level  New Grad', '1'),
	(16, 'Executive', '1'),
	(17, 'Facilities', '1'),
	(18, 'Finance', '1'),
	(19, 'Franchise', '1'),
	(20, 'General Business', '1'),
	(21, 'General Labor', '1'),
	(22, 'Government', '1'),
	(23, 'Grocery', '1'),
	(24, 'Health Care', '1'),
	(25, 'Hotel  Hospitality', '1'),
	(26, 'Human Resources', '1'),
	(27, 'Information Technology', '1'),
	(28, 'Installation  Maint  Repair', '1'),
	(29, 'Insurance', '1'),
	(30, 'Inventory', '1'),
	(31, 'Legal', '1'),
	(32, 'Legal Admin', '1'),
	(33, 'Management', '1'),
	(34, 'Manufacturing', '1'),
	(35, 'Marketing', '1'),
	(36, 'Media  Journalism  Newspaper', '1'),
	(37, 'Nonprofit  Social Services', '1'),
	(38, 'Nurse', '1'),
	(39, 'Pharmaceutical', '1'),
	(40, 'Professional Services', '1'),
	(41, 'Purchasing  Procurement', '1'),
	(42, 'QA  Quality Control', '1'),
	(43, 'Real Estate', '1'),
	(44, 'Research', '1'),
	(45, 'Restaurant  Food Service', '1'),
	(46, 'Retail', '1'),
	(47, 'Sales', '1'),
	(48, 'Science', '1'),
	(49, 'Skilled Labor  Trades', '1'),
	(50, 'Strategy  Planning', '1'),
	(51, 'Supply Chain', '1'),
	(52, 'Telecommunications', '1'),
	(53, 'Training', '1'),
	(54, 'Transportation', '1'),
	(55, 'Warehouse', '1');
/*!40000 ALTER TABLE `job_category` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `post` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `image_url` text DEFAULT NULL,
  `active` enum('1','0') NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `delete_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_post_user` (`user_id`),
  KEY `FK_post_category` (`category_id`),
  CONSTRAINT `FK_post_category` FOREIGN KEY (`category_id`) REFERENCES `post_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_post_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT IGNORE INTO `post` (`id`, `user_id`, `category_id`, `title`, `content`, `image_url`, `active`, `created_at`, `delete_at`) VALUES
	(1, 1, 1, 'Cloud', 'Country on the cloud, it\'s very amazing. I like that', '2019102071730.jpg', '1', '2019-09-20 07:17:30', NULL),
	(2, 1, 10, 'Colorfull', 'Art full of color', '201910207199.jpg', '1', '2019-08-20 07:19:09', NULL),
	(3, 2, 1, 'Mountain', 'I\'like mountain because it\'s very beautifull', '2019102072436.jpg', '1', '2019-06-20 07:24:36', NULL),
	(4, 2, 8, 'New Technology', 'I very like new technology. It\'s very amazing men.', '2019102072543.jpg', '1', '2019-10-20 07:25:43', NULL),
	(5, 2, 5, 'Beach', 'it\'s very beautiful. I very like that', '2019102072731.jpg', '1', '2019-10-20 07:27:31', NULL),
	(6, 3, 6, 'Gaming', 'Game is very happiness', '2019102093010.jpg', '1', '2019-10-20 09:30:10', NULL),
	(10, 7, 10, 'Edifices', 'Bright edifices', '20191022222927.jpg', '1', '2019-10-22 22:29:27', NULL);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `post_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `active` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `post_category` DISABLE KEYS */;
INSERT IGNORE INTO `post_category` (`id`, `name`, `active`) VALUES
	(1, 'Travel', '1'),
	(2, 'Style', '1'),
	(3, 'Music', '1'),
	(4, 'TV & Movies', '1'),
	(5, 'Nature', '1'),
	(6, 'Gaming', '1'),
	(7, 'Auto', '1'),
	(8, 'Science & Tech', '1'),
	(9, 'Sports', '1'),
	(10, 'Art', '1'),
	(11, 'Humor', '1'),
	(12, 'Comic', '1');
/*!40000 ALTER TABLE `post_category` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `post_comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_comment_post` (`post_id`),
  KEY `FK_comment_user` (`user_id`),
  CONSTRAINT `FK_comment_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `post_comment` DISABLE KEYS */;
INSERT IGNORE INTO `post_comment` (`id`, `post_id`, `user_id`, `content`, `created_at`) VALUES
	(11, 10, 3, 'i like this picture', '2019-10-22 22:32:12'),
	(12, 10, 7, 'owww thanks luthfii', '2019-10-22 22:32:28');
/*!40000 ALTER TABLE `post_comment` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `post_like` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_post_like_user` (`user_id`),
  KEY `FK_post_like_post` (`post_id`),
  CONSTRAINT `FK_post_like_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_post_like_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `post_like` DISABLE KEYS */;
INSERT IGNORE INTO `post_like` (`id`, `user_id`, `post_id`, `created_at`) VALUES
	(35, 7, 6, '2019-10-22 22:28:41'),
	(36, 7, 10, '2019-10-22 22:29:30'),
	(37, 3, 10, '2019-10-22 22:32:00');
/*!40000 ALTER TABLE `post_like` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `job_id` bigint(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `bio` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `active` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_user_job_category` (`job_id`),
  CONSTRAINT `FK_user_job_category` FOREIGN KEY (`job_id`) REFERENCES `job_category` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT IGNORE INTO `user` (`id`, `job_id`, `email`, `password`, `name`, `bio`, `image_url`, `active`) VALUES
	(1, 27, 'arifin@gmail.com', '123', 'Arifin', 'Jakarta, Indonesia', '2019102071613.jpg', '1'),
	(2, 13, 'lammim012@gmail.com', '123', 'Laam Miim', 'I\'am teacher at Junior high school in Jakarta, Indonesia', '2019102072256.jpg', '1'),
	(3, 7, 'luthfiarifin0222@gmail.com', '123', 'Muhammad Luthfi Arifin', 'I\'am Android, Backend, Web Developer from Jakarta, Indonesia', '20191022185724.jpg', '1'),
	(5, 2, 'laam@gmail.com', '123', 'Laam', 'I\'m administrator at PT. Laam', '2019102222250.jpg', '1'),
	(7, 27, 'mim@gmail.com', 'qwe', 'Laam MaaM', 'I\'m Fullstack android developer', '20191022222814.jpg', '1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
