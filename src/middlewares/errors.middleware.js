function errors(err, req, res, next) {
  console.error(err);
  next();
}

export default errors;