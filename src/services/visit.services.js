import { visitModel } from "../models/visit.models.js";
import axios from 'axios';
import { format } from 'date-fns';
class VisitService {
    async trackVisit(clientIp) {
        try {
            // const url = `http://ip-api.com/json/`;
            const url = `http://ip-api.com/json/${clientIp}`;
            // Obtener información de la IP usando ip-api.com
            const response = await axios.get(url);
            const { status, country, city, query: ip, lat, lon: long } = response.data;
            if (response.data.status !== 'success') {
                throw new Error('No se pudo obtener información de la IP.');
            }
            // Formatear la fecha en dd/MM/yyyy HH:mm
            const formattedDate = format(new Date(), 'dd/MM/yyyy HH:mm');
            const data = {
                status, country, city, ip, lat, long, date: formattedDate
            }
            // Insertar la visita en la base de datos
            const visitCreated = await visitModel.insertVisit(data);
            return visitCreated;
        } catch (error) {
            console.error('Error tracking visit:', error);
            throw error;
        }
    }
}

export const visitService = new VisitService();