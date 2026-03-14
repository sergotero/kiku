import { Router } from "express";
import * as KanjiController from "../controllers/kanjis.controller.js";
import * as WordController from "../controllers/words.controller.js";
import * as KanaController from "../controllers/kanas.controller.js";
import * as RadicalController from "../controllers/radicals.controller.js";
import * as UserController from "../controllers/users.controller.js";
import * as ReportController from "../controllers/reports.controller.js";
import createHttpError from "http-errors";
import { checkAdmin, checkUser } from "../middlewares/check-rol.middleware.js";

const router = Router();

//Routes for Kanjis
router.post(`/api/kanjis`, checkAdmin, KanjiController.create); //Only admin
router.get(`/api/kanjis`, KanjiController.list);
router.get(`/api/kanjis/:id`, KanjiController.detail);
router.patch(`/api/kanjis/:id`, checkAdmin, KanjiController.update); //Only admin
router.delete(`/api/kanjis/:id`, checkAdmin, KanjiController.destroy); //Only admin

//Routes for Radicals
router.post(`/api/radicals`, checkAdmin, RadicalController.create); //Only admin
router.get(`/api/radicals`, RadicalController.list);
router.get(`/api/radicals/:id`, RadicalController.detail);
router.patch(`/api/radicals/:id`, checkAdmin, RadicalController.update); //Only admin
router.delete(`/api/radicals/:id`, checkAdmin, RadicalController.destroy); //Only admin

//Routes for Kanas
router.get(`/api/kanas`, KanaController.list);
router.get(`/api/kanas/:id`, KanaController.detail);

//Routes for Words
router.post(`/api/words`, checkAdmin, WordController.create); //Only admin
router.get(`/api/words`, WordController.list);
router.get(`/api/words/:id`, WordController.detail);
router.patch(`/api/words/:id`, checkAdmin, WordController.update); //Only admin
router.delete(`/api/words/:id`, checkAdmin, WordController.destroy); //Only admin

//Routes for Users
router.post(`/api/users`, checkUser, UserController.create);
router.get(`/api/users`, checkAdmin, UserController.list); //Only admin
router.get(`/api/users/:id`, checkAdmin, UserController.detail); //Only admin
router.patch(`/api/users/:id`, checkAdmin, UserController.update); //Only admin
router.delete(`/api/users/:id`, checkAdmin, UserController.destroy); //Only admin

//Routes for lists
// router.get(`/api/users/profile/:id/lists`, ListController.list);

//Routes for login and logout
router.post(`/api/sessions`, UserController.login);
router.delete(`/api/sessions`, UserController.logout);

//Routes for reporting problems
router.post(`/api/reports`, ReportController.create);
router.get(`/api/reports`, ReportController.list); //Only admin
router.get(`/api/reports/:id`, ReportController.detail); //Only admin
router.patch(`/api/reports/:id`, ReportController.update); //Only admin
router.delete(`/api/reports/:id`, ReportController.destroy); //Only admin

//Routes not defined
router.use((req, res) => {
  throw createHttpError(404, "Route not found");
});

export default router;