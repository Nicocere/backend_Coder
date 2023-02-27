const socketClient = io()

// elementos de MENSAJES

const nombreUsuario = document.getElementById('nombreUsuario')
const mensajesFormulario = document.getElementById('mensajesFormulario')
const inputMensaje = document.getElementById('mensaje')
const chatParrafo = document.getElementById('chat')



// ----- MENSAJES -----

let usuario = null

if (!usuario) {
  Swal.fire({
    title: 'BIENVENIDO',
    text: 'Ingresa tu usuario',
    input: 'text',
    position: 'right',
    inputValidator: (value) => {
      if (!value) {
        return 'Necesitas ingresar un usuario'
      }
    },
  }).then((username) => {
    usuario = username.value
    nombreUsuario.innerText = usuario
    socketClient.emit('nuevoUsuario', usuario)
  })
}

mensajesFormulario.onsubmit = (e) => {
  e.preventDefault()

    const info = {
    nombre: usuario,
    mensaje: inputMensaje.value,
  }

  socketClient.emit('mensaje', info)
  inputMensaje.value = ''
}

socketClient.on('chat',infoMensajes=>{
    console.log(infoMensajes)

    const chatRender = infoMensajes.map(elem=>{
        return `<p><strong>${elem.nombre}: </strong>${elem.mensaje}</p>`
    }).join(' ')
    chatParrafo.innerHTML = chatRender
})

socketClient.on('broadcast',usuario=>{
    Toastify({
        text: `Ingreso ${usuario} al chat`,
        duration: 5000,
        position: 'right',
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
    }).showToast()
})




// elementos de PRODUCTOS
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


// ----- PRODUCTOS -----
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

