CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INTEGER CHECK (price >= 0),
  img TEXT,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  seller_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_stock INTEGER DEFAULT 1 CHECK (product_stock > 0),
  likes INTEGER DEFAULT 1 CHECK (likes > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total INTEGER CHECK (total >= 0),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status_id INTEGER NOT NULL REFERENCES status(id)
);

CREATE TABLE detail_cart (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    status_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL
);


CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserción de datos de prueba

-- Inserción de categorías
INSERT INTO categories (name) VALUES ('PC/Laptop');
INSERT INTO categories (name) VALUES ('Audio');
INSERT INTO categories (name) VALUES ('Smartphones');
INSERT INTO categories (name) VALUES ('Accesorios');
INSERT INTO categories (name) VALUES ('Almacenamiento');
INSERT INTO categories (name) VALUES ('Redes');

-- Inserción de status
INSERT INTO status (name) VALUES ('En proceso');
INSERT INTO status (name) VALUES ('Finalizado');

--Insetar productos
INSERT INTO products (title, description, price, img, category_id, seller_id) VALUES 
('Compaq NX', 'Laptop con procesador Intel i7, 16GB RAM y SSD de 512GB.', 1595000, 'https://hire.vsl-uk.com/wp-content/uploads/2017/10/HP-250-G5-Laptop-Main.jpg', 1, '4'),
('Smartphone Entel PCS 5G', 'Teléfono con pantalla OLED, cámara de 108MP y batería de larga duración.', 690900, 'https://1kwidxe41sswo.cdn.shift8web.com/wp-content/uploads/2024/11/Infinix-Hot-50i-1.png', 3, '4'),
('Auriculares Acanthus', 'Los Headphone Acanthus son auriculares inalámbricos con cancelación de ruido activa líder en la industria, gracias a su procesador Integrated Processor V1. Ofrecen un sonido Hi-Res con controladores de 30 mm, conectividad Bluetooth 5.2 con soporte para LDAC, y una batería de hasta 30 horas con carga rápida (3 horas de uso con solo 3 minutos de carga). Su diseño ligero y almohadillas de espuma viscoelástica garantizan máxima comodidad para largas sesiones de escucha.', 95900, 'https://topesdegama.com/app/uploads-topesdegama.com/2020/05/Trust-GXT-390-Juga.jpg', 2, '2'),
('Tablet Orion Pro', 'La Tablet Orion Pro ofrece una experiencia fluida con su pantalla IPS de 10.5 pulgadas y resolución 2K. Equipada con un procesador Octa-Core, 6GB de RAM y 128GB de almacenamiento expandible, es ideal para el trabajo, estudio o entretenimiento. Incluye lápiz óptico y modo multitarea para mayor productividad.', 899000, 'https://tabarena.pk/wp-content/uploads/2024/06/Sony-Xperia-Z4-Tablet-9.jpg', 1, '2'),
('Monitor Huascar 27" 4K', 'Los monitores para PC ofrecen una experiencia visual nítida y fluida, ideales para trabajo, gaming o entretenimiento. Con pantallas Full HD o 4K, tasas de refresco de hasta 165Hz y tecnología IPS o VA, garantizan colores vibrantes y ángulos de visión amplios. Modelos avanzados incluyen HDR, FreeSync/G-Sync y conectividad HDMI o DisplayPort para un rendimiento óptimo.', 59900, 'https://media.ldlc.com/r1600/ld/products/00/06/03/72/LD0006037211.jpg', 4, '2'),
('Teclado Vixho Mecánico RGB', 'Los teclados para PC ofrecen comodidad y precisión para trabajar, jugar o escribir. Con diseños ergonómicos, teclas de respuesta rápida y opciones con retroiluminación RGB, garantizan una experiencia fluida. Modelos avanzados incluyen teclas mecánicas, conectividad inalámbrica y funciones multimedia para mayor productividad.', 18500, 'https://tse1.mm.bing.net/th?id=OIP.NL92pXWm9DR7DKk1QYGUwQHaHa&pid=Api', 4, '4'),
('Disco Duro Externo Titan 2TB', 'El Disco Duro Externo Titan 2TB ofrece almacenamiento seguro y veloz gracias a su tecnología USB 3.1. Compatible con Windows, macOS y consolas, brinda transferencias rápidas y resistencia a golpes. Su diseño compacto lo hace perfecto para llevar todos tus archivos a donde vayas.', 259900, 'https://pcsforall.co/cdn/shop/files/HDD-UTO-0906_600x_crop_center.png?v=1739799269', 5, '2'),
('Smartwatch Kronos X5', 'El Smartwatch Kronos X5 combina diseño elegante con tecnología avanzada. Cuenta con pantalla AMOLED de 1.4 pulgadas, sensor de ritmo cardíaco, monitoreo de oxígeno en sangre y GPS integrado. Resistente al agua hasta 50 metros, con una autonomía de hasta 10 días, es el compañero perfecto para tu día a día y actividades deportivas.', 225900, 'https://www.alezay.com/wp-content/uploads/2024/09/Google-Pixel-Watch-3-45mm-Matte-Black-Aluminum-Case-Obsidian-Active-Band-Alezay-Kuwait-Google-Kuwait-768x768.web', 4, '3'),
('Router MaxSpeed AX3000', 'El Router MaxSpeed AX3000 proporciona conectividad WiFi 6 con velocidades de hasta 3 Gbps, ideal para streaming 4K, gaming en línea y hogares con múltiples dispositivos. Cuenta con tecnología MU-MIMO, OFDMA y cuatro antenas de alto rendimiento para una cobertura amplia y estable.', 349900, 'https://casaroyal.vtexassets.com/arquivos/ids/158003-800-800?v=638243909684570000&width=800&height=800&aspect=true', 6, '3'),
('Mouse Inalámbrico Rat4', 'Los Mouse Rat4 son mouse inalámbricos diseñados para precisión y comodidad. Equipados con un sensor láser de 1000 DPI, ofrecen un desplazamiento fluido en diversas superficies. Su conectividad inalámbrica de 2.4 GHz con receptor USB Unifying garantiza una conexión estable. Cuenta con 7 botones programables y una rueda de desplazamiento ultra rápida. Su batería de larga duración permite hasta 3 años de uso con dos pilas AA, ideal para productividad y uso diario.', 6450, 'https://pcbuildsonabudget.com/wp-content/uploads/2018/03/pictek-gaming-mouse-review-1024x1024.jpg', 4, '2'),
('Earpods 3XPLUS', 'Los Earpods 3XPLUS con conector Lightning ofrecen sonido de alta fidelidad y un diseño ergonómico para mayor comodidad. Cuentan con altavoces optimizados, control remoto integrado para ajustar volumen y llamadas, y compatibilidad con dispositivos iOS con puerto Lightning.', 7250, 'https://image.rakuten.co.jp/gadgetgate/cabinet/apple/ep-l/mmtn2ja_05.jpg', 2, '2');


