import createHttpError from "http-errors";
import List from "../models/list.model.js";
import User from "../models/user.model.js";

export async function create(req, res){

  const { id } = req.session.user;
  const user = await User.findById(id, {name: 1, lastName: 1, rol: 1, email: 1, lists: 1});
  
  if (!user) {
    throw createHttpError(401, "Unauthorized");
  }
  
  const newList = {
    name: req.body.name,
    items: {
      item: req.body.item,
      onModel: req.body.onModel}
  };

  const list = await List.create(newList);

  await User.findByIdAndUpdate(id,
    {
      $push: { lists: list._id}
    },{
      returnDocument: "after"
    }
  );

  res.status(200).json(list);
}

export async function list(req, res) {
  const { id } = req.session.user;
  const user = await User.findById(id, {lists: 1}).populate({
    path: "lists",
    select: "id name items",
    // AQUÍ HACEMOS EL POPULATE ANIDADO
    populate: {
      path: "items.item",
      select: "word.text readings.text senses.glosses.eng senses.glosses.spa"
    }
  });
  
  if (!user) {
    throw createHttpError(401, "Unauthorized");
  }

  res.json(user); 
}

export async function detail(req, res) {
  const { id } = req.params;
  const list = await List.findById(id, { name: 1, items: 1, id: 1 }).populate("items.item", "word.text readings.text senses.glosses.eng senses.glosses.spa");
  res.status(200).json(list);
}

export async function destroy(req, res){

  const { id } = req.params;
  
  const list = await List.findByIdAndDelete(id);

  if (!list) {
    throw createHttpError(404, "La lista no se encuentra registrada en la base de datos");
  }

  res.sendStatus(204);
}