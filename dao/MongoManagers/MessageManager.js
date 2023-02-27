import { MessageModel } from "../Models/message.model";


export default class MessageManager {

    async newMessage(message) {
      try {
  
          const newMensaje = await MessageModel.create(cart);
  
          console.log("newMensaje ", newMensaje)

          return newMensaje
  
      } catch (error) {
        console.log(error);
      }
    }

}

