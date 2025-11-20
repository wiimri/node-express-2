const API_URL = "http://localhost:3000/canciones";

const form = document.getElementById("form-cancion");
const tbody = document.getElementById("tbody-canciones");
const inputTitulo = document.getElementById("titulo");
const inputArtista = document.getElementById("artista");
const inputTono = document.getElementById("tono");
const btnGuardar = document.getElementById("btn-guardar");

let idEditando = null;

document.addEventListener("DOMContentLoaded", cargarCanciones);

async function cargarCanciones() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderTabla(data);
  } catch (error) {
    console.error("Error al cargar canciones:", error);
  }
}

function renderTabla(canciones) {
  tbody.innerHTML = "";

  canciones.forEach((cancion) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${cancion.id}</td>
      <td>${cancion.titulo}</td>
      <td>${cancion.artista}</td>
      <td>${cancion.tono}</td>
      <td class="acciones">
        <button class="editar">Editar</button>
        <button class="eliminar">Eliminar</button>
      </td>
    `;

    const btnEditar = tr.querySelector(".editar");
    const btnEliminar = tr.querySelector(".eliminar");

    btnEditar.addEventListener("click", () => {
      idEditando = cancion.id;
      inputTitulo.value = cancion.titulo;
      inputArtista.value = cancion.artista;
      inputTono.value = cancion.tono;
      btnGuardar.textContent = "Guardar cambios";
    });

    btnEliminar.addEventListener("click", () => {
      if (confirm(`¿Eliminar la canción "${cancion.titulo}"?`)) {
        eliminarCancion(cancion.id);
      }
    });

    tbody.appendChild(tr);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevaCancion = {
    titulo: inputTitulo.value.trim(),
    artista: inputArtista.value.trim(),
    tono: inputTono.value.trim(),
  };

  if (!nuevaCancion.titulo || !nuevaCancion.artista || !nuevaCancion.tono) {
    alert("Completa todos los campos");
    return;
  }

  try {
    if (idEditando === null) {
    
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCancion),
      });
    } else {
      
      await fetch(`${API_URL}/${idEditando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCancion),
      });
      idEditando = null;
      btnGuardar.textContent = "Agregar canción";
    }

    form.reset();
    cargarCanciones();
  } catch (error) {
    console.error("Error al guardar canción:", error);
  }
});

async function eliminarCancion(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    cargarCanciones();
  } catch (error) {
    console.error("Error al eliminar canción:", error);
  }
}
