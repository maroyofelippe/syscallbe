CREATE SCHEMA syscalldb;

USE syscalldb;

CREATE TABLE faculdade (
    idFaculdade INT NOT NULL auto_increment,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY (idFaculdade)
) auto_increment = 1;

drop table faculdade;

INSERT INTO
    faculdade (nome, email)
values
    ('Fatec Zona Leste', 'fateczl@fatec.sp.gov.br');

CREATE TABLE endereco (
    codEndereco INT NOT NULL auto_increment,
    rua VARCHAR(100) NOT NULL,
    numero VARCHAR(10),
    complemento VARCHAR(80),
    cep VARCHAR(9),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf CHAR,
    Faculdade_idFaculdade INT NOT NULL,
    PRIMARY KEY (codEndereco),
    FOREIGN KEY (Faculdade_idFaculdade) REFERENCES syscalldb.faculdade(idFaculdade)
) auto_increment = 1;

alter table endereco modify uf VARCHAR(2);

INSERT INTO
    endereco (
        rua,
        numero,
        complemento,
        cep,
        bairro,
        cidade,
        uf,
        Faculdade_idFaculdade
    )
VALUES
    (
        upper('Av Aguia de Haia'),
        '2983',
        '',
        '03684-000',
        upper('Vila União'),
        upper('São Paulo'),
        upper('SP'),
        1
    );

CREATE TABLE tipoTelefone (
    codTipoTelefone INT NOT NULL auto_increment,
    descricao VARCHAR(100) NOT NULL,
    PRIMARY KEY (codTipoTelefone)
) auto_increment = 1;

INSERT INTO
    tipoTelefone (descricao)
VALUES
    ('CELULAR'),
    ('FIXO');

CREATE TABLE telefone (
    codTelefone INT NOT NULL auto_increment,
    numTelefone VARCHAR(14) NOT NULL,
    TipoTelefone_codTipoTelefone INT NOT NULL,
    Faculdade_idFaculdade INT NOT NULL,
    PRIMARY KEY (codTelefone),
    FOREIGN KEY (TipoTelefone_codTipoTelefone) REFERENCES syscalldb.tipoTelefone (codTipoTelefone),
    FOREIGN KEY (Faculdade_idFaculdade) REFERENCES syscalldb.faculdade (idFaculdade)
) auto_increment = 1;

INSERT INTO
    telefone (
        numTelefone,
        TipoTelefone_codTipoTelefone,
        Faculdade_idFaculdade
    )
VALUES
    ('(11)91415-9566', 1, 1);

select
    faculdade.nome,
    faculdade.email,
    ender.rua,
    ender.numero,
    ender.complemento,
    ender.cep,
    ender.bairro,
    ender.cidade,
    ender.uf,
    tel.numTelefone
from
    faculdade
    inner join endereco as ender,
    telefone as tel
where
    ender.Faculdade_idFaculdade = 1
    AND tel.Faculdade_idFaculdade = 1;

CREATE TABLE tipoAmbiente (
    idTipoAmbiente INT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL,
    PRIMARY KEY(idTipoAmbiente)
) auto_increment = 1;

INSERT INTO
    tipoAmbiente (descricao)
VALUES
    ('LATORATÓRIO'),
    ('SECRETARIA'),
    ('BIBLIOTECA'),
    ('COORDENAÇÃO'),
    ('DIREÇÃO');

CREATE TABLE ambiente (
    idAmbiente INT NOT NULL auto_increment,
    TipoAmbiente_idTipoAmbiente int NOT NULL,
    predio VARCHAR(80),
    andar VARCHAR(80),
    sala VARCHAR(10),
    Faculdade_idFaculdade INT NOT NULL,
    PRIMARY KEY (idAmbiente),
    FOREIGN KEY (Faculdade_idFaculdade) REFERENCES syscalldb.faculdade (idFaculdade),
    FOREIGN KEY (TipoAmbiente_idTipoAmbiente) REFERENCES syscalldb.tipoAmbiente (idTipoAmbiente)
) auto_increment = 1;

ALTER TABLE
    ambiente
ADD
    column TipoAmbiente_idTipoAmbiente int NOT NULL,
ADD
    constraint FOREIGN KEY (TipoAmbiente_idTipoAmbiente) REFERENCES syscalldb.tipoAmbiente (idTipoAmbiente);

ALTER TABLE ambiente DROP column descricao;

INSERT INTO
    ambiente (
        TipoAmbiente_idTipoAmbiente,
        predio,
        andar,
        sala,
        Faculdade_idFaculdade
    )
VALUES
    (1, 'FATEC', '1', '101', 1),
    (1, 'FATEC', '1', '102', 1),
    (1, 'FATEC', '1', '103', 1),
    (1, 'FATEC', '1', '104', 1),
    (1, 'FATEC', '1', '105', 1),
    (1, 'FATEC', '2', '201', 1),
    (1, 'FATEC', '2', '202', 1),
    (1, 'FATEC', '2', '203', 1),
    (1, 'FATEC', '2', '204', 1),
    (1, 'FATEC', '2', '205', 1),
    (1, 'FATEC', '2', '201', 1),
    (1, 'FATEC', '2', '202', 1),
    (1, 'FATEC', '2', '203', 1),
    (1, 'FATEC', '2', '204', 1),
    (2, 'FATEC', 'T', '001', 1);

CREATE TABLE tipostatus (
    codTipoStatus INT NOT NULL auto_increment,
    descricao VARCHAR(100) NOT NULL,
    PRIMARY KEY (codTipoStatus)
) auto_increment = 1;

INSERT INTO
    tipoStatus (descricao)
VALUES
    ('CHAMADO'),
    ('EQUIPAMENTO'),
    ('SOFTWARE');

SELECT * from tipoStatus;

CREATE TABLE tipousuario (
    codTipoUsuario INT NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    PRIMARY KEY (codTipoUsuario)
);

insert into
    tipousuario (codTipoUsuario, descricao)
values
    (1, 'Colaborador'),
    (2, 'Aluno'),
    (100, 'Administrador');

insert into
    tipousuario (codTipoUsuario, descricao)
values
    (100, 'Administrador');

CREATE TABLE fabricante (
    codFabricante INT NOT NULL auto_increment,
    descricao VARCHAR(100) NOT NULL,
    PRIMARY KEY (codFabricante)
) auto_increment = 1;

INSERT INTO fabricante (descricao) VALUES ('LENOVO');
INSERT INTO fabricante (descricao) VALUES   ('HP'),
                                            ('TOSHIBA'),
                                            ('LOGITEC'),
                                            ('DELL'),
                                            ('LG');


CREATE TABLE tipoequipamento (
    codTipoEquipamento INT NOT NULL auto_increment,
    descricao VARCHAR(100) NOT NULL,
    PRIMARY KEY (codTipoEquipamento)
) auto_increment = 1;

INSERT INTO
    tipoequipamento (descricao)
VALUES
    ('COMPUTADOR'),
    ('MONITOR'),
    ('TECLADO'),
    ('MOUSE'),
    ('IMPRESSORA'),
    ('PROJETOR MULTIMIDIA'),
    ('TV LCD'),
    ('SOFTWARE');

SELECT * from tipoequipamento;

CREATE TABLE usuario (
    idUsuario INT NOT NULL auto_increment,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    TipoUsuario_codTipoUsuario INT NOT NULL,
    registro varchar(25) NOT NULL,
    senha varchar(100) NOT NULL,
    PRIMARY KEY (idUsuario),
    FOREIGN KEY (TipoUsuario_codTipoUsuario) REFERENCES syscalldb.tipousuario (codTipoUsuario)
) auto_increment = 1;

insert into
    usuario (
        nome,
        email,
        TipoUsuario_codTipoUsuario,
        registro,
        senha
    )
values
    (
        'MrRoyo',
        'marco.felippe@fatec.sp.gov.br',
        1,
        '1111392121039',
        '8cb2237d0679ca88db6464eac60da96345513964'
    );

insert into
    usuario (
        nome,
        email,
        TipoUsuario_codTipoUsuario,
        registro,
        senha
    )
values
    (
        'Ana Claudia Rescia Royo Felippe',
        'ana.felippe@fatec.sp.gov.br',
        1,
        '1111392121039',
        '8cb2237d0679ca88db6464eac60da96345513964'
    );

select * from usuario;

delete from usuario where idUsuario > 2;

CREATE TABLE profissionalti (
    idProfissionalTI INT NOT NULL auto_increment,
    funcao VARCHAR(100) NOT NULL,
    especialidade VARCHAR(100) NOT NULL,
    Usuario_idUsuario INT NOT NULL,
    PRIMARY KEY (idProfissionalTI),
    FOREIGN KEY (Usuario_idUsuario) REFERENCES syscalldb.usuario (idUsuario)
) auto_increment = 1;

CREATE TABLE equipamento (
    idEquipamento INT NOT NULL auto_increment,
    patrimonio VARCHAR(50) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    serialNumber VARCHAR(100),
    dataInstalacao DATETIME,
    Fabricante_codFabricante INT NOT NULL,
    TipoEquipamento_codTipoEquipamento INT NOT NULL,
    Ambiente_idAmbiente INT NOT NULL,
    PRIMARY KEY (idEquipamento),
    FOREIGN KEY (Fabricante_codFabricante) REFERENCES syscalldb.fabricante (codFabricante),
    FOREIGN KEY (TipoEquipamento_codTipoEquipamento) REFERENCES syscalldb.tipoequipamento (codTipoEquipamento),
    FOREIGN KEY (Ambiente_idAmbiente) REFERENCES syscalldb.ambiente (idAmbiente)
) auto_increment = 1;

INSERT INTO
    equipamento (
        patrimonio,
        descricao,
        serialNumber,
        dataInstalacao,
        Fabricante_codFabricante,
        TipoEquipamento_codTipoEquipamento,
        Ambiente_idAmbiente
    )
VALUES
    (
        '1234',
        'Computador de Teste',
        '0001',
        '2022-05-31',
        1,
        1,
        1
    );

CREATE TABLE tiposoftware (
    codTipoSoftware INT NOT NULL auto_increment,
    descricao VARCHAR(100) NOT NULL,
    PRIMARY KEY (codTipoSoftware)
) auto_increment = 1;

CREATE TABLE software (
    idSoftware INT NOT NULL auto_increment,
    nome VARCHAR(100) NOT NULL,
    repositorio VARCHAR(255),
    chaveLicenca VARCHAR(255) NOT NULL,
    Fabricante_codFabricante INT NOT NULL,
    TipoSoftware_codTipoSoftware INT NOT NULL,
    PRIMARY KEY (idSoftware),
    FOREIGN KEY (Fabricante_codFabricante) REFERENCES syscalldb.fabricante (codFabricante),
    FOREIGN KEY (TipoSoftware_codTipoSoftware) REFERENCES syscalldb.tiposoftware (codTipoSoftware)
) auto_increment = 1;

CREATE TABLE chamado (
    idChamado INT NOT NULL auto_increment,
    dataAbertura DATETIME NOT NULL,
    dataResolucao DATETIME,
    dataEncerramento DATETIME,
    descricaoProblema VARCHAR(255) NOT NULL,
    descricaoSolucao VARCHAR(255),
    Profissionalti_idProfissionalTI INT,
    Equipamento_idEquipamento INT NOT NULL,
    Usuario_idUsuario INT NOT NULL,
    Ambiente_idAmbiente INT NOT NULL,
    TipoEquipamento_idTipoEquipamento INT NOT NULL,
    PRIMARY KEY (idChamado),
    FOREIGN KEY (Profissionalti_idProfissionalTI) REFERENCES syscalldb.profissionalti (idProfissionalTI),
    FOREIGN KEY (Equipamento_codEquipamento) REFERENCES syscalldb.equipamento (idEquipamento),
    FOREIGN KEY (Usuario_idUsuario) REFERENCES syscalldb.usuario (idUsuario),
    FOREIGN KEY (TipoEquipamento_codTipoEquipamento) REFERENCES syscalldb.tipoequipamento (codTipoEquipamento),
    FOREIGN KEY (Ambiente_idAmbiente) REFERENCES syscalldb.ambiente (idAmbiente)
) auto_increment = 5;

alter table chamado modify Profissionalti_idProfissionalTI INT NULL;

INSERT INTO
    chamado (
        dataAbertura,
        descricaoProblema,
        Equipamento_idEquipamento,
        Usuario_idUsuario,
        Ambiente_idAmbiente,
        TipoEquipamento_codTipoEquipamento
    )
VALUES
    (
        now(),
        'teste de add new chamado',
        '1',
        1,
        '1',
        '1'
    );

select * from chamado;

alter table
    chamado
add
    column Ambiente_idAmbiente INT NOT NULL,
ADD
    constraint FOREIGN KEY (Ambiente_idAmbiente) REFERENCES syscalldb.ambiente (idAmbiente),
add
    column TipoEquipamento_codTipoEquipamento INT NOT NULL,
ADD
    constraint FOREIGN KEY (TipoEquipamento_codTipoEquipamento) REFERENCES syscalldb.tipoequipamento (codTipoEquipamento);

CREATE TABLE status2 (
    idStatus INT NOT NULL auto_increment,
    cor VARCHAR(20),
    descricao VARCHAR(50),
    TipoStatus_codTipoStatus INT NOT NULL,
    PRIMARY KEY (idStatus),
    FOREIGN KEY (TipoStatus_codTipoStatus) REFERENCES syscalldb.tipostatus (codTipoStatus)
) auto_increment = 1;

INSERT INTO
    status2 (cor, descricao, TipoStatus_codTipoStatus)
VALUES
    ('#05F000', 'ABERTO', 1),
    ('#05F000', 'EM ANDAMENTO', 1),
    ('#05F000', 'RESOLVIDO', 1),
    ('#727272', 'FECHADO', 1),
    ('#727272', 'CANCELADO', 1);

CREATE TABLE status2equipamento (
    codStatusEquipamento INT NOT NULL auto_increment,
    Status2_idStatus INT NOT NULL,
    Equipamento_idEquipamento INT NOT NULL,
    dataInicio DATETIME NOT NULL,
    dataTermino DATETIME,
    PRIMARY KEY (codStatusEquipamento),
    FOREIGN KEY (Status2_idStatus) REFERENCES syscalldb.status2 (idStatus),
    FOREIGN KEY (Equipamento_idEquipamento) REFERENCES syscalldb.equipamento (idEquipamento)
) auto_increment = 1;

CREATE TABLE status2chamado (
    codStatusChamado INT NOT NULL auto_increment,
    Status2_idStatus INT NOT NULL,
    Chamado_idChamado INT NOT NULL,
    dataInicio DATETIME NOT NULL,
    dataTermino DATETIME,
    PRIMARY KEY (codStatusChamado),
    FOREIGN KEY (Status2_idStatus) REFERENCES syscalldb.status2 (idStatus),
    FOREIGN KEY (Chamado_idChamado) REFERENCES syscalldb.chamado (idChamado)
) auto_increment = 1;

INSERT INTO
    status2chamado (Status2_idStatus, Chamado_idChamado, dataInicio)
VALUES
    (1, 18, now()),
    (1, 19, now()),
    (1, 20, now()),
    (1, 21, now()),
    (1, 22, now()),
    (1, 23, now()),
    (1, 24, now()),
    (1, 25, now()),
    (1, 26, now()),
    (1, 27, now()),
    (1, 28, now()),
    (1, 29, now()),
    (1, 30, now()),
    (1, 31, now()),
    (1, 32, now()),
    (1, 33, now()),
    (1, 34, now()),
    (1, 35, now()),
    (1, 36, now());

update
    status2chamado
set
    Chamado_idChamado = 17
where
    codStatusChamado = 17;

CREATE TABLE status2software (
    codStatusSoftware INT NOT NULL auto_increment,
    Status2_idStatus INT NOT NULL,
    Software_idSoftware INT NOT NULL,
    dataInicio DATETIME NOT NULL,
    dataTermino DATETIME,
    PRIMARY KEY (codStatusSoftware),
    FOREIGN KEY (Status2_idStatus) REFERENCES syscalldb.status2 (idStatus),
    FOREIGN KEY (Software_idSoftware) REFERENCES syscalldb.software (idSoftware)
) auto_increment = 1;

CREATE TABLE equipamentosoftware (
    codEquipamentoSoftware INT NOT NULL auto_increment,
    Equipamento_idEquipamento INT NOT NULL,
    Software_idSoftware INT NOT NULL,
    dataInstalacao DATETIME NOT NULL,
    PRIMARY KEY (codEquipamentoSoftware),
    FOREIGN KEY (Equipamento_idEquipamento) REFERENCES syscalldb.equipamento (idEquipamento),
    FOREIGN KEY (Software_idSoftware) REFERENCES syscalldb.software (idSoftware)
) auto_increment = 1;

CREATE TABLE mensagem (
    codMensagem INT NOT NULL auto_increment,
    mensagem VARCHAR(255) NOT NULL,
    dataMensagem DATETIME NOT NULL,
    Chamado_idChamado INT NOT NULL,
    PRIMARY KEY (codMensagem),
    FOREIGN KEY (Chamado_idChamado) REFERENCES syscalldb.chamado (idChamado)
) auto_increment = 1;

-- DROP TABLES ALL

DROP TABLE equipamentosoftware;

DROP TABLE status2software;

DROP TABLE status2chamado;

DROP TABLE status2equipamento;

DROP TABLE status2;

DROP TABLE mensagem;

DROP TABLE chamado;

DROP TABLE software;

DROP TABLE tiposoftware;

DROP TABLE equipamento;

DROP TABLE profissionalti;

DROP TABLE usuario;

DROP TABLE tipoequipamento;

DROP TABLE fabricante;

DROP TABLE tipousuario;

DROP TABLE tipostatus;

DROP TABLE ambiente;

DROP TABLE telefone;

DROP TABLE tipotelefone;

DROP TABLE endereco;

DROP TABLE faculdade;

select * from chamado;

select
    ch.idChamado,
    ch.Usuario_idUsuario,
    usr.nome,
    ch.Equipamento_idEquipamento,
    eqp.descricao as Equipamento,
    ch.Ambiente_idAmbiente,
    concat(amb.predio, '-', amb.andar, '-', amb.sala) as Ambiente,
    ch.TipoEquipamento_codTipoEquipamento,
    tpeqp.descricao as tipoEquipamento,
    ch.descricaoProblema,
    s2c.Status2_idStatus,
    s2.descricao,
    s2.cor
from
    chamado as ch
    INNER JOIN usuario as usr,
    equipamento as eqp,
    ambiente as amb,
    tipoequipamento as tpeqp,
    status2chamado as s2c,
    status2 as s2
WHERE
    ch.Usuario_idUsuario = usr.idUsuario
    AND ch.Ambiente_idAmbiente = amb.idAmbiente
    AND ch.TipoEquipamento_codTipoEquipamento = tpeqp.codTipoEquipamento
    AND ch.idChamado = s2c.Chamado_idChamado
    AND s2c.Status2_idStatus = s2.idStatus
    AND ch.idChamado = 5;

SELECT
    ch.idchamado,
    ch.dataAbertura,
    ch.descricaoProblema,
    eqp.descricao as equipamento,
    usr.nome as Usuario,
    concat(amb.predio, '-', amb.andar, '-', amb.sala),
    tpeqp.descricao as tipoEquipamento
FROM
    chamado as ch,
    equipamento as eqp,
    usuario as usr,
    ambiente as amb,
    tipoequipamento as tpeqp;

SELECT * from chamado;

SELECT MAX(idChamado) from chamado;

SELECT * from status2chamado;