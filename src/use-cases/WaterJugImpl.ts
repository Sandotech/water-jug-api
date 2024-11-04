import { WaterJugSolver } from '../domain/interfaces/WaterJugSolver';
import { WaterJugState } from '../domain/entities/WaterJugState';
import { Queue } from '../infrastructure/utils/Queue';
import { generateNextStates } from '../infrastructure/utils/GenerateNextState';

export class WaterJugSolverImpl implements WaterJugSolver {
    
    public solve(x_capacity: number, y_capacity: number, z_amount_wanted: number): WaterJugState['steps'] | null {
        // if the desired amount Z is greater than both jug capacities it's impossible to solve
        if (this.isDesiredAmountImpossible(x_capacity, y_capacity, z_amount_wanted)) {
            return null;
        }

        const initialState = this.createInitialState();
        const queue = Queue.initialize(initialState);
        const visited = new Set<string>();

        while (!queue.isEmpty()) {
            const current = queue.dequeue()!;
            const { steps } = current;

            // Check if we have reached the desired amount
            if (this.isSolutionFound(current, z_amount_wanted)) {
                this.markSolution(current.steps);
                return current.steps;
            }

            // Generate next states
            const nextStates = generateNextStates(current, x_capacity, y_capacity);

            for (const next of nextStates) {
                const nextState: WaterJugState = {
                    bucketX: next.bucketX,
                    bucketY: next.bucketY,
                    steps: [...steps, { step: steps.length + 1, bucketX: next.bucketX, bucketY: next.bucketY, action: next.action }]
                };

                const stateKey = `${nextState.bucketX},${nextState.bucketY}`;
                if (!visited.has(stateKey)) {
                    visited.add(stateKey);
                    queue.enqueue(nextState);
                }
            }
        }

        return null;
    }
    
    /* Creates and return the initial state, both have a value of 0 because each jug is empty */
    private createInitialState(): WaterJugState {
        return { bucketX: 0, bucketY: 0, steps: [] };
    }

    // Validates if the desired amount is impossible if it is greater than both jug capacities, returns a boolean value
    private isDesiredAmountImpossible(x_capacity: number, y_capacity: number, z_amount_wanted: number): boolean {
        return z_amount_wanted > x_capacity && z_amount_wanted > y_capacity;
    }

    // Validates if the current state of the water jugs match with the desired amount
    private isSolutionFound(current: WaterJugState, z_amount_wanted: number): boolean {
        return current.bucketX === z_amount_wanted || current.bucketY === z_amount_wanted;
    }

    // Add the status SOLVED to the current state
    private markSolution(steps: WaterJugState['steps']): void {
        steps[steps.length - 1].status = "Solved";
    }
}
