create database imobiliaria;

use imobiliaria;

create table sindico (
  matricula int(3) not null auto_increment,
  nome varchar(80) default null,
  endereco varchar(80) default null,
  telefone varchar(15) default null,
  primary key (matricula)
);

insert into sindico values (1,'antonio carlos','avenida santos dummont, nÃºmero 789, califÃ³rnia, sÃ£o paulo','(11) 3456-6787'),(2,'sidnei delgado','alameda xv de novembro, nÃºmero 123, jockey club, sÃ£o paulo','(11) 3452-4562');

create table condominio (
  codigo int(5) not null auto_increment,
  nome varchar(50) default null,
  endereco varchar(80) default null,
  matricula_sind int(3) default null,
  primary key (codigo),
  key fx_cond_sindico (matricula_sind),
  constraint fx_cond_sindico foreign key (matricula_sind) references sindico (matricula)
);

insert into condominio values (1,'condomÃ­nio sÃ£o paulo','alameda getulio vargas, nÃºmero 897, centro, sÃ£o paulo',1),(2,'condomÃ­nio brasil','avenida general gusmÃ£o, nÃºmero 453, penha, sÃ£o paulo',2);

create table apartamento (
  numero varchar(5) not null,
  tipo varchar(20) default null,
  codigo_cond int(5) default null,
  valor double(10,2) default '0.00',
  primary key (numero),
  key fk_ap_cond (codigo_cond),
  constraint fk_ap_cond foreign key (codigo_cond) references condominio (codigo)
);

insert into apartamento values ('a101','padrÃ£o',1,100000.00),('a201','padrÃ£o',1,115000.00),('a301','padrÃ£o',1,125000.00),('a401','padrÃ£o',1,135000.00),('a501','cobertura',1,150000.00),('b101','padrÃ£o',2,200000.00),('b201','padrÃ£o',2,215000.00),('b301','padrÃ£o',2,225000.00),('b401','padrÃ£o',2,235000.00),('b501','cobertura',2,250000.00);

create table garagem (
  numero int(3) not null auto_increment,
  tipo varchar(20) default null,
  numero_ap varchar(5) default null,
  primary key (numero),
  key fk_gar_apartamento (numero_ap),
  constraint fk_gar_apartamento foreign key (numero_ap) references apartamento (numero)
);

insert into garagem values (1,'padrÃ£o','a101'),(2,'padrÃ£o','a201'),(3,'padrÃ£o','a301'),(4,'padrÃ£o','a401'),(5,'coberta','a501'),(6,'padrÃ£o','b101'),(7,'padrÃ£o','b101'),(8,'padrÃ£o','b201'),(9,'padrÃ£o','b201'),(10,'padrÃ£o','b301'),(11,'padrÃ£o','b301'),(12,'padrÃ£o','b401'),(13,'padrÃ£o','b401'),(14,'coberta','b501'),(15,'coberta','b501');

create table proprietario (
  rg varchar(15) not null,
  nome varchar(80) default null,
  telefone varchar(15) default null,
  email varchar(50) default null,
  primary key (rg)
);

insert into proprietario values ('12345678-0','carlos eduardo','(11) 3256-7890','carloseduardoead@email.com.br'),('32145678-4','oswaldo lima','(11) 2314-9876','oswaldolimaead@email.com.br'),('32156788-0','pedro castro','(11) 3452-8743','pedroead@email.com.br'),('46536267-3','maria luiza','(11) 2345-1627','marialuizaead@email.com.br'),('54367281-2','joana darc','(11) 4563-2315','joanadarcead@email.com.br'),('74853928-2','benedito goes','(11) 3427-4132','beneditogoesead@email.com.br'),('76534126-4','matheus henrique','(11) 2234-1123','matheushenriqueead@email.com.br'),('98635314-5','augusto silva','(11) 4122-2134','augustosilvaead@email.com.br'),('99987271-1','marcos vinicius','(11) 2124-2427','marcosviniciusead@email.com.br');

create table proprietario_apartamento (
  prop_ap_id int(3) not null auto_increment,
  numero_ap varchar(5) default null,
  rg_prop varchar(15) default null,
  primary key (prop_ap_id),
  key fk_pa_apartamento (numero_ap),
  key fk_pa_proprietario (rg_prop),
  constraint fk_pa_apartamento foreign key (numero_ap) references apartamento (numero),
  constraint fk_pa_proprietario foreign key (rg_prop) references proprietario (rg)
);

insert into proprietario_apartamento values (1,'a101','12345678-0'),(2,'a201','32145678-4'),(3,'a301','32156788-0'),(4,'a401','46536267-3'),(5,'a501','54367281-2'),(6,'b101','74853928-2'),(7,'b201','76534126-4'),(8,'b301','98635314-5'),(9,'b401','99987271-1'),(10,'b501','99987271-1');
