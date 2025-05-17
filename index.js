
import dotenv from "dotenv";
import express from 'express';
import path from "path";
import bootstrap from './Src/app.controller.js';
 const app = express()

dotenv.config({ path: path.resolve("./.env") })


bootstrap(app,express)

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
app.get('/', (req, res) => res.send('Hello World In Course System '))

export default app