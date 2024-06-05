const errorHandler = (err, req, res, next) => {
  res.render("error", {
    message: err.message,
    status: err.status,
    backlink: err.backlink,
  });
};

module.exports = errorHandler;
