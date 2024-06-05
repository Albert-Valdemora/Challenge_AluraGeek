const peticiones = async () => {
  try {
    const respuesta = await fetch("http://localhost:3001/Productos");
    const conversionJson = await respuesta.json();


    return conversionJson; 
  } catch (error) {
    console.error(error);
  }
};

const envio = (_datos) => {
  fetch('http://localhost:3001/Productos', {
  method: "POST",
  body: JSON.stringify(_datos),
  headers: {"Content-type": "application/json; charset=UTF-8"}
})
}



const Delete = async (id) => {
  try {
    const respuesta = await fetch(`http://localhost:3001/Productos/${id}`, {
      method: 'DELETE'
    });

    if (!respuesta.ok) {
      throw new Error(`Error al eliminar: ${respuesta.status}`);
    }

    console.log('Producto eliminado con éxito');
    // Aquí podrías llamar a una función para actualizar el front-end
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};

export { peticiones, envio, Delete };


