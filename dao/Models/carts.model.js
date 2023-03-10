import mongoose from "mongoose";


  const productSchema = new mongoose.Schema({
    id: {
      type: Number || String || mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
  });
  
  const cartSchema = new mongoose.Schema({
    id: {
      type: Number || String,
    },
    products: [productSchema],
  });
  
export const Cart = mongoose.model('Cart', cartSchema); 