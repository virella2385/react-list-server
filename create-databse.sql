CREATE DATABASE Variantyx;

CREATE USER 'test1' IDENTIFIED BY 'test1';

GRANT ALL PRIVILEGES ON Variantyx.* TO 'test1'@localhost IDENTIFIED BY 'test1';

CREATE TABLE ExternalArticles
(
	id varchar(50) not null primary key,
	type varchar(100) not null
);

INSERT INTO ExternalArticles (`type`, id)
VALUES 
('pubmed', '7683628'), ('pubmed', '18456578'), ('pubmed', '20021716'),
('pubmed', '22658665'), ('pubmed', '22975760'), ('pubmed', '23891399'),
('pubmed', '23974870'), ('pubmed', '25087612'), ('pubmed', '27171515'),
('pubmed', '28546993');
