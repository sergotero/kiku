import Report from "../models/report.model.js";
import createHttpError from "http-errors";

export async function create(req, res) {
  const report = await Report.create(req.body);
  res.status(201).json(report);
}

export async function list(req, res) {
  const reports = await Report.find({}).populate("user", "name lastName email").populate("item").lean();

  const filteredReport = reports.map(rep => {
    if (rep.onModel === "Word") {
      return {
        ...rep,
        item: {
          id: rep.item._id,
          word: rep.item.word[0]?.text || rep.item.readings[0].text,
        },
        dateFormatted: new Date(rep.createdAt).toLocaleDateString("es-ES")
      };
    }

    if (rep.onModel === "Kanji") {
      return {
        ...rep,
        item: {
          id: rep.item._id,
          kanji: rep.item.kanji
        },
        dateFormatted: new Date(rep.createdAt).toLocaleDateString("es-ES")
      };
    }
  });

  res.status(200).json(filteredReport);
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
  const report = await Report.findByIdAndUpdate(id, data, { returnDocument: "after" });

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