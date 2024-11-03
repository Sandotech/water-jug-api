import { WaterJugSolver } from '../domain/interfaces/WaterJugSolver';
import { WaterJugState } from '../domain/entities/WaterJugState';

export class WaterJugSolverImpl implements WaterJugSolver {
    solve(x_capacity: number, y_capacity: number, z_amount_wanted: number): WaterJugState['steps'] | null {
        // Early termination if the desired amount is greater than both jug capacities
        if (z_amount_wanted > x_capacity && z_amount_wanted > y_capacity) {
            return null;
        }

        const initialState: WaterJugState = { bucketX: 0, bucketY: 0, steps: [] };
        const queue: WaterJugState[] = [initialState];
        const visited = new Set<string>();

        while (queue.length > 0) {
            const current = queue.shift()!;
            const { bucketX, bucketY, steps } = current;

            // Check if we have reached the desired amount
            if (bucketX === z_amount_wanted || bucketY === z_amount_wanted) {
                steps[steps.length - 1].status = "Solved";
                return steps;
            }

            // Generate next states
            const nextStates = [
                { bucketX: x_capacity, bucketY, action: "Fill bucket X" },
                { bucketX, bucketY: y_capacity, action: "Fill bucket Y" },
                { bucketX: 0, bucketY, action: "Empty bucket X" },
                { bucketX, bucketY: 0, action: "Empty bucket Y" },
                {
                    bucketX: Math.max(0, bucketX - (y_capacity - bucketY)),
                    bucketY: Math.min(y_capacity, bucketY + bucketX),
                    action: "Transfer from bucket X to Y"
                },
                {
                    bucketX: Math.min(x_capacity, bucketX + bucketY),
                    bucketY: Math.max(0, bucketY - (x_capacity - bucketX)),
                    action: "Transfer from bucket Y to X"
                }
            ];

            for (const next of nextStates) {
                const nextState: WaterJugState = {
                    bucketX: next.bucketX,
                    bucketY: next.bucketY,
                    steps: [...steps, { step: steps.length + 1, bucketX: next.bucketX, bucketY: next.bucketY, action: next.action }]
                };

                const stateKey = `${nextState.bucketX},${nextState.bucketY}`;
                if (!visited.has(stateKey)) {
                    visited.add(stateKey);
                    queue.push(nextState);
                }
            }
        }

        return null;
    }
}
