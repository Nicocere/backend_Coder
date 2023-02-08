const socketClient = io()

// elementos
const titulo = document.getElementById('title')
const formulario = document.getElementById('formulario')
const precio = document.getElementById('price')
const descripcion = document.getElementById('description')
const prodAgregado = document.getElementById('prodAgregado')



formulario.onsubmit = (e) => {
  e.preventDefault()
 
  const info = {
    titulo: titulo.value,
    precio: precio.value,
    descr: descripcion.value,
    stock: stock.value
  }
  console.log("INFO", info)
  
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Has agregado un producto con exito',
    showConfirmButton: false,
    timer: 1100
  })

  socketClient.emit('prods', info)
}

socketClient.on('prods',newProds=>{

  console.log("PRODUCTO QUE ME INGRESO ", newProds.titulo)

    let showProds = ""
   
      newProds.forEach(elem=>{
        showProds += `Titulo:  ${elem.titulo} </br> Precio: ${elem.precio} </br>
        Descripcion:${elem.description} </br> Stock: ${elem.stock} </br> </br>`
        
      })
    
      prodAgregado.innerHTML = showProds
    
    
})
