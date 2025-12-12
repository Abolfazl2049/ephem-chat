import {Router} from "express";
import {router as sessionRouter} from "./services/session/router.js";
import {router as userRouter} from "./services/user/router.js";

const router = Router();

router.use("/session", sessionRouter);
router.use("/user", userRouter);
export {router};
