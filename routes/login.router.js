import { Router } from "express";

const router = Router()

router.post('/', (req, res) =>{
    const {nombre , email} = req.body
    res.cookie(nombre, email , {maxAge: 5000 }).send('Cookie agregada exitosamente')
})



export default router