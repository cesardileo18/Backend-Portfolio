import { visitService } from "../services/visit.services.js";

class VisitController {
    async trackVisit(req, res) {
        try {
            const visit = await visitService.trackVisit();
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
