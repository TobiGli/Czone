Es una pagina Ecommerce web, de venta indumentaria URBANA. La misma corresponde a una empresa ficticia.

de momento la misma esta en actualización, y no finalizada a producto. Falta el linkeo de la API con el FRONT.

la pagina web para verla es ---- https://czone.onrender.com/

## Deploy en Render

Configura el servicio como `Web Service` con estos comandos:

- **Build Command:** `npm ci --include=dev && npm run build`
- **Start Command:** `npm start`

Define estas variables de entorno en Render para conectar CockroachDB:

- `NODE_ENV=production`
- `DATABASE_URL`: la cadena PostgreSQL completa que entrega CockroachDB Cloud.
- `DB_SSL_CA`: contenido completo de `root.crt`, incluido en una sola variable multilínea.

Render inyecta `PORT` automáticamente y el servidor ya lo utiliza. No uses `node src/app.js`, porque el servidor ahora se compila a `dist/app.js`.

Para desarrollo local, descarga el certificado con el comando oficial de CockroachDB y configura `DATABASE_URL` en un archivo `.env` local. No subas ese archivo al repositorio. La contraseña debe estar URL-encoded si contiene caracteres especiales.

## Carrito y checkout

El carrito guarda líneas independientes por producto y talle en `localStorage`, por lo que el mismo producto puede comprarse en varios talles. El checkout está disponible en `/checkout` y ya tiene formulario de entrega y resumen de precios.

Códigos de prueba disponibles:

- `ZONE10`: 10% de descuento.
- `URBANO15`: 15% de descuento.
- `PROMO2X1`: en cada grupo de dos unidades, se descuenta la más barata.
- `PROMO3X2`: en cada grupo de tres unidades, se descuenta la más barata.

Las promociones ordenan las unidades por precio descendente para que el beneficio respete la regla comercial de cobrar primero las prendas más caras. El botón de checkout deja preparado el punto de integración para Mercado Pago, Stripe u otro gateway; no procesa pagos hasta configurar credenciales y crear la preferencia/intención en el servidor.
