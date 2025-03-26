drop database if exists computerdb;
create database computerdb;

use computerdb;

create table computer(
    id integer not null primary key,
    name varchar(20) not null,
    type varchar(30) not null,
    price decimal(8,2) not null
);

insert into computer values(1, 'Small Brainx', 'laptop',3000);
insert into computer values(2, 'Big Brain', 'almost super computer',200000);

drop user if exists 'nerd'@'localhost';
create user 'nerd'@'localhost' identified by '1234';
grant all privileges on computerdb.* to 'nerd'@'localhost';