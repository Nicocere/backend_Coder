import mongoose from "mongoose";
mongoose.set('strictQuery', false);


const URI = 'mongodb+srv://NicoCere:909352elmaskpo1I909352@envioflores-db.h7sp9t1.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(URI, (error)=>{
   if(error){
    console.log('error al conectar a la base de datos', error)
   }else{
       console.log('Estas conectado a la base de datos')
   }
   
})