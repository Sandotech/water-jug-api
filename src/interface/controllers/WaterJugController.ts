import { Request, Response } from 'express';
import { WaterJugRepository } from '../../infrastructure/repositories/WaterJugRepository';

export class WaterJugController {
    private repository: WaterJugRepository;

    constructor(repository: WaterJugRepository) {
        this.repository = repository;
    }

    solve(req: Request, res: Response): Response | any {
        const { x_capacity, y_capacity, z_amount_wanted } = req.body;

        try {        
            // Validate inputs
            if (typeof x_capacity !== 'number' || typeof y_capacity !== 'number' || typeof z_amount_wanted !== 'number') {
                return res.status(400).json({ error: 'All inputs must be numbers.' });
            }

            if (!Number.isInteger(x_capacity) || !Number.isInteger(y_capacity) || !Number.isInteger(z_amount_wanted)) {
                return res.status(400).json({ error: 'All inputs must be integers.' });
            }

            if (x_capacity <= 0 || y_capacity <= 0 || z_amount_wanted <= 0) {
                return res.status(400).json({ error: 'All inputs must be positive integers.' });
            }

            const solution = this.repository.solve(x_capacity, y_capacity, z_amount_wanted);

            if (!solution) {
                return res.status(404).json({ error: 'No solution found.' });
            }

            res.status(200).json({ solution });
        } catch (error) {
            res.status(500).json({ error: 'An unexpected error occurred.' });            
        }
    }
}
