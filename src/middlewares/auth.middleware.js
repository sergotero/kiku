import createHttpError from "http-errors";
import Session from "../models/session.model.js";

async function checkAuth(req, res, next) {
  
  if (req.method === "POST" && req.path == "/api/users"){
    next();
    return;
  }

  if (req.method === "POST" && req.path == "/api/sessions"){
    next();
    return;
  }

  const sessionId = req.headers.cookie?.match(/sessionId=([^;]+)/)?.[1];

  if (!sessionId) {
    throw createHttpError(401, "Unauthorized");
  }
  
  const session = await Session.findById(sessionId).populate("user", "-password -rol -lists");

  if (!session) {
    throw createHttpError(401, "Unauthorized");
  }

  req.session = session;
  next();
}

export default checkAuth;