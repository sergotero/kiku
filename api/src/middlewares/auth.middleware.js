import Session from "../models/session.model.js";
import createHttpError from "http-errors";

async function checkSession(req) {

  const sessionId = req.headers.cookie?.match(/sessionId=([^;]+)/)?.[1];
  
  if (!sessionId) {
    throw createHttpError(401, "Unauthorized");
  }
  
  const session = await Session.findById(sessionId).populate("user", "_id name lastName email rol");
  
  if (!session) {
    throw createHttpError(401, "Unauthorized");
  }

  return session;
}

export async function checkAdmin(req, res, next) {

  const session = await checkSession(req);
  const { user: {rol} } = session;
  
  req.session = {
    session: session.id,
    user: {
      id: session.user.id,
      name: session.user.name,
      lastName: session.user.lastName,
      email: session.user.email
    }};

  if (rol === "Administrator") {
    next();
    return;
  }
}

export async function checkUser(req, res, next) {
  
  const session = await checkSession(req);
  const { user: {rol} } = session;
  
  req.session = {
    session: session.id,
    user: {
      id: session.user.id,
      name: session.user.name,
      lastName: session.user.lastName,
      email: session.user.email
    }};
  
  if (rol === "User") {
    next();
    return;
  }
}