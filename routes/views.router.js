import { application, Router } from "express";
import fs from 'fs'
const router = Router()
const path = './ProductManager/Productos.json'


router.get('/',async(req,res)=>{
    let productJSON = await fs.promises.readFile(path,'utf-8')

    let products = JSON.parse(productJSON)
    res.render('index', {products})
})

router.get('/realtimeproducts', async(req, res)=>{
    let productJSON = await fs.promises.readFile(path,'utf-8')

    let products = JSON.parse(productJSON)
    res.render('realTimeProducts', {products})

})

// router.get('/addProd', async(req,res)=>{
//     let productJSON = await fs.promises.readFile(path,'utf-8')
//     // console.log("PROD", productJSON)
//     let products = JSON.parse(productJSON)
//     // res.render({products})
//     // res.render({path})
//     res.render('formulario')
// })


export default router