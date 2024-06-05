import { peticiones, envio, Delete } from "./peticion.js";
const btnEnvio = document.querySelector('#btnEnvio')


//Aqui nos encargamos de mostrar las card en el front-end
const creacionCard = async () => {
  try {
    const llamado = await peticiones();
    const card = document.querySelector('[data-contenedor]');
    card.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas

    llamado.map((element) => {
      const contenido = `
        <div class="card" data-card-id="${element.id}">
          <div class="card-img">
            <img src="${element.imagen}" alt="Imagen de ejemplo">
          </div>
          <div class="card-info">
            <p>${element.nombre}</p>
            <div class="precio-delete">
              <h3 class="precio">${element.precio}</h3>
              <i class="fa-solid fa-trash-can icon-delete" style="color: #ffffff;" data-id="${element.id}"></i>
            </div>
          </div>
        </div>`;
      card.innerHTML += contenido;
    });

    asignarEventosEliminar(); // Asignar eventos después de crear las tarjetas
  } catch (error) {
    console.error(error);
  }
};

creacionCard()



//Evento que esta pendiente a click del boton para hacer un post
btnEnvio.addEventListener('click', (e) => {
  
  e.preventDefault()
  
  const nombre = document.querySelector('[data-nombre]').value
  const precio = document.querySelector('[data-precio]').value
  const imagen = document.querySelector('[data-imagen]').value
  
  console.log(nombre,precio,imagen);

  const datos = {
    nombre,
    precio,
    imagen
  }

  envio(datos)
})


const asignarEventosEliminar = () => {
  const iconosEliminar = document.querySelectorAll('.icon-delete');
  iconosEliminar.forEach(icono => {
    icono.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id');
      await Delete(id);
      e.target.closest('.card').remove(); // Eliminar la tarjeta del DOM
    });
  });
};