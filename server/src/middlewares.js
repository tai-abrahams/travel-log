const notFound = (req, res, next) => {
  // should be last in line of routes to handle incorrect route requests
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // next() when filled with 'error' forwards every error to the 'error' middleware
};

// error handler has 4 parameters starting with err
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode); // res.statusCode value is used to set the status
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? 'null' : err.stack,
  });

  // if(res.statusCode === "200"){
  //     res.statusCode = 500;
  // } else{
  //     res.statusCode=
  // };
};

module.exports = {
  notFound,
  errorHandler,
};
