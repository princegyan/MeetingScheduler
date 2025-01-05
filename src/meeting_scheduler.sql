-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Jan 05, 2025 at 07:35 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meeting_scheduler`
--
CREATE DATABASE IF NOT EXISTS `meeting_scheduler` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `meeting_scheduler`;

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

DROP TABLE IF EXISTS `meetings`;
CREATE TABLE `meetings` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `duration` int(11) NOT NULL,
  `participants` text NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`id`, `title`, `date`, `time`, `duration`, `participants`, `description`, `created_at`) VALUES
(9, 'Project Review', '2025-01-13', '14:00:00', 60, 'manager@company.com, team@company.com', 'Monthly project status review', '2025-01-05 15:12:00'),
(10, 'Client Meeting', '2025-01-16', '11:00:00', 45, 'client@client.com, sales@company.com', 'New feature discussion', '2025-01-05 15:39:02'),
(11, 'Sprint Planning', '2025-01-10', '09:00:00', 60, 'developers@company.com', 'Planning for next sprint', '2025-01-05 15:44:57'),
(12, 'Design Review', '2025-01-06', '13:30:00', 30, 'design@company.com, product@company.com, mavis@ceo.com', 'Review new design proposals. This is an updated version of this meeting', '2025-01-05 15:46:34'),
(13, 'Quarterly Business Review', '2025-01-12', '15:00:00', 60, 'management@company.com, finance@company.com', 'Quarterly business performance review', '2025-01-05 15:50:09'),
(14, 'Quarterly Business Review', '2025-01-14', '15:00:00', 30, 'management@company.com, finance@company.com', 'Quarterly business performance review', '2025-01-05 15:57:37'),
(15, 'Team Building Activity', '2025-01-26', '09:00:00', 60, 'team@company.com', 'Outdoor team-building activity', '2025-01-05 16:02:42'),
(16, 'Sales Strategy Meeting', '2025-01-27', '10:00:00', 60, 'sales@company.com, management@company.com', 'Discuss strategies for the upcoming quarter', '2025-01-05 16:14:04'),
(17, 'Marketing Campaign Launch', '2025-01-28', '14:00:00', 45, 'marketing@company.com, product@company.com', 'Plan and launch new marketing campaign', '2025-01-05 16:27:35'),
(20, 'One to One With Alfred', '2025-01-06', '12:00:00', 30, 'Alfred@company.com, mavis.ceo@company.com', '', '2025-01-05 17:28:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `available_slots` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
