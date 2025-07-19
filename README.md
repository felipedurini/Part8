# Part8 Full Stack Open https://fullstackopen.com/es/

---

# 📚 Library Frontend

## 🚀 Tecnologías principales

* **React**: para construir la interfaz de usuario.
* **React DOM**: para renderizar la app en el navegador.
* **Apollo Client**: para conectarse a la API GraphQL y manejar el estado.
* **GraphQL**: como lenguaje de consultas entre el frontend y el backend.
* **React Bootstrap** + **Bootstrap**: para el diseño y los estilos de los componentes.
* **subscriptions-transport-ws**: para manejar actualizaciones en tiempo real con WebSockets.
* **Vite**: herramienta de desarrollo rápida para proyectos React.

## ▶️ Uso

```bash
npm install    # instala las dependencias
npm run dev    # inicia la app en http://localhost:5173
```

> Asegurate de tener el backend corriendo en `http://localhost:4000/graphql` o modificar la URL si es distinta.

---
# 📚 Library Backend

Construido con **Node.js**, **GraphQL** y **MongoDB**.

## 🚀 Tecnologías principales

* **Express**: framework para manejar rutas y middleware del servidor.
* **Apollo Server**: servidor GraphQL que procesa las consultas y mutaciones.
* **GraphQL**: lenguaje de consulta entre frontend y backend.
* **Mongoose**: para conectarse y modelar datos en MongoDB.
* **graphql-subscriptions** + **subscriptions-transport-ws**: para actualizaciones en tiempo real vía WebSockets.
* **jsonwebtoken**: para autenticación con tokens.
* **dotenv**: para manejar variables de entorno (como la conexión a la base de datos).
* **uuid**: para generar identificadores únicos.

## ▶️ Uso

```bash
npm install     # instala las dependencias
node index.js   # inicia el servidor en http://localhost:4000/graphql
```

> Asegurate de tener una base de datos MongoDB corriendo y definida en un archivo `.env` con la variable `MONGODB_URI`, además de una variable JWT_SECRET con tu clave de preferencia.
