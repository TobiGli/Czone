DROP DATABASE IF Indumentaria_urbana EXISTS
CREATE DATABASE Indumentaria_urbana;

CREATE TABLE prendas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    price INT UNSIGNED NOT NULL,
    description VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
    type ENUM('remera', 'calzado', 'pantalón', 'accesorio', 'abrigo') NOT NULL,
    talles VARCHAR(50) NOT NULL,
    stock INT NOT NULL,
    imagen1 VARCHAR(50),
    imagen2 VARCHAR(50),
    imagen3 VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    subtype VARCHAR(255) NOT NULL,
);
INSERT INTO categories (name) VALUES ('remera', 'calzado', 'pantalón', 'accesorio', 'abrigo');


INSERT INTO prendas (name, description, tipo, talles, stock, price, imagen1, imagen2, imagen3, category_id)
VALUES
    ('Remera de algodón', 'Remera de algodón con cuello redondo', 'remera', 'S,M,L,XL', 10, 500.00, 'remera1.jpg', 'remera2.jpg', 'remera3.jpg', 1),
    ('Zapatillas deportivas', 'Zapatillas deportivas con suela de goma', 'calzado', '36,37,38,39,40,41,42,43,44,45', 5, 1500.00, 'zapatillas1.jpg', 'zapatillas2.jpg', 'zapatillas3.jpg', 2),
    ('Pantalón de jean', 'Pantalón de jean con corte recto', 'pantalón', '28,29,30,31,32,33,34,35,36', 8, 1000.00, 'pantalon1.jpg', 'pantalon2.jpg', 'pantalon3.jpg', 3);

INSERT INTO categories (type, subtype)
VALUES
    ('remera', 'manga corta'),
    ('remera', 'manga larga'),
    ('calzado', 'zapatillas'),
    ('calzado', 'botas'),
    ('pantalón', 'jean'),
    ('pantalón', 'jogger');