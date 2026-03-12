import Kana from "./../models/kana.model.js";
import createHttpError from "http-errors";

export async function list(req, res) {
  const kanas = await Kana.find({});
  if (kanas.length > 0) {
      throw createHttpError(404, "No hay kanas registrados en la base de datos");
  }
  res.status(200).json(kanas);
}

export async function detail(req, res) {
  const { id } = req.params;
  console.log("Id", id);
  
  const kana = await Kana.findById(id);

  if(!kana) {
    throw createHttpError(404, "El kana no está registrado en la base de datos");
  }

  res.status(200).json(kana);
}