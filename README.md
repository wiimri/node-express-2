# 🎵 Desafío Evaluado – Mi Repertorio  
Backend Express + File System · Desafío Latam

Este proyecto corresponde al desafío evaluado **“Mi repertorio”**, donde se implementa un servidor backend construido con **Node.js + Express**, utilizando **File System (FS)** para almacenar los datos en un archivo local `repertorio.json`.

El servidor expone un CRUD completo para administrar canciones, y además sirve el frontend desde la carpeta `public/`.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- File System (`fs/promises`)
- CORS
- Nodemon (modo desarrollo)

---

## 📁 Estructura del proyecto

node-express-2/
├─ public/
│ ├─ index.html
│ └─ app.js
├─ repertorio.json
├─ index.js
├─ package.json
├─ .gitignore
└─ README.md


---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el proyecto

```bash
git clone https://github.com/wiimri/node-express-2.git
cd node-express-2
```
### 2️⃣ Instalar dependencias
npm install

### 3️⃣ Ejecutar en modo desarrollo
npm run dev

### 4️⃣ Ejecutar en producción
npm start


Servidor disponible en:

http://localhost:3000/


🎼 Endpoints de la API
✔ GET /canciones

Retorna el listado completo de canciones.

✔ POST /canciones

Agrega una nueva canción.

Body requerido:
{
  "titulo": "Canción X",
  "artista": "Artista",
  "tono": "Am"
}

✔ PUT /canciones/:id

Actualiza una canción existente según su ID.

✔ DELETE /canciones/:id

Elimina una canción por parámetro de ruta (/:id).

✔ DELETE /canciones?id=ID

Versión alternativa usando query string.

🧰 Funcionalidades del servidor

Servir página web (public/index.html)

CRUD completo sobre repertorio.json

Persistencia utilizando File System (sin base de datos)

Manejo de:

req.body

req.params

req.query

Respuestas JSON con códigos HTTP apropiados

Código ordenado y estandarizado


📝 Criterios del desafío (Completamente logrado ✔)

Este proyecto cumple a la perfección con la rúbrica del desafío:

Servidor local Node + Express

Devolver vista estática mediante GET

Implementación correcta de CRUD

Manipulación del payload HTTP

Uso de parámetros en la URL

Personalización del JSON + manejo de FS

Proyecto organizado y comentado

Entrega lista para revisión final


👨‍💻 Autor

Williams Arias Quilodrán
Desafío Latam






