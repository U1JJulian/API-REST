-- TABLA DE EQUIPOS
CREATE TABLE teams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50),
    founded_year INT
);

-- TABLA DE JUGADORES
CREATE TABLE players (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    age INT NOT NULL
);

-- TABLA DE HISTORIAL DE JUGADORES
CREATE TABLE player_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    player_id INT NOT NULL,
    team_id INT NOT NULL,
    start_year INT,
    end_year INT,
    position VARCHAR(50),
    shirt_number INT,
    FOREIGN KEY (player_id) REFERENCES players(id),
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- INSERTAR EQUIPOS
INSERT INTO teams (name, country, founded_year) VALUES
('FC Barcelona', 'España', 1899),
('Real Madrid', 'España', 1902),
('Manchester City', 'Inglaterra', 1880);

-- INSERTAR JUGADORES
INSERT INTO players (name, nationality, position, age) VALUES
('Lionel Messi', 'Argentina', 'Delantero', 36),
('Pedri González', 'España', 'Medio', 21),
('Vinícius Jr', 'Brasil', 'Delantero', 24),
('Luka Modrić', 'Croacia', 'Medio', 38),
('Erling Haaland', 'Noruega', 'Delantero', 24),
('Kevin De Bruyne', 'Bélgica', 'Medio', 33);

-- INSERTAR HISTORIAL (jugadores en equipos)
INSERT INTO player_history (player_id, team_id, start_year, end_year, position, shirt_number) VALUES
(1, 1, 2004, 2021, 'Delantero', 10),  -- Messi en Barcelona
(1, 2, 2021, 2023, 'Delantero', 30),  -- Ejemplo ficticio de paso al Madrid (para ilustrar)
(2, 1, 2020, NULL, 'Medio', 8),       -- Pedri en Barcelona (aún activo)
(3, 2, 2018, NULL, 'Delantero', 7),   -- Vinícius en Real Madrid
(4, 2, 2012, NULL, 'Medio', 10),      -- Modrić en Real Madrid
(5, 3, 2022, NULL, 'Delantero', 9),   -- Haaland en Manchester City
(6, 3, 2015, NULL, 'Medio', 17);      -- De Bruyne en Manchester City
