import { Router } from "express";
import loginRouter from "./login.routes";
import userRouter from "./user.routes";

const router = Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);

export default router;