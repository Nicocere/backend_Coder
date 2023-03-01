const socketClient = io()

// elementos de MENSAJES

const nombreUsuario = document.getElementById('nombreUsuario')
const mensajesFormulario = document.getElementById('mensajesFormulario')
const inputMensaje = document.getElementById('mensaje')
const chatParrafo = document.getElementById('chat')



// ----- MENSAJES -----

let usuario = null

function generarColorAleatorio() {
  const letras = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  console.log("COLORR", color)
  return color;
}

const colorUsuario = generarColorAleatorio() // Generar color aleatorio

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
    nombreUsuario.style.color = colorUsuario // Establecer el color de nombre del usuario
    socketClient.emit('nuevoUsuario', { nombre: usuario, color: colorUsuario })
  })
}

mensajesFormulario.onsubmit = (e) => {
  e.preventDefault()

  const info = {
    nombre: usuario,
    mensaje: inputMensaje.value,
    color: colorUsuario

  }

  socketClient.emit('mensaje', info)
  inputMensaje.value = ''
}

socketClient.on('chat', infoMensajes => {
  console.log(infoMensajes)

  const chatRender = infoMensajes.map(elem => {
    console.log("ELEMENTOS INFO MENSJAE", elem)
    return `<p><strong class="nombre-usuario" style="color:${elem.color}">${elem.nombre}: </strong>${elem.mensaje}</p>`
  }).join(' ')
  chatParrafo.innerHTML = chatRender
})


socketClient.on('broadcast', usuario => {
  Toastify({
    text: `Ingreso ${usuario.user.nombre} al chat`,
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

