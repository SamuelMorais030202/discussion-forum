import { Router } from "express";
import loginRouter from "./login.routes";
import userRouter from "./user.routes";
import topicRouter from "./topic.routes";
import messagRouter from "./message.routes";

const router = Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/topic', topicRouter);
router.use('/message', messagRouter);

export default router;