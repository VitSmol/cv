-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 14 2023 г., 17:58
-- Версия сервера: 10.4.27-MariaDB
-- Версия PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `user13064_guzo`
--

-- --------------------------------------------------------

--
-- Структура таблицы `loginregister`
--

CREATE TABLE `loginregister` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `patients`
--

CREATE TABLE `patients` (
  `id` int(255) NOT NULL,
  `listnumber` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `fathername` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `address` varchar(255) NOT NULL,
  `diag` varchar(255) NOT NULL,
  `side` varchar(100) NOT NULL,
  `invalidgroup` varchar(100) NOT NULL,
  `isOperated` tinyint(10) NOT NULL,
  `operdate` date NOT NULL,
  `info` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `org` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `patients`
--

INSERT INTO `patients` (`id`, `listnumber`, `date`, `lastname`, `name`, `fathername`, `sex`, `birthday`, `address`, `diag`, `side`, `invalidgroup`, `isOperated`, `operdate`, `info`, `type`, `org`) VALUES
(29, '0000', '2023-03-27', 'Синицын', 'number of bound variables does not match number of tokens', 'Евгеньевич', 'м', '2023-03-06', 'Лос-Анджелес', 'деменция', 'справа', '4', 1, '0000-00-00', 'неуравновешен', 'Тазобедренный сустав', 'Речицкая центральная районная больница'),
(30, '0000', '2023-03-27', 'Синицын', 'number of bound variables does not match number of tokens', 'Евгеньевич', 'м', '2023-03-06', 'Лос-Анджелес', 'деменция', 'справа', '4', 1, '0000-00-00', 'неуравновешен', 'Тазобедренный сустав', 'Речицкая центральная районная больница'),
(31, '0000', '2023-03-27', 'Синицын', 'number of bound variables does not match number of tokens', 'Евгеньевич', 'м', '2023-03-06', 'Лос-Анджелес', 'деменция', 'справа', '4', 1, '0000-00-00', 'неуравновешен', 'Тазобедренный сустав', 'Речицкая центральная районная больница');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `loginregister`
--
ALTER TABLE `loginregister`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `loginregister`
--
ALTER TABLE `loginregister`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
