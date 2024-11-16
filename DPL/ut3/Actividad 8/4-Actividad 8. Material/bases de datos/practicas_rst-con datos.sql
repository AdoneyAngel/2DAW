/*
Navicat MySQL Data Transfer

Source Server         : servidor_MySQL
Source Server Version : 50614
Source Host           : localhost:3306
Source Database       : practicas_rst

Target Server Type    : MYSQL
Target Server Version : 50614
File Encoding         : 65001

Date: 2013-11-06 15:45:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `estudiantes_t`
-- ----------------------------
DROP TABLE IF EXISTS `estudiantes_t`;
CREATE TABLE `estudiantes_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del registro (clave primaria)',
  `dni` varchar(255) COLLATE utf8_spanish_ci NOT NULL COMMENT 'DNI del estudiante',
  `nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Nombre del estudiante',
  `apellidos` varchar(255) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Apellidos del estudiante',
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Correo electrónico del estudiante',
  `fecha` datetime NOT NULL COMMENT 'Fecha cuando se realizó la inserción en la tabla',
  `idprob` int(11) NOT NULL COMMENT 'Identificador que vincula al estudiante con un grupo de problemas',
  `idpract` int(11) NOT NULL COMMENT 'Identificador que vincula al estudiante con un grupo de prácticas',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- ----------------------------
-- Records of estudiantes_t
-- ----------------------------
INSERT INTO `estudiantes_t` VALUES ('3', '42205314P', 'Antonio', 'Pérez Hernández', 'aperez@gmail.com', '2021-11-05 22:23:53', '1', '2');

-- ----------------------------
-- Table structure for `grupo_practicas_t`
-- ----------------------------
DROP TABLE IF EXISTS `grupo_practicas_t`;
CREATE TABLE `grupo_practicas_t` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del registro (clave primaria)',
  `grupo` varchar(255) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Descripción del campo grupo',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- ----------------------------
-- Records of grupo_practicas_t
-- ----------------------------
INSERT INTO `grupo_practicas_t` VALUES ('2', 'Martes 19-21');
INSERT INTO `grupo_practicas_t` VALUES ('4', 'Miércoles 19-21');

-- ----------------------------
-- Table structure for `grupo_problemas_t`
-- ----------------------------
DROP TABLE IF EXISTS `grupo_problemas_t`;
CREATE TABLE `grupo_problemas_t` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del registro (clave primaria)',
  `grupo` varchar(255) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Descripción del campo grupo',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- ----------------------------
-- Records of grupo_problemas_t
-- ----------------------------
INSERT INTO `grupo_problemas_t` VALUES ('1', 'Jueves 15-17');
INSERT INTO `grupo_problemas_t` VALUES ('3', 'Viernes 15-17');
INSERT INTO `grupo_problemas_t` VALUES ('4', 'Martes 15-17');
