import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        unique: true
    },
    price:{
         type: Number,
        require: true,
       
    },
    code: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    categoria: {
        type: Array
    },
    status: {
        type: Boolean
    }
})

export const productsModel = mongoose.model('Productos', productSchema);