import express from "express";
import cors from "cors";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());              // habilita CORS si abres el front con Live Server 
app.use(express.json());      // leer JSON del body 
app.use(express.static(path.join(__dirname, "public"))); // servir HTML, CSS, JS estáticos

const repertorioPath = path.join(__dirname, "repertorio.json");

async function getCanciones() {
  try {
    const data = await readFile(repertorioPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(repertorioPath, "[]", "utf-8");
      return [];
    }
    throw error;
  }
}

async function saveCanciones(canciones) {
  await writeFile(
    repertorioPath,
    JSON.stringify(canciones, null, 2),
    "utf-8"
  );
}

// Devolver página ===
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// === 2) GET / Listar repertorio ===
app.get("/canciones", async (req, res) => {
  try {
    const canciones = await getCanciones();
    res.status(200).json(canciones);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el repertorio" });
  }
});

// === 3) POST / Crear ===
app.post("/canciones", async (req, res) => {
  try {
    const { titulo, artista, tono } = req.body; 

    if (!titulo || !artista || !tono) {
      return res
        .status(400)
        .json({ message: "Faltan datos: titulo, artista o tono" }); 
    }

    const canciones = await getCanciones();
    const newId =
      canciones.length > 0
        ? Math.max(...canciones.map((c) => Number(c.id))) + 1
        : 1;

    const nuevaCancion = { id: newId, titulo, artista, tono };
    canciones.push(nuevaCancion);

    await saveCanciones(canciones);

    res.status(201).json(nuevaCancion); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar la canción" });
  }
});

// === 4) PUT /:id ===
app.put("/canciones/:id", async (req, res) => {
  try {
    const { id } = req.params; 
    const { titulo, artista, tono } = req.body;

    const canciones = await getCanciones();
    const index = canciones.findIndex((c) => String(c.id) === String(id));

    if (index === -1) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    canciones[index] = {
      ...canciones[index],
      titulo: titulo ?? canciones[index].titulo,
      artista: artista ?? canciones[index].artista,
      tono: tono ?? canciones[index].tono,
    };

    await saveCanciones(canciones);
    res.status(200).json(canciones[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la canción" });
  }
});

// === 5) DELETE /:id Eliminar  ===
app.delete("/canciones/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const canciones = await getCanciones();
    const existe = canciones.some((c) => String(c.id) === String(id));

    if (!existe) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    const filtradas = canciones.filter((c) => String(c.id) !== String(id));
    await saveCanciones(filtradas);

    res.status(200).json({ message: "Canción eliminada", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la canción" });
  }
});

// === 6) DELETE /id=1 Eliminar por queryString ===
app.delete("/canciones", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Debes enviar un id por query ?id=" });
    }

    const canciones = await getCanciones();
    const existe = canciones.some((c) => String(c.id) === String(id));

    if (!existe) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    const filtradas = canciones.filter((c) => String(c.id) !== String(id));
    await saveCanciones(filtradas);

    res.status(200).json({ message: "Canción eliminada", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la canción" });
  }
});

// Levantar servidor 
app.listen(PORT, () => {
  console.log(`Servidor Mi Repertorio escuchando en http://localhost:${PORT}`);
});
