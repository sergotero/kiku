import express, { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const buildPath = path.join(__dirname, "build");

// 1. Servir archivos estáticos
router.use(express.static(buildPath));

// 2. Captura total para Express 5
// El formato ":path*" crea un parámetro llamado "path" que captura el resto de la URL
router.get("{*any}", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

export default router;