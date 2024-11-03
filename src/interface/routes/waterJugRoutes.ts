import express from 'express';
import { WaterJugController } from '../controllers/WaterJugController';
import { WaterJugRepository } from '../../infrastructure/repositories/WaterJugRepository';
import { WaterJugSolverImpl } from '../../use-cases/WaterJugImpl';

const router = express.Router();

// Create an instance of WaterJugSolverImpl
const waterJugSolverImpl = new WaterJugSolverImpl();

// Inject the instance into WaterJugRepository
const waterJugRepository = new WaterJugRepository(waterJugSolverImpl);

// Inject the repository into WaterJugController
const waterJugController = new WaterJugController(waterJugRepository);

router.post('/', (req, res) => waterJugController.solve(req, res));

export default router;
