
const fs = require('fs')
const path = './Usuarios.json'

class ManagerUsuarios {

    // constructor(){
    //     this.usuarios = []
    // }
    
  async crearUsuario(usuario) {
    try {
        const usuariosFile = await this.consultarUsuarios()
        usuariosFile.push(usuario)
        await fs.promises.writeFile(path, JSON.stringify(usuariosFile))
    } catch (error) {
        console.log(error)
    }
  }

    async consultarUsuarios(){

        try {
            if(fs.existsSync(path)){
                const usuarios = await fs.promises.readFile(path, 'utf-8')
                const usuariosJS = JSON.parse(usuarios)
                console.log("usuarios json", usuariosJS)
                return usuariosJS
            }else{
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }
}
    
 const manager = new ManagerUsuarios()
 const usuarioNico = {
    nombre:'Nicolas',
    apellido:'Cerecedo',
    edad: 25,
    curso:'JS'
}
const usuarioFranco = {
    nombre:'Franco ',
    apellido:'Santillan',
    edad: 29,
    curso:'BackEnd'
}
 async function prueba(){
    const consultarUsuarios = await manager.consultarUsuarios()
    console.log(consultarUsuarios)


//   manager.updateUsuarios(1,{nombre:'Ernesto'})
}


 prueba()