import express from 'express';
import bodyParser from 'body-parser';
import waterJugRoutes from './interface/routes/waterJugRoutes';

const app = express();
app.use(bodyParser.json());

app.use('/solve', waterJugRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});