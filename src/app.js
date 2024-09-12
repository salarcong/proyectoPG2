import express from "express"; //Se importa express
import morgan from "morgan"; //Se importa morgan
import cookieParser from "cookie-parser"; //Se importa cookie-parser
import cors from "cors"; //Se importa cors

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
));
/*middleware*/
/*Muestro un mensaje corto en consola*/
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(taskRoutes);


export default app;