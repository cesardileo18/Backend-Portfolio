import { visitService } from "../services/visit.services.js";

class VisitController {
    async trackVisit(req, res) {
        try {
            let clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;
            if (clientIp === '::1' || clientIp === '127.0.0.1') {
                clientIp = '8.8.8.8';  // Usar una IP de prueba, por ejemplo, Google DNS
            }
            const visit = await visitService.trackVisit(clientIp);
            const {country, city, date} = visit;
            const data = {
                country, city, date
            }
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export const visitController = new VisitController();
