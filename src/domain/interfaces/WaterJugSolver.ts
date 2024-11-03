import { WaterJugState } from "../entities/WaterJugState";

export interface WaterJugSolver {
    solve(x_capacity: number, y_capacity: number, z_amount_wanted: number): WaterJugState['steps'] | null;
}