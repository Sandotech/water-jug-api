import { Request, Response } from 'express';
import { WaterJugRepository } from '../../infrastructure/repositories/WaterJugRepository';

export class WaterJugController {
    private repository: WaterJugRepository;

    constructor(repository: WaterJugRepository) {
        this.repository = repository;
    }

    solve(req: Request, res: Response): Response {
        const { x_capacity, y_capacity, z_amount_wanted } = req.body;

        try {
            // Validate inputs
            if (!this.validateInputs(x_capacity, y_capacity, z_amount_wanted)) {
                return res.status(400).json({ error: 'Invalid input. All inputs must be positive integers.' });
            }

            // Solve the water jug problem using the repository
            const solution = this.repository.solve(x_capacity, y_capacity, z_amount_wanted);

            if (!solution) {
                return res.status(404).json({ error: 'No solution found.' });
            }

            // Return the solution
            return res.status(200).json({ solution });
        } catch (error) {
            // Handle unexpected errors
            return res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }

    /*
        Consists in validate if the inputs are positive Integers
    */
    private validateInputs(x_capacity: any, y_capacity: any, z_amount_wanted: any): boolean {
        if (typeof x_capacity !== 'number' || typeof y_capacity !== 'number' || typeof z_amount_wanted !== 'number') {
            return false;
        }

        if (!Number.isInteger(x_capacity) || !Number.isInteger(y_capacity) || !Number.isInteger(z_amount_wanted)) {
            return false;
        }

        if (x_capacity <= 0 || y_capacity <= 0 || z_amount_wanted <= 0) {
            return false;
        }

        return true;
    }
}
