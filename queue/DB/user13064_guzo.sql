-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 17 2023 г., 05:18
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
-- Структура таблицы `oz`
--

CREATE TABLE `oz` (
  `id` int(11) NOT NULL,
  `orgname` varchar(255) NOT NULL,
  `orgshortname` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `oz`
--

INSERT INTO `oz` (`id`, `orgname`, `orgshortname`, `email`) VALUES
(1, 'Гомельская областная клиническая больница', 'ГОКБ', 'reghosp@gokb.by'),
(2, 'Гомельская городская клиническая больница №1', 'ГГКБ№1', 'ggkb1@mail.gomel.by'),
(5, 'Мозырская центральная городская поликлиника', 'Мозырь', 'mozyrcgp@mcgp.by'),
(6, 'Калинковичская центральная районная больница', 'Калинковичи', 'kln-tmo@mail.gomel.by'),
(7, 'Жлобинская центральная районная больница', 'Жлобин', 'zhlcrb@zhlcrb.by'),
(8, 'Речицкая центральная районная больница', 'Речица', 'rcrb@rechitsa.by'),
(9, 'Светлогорская центральная районная больница', 'Светлогорск', 'svetl-tmo@mail.gomel.by');

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
(33, '3310', '2023-04-10', 'Смолицкий', 'Виталий', 'Яковлевич', 'м', '2023-02-07', 'Кирова 149/20', 'алкаш', 'все', '1', 1, '2023-04-03', 'солист', 'Тазобедренный сустав', 'Гомельская областная клиническая больница'),
(34, '1910', '2023-04-14', 'Горшенев', 'Михаил', 'Юрьевич', 'м', '1973-02-14', 'Гомель', 'алкаш', 'все', '1', 1, '2021-12-13', 'солист', 'Коленный сустав', 'Гомельская областная клиническая больница'),
(36, '0000', '2023-04-15', 'Мразь', 'Элеонора', 'Викентьевна', 'ж', '0666-06-06', 'г. Гомель, ул. Кирова 149/20', 'дура', 'правый сектор', '80', 0, '1666-06-06', 'конченная', 'Тазобедренный сустав', 'Светлогорская центральная районная больница');

-- --------------------------------------------------------

--
-- Структура таблицы `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `types`
--

INSERT INTO `types` (`id`, `type`) VALUES
(1, 'Коленный сустав'),
(2, 'Тазобедренный сустав');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `loginregister`
--
ALTER TABLE `loginregister`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `oz`
--
ALTER TABLE `oz`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `types`
--
ALTER TABLE `types`
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
-- AUTO_INCREMENT для таблицы `oz`
--
ALTER TABLE `oz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT для таблицы `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
