-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 30-09-2022 a las 01:51:15
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Libreria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Administrador`
--

CREATE TABLE `Administrador` (
  `usuario` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `cedula` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `fecha_nacimiento` varchar(255) DEFAULT NULL,
  `lugar_nacimiento` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `genero` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `temasPreferencia` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Genero`
--

CREATE TABLE `Genero` (
  `id_genero` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarioTienda`
--

CREATE TABLE `inventarioTienda` (
  `id_inventario` int(11) NOT NULL,
  `id_libro` varchar(255) DEFAULT NULL,
  `cantidad` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Libro`
--

CREATE TABLE `Libro` (
  `id_libro` int(11) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `autor` varchar(255) DEFAULT NULL,
  `Resumen` varchar(255) DEFAULT NULL,
  `ano_publicado` varchar(255) DEFAULT NULL,
  `genero` varchar(255) DEFAULT NULL,
  `numero_paginas` int(11) DEFAULT NULL,
  `editorial` varchar(255) DEFAULT NULL,
  `ISSN` varchar(255) NOT NULL,
  `idioma` varchar(255) DEFAULT NULL,
  `fecha_publicacion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `precio` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pedidos`
--

CREATE TABLE `Pedidos` (
  `id_pedidos` int(11) NOT NULL,
  `cedula` int(11) DEFAULT NULL,
  `id_libro` varchar(255) DEFAULT NULL,
  `fecha` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Reservas`
--

CREATE TABLE `Reservas` (
  `id_reserva` int(11) NOT NULL,
  `cedula` int(11) DEFAULT NULL,
  `id_libro` varchar(255) DEFAULT NULL,
  `fecha` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Root`
--

CREATE TABLE `Root` (
  `usuario` varchar(255) NOT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Tarjeta`
--

CREATE TABLE `Tarjeta` (
  `numero_tarjeta` int(11) NOT NULL,
  `ccv` varchar(255) DEFAULT NULL,
  `fecha_vencimiento` varchar(255) DEFAULT NULL,
  `saldo` int(11) DEFAULT NULL,
  `cedula` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TiendaFisica`
--

CREATE TABLE `TiendaFisica` (
  `id_tienda` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `id_inventario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Ventas`
--

CREATE TABLE `Ventas` (
  `id_ventas` int(11) NOT NULL,
  `cedula` int(11) DEFAULT NULL,
  `id_libro` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Administrador`
--
ALTER TABLE `Administrador`
  ADD PRIMARY KEY (`usuario`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `Genero`
--
ALTER TABLE `Genero`
  ADD PRIMARY KEY (`id_genero`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `inventarioTienda`
--
ALTER TABLE `inventarioTienda`
  ADD PRIMARY KEY (`id_inventario`),
  ADD UNIQUE KEY `id_libro` (`id_libro`);

--
-- Indices de la tabla `Libro`
--
ALTER TABLE `Libro`
  ADD PRIMARY KEY (`id_libro`),
  ADD UNIQUE KEY `genero` (`genero`),
  ADD KEY `titulo` (`titulo`);

--
-- Indices de la tabla `Pedidos`
--
ALTER TABLE `Pedidos`
  ADD PRIMARY KEY (`id_pedidos`),
  ADD KEY `cedula` (`cedula`);

--
-- Indices de la tabla `Reservas`
--
ALTER TABLE `Reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `cedula` (`cedula`);

--
-- Indices de la tabla `Root`
--
ALTER TABLE `Root`
  ADD PRIMARY KEY (`usuario`);

--
-- Indices de la tabla `Tarjeta`
--
ALTER TABLE `Tarjeta`
  ADD PRIMARY KEY (`numero_tarjeta`);

--
-- Indices de la tabla `TiendaFisica`
--
ALTER TABLE `TiendaFisica`
  ADD PRIMARY KEY (`id_tienda`),
  ADD UNIQUE KEY `id_inventario` (`id_inventario`);

--
-- Indices de la tabla `Ventas`
--
ALTER TABLE `Ventas`
  ADD PRIMARY KEY (`id_ventas`),
  ADD KEY `cedula` (`cedula`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Administrador`
--
ALTER TABLE `Administrador`
  ADD CONSTRAINT `Administrador_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `Root` (`usuario`),
  ADD CONSTRAINT `Administrador_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `Root` (`usuario`);

--
-- Filtros para la tabla `Genero`
--
ALTER TABLE `Genero`
  ADD CONSTRAINT `Genero_ibfk_1` FOREIGN KEY (`nombre`) REFERENCES `Libro` (`genero`);

--
-- Filtros para la tabla `inventarioTienda`
--
ALTER TABLE `inventarioTienda`
  ADD CONSTRAINT `inventarioTienda_ibfk_1` FOREIGN KEY (`id_inventario`) REFERENCES `TiendaFisica` (`id_inventario`);

--
-- Filtros para la tabla `Libro`
--
ALTER TABLE `Libro`
  ADD CONSTRAINT `Libro_ibfk_1` FOREIGN KEY (`id_libro`) REFERENCES `Reservas` (`id_reserva`),
  ADD CONSTRAINT `Libro_ibfk_2` FOREIGN KEY (`titulo`) REFERENCES `Administrador` (`usuario`),
  ADD CONSTRAINT `Libro_ibfk_3` FOREIGN KEY (`titulo`) REFERENCES `Administrador` (`usuario`);

--
-- Filtros para la tabla `TiendaFisica`
--
ALTER TABLE `TiendaFisica`
  ADD CONSTRAINT `TiendaFisica_ibfk_2` FOREIGN KEY (`id_tienda`) REFERENCES `Libro` (`id_libro`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
