DROP DATABASE IF EXISTS indumentaria_urbana;
CREATE DATABASE indumentaria_urbana;

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    price INT UNSIGNED NOT NULL,
    description VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    type ENUM('remera', 'calzado', 'pantalón', 'accesorio', 'abrigo') NOT NULL,
    talles VARCHAR(50) NOT NULL,
    stock INT NOT NULL,
    imagen1 VARCHAR(50),
    imagen2 VARCHAR(50),
    imagen3 VARCHAR(50));

CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    subtype VARCHAR(255) NOT NULL);
    
    INSERT INTO categories (type, subtype)
VALUES
    ('remera', 'manga corta'),
    ('remera', 'manga larga'),
    ('calzado', 'zapatillas'),
    ('calzado', 'botas'),
    ('pantalón', 'jean'),
    ('pantalón', 'jogger');


INSERT INTO products (name, description, type, talles, stock, price, imagen1, imagen2, imagen3, category_id)
VALUES
    ('Remera de algodón', 'Remera de algodón con cuello redondo', 'remera', 'S,M,L,XL', 10, 500.00, 'remera1.jpg', 'remera2.jpg', 'remera3.jpg', 1),
    ('Zapatillas deportivas', 'Zapatillas deportivas con suela de goma', 'calzado', '36,37,38,39,40,41,42,43,44,45', 5, 1500.00, 'zapatillas1.jpg', 'zapatillas2.jpg', 'zapatillas3.jpg', 2),
    ('Pantalón de jean', 'Pantalón de jean con corte recto', 'pantalón', '28,29,30,31,32,33,34,35,36', 8, 1000.00, 'pantalon1.jpg', 'pantalon2.jpg', 'pantalon3.jpg', 3),
    ('lacoste zapatilla', 'zapatillas para salir', 'zapatilla', 40, 10, 30000, 'calzado_lacoste1.jpg', 'calzado_lacoste2.jpg', 'calzado_lacoste3.jpg', 3),
    ('remera nike', 'remera para el vernano, para el invierno', 'remera', 40, 10, 10000, 'nike1.jpg', 'nike2.jpg', 'nike3.jpg', 1),
    ('pantalon adidas', 'pantalon abrigado para los 2 grados por la mañana', 'pantalón', 40, 10, 3000, 'adidas.jpg', 'adidas2.jpg', 'adidas3.jpg', 6),
    ('remera negra', 'remera termica, ideal para el frio', 'remera', 40, 10, 2000, 'remerita.jpg', 'remerita2.jpg', 'remerita3.jpg', 2),
    ('jean beige', 'jean color beige, apretado', 'pantalon', 40, 10, 2000, 'remerita.jpg', 'remerita2.jpg', 'remerita3.jpg', 5),
    ('remera tommy hilfiger', 'remera tommy hilfiger, lindo color y buena para el verano', 'remera', 40, 10, 9000, 'tommy.jpg', 'tommy2.jpg', 'tommy3.jpg', 1),
    ('zapatillas del biza pa', 'zapatillas del bzrp, para hombre y mujer, lleva el sonido a donde quieras', 'zapatilla', 40, 10, 500000, 'biza.jpg', 'biza2.jpg', 1, 3),
    ('zapatillas dragon ball z', 'zapatillas dragon ball z, solo para hombres, marca adidas', 'zapatilla', 40, 10, 100000, 'goku.jpg', 'goku2.jpg', 1, 3),
    ('chomba polo', 'chomba polo  ralph lauren, para la dama y el caballero', 'remera', 40, 10, 4800, 'polo.jpg', 'polo2.jpg', 1, 1),
    ('jean rojo', 'jean rojo para el caballero, combinas con todo con este pantalon', 'pantalon', 40, 10, 40000, 'jean.jpg', 'jean2.jpg', 1, 5),
    ('Pantalón de jean', 'Pantalón de jean con corte recto', 'pantalón', '28,29,30,31,32,33,34,35,36', 8, 1000.00, 'pantalon1.jpg', 'pantalon2.jpg', 'pantalon3.jpg', 3);
