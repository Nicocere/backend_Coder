import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: { type: Number || String},
    quantity: { type: Number,
      require: true
    }
  });
  
  const cartSchema = new mongoose.Schema({
    id: { type: Number || String },
    products: [productSchema]
  });
  
export const Cart = mongoose.model('Cart', cartSchema); 