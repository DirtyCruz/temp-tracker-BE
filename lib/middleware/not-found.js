module.exports = (req, res, next) => {
  const err = new Error('Unable to deliver the wonderful resource you so desire.');
  err.status = 404;
  next(err);
};
