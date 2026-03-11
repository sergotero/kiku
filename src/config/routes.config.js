import { Router } from "express";
import * as KanjiController from "./../controllers/kanjis.controller.js";
// import createHttpError from "http-errors";

const router = Router();

//Routes for Kanjis
router.post(`/api/kanjis`, KanjiController.create);
router.get(`/api/kanjis`, KanjiController.list);
router.get(`/api/kanjis/:id`, KanjiController.detail);
router.patch(`/api/kanjis/:id`, KanjiController.update);
router.delete(`/api/kanjis/:id`, KanjiController.destroy);

//Routes for Radicals
// router.get(`/api/radicals`);
// router.post(`/api/radicals`);
// router.get(`/api/radicals/:id`);
// router.patch(`/api/radicals/:id`);
// router.delete(`/api/radicals/:id`);

//Routes for Kanas
// router.get(`/api/kanas`);
// router.post(`/api/kanas`);
// router.get(`/api/kanas/:id`);
// router.patch(`/api/kanas/:id`);
// router.delete(`/api/kanas/:id`);

//Routes for Words
// router.get(`/api/words`);
// router.post(`/api/words`);
// router.get(`/api/words/:id`);
// router.patch(`/api/words/:id`);
// router.delete(`/api/words/:id`);

//Routes for Users
// router.get(`/api/users`);
// router.get(`/api/users/profile`);
// router.post(`/api/users`);
// router.patch(`/api/users/:id`);
// router.delete(`/api/users/:id`);

//Routes for register and login
// router.post(`/api/register`);
// router.post(`/api/login`);

//Routes for reporting problems
// router.post(`/api/reports`);

export default router;