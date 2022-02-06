const validateSchema = (schema, property) => (req, res, next) => {
  const { value, error } = schema.validate({
    [property]: req[property],
  });

  const hasError = error;

  if (hasError) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  req[property] = value[property];

  next();
};

module.exports = validateSchema;
