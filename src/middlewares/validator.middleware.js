export const validateSchema = schema => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch ({ errors }) {
    return res.status(400).json(errors.map(({ message }) => message));
  }
};
