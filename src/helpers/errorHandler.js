const errorHandler = obj => {
  let error;

  if (typeof obj === 'string') {
    error = obj;
  }

  if (typeof obj === 'object') {
    Object.values(obj).forEach(err => {
      error = err;
    });
  }

  return error;
};

export default errorHandler;
