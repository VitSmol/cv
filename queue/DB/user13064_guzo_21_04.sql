-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 21 2023 г., 11:25
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
(36, '0000', '2023-04-15', 'Мразь', 'Элеонора', 'Викентьевна', 'ж', '2012-06-28', 'г. Гомель, ул. Кирова 149/20', 'дура', 'правый сектор', '80', 1, '1666-06-06', 'конченная', 'Тазобедренный сустав', 'Светлогорская центральная районная больница'),
(38, '1780', '2016-02-29', 'Гратынский', 'Михаил', 'Тимофеевич', 'м', '1946-01-01', 'Гомель пр-т Речицкий 99-64', 'ДФА', 'слева', '', 0, '0000-00-00', '', 'Коленный сустав', 'Гомельская городская клиническая больница №1'),
(39, '1189', '2019-10-02', 'Цалко', 'Наталья', 'Арсентьевна', 'ж', '1963-01-01', 'Калинковичский р-н, д.Дудичи, ул.Дорожная, д.9', 'Двусторонний гонартрозIIIст', 'двухсторонний', '', 1, '2023-02-15', '', 'Коленный сустав', 'Калинковичская центральная районная больница'),
(40, '1175', '2020-08-26', 'Сущик', 'Светлана', 'Степановна', 'ж', '1970-01-01', 'г.Лельчицы, ул.Советская, д.95, кв.26', 'Двусторонний гонартроз IIIст', 'двухсторонний', '', 0, '0000-00-00', '', 'Коленный сустав', 'Мозырская центральная городская поликлиника'),
(41, '4212', '2022-12-12', 'Богданович', 'Дмитрий', 'Васильевич', 'м', '1968-08-20', 'Кормянский р-н д.Барсуки ул.Молодёжная д.7 т 4-02-03', 'Ас некроз', 'слева', '', 0, '0000-00-00', '', 'Тазобедренный сустав', 'Гомельская областная клиническая больница'),
(42, '4108', '2019-08-19', 'Дорошева', 'Татьяна', 'Ивановна', 'ж', '1966-01-01', 'Ул. Дынды 3 - 107, 29-77-34, 8-029-383-39-06', 'Коксатроз слева 3ст', 'слева', '', 0, '0000-00-00', '', 'Тазобедренный сустав', 'Гомельская городская клиническая больница №1'),
(43, '30091953КУМВ', '2022-06-21', 'Кухаренко', 'Мария', 'Васильевна', 'ж', '1953-09-03', 'г.Речица,ул.Советская,97а/47; дт.3-51-47; мт.44 599-14-52', 'Коксартроз слева 3 ст', '', '2', 0, '0000-00-00', '05.07.22-протокол комиссии', 'Тазобедренный сустав', 'Речицкая центральная районная больница'),
(45, '4032', '2019-12-16', 'Слюнкова', 'Надежда', 'Ефимовна', 'ж', '1946-01-01', 'Гомельский р-н.,а/г.Терешковичи ул.Центральная д.11', 'дфа', 'справа', '', 0, '0000-00-00', '', 'Коленный сустав', 'Гомельская областная клиническая больница'),
(46, '4016', '2019-12-09', 'Щуко', 'Анатолий', 'Михайлович', 'м', '1955-01-01', 'буда-Кошелевский р-н.,а/г Широкое ул.Брагинская д.17', 'дфа', 'справа', '', 0, '0000-00-00', '', 'Коленный сустав', 'Гомельская областная клиническая больница'),
(47, '4017', '2019-12-09', 'Дробова', 'Ева', 'Ивановна', 'ж', '1951-01-01', 'Светлогорск,ул.Ломоносова д.58', 'ДФА', 'справа', '', 0, '0000-00-00', '', 'Коленный сустав', 'Гомельская областная клиническая больница'),
(48, '4019', '2019-12-09', 'Герилович', 'Виктор', 'Федорович', 'м', '1959-01-01', 'Жлобин,мк-н 17.д.48', 'ДФА', 'справа', '', 0, '0000-00-00', '', 'Коленный сустав', 'Гомельская областная клиническая больница');

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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT для таблицы `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
