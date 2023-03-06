import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true,

    },
    code: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true,
        min: 1,
        max: 100
    },
    categoria: {
        type: Array
    },
    status: {
        type: Boolean
    }
})

// productSchema.pre('find',function(next){
//     this.populate('productos')
//     next()
// })

productSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model('Productos', productSchema);