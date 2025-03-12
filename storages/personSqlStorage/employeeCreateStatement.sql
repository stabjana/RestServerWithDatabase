drop database if exists serverEmployeeDB;
create database serverEmployeeDB;
use serverEmployeeDB;

create table employee {
    id int not null primary key,
    firstname varchar(20) not null,
    lastname varchar(30) not null,
    department varchar(15) not null,
    salary decimal (6,2)
};

insert into employee values (1, 'John', 'Doozzle', 'ICT', 50000.00);
insert into employee values (2, 'Hans', 'Doe', 'HR', 60000.00);
insert into employee values (3, 'Matt', 'River', 'ICT', 70000.00);
insert into employee values (4, 'Linda', 'Blurr', 'HR', 80000.00);

drop user if exists 'horst'@'localhost';
create user 'horst'@'localhost' identified by '1234';
grant all privileges on serverEmployeeDB.* to 'horst'@'localhost';

