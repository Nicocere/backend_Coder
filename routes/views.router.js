import { application, Router } from "express";
import fs from 'fs'
const router = Router()
const path = '../Products.json'

router.get('/', async(req,res)=>{
    let productJSON = await fs.promises.readFile(path,'utf-8')
    let products = JSON.parse(productJSON)
    res.render({products})
    // res.render({path})
    res.render('formulario')
})

router.get('/prods',async(req,res)=>{
    let productJSON = await fs.promises.readFile(path,'utf-8')
    let products = JSON.parse(productJSON)
    res.render('lista',{products})
})

export default router