import { WaterJugSolver } from '../../domain/interfaces/WaterJugSolver';

export class WaterJugRepository implements WaterJugSolver {
    private waterJug: WaterJugSolver;

    constructor(waterJug: WaterJugSolver) {
        this.waterJug = waterJug;
    }

    solve(x_capacity: number, y_capacity: number, z_amount_wanted: number) {
        return this.waterJug.solve(x_capacity, y_capacity, z_amount_wanted);
    }
}
