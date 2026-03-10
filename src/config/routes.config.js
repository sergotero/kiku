import { Router } from "express";
// import createHttpError from "http-errors";
//Resto servicios

const router = Router();

//Routes for Kanjis
router.get(`/api/kanjis`);
router.post(`/api/kanjis`);
router.get(`/api/kanjis/:id`);
router.patch(`/api/kanjis/:id`);
router.delete(`/api/kanjis/:id`);

//Routes for Radicals
router.get(`/api/radicals`);
router.post(`/api/radicals`);
router.get(`/api/radicals/:id`);
router.patch(`/api/radicals/:id`);
router.delete(`/api/radicals/:id`);

//Routes for Kanas
router.get(`/api/kanas`);
router.post(`/api/kanas`);
router.get(`/api/kanas/:id`);
router.patch(`/api/kanas/:id`);
router.delete(`/api/kanas/:id`);

//Routes for Words
router.get(`/api/words`);
router.post(`/api/words`);
router.get(`/api/words/:id`);
router.patch(`/api/words/:id`);
router.delete(`/api/words/:id`);

//Routes for Users
router.get(`/api/users`);
router.get(`/api/users/profile`);
router.post(`/api/users`);
router.patch(`/api/users/:id`);
router.delete(`/api/users/:id`);

//Routes for register and login
router.post(`/api/register`);
router.post(`/api/login`);

//Routes for reporting problems
router.post(`/api/reports`);