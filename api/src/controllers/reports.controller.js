import Report from "../models/report.model.js";
import createHttpError from "http-errors";

export async function create(req, res) {
  const storedReport = await Report.findOne({item: req.body.item});

  if (storedReport) {
    throw createHttpError(400, "El informe ya existe en la base de datos");
  }

  const report = await Report.create(req.body);
  res.status(201).json(report);
}

export async function list(req, res) {
  const reports = await Report.find({});
  
  if (reports.length < 1) {
    throw createHttpError(404, "No hay informes registrados en la base de datos");
  }

  res.status(200).json(reports);
}

export async function detail(req, res) {
  const { id } = req.params;
  const report = await Report.findById(id);

  if (!report) {
    throw createHttpError(404, "El informe no se encuentra registrado en la base de datos");
  }

  res.status(200).json(report);
}

export async function update(req, res) {
  const { id } = req.params;
  const data = req.body;
  const report = await Report.findByIdAndUpdate(id, data, {returnDocument: "after"});

  if (!report) {
    throw createHttpError(404, "El informe no se encuentra registrado en la base de datos");
  }

  res.status(200).json(report);
}

export async function destroy(req, res) {
  const { id } = req.params;
  const report = await Report.findByIdAndDelete(id);

  if (!report) {
    throw createHttpError(404, "El informe no se encuentra registrado en la base de datos");
  }

  res.sendStatus(204);
}