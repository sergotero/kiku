import { Router } from "express";
import * as KanjiController from "./../controllers/kanjis.controller.js";
import * as WordController from "./../controllers/words.controller.js";
import * as KanaController from "./../controllers/kanas.controller.js";
import * as RadicalController from "./../controllers/radicals.controller.js";
import * as UserController from "./../controllers/users.controller.js";
import * as ReportController from "./../controllers/reports.controller.js";

// import createHttpError from "http-errors";

const router = Router();

//Routes for Kanjis
router.post(`/api/kanjis`, KanjiController.create);
router.get(`/api/kanjis`, KanjiController.list);
router.get(`/api/kanjis/:id`, KanjiController.detail);
router.patch(`/api/kanjis/:id`, KanjiController.update);
router.delete(`/api/kanjis/:id`, KanjiController.destroy);

//Routes for Radicals
router.post(`/api/radicals`, RadicalController.create);
router.get(`/api/radicals`, RadicalController.list);
router.get(`/api/radicals/:id`, RadicalController.detail);
router.patch(`/api/radicals/:id`, RadicalController.update);
router.delete(`/api/radicals/:id`, RadicalController.destroy);

//Routes for Kanas
router.get(`/api/kanas`, KanaController.list);
router.get(`/api/kanas/:id`, KanaController.detail);

//Routes for Words
router.post(`/api/words`, WordController.create);
router.get(`/api/words`, WordController.list);
router.get(`/api/words/:id`, WordController.detail);
router.patch(`/api/words/:id`, WordController.update);
router.delete(`/api/words/:id`, WordController.destroy);

//Routes for Users
router.post(`/api/users`, UserController.create);
router.get(`/api/users`, UserController.list);
router.get(`/api/users/profile`, UserController.detail);
router.patch(`/api/users/:id`, UserController.update);
router.delete(`/api/users/:id`, UserController.destroy);

//Routes for lists
// router.get(`/api/users/profile/:id/lists`, ListController.list);

//Routes for login and logout
router.post(`/api/sessions`, UserController.login);
router.delete(`/api/sessions`, UserController.login);

//Routes for reporting problems
router.post(`/api/reports`, ReportController.create);
router.get(`/api/reports`, ReportController.list);
router.get(`/api/reports/:id`, ReportController.detail);
router.patch(`/api/reports/:id`, ReportController.update);
router.delete(`/api/reports/:id`, ReportController.destroy);

export default router;