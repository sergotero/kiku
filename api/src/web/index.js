import express, { Router } from "express";
const __dirname = import.meta.dirname;

const router = Router();

router.use(express.static(`${__dirname}/build`));
router.get("{*any}", (req, res, next) => res.sendFile(`${__dirname}/build/index.html`));

export default router;