import express from 'express';
import bodyParser from 'body-parser';
import waterJugRoutes from './interface/routes/waterJugRoutes';
import { logger } from "./infrastructure/logger";
import { setupSwagger } from "./interface/swagger";

const app = express();
app.use(bodyParser.json());

app.use('/solve', waterJugRoutes);
setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
