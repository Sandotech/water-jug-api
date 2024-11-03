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

/**
 * @swagger
 * /solve:
 *   post:
 *     summary: Solve the water jug problem
 *     description: Solves the water jug problem given the capacities of two jugs and the desired amount of water.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               x_capacity:
 *                 type: integer
 *                 description: The capacity of the first jug.
 *                 example: 4
 *               y_capacity:
 *                 type: integer
 *                 description: The capacity of the second jug.
 *                 example: 3
 *               z_amount_wanted:
 *                 type: integer
 *                 description: The desired amount of water.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Solution found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 solution:
 *                   type: array
 *                   description: The steps to solve the problem.
 *                   items:
 *                     type: object
 *                     properties:
 *                       jug1:
 *                         type: integer
 *                         description: The amount of water in the first jug.
 *                       jug2:
 *                         type: integer
 *                         description: The amount of water in the second jug.
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: Invalid input. All inputs must be positive integers.
 *       404:
 *         description: No solution found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: No solution found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: An unexpected error occurred.
*/
router.post('/', (req, res) => waterJugController.solve(req, res));

export default router;
