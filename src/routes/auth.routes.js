import { Router } from "express";
import {login, 
        logout, 
        register,
        verifyToken, 
        profile
} from "../controllers/auth.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

/*Se importa el controlador*/
const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login); 
router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

export default router;