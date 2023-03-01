import mongoose from "mongoose";
mongoose.set('strictQuery', false);


const URI = 'mongodb+srv://NicoCere:909352elmaskpo1I909352@envioflores-db.h7sp9t1.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(URI, (error)=>{
    useNewUrlParser: true
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.log('Error connecting to MongoDB Atlas', error));