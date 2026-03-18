import Radical from "../models/radical.model.js";
import createHttpError from "http-errors";

export async function create(req, res) {
  const radical = await Radical.findOne({radical: req.body.radical}, {radical: 1});
  if (radical) {
    throw createHttpError(400, "El radical ya aparece recogido en la base de datos");
  }
  const newRadical = Radical.create(req.body);
  res.status(201).json(newRadical);
}

export async function list(req, res) {
  const radicals = await Radical.find();
  if (radicals.length < 1) {
      throw createHttpError(404, "No hay radicales registrados en la base de datos");
  }
  res.status(200).json(radicals);
}

export async function detail(req, res) {
  const { id } = req.params;
  const radical = await Radical.findById(id);
  if (!radical) {
    throw createHttpError(404, "No existen registros del radical en la base de datos");
  }

  res.status(200).json(radical);
}

export async function update(req, res) {
  const { id } = req.params;
  const data = req.body;
  const storedRadical = await Radical.findById(id);

  if (!storedRadical) {
    throw createHttpError(404, "No existen registros del radical en la base de datos");
  }
  
  const radical = await Radical.findByIdAndUpdate(id, data, {returnDocument: "after"});
  res.status(200).json(radical);
}

export async function destroy(req, res) {
  const { id } = req.params;
  const radical = await Radical.findByIdAndDelete(id);

  if (!radical) {
    throw createHttpError(404, "No existen registro del radical en la base de datos");
  }

  res.sendStatus(204);
}