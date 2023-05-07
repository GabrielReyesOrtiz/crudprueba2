create database registrolaboral2023;

CREATE TABLE registros(
    fecha varchar(100),
    correo varchar(100),
    años varchar(3),
	nombrePrefe varchar(100),
    nombreLegal varchar(100),
	telefono varchar(50),
	identidad varchar(100),
    sexo varchar(100),
    estado varchar(100),
    residencia varchar(100),
    transicionar varchar(100),
    sabiaModificarDocumentos varchar(100),
    modificarDocumentos varchar(100),
    nivelEstudios varchar(300),
    trabaja varchar(20),
    nombreEmpresa varchar(100),
    dedicaEmpresa varchar(999),
    pago varchar(999),
    tieneJefe varchar(20),
    tipoPuesto varchar(100)
);

select * from registros;

-- drop table registros;
