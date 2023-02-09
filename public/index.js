const socketClient = io()

// elementos
const formulario = document.getElementById('formulario')
const titulo = document.getElementById('title')
const precio = document.getElementById('price')
const descripcion = document.getElementById('description')
const prodAgregado = document.getElementById('prodAgregado')


formulario.onsubmit = (e) => {

 

    console.log("objeto index")
    e.preventDefault()

    const obj = {
      titulo: titulo.value,
      precio: precio.value,
      descr: descripcion.value,
      stock: stock.value
    }

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Has agregado un producto con exito',
      showConfirmButton: false,
      timer: 1100
    })

    socketClient.emit('prods', obj)
  
}

socketClient.on('prods', newProds => {

  console.log("PRODUCTO QUE ME INGRESO ", newProds)

  let showProds = ""
  newProds.forEach(elem => {
    showProds += `Titulo:  ${elem.titulo} </br> Precio: ${elem.precio} </br>
        Descripcion:${elem.description} </br> Stock: ${elem.stock} </br> </br>`

  })
  prodAgregado.innerHTML = showProds
});

socket.on("pushArray", pushArray => {
  console.log("NUEVO ARRAY", pushArray); // [{nombre: "objeto1", valor: 100}]
});

