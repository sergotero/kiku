import User from "../models/user.model.js";
import Session from "../models/session.model.js";
import List from "../models/list.model.js";
import createHttpError from "http-errors";

export async function create(req, res) {
  const storedUser = await User.findOne({email: req.body.email});

  if (storedUser) {
    throw createHttpError(400, "El usuario ya existe en la base de datos");
  }

  const user = await User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    rol: "User",
    email: req.body.email,
    password: req.body.password,
    lists: []
  });
  res.status(201).json(user);
}

export async function list(req, res) {
  const users = await User.find({});

  res.status(200).json(users);
}

export async function detail(req, res) {
  const { id } = req.params;
  
  const user = await User.findById(id).populate("lists");

  if (!user) {
    throw createHttpError(404, "El usuario no se encuentra registrado en la base de datos");
  }

  res.status(200).json(user);
}

export async function update(req, res) {
  const { id } = req.params;
  const data = req.body;
  const user = await User.findByIdAndUpdate(id, data, {returnDocument: "after"});

  if (!user) {
    throw createHttpError(404, "El usuario no se encuentra registrado en la base de datos");
  }

  res.status(200).json(user);
}

export async function destroy(req, res) {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw createHttpError(404, "El usuario no se encuentra registrado en la base de datos");
  }

  res.sendStatus(204);
}

export async function login(req, res) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw createHttpError(400, "Falta el email y/o la contraseña");
  }
  const user = await User.findOne({email: email});

  if (!user) {
    throw createHttpError(404, "El usuario no se encuentra registrado");
  }

  const match = await user.checkPassword(password);

  if(!match) {
    throw createHttpError(401, "Credenciales inválidas");
  }

  const session = await Session.create({ user: user.id});
  res.cookie("sessionId", session.id, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: process.env.COOKIE_SECURE === "true" ? "none" : undefined
  });

  res.status(200).json({
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    rol: user.rol,
    email: user.email,
    lists: user.lists
  });

}

export async function logout(req, res) {

  const checkSession = await Session.findByIdAndDelete(req.session.id);

  if(!checkSession) {
    throw createHttpError(404, "La sesión no se encuentra en la base de datos");
  }

  res.sendStatus(204);
}
