Es una pagina Ecommerce web, de venta indumentaria URBANA. La misma corresponde a una empresa ficticia.

de momento la misma esta en actualización, y no finalizada a producto. Falta el linkeo de la API con el FRONT.

la pagina web para verla es ---- https://czone.onrender.com/

## Deploy en Render

Configura el servicio como `Web Service` con estos comandos:

- **Build Command:** `npm ci --include=dev && npm run build`
- **Start Command:** `npm start`

Define estas variables de entorno en Render para conectar MySQL:

- `NODE_ENV=production`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_HOST`

Render inyecta `PORT` automáticamente y el servidor ya lo utiliza. No uses `node src/app.js`, porque el servidor ahora se compila a `dist/app.js`.
