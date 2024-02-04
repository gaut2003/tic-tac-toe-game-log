import { Router } from "express";
import { postGames, getGames } from "../controllers/game-controller.js";
const router = Router();

router.route("/games").post(postGames);
router.route("/games").get(getGames);

export default router;

