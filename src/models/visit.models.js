import { VisitMongoose } from "./visit.mongoose.js";

class VisitModel {
    async insertVisit (data){
        try {
            const visitCreated = await VisitMongoose.create(data)
            return visitCreated;
        } catch (error) {
           console.log('Error al insertar la visita:', error) 
        }
    }
}

export const visitModel = new VisitModel();