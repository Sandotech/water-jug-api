export interface WaterJugState {
    bucketX: number;
    bucketY: number;
    steps: {
        step: number;
        bucketX: number;
        bucketY: number;
        action: string;
        status?: string;
    }[];
}