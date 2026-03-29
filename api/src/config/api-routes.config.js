import { Router } from "express";
import * as KanjiController from "../controllers/kanjis.controller.js";
import * as WordController from "../controllers/words.controller.js";
import * as KanaController from "../controllers/kanas.controller.js";
import * as RadicalController from "../controllers/radicals.controller.js";
import * as UserController from "../controllers/users.controller.js";
import * as ReportController from "../controllers/reports.controller.js";
import createHttpError from "http-errors";
import { checkAdmin, checkUser } from "../middlewares/auth.middleware.js";
import errors from "../middlewares/errors.middleware.js";
import clearBody from "../middlewares/clearbody.middleware.js";
import cors from "../middlewares/cors.middleware.js";

const router = Router();

//Middlewares
router.use(cors);
router.use(clearBody);

//Routes for Kanjis
router.post(`/kanjis`, checkAdmin, KanjiController.create); //Only admin
router.get(`/kanjis`, KanjiController.list);
router.get(`/kanjis/:id`, KanjiController.detail);
router.patch(`/kanjis/:id`, checkAdmin, KanjiController.update); //Only admin
router.delete(`/kanjis/:id`, checkAdmin, KanjiController.destroy); //Only admin

//Routes for Radicals
router.post(`/radicals`, checkAdmin, RadicalController.create); //Only admin
router.get(`/radicals`, RadicalController.list);
router.get(`/radicals/:id`, RadicalController.detail);
router.patch(`/radicals/:id`, checkAdmin, RadicalController.update); //Only admin
router.delete(`/radicals/:id`, checkAdmin, RadicalController.destroy); //Only admin

//Routes for Kanas
router.get(`/kanas`, KanaController.list);
router.get(`/kanas/:id`, KanaController.detail);

//Routes for Words
router.post(`/words`, checkAdmin, WordController.create); //Only admin
router.get(`/words`, WordController.list);
router.get(`/words/:id`, WordController.detail);
router.patch(`/words/:id`, checkAdmin, WordController.update); //Only admin
router.delete(`/words/:id`, checkAdmin, WordController.destroy); //Only admin

//Routes for Users
router.post(`/users`, UserController.create);
router.get(`/users`, checkAdmin, UserController.list); //Only admin
router.get(`/users/:id`, checkAdmin, UserController.detail); //Only admin
router.patch(`/users/:id`, checkAdmin, UserController.update); //Only admin
router.delete(`/users/:id`, checkAdmin, UserController.destroy); //Only admin

//Routes for lists
// router.get(`/users/profile/:id/lists`, ListController.list);

//Routes for login and logout
router.post(`/sessions`, UserController.login);
router.delete(`/sessions`, UserController.logout);

//Routes for reporting problems
router.post(`/reports`,checkUser, ReportController.create);
router.get(`/reports`,checkAdmin, ReportController.list); //Only admin
router.get(`/reports/:id`,checkAdmin, ReportController.detail); //Only admin
router.patch(`/reports/:id`,checkAdmin, ReportController.update); //Only admin
router.delete(`/reports/:id`,checkAdmin, ReportController.destroy); //Only admin

//Routes not defined
router.use((req, res) => {
  throw createHttpError(404, "Route not found");
});

//Error middleware
router.use(errors);

export default router;