import { WaterJugState } from "../../domain/entities/WaterJugState";

type Action = {
    bucketX: number;
    bucketY: number;
    action: string;
};

const ACTIONS = {
    FILL_X: "Fill bucket X",
    FILL_Y: "Fill bucket Y",
    EMPTY_X: "Empty bucket X",
    EMPTY_Y: "Empty bucket Y",
    TRANSFER_X_TO_Y: "Transfer from bucket X to Y",
    TRANSFER_Y_TO_X: "Transfer from bucket Y to X"
};

/* 
    This function generate all possible next states from a given current state of two water jugs.
*/
export function generateNextStates(current: WaterJugState, x_capacity: number, y_capacity: number): Action[] {
    const { bucketX, bucketY } = current;

    return [
        { bucketX: x_capacity, bucketY, action: ACTIONS.FILL_X },
        { bucketX, bucketY: y_capacity, action: ACTIONS.FILL_Y },
        { bucketX: 0, bucketY, action: ACTIONS.EMPTY_X },
        { bucketX, bucketY: 0, action: ACTIONS.EMPTY_Y },
        {
            bucketX: Math.max(0, bucketX - (y_capacity - bucketY)),
            bucketY: Math.min(y_capacity, bucketY + bucketX),
            action: ACTIONS.TRANSFER_X_TO_Y
        },
        {
            bucketX: Math.min(x_capacity, bucketX + bucketY),
            bucketY: Math.max(0, bucketY - (x_capacity - bucketX)),
            action: ACTIONS.TRANSFER_Y_TO_X
        }
    ];
}