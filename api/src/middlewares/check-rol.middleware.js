export function checkAdmin(req, res, next) {
  if (req.session.user.rol === "Administrator") {
    next();
    return;
  }
}

export function checkUser(req, res, next) {
  if (req.session.user.rol === "User") {
    next();
    return;
  }
}