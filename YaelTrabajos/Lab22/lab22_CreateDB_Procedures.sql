-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 01-11-2021 a las 08:23:47
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_labs`
--
CREATE DATABASE IF NOT EXISTS `db_labs` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `db_labs`;

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ACTUALIZAR` (IN `vnombres` VARCHAR(45), IN `vapellidos` VARCHAR(45))  BEGIN
	UPDATE empleado SET
    nombres = vnombres, apellidos = vapellidos;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_AGREGAR` (IN `vnombres` VARCHAR(45), IN `vapellidos` VARCHAR(45))  BEGIN
	INSERT INTO empleado (nombres, apellidos)
    VALUES(vnombres, vapellidos);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ELIMINAR` (IN `vcodigo` INT)  BEGIN
	DELETE FROM empleado WHERE codigo = vcodigo;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `codigo` int(11) NOT NULL,
  `nombres` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
