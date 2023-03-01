import { MessageModel } from "../Models/message.model.js";

export default class MessageManager {

    async newMessage(message) {
      try {
        const newMensaje = new MessageModel({
          user: message.nombre,
          message: message.mensaje
        });
        await newMensaje.save();
        console.log('Mensaje guardado en la base de datos');
        return newMensaje;
      } catch (error) {
        console.log(error);
      }
    }
}

