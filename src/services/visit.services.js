import { visitModel } from "../models/visit.models.js";
import axios from 'axios';
import { format } from 'date-fns';
class VisitService {
    async trackVisit(req) {
        try {
            const forwardedIps = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',') : [];
            let clientIp = forwardedIps.length > 0 ? forwardedIps[0] : req.connection.remoteAddress;
    
            console.log('IP del cliente:', clientIp);  // Verifica la IP obtenida
    
            // Si la IP es local, sustituirla por una IP pública de prueba
            const localIps = ['127.0.0.1', '::1'];
            if (localIps.includes(clientIp)) {
                clientIp = '8.8.8.8';  // Usar una IP pública de prueba
            }
    
            // Cambiar a ipinfo.io para una geolocalización más precisa
            const url = `https://ipinfo.io/${clientIp}/json?token=c75eda2639b274`;
            const response = await axios.get(url);
            console.log('Respuesta de ipinfo:', response.data); // Imprimir la respuesta completa
    
            // Comprobar si la respuesta contiene loc
            if (!response.data || !response.data.loc) {
                throw new Error('No se pudo obtener información de la ubicación.');
            }
    
            const { country, city, ip, loc } = response.data;
            const [lat, long] = loc.split(',');  // Extraer latitud y longitud
    
            // Formatear la fecha
            const formattedDate = format(new Date(), 'dd/MM/yyyy HH:mm');
            const data = {
                country, city, ip, lat, long, date: formattedDate
            };
    
            // Insertar la visita en la base de datos
            const visitCreated = await visitModel.insertVisit(data);
            return visitCreated;
        } catch (error) {
            if (error.response) {
                console.error('Error de respuesta:', error.response.data);
            } else {
                console.error('Error al hacer la solicitud:', error.message);
            }
            throw error;
        }
    }
}

export const visitService = new VisitService();